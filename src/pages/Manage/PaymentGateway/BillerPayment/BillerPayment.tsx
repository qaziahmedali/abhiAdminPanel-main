import FilterIcon from '@/components/common/FilterIcon'
import LoadingSpinner from '@/components/common/Spinner'
import { customStyles } from '@/config/styles/customStyles'
import { useEasyActions, useEasyState } from '@/store/hooks'
import {
  IBillerPayment,
  IBillerPaymentFilters,
  ICreateBillerPayment,
  IGetBillerPaymentPayload,
  IUpdateBillerPayment
} from '@/types/Manage/BillerPayment'
import { AddIcon, DeleteIcon, EditIcon, RepeatIcon } from '@chakra-ui/icons'
import { Button, Flex, Icon, Spacer, Tooltip, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import AddBillerPayment from './AddBillerPayment'
import ConfirmModal from './ConfirmModal'
import EditBillerPayment from './EditBillerPayment'
import FilterBillerPayment from './FilterBillerPayment'

export interface BillerPaymentProps {}

const BillerPayment: React.FC<BillerPaymentProps> = (props) => {
  const toast = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [openCreateBillerModel, setOpenCreateBillerPaymentModel] = useState(false)
  const [openEditBillerModel, setOpenEditBillerPaymentModel] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<IGetBillerPaymentPayload>({
    page: 1,
    limit: 10
  })
  const [rowId, setRowId] = useState('')
  const [selectedBillerPayment, setSelectedBillerPayment] = useState<IBillerPayment | null>(null)
  const [deleteBillerPaymentId, setDeleteBillerPaymentId] = useState('')
  const [isDataLoading, setIsDataLoading] = useState(false)

  const [totalBillerPayments, setTotalBillerPayments] = useState(0)

  const { getBillerPayment, createBillerPayment, deleteBillerPayment, updateBillerPayment } = useEasyActions(
    (actions) => actions.manage
  )

  const { billerPayment } = useEasyState((state) => state.manage)

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
    await getBillerPayment(selectedFilters)
    setIsDataLoading(false)
  }

  const filterBillersData = async (filters: IBillerPaymentFilters) => {
    setSelectedFilters({
      ...selectedFilters,
      ...filters,
      page: 1
    })
    setShowAll(true)
  }

  const createBillersPayment = async (payload: ICreateBillerPayment) => {
    setIsDataLoading(true)
    const data = await createBillerPayment(payload)
    if (!data) {
      setIsDataLoading(false)
      showErrorMessage('Failed to create biller payment')
      return
    }
    getBillersPaymentData()
    closeCreateBillerPaymentModel()
  }

  const addBillerInfo = () => {
    setOpenCreateBillerPaymentModel(true)
  }

  const closeCreateBillerPaymentModel = () => {
    setOpenCreateBillerPaymentModel(false)
  }

  const closeFilterModel = () => {
    setIsOpen(false)
  }

  const updateBillersPaymentData = async (payload: IUpdateBillerPayment) => {
    setIsDataLoading(true)
    const data = await updateBillerPayment(payload)
    if (!data) {
      setIsDataLoading(false)
      showErrorMessage('Failed to update biller payment')
      return
    }
    showSuccessMessage('Biller payment updated successfully')
    getBillersPaymentData()
    closeEditBillerModal()
  }

  const editBillerPayment = (billerPayment: IBillerPayment) => {
    setSelectedBillerPayment(billerPayment)
    setOpenEditBillerPaymentModel(true)
  }

  const closeEditBillerModal = () => {
    setOpenEditBillerPaymentModel(false)
    setSelectedBillerPayment(null)
  }

  const confirmDelete = (billerPaymentId: string) => {
    setDeleteBillerPaymentId(billerPaymentId)
    setIsOpenConfirmModal(true)
  }

  const closeConfirmModal = () => {
    setIsOpenConfirmModal(false)
    setDeleteBillerPaymentId('')
  }

  const removeBillPayment = async () => {
    setIsDataLoading(true)
    const data = await deleteBillerPayment(deleteBillerPaymentId)
    if (!data) {
      showErrorMessage('Failed to delete biller payment')
      setIsDataLoading(false)
      return
    }
    closeConfirmModal()
    showSuccessMessage('Biller payment deleted successfully')
    getBillersPaymentData()
  }

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
      cell: (_: IBillerPayment, index: number) => (
        <p>{selectedFilters.page * selectedFilters.limit - selectedFilters.limit + (index + 1)}</p>
      )
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      cell: (row: IBillerPayment) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip aria-label={row.name || 'N/A'}>{row.name || 'N/A'}</Tooltip>
        </div>
      )
    },
    {
      name: 'Biller Type',
      selector: 'type',
      sortable: true,
      cell: (row: IBillerPayment) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip aria-label={row.type || 'N/A'}>{row.type || 'N/A'}</Tooltip>
        </div>
      )
    },
    {
      name: '1Link Code',
      selector: 'code1Link',
      sortable: true,
      cell: (row: IBillerPayment) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip aria-label={row.code1Link || 'N/A'}>{row.code1Link || 'N/A'}</Tooltip>
        </div>
      )
    },
    {
      name: 'Start Date',
      selector: 'startDate',
      sortable: true,
      cell: (row: IBillerPayment) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip aria-label={row.startDate || 'N/A'}>
            {row.startDate ? new Date(row.startDate).toLocaleDateString() : 'N/A'}
          </Tooltip>
        </div>
      )
    },
    {
      name: 'End Date',
      selector: 'endDate',
      sortable: true,
      cell: (row: IBillerPayment) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip aria-label={row.endDate || 'N/A'}>
            {row.endDate ? new Date(row.endDate).toLocaleDateString() : 'N/A'}
          </Tooltip>
        </div>
      )
    },
    {
      name: 'Payment Gateway',
      selector: 'paymentGateway',
      sortable: true,
      cell: (row: IBillerPayment) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip aria-label={row.paymentGateway || 'N/A'}>{row.paymentGateway || 'N/A'}</Tooltip>
        </div>
      )
    },
    {
      name: 'Enabled',
      selector: 'enabled',
      sortable: true,
      cell: (row: IBillerPayment) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip aria-label={row.enabled ? 'Yes' : 'No'}>{row.enabled ? 'Yes' : 'No'}</Tooltip>
        </div>
      )
    },
    {
      name: 'Allow Reschedule',
      selector: 'allowReschedule',
      sortable: true,
      cell: (row: IBillerPayment) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip aria-label={row.allowReschedule ? 'Yes' : 'No'}>{row.allowReschedule ? 'Yes' : 'No'}</Tooltip>
        </div>
      )
    },
    {
      name: 'Actions',
      selector: 'edit',

      cell: (row: any) => {
        return (
          <>
            <Button ml="2" onClick={() => editBillerPayment(row)}>
              <Tooltip label="Edit" aria-label="Edit">
                <EditIcon />
              </Tooltip>
            </Button>
            <Button onClick={() => confirmDelete(row?.id)}>
              <Tooltip label="Delete Biller Payment">
                <DeleteIcon />
              </Tooltip>
            </Button>
          </>
        )
      }
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
        <Button bg="#7367F0" colorScheme="#ffffff" onClick={addBillerInfo} ml="3">
          <AddIcon />
        </Button>
        <Button bg="#7367F0" ml="3" colorScheme="#ffffff" onClick={refresh}>
          <RepeatIcon width="7" height="7" color="#ffffff" />
        </Button>

        <Button bg={showAll ? '#42ba96' : '#7367F0'} ml="3" colorScheme="#ffffff" onClick={() => setIsOpen(true)}>
          <Icon as={FilterIcon} />
        </Button>
      </Flex>
      <AddBillerPayment
        isOpen={openCreateBillerModel}
        onClose={closeCreateBillerPaymentModel}
        isLoading={isDataLoading}
        addBiller={createBillersPayment}
      />
      {selectedBillerPayment !== null && (
        <EditBillerPayment
          isOpen={openEditBillerModel}
          onClose={closeEditBillerModal}
          isLoading={isDataLoading}
          billerPayment={selectedBillerPayment}
          updateBillerPaymentHandler={updateBillersPaymentData}
        />
      )}
      <FilterBillerPayment isOpen={isOpen} onClose={closeFilterModel} filterBiller={filterBillersData} />
      {isDataLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          columns={columns}
          data={billerPayment.results}
          pagination={true}
          // paginationDefaultPage={page}
          expandableRows={true}
          onChangePage={(page: any) =>
            setSelectedFilters({
              ...selectedFilters,
              page
            })
          }
          paginationTotalRows={billerPayment.total}
          paginationPerPage={selectedFilters.limit}
          paginationRowsPerPageOptions={[10, 50, 100, 250]}
          onChangeRowsPerPage={onChangeRowsPerPage}
          onRowExpandToggled={handleRowChange}
          expandableRowExpanded={(row: any) => row.id === rowId}
          customStyles={customStyles}
          noHeader={true}
        />
      )}
      <ConfirmModal
        isOpen={isOpenConfirmModal}
        onClose={closeConfirmModal}
        onConfirm={removeBillPayment}
        heading="Delete Biller Payment"
        description="Are you sure you want to delete this biller payment?"
      />
    </>
  )
}

export default BillerPayment
