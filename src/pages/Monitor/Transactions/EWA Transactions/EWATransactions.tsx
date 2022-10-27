import React, { useState } from "react";
import { Flex, Spacer, Button, useDisclosure, Tooltip } from "@chakra-ui/react";
import { useEasyActions, useEasyState } from "../../../../store/hooks";
import FilterTransactions from "./FilterTransactions";
import RequestModal from "./RequestModal";
import ResponseModal from "./ResponseModal";
import LoadingSpinner from "../../../../components/common/Spinner";

import moment from "moment";
import { TransactionResult } from "@/types/transactions/transactions";
import FilterIcon from "@/components/common/FilterIcon";
import ExportIcon from "@/components/common/ExportIcon";
import DataTable from "react-data-table-component";
import { customStyles } from "@/config/styles/customStyles";
import TransactionDetail from "./TransactionDetail";
import ExportData from "./ExportData";
import { ExternalLinkIcon, RepeatIcon, ViewIcon } from "@chakra-ui/icons";
import TransactionResponse from "./TransactionResponse";
import { OneLinkReqResData } from "@/types/transactions/oneLinkReqRes";
import { getDayStartDate, getDayEndDate } from "@/utils/helper";
import { IFilteredParams } from "@/types/store-types";

export interface EWATransactionsProps {}

