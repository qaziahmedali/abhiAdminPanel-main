import ExportIcon from '@/components/common/ExportIcon'
import FilterIcon from '@/components/common/FilterIcon'
import LoadingSpinner from '@/components/common/Spinner'
import { customStyles } from '@/config/styles/customStyles'
import { useEasyActions, useEasyState } from '@/store/hooks'
import { IBillInfo, IGetBillInfoFilters, IGetBillInfoRequestPayload } from '@/types/store-types'
import { RepeatIcon } from '@chakra-ui/icons'
import { Button, Flex, Icon, Spacer, Tooltip, usePrevious, useToast } from '@chakra-ui/react'
import moment from 'moment'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import ExportBillModel from './ExportBillModel'
import FilterBillPayment from './FilterBillPayment'

export interface BillPaymentProps {}

const BillPayment: React.FC<BillPaymentProps> = (props) => {
  const toast = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [rowId, setRowId] = useState<string>('')
  const [selectedFilters, setSelectedFilters] = useState<IGetBillInfoRequestPayload>({
    page: 1,
    limit: 10
  })
  const [isDataLoading, setIsDataLoading] = useState(false)

  const { getBillPaymentTransactions } = useEasyActions((actions) => actions.monitor)

  const { billInfo } = useEasyState((state) => state.monitor)

  React.useEffect(() => {
    getBillersPaymentData()
  }, [selectedFilters])

  const showErrorMessage = (message: string) => {
    toast({
      title: 'Request Failed',
      description: message,
      status: 'error',
      duration: 5000,
      isClosable: true
    })
  }

  const showSuccessMessage = (message: string) => {
    toast({
      title: 'Request Successful',
      description: message,
      status: 'success',
      duration: 5000,
      isClosable: true
    })
  }

  const getBillersPaymentData = async () => {
    setIsDataLoading(true)
    const data = await getBillPaymentTransactions(selectedFilters)
    if (!data) {
      showErrorMessage('Failed to get bill payment transactions')
      setIsDataLoading(false)
      return
    }
    showSuccessMessage('Bill payment transactions fetched successfully')
    setIsDataLoading(false)
  }

  const filterBillersData = async (param: IGetBillInfoFilters) => {
    setSelectedFilters({
      ...selectedFilters,
      ...param,
      page: 1
    })
  }

  const closeFilterModel = () => {
    setIsOpen(false)
  }

  const exportBillData = () => {}

  const handleRowChange = (state: boolean, data: any) => {
    setRowId(data.id)
  }

  const onChangeRowsPerPage = (updatedLimit: number, page: number) => {
    setSelectedFilters({
      ...selectedFilters,
      limit: updatedLimit
    })
  }

  const showAllHandler = () => {
    setShowAll(false)
    setSelectedFilters({
      page: 1,
      limit: 10
    })
  }

  const refresh = () => {
    getBillersPaymentData()
  }

  const columns = [
    {
      name: '#',
      selector: '#',
      sortable: true,

      width: '50px',
      cell: (_: IBillInfo, index: number) => (
        <p>{selectedFilters.page * selectedFilters.limit - selectedFilters.limit + (index + 1)}</p>
      )
    },
    {
      name: 'Transaction Date/Time',
      sortable: true,
      width: '300px',
      cell: (row: IBillInfo) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip aria-label={row.transaction?.transactionDate || 'N/A'}>
            {row.transaction?.transactionDate || 'N/A'}
          </Tooltip>
        </div>
      )
    },
    {
      name: 'Consumer Name',
      sortable: true,
      width: '300px',
      cell: (row: IBillInfo) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip aria-label={row.consumerName || 'N/A'}>{row.consumerName || 'N/A'}</Tooltip>
        </div>
      )
    },
    {
      name: 'Amount',
      sortable: true,
      width: '300px',
      cell: (row: IBillInfo) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip aria-label={String(row.amountPaid) || 'N/A'}>{row.amountPaid || 'N/A'}</Tooltip>
        </div>
      )
    },
    {
      name: 'Fees',
      sortable: true,
      width: '300px',
      cell: (row: IBillInfo) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip aria-label={row.transaction?.tariffFee || 'N/A'}>{row.transaction?.tariffFee || 'N/A'}</Tooltip>
        </div>
      )
    },
    {
      name: 'Transaction Status',
      sortable: true,
      width: '300px',
      cell: (row: IBillInfo) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip aria-label={row.transactionStatus || 'N/A'}>{row.transactionStatus || 'N/A'}</Tooltip>
        </div>
      )
    },
    {
      name: 'Consumer Number',
      sortable: true,
      width: '300px',
      cell: (row: IBillInfo) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip aria-label={row.consumerNo || 'N/A'}>{row.consumerNo || 'N/A'}</Tooltip>
        </div>
      )
    }
  ]

  return (
    <>
      <Flex mb="5">
        <Spacer />

        {showAll && (
          <Button bg="#7367F0" colorScheme="#ffffff" onClick={showAllHandler}>
            Show All
          </Button>
        )}
        <Button bg="#7367F0" colorScheme="#ffffff" ml="3" onClick={refresh}>
          <RepeatIcon width="7" height="7" color="#ffffff" />
        </Button>

        <Button bg={showAll ? '#42ba96' : '#7367F0'} ml="3" colorScheme="#ffffff" onClick={() => setIsOpen(true)}>
          <Icon as={FilterIcon} />
        </Button>
      </Flex>

      <FilterBillPayment isOpen={isOpen} onClose={closeFilterModel} selectedFiltersHandler={filterBillersData} />
      {isDataLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          columns={columns}
          data={billInfo.results}
          pagination={true}
          expandableRows={true}
          onChangePage={(page: number) =>
            setSelectedFilters({
              ...selectedFilters,
              page
            })
          }
          paginationTotalRows={billInfo.total}
          paginationPerPage={selectedFilters.limit}
          paginationRowsPerPageOptions={[10, 50, 100, 250]}
          onChangeRowsPerPage={onChangeRowsPerPage}
          onRowExpandToggled={handleRowChange}
          expandableRowExpanded={(row: any) => row.id === rowId}
          customStyles={customStyles}
          noHeader={true}
        />
      )}
    </>
  )
}

export default BillPayment
