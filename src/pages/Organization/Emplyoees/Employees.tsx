import { Autocomplete, Option } from "chakra-ui-simple-autocomplete";
import {
	Box,
	Button,
	Flex,
	Icon,
	Link,
	Spacer,
	Spinner,
	Tooltip,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { ExternalLinkIcon, LinkIcon, RepeatIcon } from "@chakra-ui/icons";
import PushNotification, {
	Notification,
} from "../../../components/Modal/PushNotification";
import React, { useState } from "react";
import { useEasyActions, useEasyState } from "../../../store/hooks";

import DataTable from "react-data-table-component";
import EmployeeDetail from "./EmployeeDetail";
import EmployeeMonthlyBreakUp from "./EmployeeMonthlyBreakup";
import ExportData from "./ExportData";
import ExportIcon from "@/components/common/ExportIcon";
import FilterEmployees from "./FilterEmployees";
import FilterIcon from "@/components/common/FilterIcon";
import LoadingSpinner from "../../../components/common/Spinner";
import { OrganizationResults } from "@/types/organizations/organizations";
import { SendOnboardingSMSAndEmail } from "./SendOnboardingSMSAndEmail";
import ShowTitle from "./ShowTitle";
import { apiManager } from "../../../utils/apiManager/ApiManager";
import { currencyFormater } from "@/utils/formatters";
import { customStyles } from "../../../config/styles/customStyles";
import moment from "moment";
import { IEmployee, IEmployeeFilters, IEmployeeParams, IFetchTitleResponse } from "@/types/store-types";

export interface EmployeesProps {}
export interface ITableRow {
	allSelected: boolean;
	selectedCount: number;
	selectedRows: IEmployee[];
}
export interface ISelectedUser {
	name: string;
	email?: string;
	phone?: string;
	organizationName: string;
	personId: string;
	userId: string;
	id: string;
}

export interface ISelectedEmployees {
	users: ISelectedUser[];
}

const Employees: React.FC<EmployeesProps> = (_: EmployeesProps) => {
	const toast = useToast();
	const {
		getEmployees,
		getEmployeeMonthlyBreakup,
		fetchTitle,
		getOrganizationNames,
	} = useEasyActions((state) => state.organization);

	const { EmployeeMonthlyBreakup } = useEasyState(
		(state) => state.organization
	);

	const { allOrganizations } = useEasyState((state) => state.organization);

	const [isLoading, setIsLoading] = useState(false);
	const [currentOrganizations, setCurrentOrganizations] = React.useState<
		Option[]
	>([]);

	const [showAll, setShowAll] = useState(false);
	const [alert, setAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [success, setSuccess] = useState(false);
	const [isDataLoading, setIsDataLoading] = useState(false);
	const [isTitleLoading, setIsTitleLoading] = useState(false);
	const [titleData, setTitleData] = useState<IFetchTitleResponse | false>(false);
	const [selectedEmployees, setSelectedEmployees] = useState<ISelectedEmployees>({
		users: [],
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [defaultOrganization, setDefaultOrganization] = useState("");
	const [totalEmployees, setTotalEmployees] = useState(0);
	const [employeeData, setEmployeeData] = useState<IEmployee[]>([]);
	const [filteredParams, setFilteredParams] = useState<IEmployeeFilters>({});
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [edModel, setEDModel] = useState(false);
	const [openEmpBreakUpModel, setOpenEmpBreakUpModel] = useState(false);
	const [paginationProps, setPaginationProps] = useState({
		page: 1,
		limit: 10,
	});
	const [rowIndex, setRowIndex] = useState(0);
	const [rowId, setRowId] = useState("");
	const [isSendingNotification, setIsSendingNotification] = useState(false);

	let options = allOrganizations?.map((item, index) => ({
		value: item.id,
		label: item.name,
	}));

	React.useEffect(() => {
		getOrganizations();
	}, [paginationProps]);

	const getEmployeeData = async (usePaginationProps?: boolean) => {
		setIsDataLoading(true);

		let params: IEmployeeParams = {
			...paginationProps,
		};

		if (Object.keys(filteredParams).length > 0) {
			params = usePaginationProps
				? { ...filteredParams, ...params }
				: filteredParams;
			setShowAll(true);
		} else {
			setShowAll(false);
		}

		const data = await getEmployees(params);

		if (data) {
			setTotalEmployees(data.total);
			setEmployeeData(data.results);
		}

		setIsDataLoading(false);
		setIsLoading(false);
		setSuccess(true);
		setAlert(false);
		setAlertMessage("");
		onClose();
	};

	React.useEffect(() => {
		if (Object.keys(filteredParams).length > 0) {
			getEmployeeData(true);
		} else {
			getEmployeeData();
		}
	}, [paginationProps]);

	const showAllHandler = () => {
		setShowAll(false);
		setDefaultOrganization("");
		setCurrentOrganizations([]);
		setFilteredParams({});
		setPaginationProps({
			page: 1,
			limit: 10,
		});
	};

	const onSelectedRowsChange = (row: ITableRow) => {
		let userArray: ISelectedUser[] = [];
		row.selectedRows.map((value: IEmployee) => {
			userArray.push({
				name: value.person.firstName + " " + value.person.lastName,
				...(value.officialEmail && { email: value.officialEmail.email }),
				...(value.officialPhone && { phone: value.officialPhone.phoneNo }),
				organizationName:
					(value.organization && value.organization.name) || "XXXXXXXX",
				personId: value.person.id,
				userId: value.person.userId,
				id: value.id,
			});
		});
		/* 
      To DO Set organization name
    */
		let employeeObj = {
			users: userArray,
		};
		setSelectedEmployees(employeeObj);
	};

	const handleRowChange = (state: boolean, data: IEmployee) => {
		setRowId(data.id);
	};

	const filterEmployeesHandler = async (params: {
		organizationId?: Option[] | null;
	}) => {
		setRowIndex(0);
		let organizationId: string[] = [];
		params?.organizationId?.map(
			(item: { label: string; value: string }, index: number) => {
				organizationId.push(item.value);
				return organizationId;
			}
		);
		let param;

		if (organizationId?.length === 0) {
			param = {
				...filteredParams,
				...params,
			};
		} else {
			param = {
				...filteredParams,
				organizationId,
			};
		}
		setFilteredParams(param);
		setPaginationProps({
			page: 1,
			limit: 10,
		});
	};

	const fetchTitleHandler = (row: IEmployee) => {
		setIsModalOpen(true);
		setIsTitleLoading(true);
		if (row.person.userId) {
			fetchTitle({ user_id: row.person.userId })
				.then((res) => {
					setIsTitleLoading(false);
					if (res !== false) {
						setTitleData(res.data);
					}
				})
				.catch((error: any) => {
					console.log(error);
				});
		}
	};

	const getOrganizations = async () => {
		let params = {
			limit: Number.MAX_SAFE_INTEGER,
			page: paginationProps.page,
		};
		const OrgData: OrganizationResults[] = await getOrganizationNames(params);

		options = OrgData?.map((item, index) => ({
			value: item.id,
			label: item.name,
		}));
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const refresh = () => {
		getEmployeeData();
	};

	const exportData = () => {
		setEDModel(true);
	};

	const onCloseED = () => {
		setEDModel(false);
	};

	const clearMessages = () => {
		setAlert(false);
		setSuccess(false);
	};

	const fetchMonthlyBreakup = async (row: IEmployee) => {
		setIsDataLoading(true);

		let params = {
			employeeId: row?.person?.userId,
			initiator: "admin_web",
		};
		const data = await getEmployeeMonthlyBreakup(params);

		if (data?.status === "success") {
			setIsDataLoading(false);
			setOpenEmpBreakUpModel(true);
		}
	};

	const onCloseEmpBreakUpModel = () => {
		setOpenEmpBreakUpModel(false);
	};

	const onChangeRowsPerPage = (limit: number, page: number) => {
		setPaginationProps({
			page: page,
			limit: limit,
		});
	};

	const columns = [
		{
			name: "#",
			selector: "id",

			sortable: true,
			width: "50px",
			cell: (_: IEmployee, index: number) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					<Tooltip
						label={
							index +
							1 +
							paginationProps.page * paginationProps.limit -
							paginationProps.limit
						}
					>
						<p>
							{index +
								1 +
								paginationProps.page * paginationProps.limit -
								paginationProps.limit}
						</p>
					</Tooltip>
				</div>
			),
		},
		{
			name: "Date of joining",
			selector: (row: IEmployee) => row.dateOfJoining,
			width: "120px",

			sortable: true,
			cell: (row: IEmployee) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					<Tooltip
						label={moment(row.dateOfJoining).format("ddd DD-MMM-YYYY, hh:mm A")}
					>
						{moment(row.dateOfJoining).format("MMM Do, YYYY")}
					</Tooltip>
				</div>
			),
		},
		{
			name: "First Name",
			selector: (row: IEmployee) => row.person.firstName,

			sortable: true,
			width: "150px",
			cell: (row: IEmployee) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					<Tooltip label={row.person && row.person.firstName}>
						{row.person && row.person.firstName}
					</Tooltip>
				</div>
			),
		},
		{
			name: "Last Name",
			selector: (row: IEmployee) => row.person.lastName,

			sortable: true,
			width: "150px",
			cell: (row: IEmployee) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					<Tooltip label={row.person && row.person.lastName}>
						{row.person && row.person.lastName}
					</Tooltip>
				</div>
			),
		},
		{
			name: "CNIC",
			selector: (row: IEmployee) => row.person.cnic,

			sortable: true,
			width: "150px",
			cell: (row: IEmployee) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					<Tooltip label={row.person && row.person.cnic}>
						{row.person && row.person.cnic}
					</Tooltip>
				</div>
			),
		},
		{
			name: "Employee ID",
			selector: (row: IEmployee) => row.employeeCode,

			sortable: true,
			width: "150px",
			cell: (row: IEmployee) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					<Tooltip label={(row.person && row.employeeCode) || "N/A"}>
						{(row && row.employeeCode) || "N/A"}
					</Tooltip>
				</div>
			),
		},
		{
			name: "Email",
			selector: (row: IEmployee) => row.officialEmail?.email || "N/A",

			sortable: true,
			width: "220px",
			cell: (row: IEmployee) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					<Tooltip label={row.officialEmail?.email || "N/A"}>
						{row.officialEmail?.email || "N/A"}
					</Tooltip>
				</div>
			),
		},
		{
			name: "Phone",
			selector: (row: IEmployee) => row.officialPhone?.phoneNo || "N/A",

			sortable: true,
			width: "140px",
			cell: (row: IEmployee) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					<Tooltip label={row.officialPhone?.phoneNo || "N/A"}>
						{row.officialPhone?.phoneNo || "N/A"}
					</Tooltip>
				</div>
			),
		},
		{
			name: "Bank Name",
			selector: (row: IEmployee) => row?.selectedBankAccount?.bank?.bankName || "N/A",

			sortable: true,
			width: "170px",
			cell: (row: IEmployee) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					<Tooltip label={row?.selectedBankAccount?.bank?.bankName || "N/A"}>
						{row?.selectedBankAccount?.bank?.bankName || "N/A"}
					</Tooltip>
				</div>
			),
		},
		{
			name: "Salary",
			selector: (row: IEmployee) => row?.netSalary || "N/A",
			sortable: true,
			width: "150px",
			cell: (row: IEmployee) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					<Tooltip label={row.netSalary || "N/A"}>
						{row && row.netSalary ? currencyFormater(row.netSalary) : "N/A"}
					</Tooltip>
				</div>
			),
		},
		{
			name: "Provident Fund",
			selector: (row: IEmployee) => row?.providentFund || "N/A",
			sortable: true,
			width: "150px",
			cell: (row: IEmployee) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					<Tooltip label={row.providentFund || "N/A"}>
						{row && row.providentFund
							? currencyFormater(row.providentFund)
							: "N/A"}
					</Tooltip>
				</div>
			),
		},
		{
			name: "Status",
			selector: (row: IEmployee) => row?.workingStatus,

			sortable: true,
			width: "80px",
			cell: (row: IEmployee) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					<Tooltip label={row?.workingStatus}>
						{"" + row?.workingStatus}
					</Tooltip>
				</div>
			),
		},
		{
			name: "System Access",
			selector: (row: IEmployee) => row?.systemAccess,

			sortable: true,
			width: "150px",
			cell: (row: IEmployee) => (
				<div
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
				>
					<Tooltip label={row?.systemAccess}>{"" + row?.systemAccess}</Tooltip>
				</div>
			),
		},
		{
			name: "Actions",
			selector: "view",

			width: "80px",
			cell: (row: IEmployee) => {
				return (
					<>
						<Link href="https://google.com" isExternal color="red">
							<Tooltip
								label=" Sign in as customer "
								aria-label=" Sign in as customer "
							>
								<ExternalLinkIcon mx="2px" width="5" height="5" />
							</Tooltip>
						</Link>
						<Button ml="3" onClick={() => fetchTitleHandler(row)}>
							<Tooltip label="Fetch Title" aria-label="Fetch Title">
								<LinkIcon width="5" height="5" />
							</Tooltip>
						</Button>
					</>
				);
			},
		},
		{
			name: "Monthly Breakup",
			selector: "view",

			width: "80px",
			cell: (row: IEmployee) => {
				return (
					<Button
						bg="#7367F0"
						colorScheme="#ffffff"
						ml="3"
						onClick={() => fetchMonthlyBreakup(row)}
					>
						<RepeatIcon width="5" height="5" color="#ffffff" />
					</Button>
				);
			},
		},
	];

	const handlePushNotification = (notification: Notification) => {
		setIsSendingNotification(true);

		const payload = {
			notification,
			users: selectedEmployees?.users?.map(({ userId }: any) => userId) || [],
		};

		if (payload.users.length === 0) {
			setIsSendingNotification(false);
			toast({
				title: "Error!",
				description:
					"You need select at least one employee to send notification!",
				status: "warning",
				duration: 9000,
				isClosable: true,
				position: "top-right",
			});
		} else {
			apiManager
				.fetch({
					name: "PushNotificationToEmployees",
					config: { data: payload },
				})
				.then(() => {
					toast({
						title: "Sent message successfully!",
						description: "We've notify to your employee for you.",
						status: "success",
						duration: 9000,
						isClosable: true,
						position: "top-right",
					});
				})
				.catch((e) => {
					toast({
						title: "Something was wrong!",
						description: e.response?.data?.message || "Please try again later!",
						status: "error",
						duration: 9000,
						isClosable: true,
						position: "top-right",
					});
				})
				.finally(() => setIsSendingNotification(false));
		}
	};

	return (
		<>
			<Flex>
				<Box position="absolute" zIndex="1000" background="white">
					{options[0] == null ? (
						<Spinner />
					) : (
						<Autocomplete
							options={options}
							allowCreation={true}
							result={currentOrganizations}
							setResult={(options: Option[]) => {
								if (options) {
									console.log("OPtions", options);
									setCurrentOrganizations(options); //[options[0]]
									filterEmployeesHandler({
										organizationId: options,
									});
								} else {
									setCurrentOrganizations([]);
									filterEmployeesHandler({ organizationId: null });
								}
							}}
							placeholder="Search Organization"
						/>
					)}
				</Box>

				<Spacer />

				<Box>
					{showAll && (
						<Button
							bg="#7367F0"
							mr="2"
							colorScheme="#ffffff"
							onClick={showAllHandler}
						>
							Show All
						</Button>
					)}

					<PushNotification
						onSubmit={handlePushNotification}
						isLoading={isSendingNotification}
					/>

					<SendOnboardingSMSAndEmail
						organizations={currentOrganizations.map((o) => o.value)}
						employeeIds={selectedEmployees.users?.map((emp: ISelectedUser) => emp.id)}
					/>

					<Button
						bg="#7367F0"
						colorScheme="#ffffff"
						ml="3"
						onClick={exportData}
					>
						<ExportIcon />
					</Button>

					<Button bg="#7367F0" colorScheme="#ffffff" ml="3" onClick={refresh}>
						<RepeatIcon width="7" height="7" color="#ffffff" />
					</Button>
					<Button
						ml="2"
						bg={showAll ? "#42ba96" : "#7367F0"}
						colorScheme="#ffffff"
						onClick={() => {
							setSuccess(false);
							setAlert(false);
							onOpen();
						}}
					>
						<Icon as={FilterIcon} />
					</Button>
				</Box>
			</Flex>

			<Box mt="50px">
				{isDataLoading ? (
					<LoadingSpinner />
				) : (
					<DataTable
						paginationDefaultPage={paginationProps.page}
						columns={columns}
						data={employeeData}
						pagination={true}
						paginationPerPage={paginationProps.limit || 10}
						paginationRowsPerPageOptions={[10, 50, 100, 250]}
						onChangeRowsPerPage={onChangeRowsPerPage}
						paginationServer
						onChangePage={(page) => {
							setPaginationProps({
								...paginationProps,
								page,
							});
						}}
						paginationTotalRows={totalEmployees}
						selectableRows
						onSelectedRowsChange={onSelectedRowsChange}
						expandableRows
						fixedHeader
						onRowExpandToggled={handleRowChange}
						customStyles={customStyles}
						noHeader={true}
						expandableRowExpanded={(row: IEmployee) => row.id === rowId}
						expandableRowsComponent={<EmployeeDetail employeeId={rowId} />}
					/>
				)}
			</Box>

			<ExportData
				isOpen={edModel}
				onClose={onCloseED}
				params={filteredParams}
				OrganizationId={defaultOrganization}
			/>

			<EmployeeMonthlyBreakUp
				isOpen={openEmpBreakUpModel}
				onClose={onCloseEmpBreakUpModel}
				EmployeeMonthlyBreakup={EmployeeMonthlyBreakup}
			/>

			<FilterEmployees
				isOpen={isOpen}
				onClose={onClose}
				filterEmployees={filterEmployeesHandler}
				isLoading={isLoading}
				alert={alert}
				alertMessage={alertMessage}
				clearMessages={clearMessages}
				success={success}
				filteredParams={filteredParams}
			/>
			<ShowTitle
				isOpen={isModalOpen}
				onClose={closeModal}
				titleData={titleData}
				isTitleLoading={isTitleLoading}
			/>
		</>
	);
};

export default Employees;
