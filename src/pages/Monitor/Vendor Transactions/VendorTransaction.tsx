import React, { useRef, useState } from "react";
import { Flex, Spacer, Button, useDisclosure, Tooltip } from "@chakra-ui/react";
import { useEasyActions, useEasyState } from "../../../store/hooks";
import FilterTransactions from "./FilterTransactions";
import LoadingSpinner from "../../../components/common/Spinner";
import FilterIcon from "@/components/common/FilterIcon";

import DataTable from "react-data-table-component";
import { customStyles } from "@/config/styles/customStyles";

import { RepeatIcon } from "@chakra-ui/icons";
import { VendorTranactionResult } from "@/types/transactions/vendorTransaction";
import moment from "moment";
import VendorTransactionDetail from "./VendorTransactionDetail";
import ExportIcon from "@/components/common/ExportIcon";
import ExportData from "./ExportData";
import { getDayStartDate, getDayEndDate } from "@/utils/helper";
import { IVendorFilteredParams } from "@/types/store-types";

const usePrevious = (value: any) => {
  const ref = React.useRef()

  React.useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export interface VendorTransactionsProps {}

const VendorTransactions: React.FC<VendorTransactionsProps> = (props) => {
  const { getVendorTransactions, filterVendorTransactions } = useEasyActions(
    (state) => state.monitor
  );

  const { vendorTransactions, oneLinkVendorransactionsResponse } = useEasyState(
    (state) => state.monitor
  );
  const [transaction, setTransactions] = useState<VendorTranactionResult[]>([]);
  const [filteredParams, setFilteredParams] = useState<IVendorFilteredParams>({});

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [paginationProps, setPaginationProps] = useState({
    page: 1,
    limit: 10
  })
  const [rowId, setRowId] = useState('')

  const [edModel, setEDModel] = useState(false)

  const [bankDetail, setBankDetail] = useState<VendorTranactionResult | null>(
    null
  );

  const { isOpen, onOpen, onClose } = useDisclosure()

  React.useEffect(() => {
    getTransactionsData(true)
  }, [paginationProps])

  const getTransactionsData = async (useFilter = true) => {
    setIsDataLoading(true)
    let params: IVendorFilteredParams = {
      ...paginationProps
    }

    let data = null
    if (useFilter && Object.keys(filteredParams).length > 0) {
      setAlert(false)
      setIsLoading(true)
      params = {
        ...filteredParams,
        ...params,
        startDate: getDayStartDate(filteredParams.startDate),
        endDate: getDayEndDate(filteredParams.endDate),
      };
      data = await filterVendorTransactions(params);
      if (data instanceof Error) {
        setIsLoading(false)
        setAlert(true)
        setAlertMessage(data.message)
      } else {
        setShowAll(true)
        setIsLoading(false)
        onClose()
        setShowAll(true)
      }
    } else {
      data = await getVendorTransactions(params)
    }

    if (data) {
      setIsDataLoading(false)
      setTotalTransactions(data.total)
    } else {
      setIsDataLoading(false)
    }
  }

  React.useEffect(() => {
    setTransactions(vendorTransactions)
  }, [vendorTransactions])

  const filterVendorTransaction = async (params: IVendorFilteredParams) => {
    setFilteredParams(params)
    setPaginationProps({ page: 1, limit: 10 })
  }

  const exportDataModel = () => {
    setEDModel(true)
  }

  const onCloseED = () => {
    setEDModel(false)
  }

  const clearFilter = () => {
    setShowAll(false)
    setFilteredParams({})
    setPaginationProps({ page: 1, limit: 10 })
  }

  const refresh = () => {
    getTransactionsData()
  }

  const BankDetailHandler = async (row: any, bol: boolean) => {
    setRowId(row?.id)
    setBankDetail(row)
  }
  const closeTab = () => {
    setRowId('')
  }

  const onChangeRowsPerPage = (updatedLimit: number, updatedPage: number) => {
    setPaginationProps({ page: updatedPage, limit: updatedLimit })
  }

  const columns = React.useMemo(
    () => [
      {
        name: '#',
        sortable: true,
        width: '50px',

        cell: (row: any, index: any) => (
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              textAlign: 'center'
            }}
          >
            <Tooltip label={index + 1 + paginationProps.page * paginationProps.limit - paginationProps.limit}>
              <p>{index + 1 + paginationProps.page * paginationProps.limit - paginationProps.limit}</p>
            </Tooltip>
          </div>
        )
      },
      {
        name: 'Date Initiated',
        selector: (row: any) => row?.createdAt,
        sortable: true,

        width: '150px',
        cell: (row: any) => (
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipses',
              whiteSpace: 'nowrap'
            }}
          >
            <Tooltip label={moment(row?.createdAt).format('MMM Do,YYYY[\n]HH:mm A')}>
              {moment(row?.createdAt).format('ddd DD-MMM-YYYY')}
            </Tooltip>
          </div>
        )
      },
      {
        name: 'Transaction Date',
        selector: (row: any) => row?.updatedAt,
        sortable: true,

        width: '150px',
        cell: (row: any) => (
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipses',
              whiteSpace: 'nowrap'
            }}
          >
            <Tooltip label={moment(row?.updatedAt).format('MMM Do,YYYY[\n]HH:mm A')}>
              {moment(row?.updatedAt).format('ddd DD-MMM-YYYY')}
            </Tooltip>
          </div>
        )
      },
      {
        name: 'Business Name',
        selector: (row: any) => row?.organization?.name,
        sortable: true,

        width: '150px',
        cell: (row: any) => (
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipses',
              whiteSpace: 'nowrap'
            }}
          >
            <Tooltip label={row?.organization?.name}>{row?.organization?.name}</Tooltip>
          </div>
        )
      },
      {
        name: 'Vendor Name',
        selector: (row: any) => row?.vendor?.name,
        sortable: true,
        width: '150px',

        cell: (row: any) => (
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipses',
              whiteSpace: 'nowrap'
            }}
          >
            <Tooltip label={row?.vendor?.name ? row?.vendor?.name : '-'}>
              {row?.vendor?.name ? row?.vendor?.name : '-'}
            </Tooltip>
          </div>
        )
      },
      {
        name: 'Vendor ID',
        selector: (row: any) => row?.vendor?.vendorId,
        sortable: true,
        width: '130px',

        cell: (row: any) => (
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipses',
              whiteSpace: 'nowrap'
            }}
          >
            <Tooltip label={row?.vendor?.vendorId ? row?.vendor?.vendorId : '-'}>
              {row?.vendor?.vendorId ? row?.vendor?.vendorId : '-'}
            </Tooltip>
          </div>
        )
      },

      {
        name: 'Requested Amount',
        selector: (row: any) => row?.requestedAmount,
        sortable: true,
        width: '180px',

        cell: (row: any) => (
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipses',
              whiteSpace: 'nowrap'
            }}
          >
            <Tooltip label={Number(row?.requestedAmount).toLocaleString()}>
              {Number(row?.requestedAmount).toLocaleString()}
            </Tooltip>
          </div>
        )
      },

      {
        name: 'Approved Amount',
        width: '150px',

        cell: (row: any) => <div key={row.id}>{Number(row?.approvedAmount).toLocaleString()}</div>
      },
      {
        name: 'Status',
        width: '250px',

        cell: (row: any) => (
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipses',
              whiteSpace: 'nowrap'
            }}
          >
            <p style={{ color: 'red' }}>
              <Tooltip label={row?.transactionStatus}>{row?.transactionStatus}</Tooltip>{' '}
            </p>
          </div>
        )
      }
    ],
    [transaction]
  )

  return (
    <>
      <Flex mb="5">
        <Spacer />

        {showAll && (
          <Button bg="#7367F0" colorScheme="#ffffff" onClick={clearFilter}>
            Show All
          </Button>
        )}

        <Button bg="#7367F0" colorScheme="#ffffff" ml="3" onClick={refresh}>
          <RepeatIcon width="7" height="7" color="#ffffff" />
        </Button>

        <Button bg="#7367F0" colorScheme="#ffffff" ml="3" onClick={exportDataModel}>
          <ExportIcon />
        </Button>

        <Button bg={showAll ? '#42ba96' : '#7367F0'} colorScheme="#ffffff" ml="3" onClick={onOpen}>
          <FilterIcon />
        </Button>
      </Flex>

      {/* <TransactionResponse
        isOpen={trModel}
        onClose={onCloseTR}
        OneLinkTransactionsResponse={oneLinkVendorransactionsResponse}
      /> */}

      <ExportData isOpen={edModel} onClose={onCloseED} params={filteredParams} />

      <FilterTransactions
        filterTransaction={filterVendorTransaction}
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoading}
        alert={alert}
        alertMessage={alertMessage}
        filterParams={filteredParams}
        limit={10}
      />

      {isDataLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          keyField="id"
          paginationDefaultPage={paginationProps.page}
          columns={columns}
          data={transaction}
          fixedHeader
          pagination={true}
          paginationServer
          paginationPerPage={paginationProps.limit || 10}
          paginationRowsPerPageOptions={[10, 50, 100, 250]}
          onChangeRowsPerPage={onChangeRowsPerPage}
          onChangePage={(page: number) =>
            setPaginationProps({
              ...paginationProps,
              page
            })
          }
          paginationTotalRows={totalTransactions}
          expandableRows
          // onRowClicked={() => setClickId(!clickID)}
          onRowExpandToggled={(bol: boolean, row: any) => {
            BankDetailHandler(row, bol)
          }}
          customStyles={customStyles}
          expandableRowExpanded={(row: any) => row.id === rowId}
          expandableRowsComponent={
            <VendorTransactionDetail BankDetail={bankDetail} {...paginationProps} closeTab={closeTab} />
          }
        />
      )}
    </>
  )
}

export default VendorTransactions