const EWATransactions: React.FC<EWATransactionsProps> = (props) => {
	const { getTransactions, filterTransactions, employeeApproveTransaction, getOneLinkTransactionsResponse } = useEasyActions(
		(state) => state.monitor
	);
	const { transactions, OneLinkTransactionsResponse } = useEasyState((state) => state.monitor);
	const [transaction, setTransactions] = useState<TransactionResult[]>([]);

	const [requestData, setRequestData] = useState({});
	const [responseData, setResponseData] = useState({});
	const [viewRequestModal, setViewRequestModal] = useState(false);
	const [viewResponseModal, setViewResponseModal] = useState(false);
	const [isApproved, setIsApproved] = useState(false);
	const [isRejected, setIsRejected] = useState(false);
	const [transactionId, setTransactionId] = useState("");
	const [bankDetail, setBankDetail] = useState({});
	const [tdModel, setTdModel] = useState(false);
	const [trModel, setTRModel] = useState(false);
	const [edModel, setEDModel] = useState(false);

	const [alert, setAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const [showAll, setShowAll] = useState(false);
	const [filteredParams, setFilteredParams] = useState<IFilteredParams>({});
	const [totalTransactions, setTotalTransactions] = useState(0);
	const [isDataLoading, setIsDataLoading] = useState(false);
	const [paginationProps, setPaginationProps] = useState({
		page: 1,
		limit: 10,
	});

	const { isOpen, onOpen, onClose } = useDisclosure();

	React.useEffect(() => {
		getTransactionsData();
	}, [paginationProps]);

	const getTransactionsData = async (useFilter = true) => {
		setIsDataLoading(true);

		let params: IFilteredParams = {
			...paginationProps,
		};

		let data = null;
		if (useFilter && Object.keys(filteredParams).length > 0) {
			setAlert(false);
			setIsLoading(true);
			params = {
				...filteredParams,
				...params,
				startDate: getDayStartDate(filteredParams.startDate),
				endDate: getDayEndDate(filteredParams.endDate),
			};
			data = await filterTransactions(params);
			if (data instanceof Error) {
				setIsLoading(false);
				setAlert(true);
				setAlertMessage(data.message);
			} else {
				setShowAll(true);
				setIsLoading(false);
				onClose();
			}
		} else {
			data = await getTransactions(params);
		}

		if (data) {
			setIsDataLoading(false);
			setTotalTransactions(data.total);
		} else {
			setIsDataLoading(false);
		}
	};

	React.useEffect(() => {
		setTransactions(transactions);
	}, [transactions]);

	const filterTransaction = async (params: IFilteredParams) => {
		setFilteredParams(params);
		setPaginationProps({ page: 1, limit: 10 });
	};

	const clearFilter = () => {
		setShowAll(false);
		setFilteredParams({});
		setPaginationProps({
			page: 1,
			limit: 10,
		});
	};

	const closeRequestModal = () => {
		setViewRequestModal(false);
	};

	const exportDataModel = () => {
		setEDModel(true);
	};

	const viewResponseHandler = async (row: any) => {
		setViewResponseModal(true);
		setResponseData(row);
	};

	const closeResponseModal = () => {
		setViewResponseModal(false);
	};

	const employeeApproveHandler = async (row: any) => {
		let payload = {
			transaction_id: row.id,
			initiator: "admin_web",
			status: "approve",
		};
		setIsApproved(true);
		setTransactionId(row.id);
		const data = await employeeApproveTransaction(payload);

		if (data) {
			getTransactionsData();
		}
		setIsApproved(false);
	};

	const employeeRejectHandler = async (row: any) => {
		let payload = {
			transaction_id: row.id,
			initiator: "admin_web",
			status: "reject",
		};
		setIsRejected(true);
		setTransactionId(row.id);
		const data = await employeeApproveTransaction(payload);
		if (data) {
			getTransactionsData();

			setIsRejected(false);
		} else {
			setIsRejected(false);
		}
	};

	const BankDetailHandler = (row: any) => {
		setBankDetail(row);
		setTdModel(true);
	};

	const refresh = () => {
		getTransactionsData();
	};

	const JSONHandler = async (row: any) => {
		setIsDataLoading(true);
		const getRes: OneLinkReqResData = await getOneLinkTransactionsResponse(row.id);

		if (getRes) {
			setIsDataLoading(false);
			setTRModel(true);
		}
	};

	const onCloseTD = () => {
		setTdModel(false);
		refresh();
	};

	const onCloseED = () => {
		setEDModel(false);
	};

	const onCloseTR = () => {
		setTRModel(false);
	};

	const onChangeRowsPerPage = (updatedLimit: number, updatedPage: number) => {
		setPaginationProps({
			page: updatedPage,
			limit: updatedLimit,
		});
	};

	const columns = [
		{
			name: "#",

			sortable: true,

			width: "50px",
			cell: (row: TransactionResult, index: number) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}>
					<Tooltip label={index + 1 + paginationProps.page * paginationProps.limit - paginationProps.limit}>
						<p>{index + 1 + paginationProps.page * paginationProps.limit - paginationProps.limit}</p>
					</Tooltip>
				</div>
			),
		},
		{
			name: "Transaction Date",
			selector: (row: TransactionResult) => row.updatedAt,
			sortable: true,

			width: "200px",
			cell: (row: TransactionResult) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}>
					<Tooltip label={moment(row.updatedAt).format("MMM Do,YYYY[\n]HH:mm:ss")}>
						{moment(row.updatedAt).format("ddd DD-MMM-YYYY, hh:mm A")}
					</Tooltip>
				</div>
			),
		},
		{
			name: "Created Date",
			selector: (row: TransactionResult) => row.createdAt,
			sortable: true,

			width: "200px",
			cell: (row: TransactionResult) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}>
					<Tooltip label={moment(row.createdAt).format("MMM Do,YYYY[\n]HH:mm:ss")}>
						{moment(row.createdAt).format("ddd DD-MMM-YYYY, hh:mm A")}
					</Tooltip>
				</div>
			),
		},
		{
			name: "Type",
			selector: (row: TransactionResult) => row.transactionType,
			sortable: true,

			width: "150px",
			cell: (row: TransactionResult) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}>
					<Tooltip label={row.transactionType}>{row.transactionType}</Tooltip>
				</div>
			),
		},
		{
			name: "First Name",
			selector: (row: TransactionResult) => row.employee?.person?.firstName,
			sortable: true,
			width: "150px",
			cell: (row: TransactionResult) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipses",
						whiteSpace: "nowrap",
					}}>
					<Tooltip label={row.employee?.person?.firstName}>{row.employee?.person?.firstName}</Tooltip>
				</div>
			),
		},
		{
			name: "Last Name",
			selector: (row: TransactionResult) => row.employee?.person?.lastName,
			sortable: true,

			cell: (row: TransactionResult) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipses",
						whiteSpace: "nowrap",
					}}>
					<Tooltip label={row.employee?.person?.lastName}>{row.employee?.person?.lastName}</Tooltip>
				</div>
			),
		},
		{
			name: "Amount",
			selector: (row: TransactionResult) => row?.amount,
			sortable: true,

			width: "100px",
			cell: (row: TransactionResult) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipses",
						whiteSpace: "nowrap",
						marginLeft: "20%",
						textAlign: "right",
					}}>
					<Tooltip label={Number(row?.amount) % 1 !== 0 ? Number(row?.amount).toLocaleString() : Number(row?.amount).toLocaleString()}>
						{Number(row?.amount) % 1 !== 0 ? Number(row?.amount).toLocaleString() : Number(row?.amount).toLocaleString()}
					</Tooltip>
				</div>
			),
		},
		{
			name: "Fees",
			selector: (row: TransactionResult) => row?.tariffFee,
			sortable: true,

			width: "90px",
			cell: (row: TransactionResult) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipses",
						whiteSpace: "nowrap",
						marginLeft: "20%",
						textAlign: "right",
					}}>
					<Tooltip label={row?.tariffFee ?? "-"}>
						{Number(row?.tariffFee) % 1 !== 0 ? row?.tariffFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : row?.tariffFee}
					</Tooltip>
				</div>
			),
		},
		{
			name: "Organization",
			selector: (row: TransactionResult) => row?.organization?.name,
			sortable: true,

			cell: (row: TransactionResult) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipses",
						whiteSpace: "nowrap",
					}}>
					<Tooltip label={row?.organization?.name}>{row?.organization?.name}</Tooltip>
				</div>
			),
		},
		{
			name: "Account Title",
			selector: (row: TransactionResult) => row?.accountToTitle,
			sortable: true,
			width: "150px",
			cell: (row: TransactionResult) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipses",
						whiteSpace: "nowrap",
					}}>
					<Tooltip label={row?.accountToTitle || 'N/A'}>{row?.accountToTitle || 'N/A'}</Tooltip>
				</div>
			),
		},
		{
			name: "Account No",
			selector: (row: TransactionResult) => row?.accountToNumber,
			sortable: true,
			width: "150px",
			cell: (row: TransactionResult) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipses",
						whiteSpace: "nowrap",
					}}>
					<Tooltip label={row?.accountToNumber || 'N/A'}>{row?.accountToNumber || 'N/A'}</Tooltip>
				</div>
			),
		},
		{
			name: "Coins",
			selector: (row: TransactionResult) => row?.coins,
			sortable: true,

			width: "90px",
			cell: (row: TransactionResult) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipses",
						whiteSpace: "nowrap",
						marginLeft: "20%",
						textAlign: "right",
					}}>
					<Tooltip label={row?.coins?.coinsWon ?? "0"}>{row?.coins?.coinsWon ?? "0"}</Tooltip>
				</div>
			),
		},
		{
			name: "Transaction Status",
			selector: (row: TransactionResult) => row.transactionStatus,
			width: "100px",
			sortable: true,

			cell: (row: TransactionResult) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipses",
						whiteSpace: "nowrap",
						color: row?.transactionStatus === "completed" ? "green" : row?.transactionStatus === "failed" ? "red" : "black",
					}}>
					<Tooltip label={row?.transactionStatus}>{row?.transactionStatus}</Tooltip>
				</div>
			),
		},
		{
			name: "Source",
			selector: "source",
			sortable: true,
			width: "140px",
			cell: (row: TransactionResult) => (
				<div style={{ overflow: "hidden", textOverflow: "ellipses" }}>
					<Tooltip label={row.initiator}>{row.initiator}</Tooltip>
				</div>
			),
		},
		{
			name: "Employee ID",
			selector: (row: TransactionResult) => row.employee?.employeeCode,
			sortable: true,
			width: "150px",
			cell: (row: TransactionResult) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipses",
						whiteSpace: "nowrap",
					}}>
					<Tooltip label={row.employee?.employeeCode || "Not Available"}>{row.employee?.employeeCode || "N/A"}</Tooltip>
				</div>
			),
		},
		{
			name: "Details",
			selector: "detail",

			width: "70px",
			cell: (row: TransactionResult, index: number) => {
				return (
					<>
						<Button
							// size="sm"
							onClick={() => BankDetailHandler(row)}>
							<ViewIcon />
						</Button>
					</>
				);
			},
		},
		{
			name: "Res/Req",
			selector: "detail",
			sortable: true,

			width: "70px",
			cell: (row: TransactionResult, index: number) => {
				return (
					<>
						<Button onClick={() => JSONHandler(row)}>
							<ExternalLinkIcon />
						</Button>
					</>
				);
			},
		},
	];

	return (
		<>
			<Flex mb="5">
				<Spacer />

				{showAll && (
					<Button bg="#7367F0" colorScheme="#ffffff" onClick={clearFilter}>
						Show All
					</Button>
				)}

				<Button bg="#7367F0" colorScheme="#ffffff" ml="3" onClick={exportDataModel}>
					<ExportIcon />
				</Button>

				<Button bg="#7367F0" colorScheme="#ffffff" ml="3" onClick={refresh}>
					<RepeatIcon width="7" height="7" color="#ffffff" />
				</Button>

				<Button bg={showAll ? "#42ba96" : "#7367F0"} colorScheme="#ffffff" ml="3" onClick={onOpen}>
					<FilterIcon />
				</Button>
			</Flex>

			<RequestModal isOpen={viewRequestModal} onClose={closeRequestModal} data={requestData} />

			<TransactionDetail
				isOpen={tdModel}
				onClose={onCloseTD}
				BankDetail={bankDetail}
				isApproved={isApproved}
				isRejected={isRejected}
				employeeApproveHandler={employeeApproveHandler}
				employeeRejectHandler={employeeRejectHandler}
				transactionId={transactionId}
			/>

			<ExportData isOpen={edModel} onClose={onCloseED} params={filteredParams} />

			<TransactionResponse
				isOpen={trModel}
				onClose={onCloseTR}
				OneLinkTransactionsResponse={OneLinkTransactionsResponse}
				// isLoading={isLoading}
				// setIsLoading={setIsLoading}
				// alertMessage={alert}
			/>
			<ResponseModal isOpen={viewResponseModal} onClose={closeResponseModal} data={responseData} />

			<FilterTransactions
				filterTransaction={filterTransaction}
				isOpen={isOpen}
				onClose={onClose}
				isLoading={isLoading}
				alert={alert}
				alertMessage={alertMessage}
				filterParams={filteredParams}
				limit={paginationProps.limit}
			/>

			{isDataLoading ? (
				<LoadingSpinner />
			) : (
				<DataTable
					paginationDefaultPage={paginationProps.page}
					columns={columns}
					data={transaction}
					fixedHeader
					pagination={true}
					paginationServer
					paginationPerPage={paginationProps.limit || 10}
					paginationRowsPerPageOptions={[10, 50, 100, 250]}
					onChangeRowsPerPage={onChangeRowsPerPage}
					onChangePage={(page: number) => setPaginationProps({ ...paginationProps, page })}
					paginationTotalRows={totalTransactions}
					customStyles={customStyles}
				/>
			)}
		</>
	);
};

export default EWATransactions;
