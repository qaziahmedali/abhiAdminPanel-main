import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  Flex,
  Icon,
  Spacer,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import PushNotification, {
  Notification,
} from "../../../components/Modal/PushNotification";
import React, { ChangeEvent, useState } from "react";
import { useEasyActions, useEasyState } from "../../../store/hooks";

import AddOrganizations from "./AddOrganization";
import DataTable from "react-data-table-component";
import FilterIcon from "../../../components/common/FilterIcon";
import FilterOrganization from "./FilterOrganization";
import LoadingSpinner from "../../../components/common/Spinner";
import { OrganizationResults } from "@/types/organizations/organizations";
import { SendBulkSMS } from "@/components/Modal/SendBulkSMS";
import ViewManage from "./ViewManage";
import { apiManager } from "../../../utils/apiManager/ApiManager";
import { customStyles } from "@/config/styles/customStyles";
import moment from "moment";
import { useAbhiToast } from "@/Hook/useAbhiToast";
import { getDayStartDate, getDayEndDate } from "@/utils/helper";

export interface OrganizationProps {}
export interface FilteredParams {
  name?: string
  industry?: string
  businessNature?: string
  city?: string
  country?: string
  showInactive?: string
  representative?: string
  startDate?: Date
  endDate?: Date
  page?: number
  limit?: number
}

export interface IDataTableRow {
  id: string
}

const s: React.FC<OrganizationProps> = (props) => {
  const { getOrganization, addOrganization, getOrganizationById, getSelectedOrganizationId } = useEasyActions(
    (state) => state.organization
  )

  const { organizations, organizationData } = useEasyState((state) => state.organization)

  const toast = useAbhiToast()

  const [openModal, setopenModal] = useState(false)
  const [manageData, setManageData] = useState({})
  const [rowId, setRowId] = useState('')

  const [isDataLoading, setIsDataLoading] = useState(false)
  const [organizationRecord, setOrganizationRecord] = useState<OrganizationResults[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [manageLoading, setManageLoading] = useState(false)
  const [totalOrganizations, setTotalOrganizations] = useState(0)
  const [isOpenAddModel, setIsOpenAddModel] = useState(false)
  const [filteredParams, setFilteredParams] = useState<FilteredParams>({})

  const [showAll, setShowAll] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [paginationProps, setPaginationProps] = useState({
    page: 1,
    limit: 10
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [selectedOrganizations, setSelectedOrganizations] = useState<any>({})
  const [isSendingNotification, setIsSendingNotification] = useState(false)
  const [isSendingSMS, setIsSendingSMS] = useState(false)
  const [shouldSendSMSToAll, setShouldSendSMSToAll] = useState(true)

  React.useEffect(() => {
    if (Object.keys(filteredParams).length > 0) {
      getOrganizationData(true)
    } else {
      getOrganizationData()
    }
  }, [paginationProps])

  React.useEffect(() => {
    setOrganizationRecord(organizations)
  }, [organizations])

  const getOrganizationData = async (usePaginationProps?: boolean) => {
    setIsDataLoading(true)

    let params: any = {
      ...paginationProps
    }

    if (Object.keys(filteredParams).length > 0) {
      params = usePaginationProps
        ? {
            ...filteredParams,
            ...params,
            startDate: getDayStartDate(filteredParams.startDate),
            endDate: getDayEndDate(filteredParams.endDate),
          }
        : {
            ...filteredParams,
            startDate: getDayStartDate(filteredParams.startDate),
            endDate: getDayEndDate(filteredParams.endDate),
          };
      setShowAll(true);
    } else {
      setShowAll(false)
    }
    const data = await getOrganization(params)

    if (data) {
      setSuccess(true)
      setIsLoading(false)
      setTotalOrganizations(data.total)
      onClose()
    } else {
      setIsLoading(false)
      setAlert(true)
    }
    setIsDataLoading(false)
  }

  const viewManageData = async (row: any, bol: boolean) => {
    setRowId(row?.id)
    setManageLoading(true)
    // setopenModal(true);
    setManageData(row)
    await getSelectedOrganizationId(row.id)
    getOrganizationById(row.id)
      .then(() => setManageLoading(false))
      .catch(() => setManageLoading(false))
  }

  const filterOrganizations = async (param: any) => {
    setIsLoading(true)
    let params = {
      ...filteredParams,
      ...param
    }

    setFilteredParams(params)
    setPaginationProps({
      page: 1,
      limit: 10
    })
  }

  const refresh = () => {
    getOrganizationData()
  }

  const addOrganizationData = async (params: any) => {
    setAlert(false)
    setIsLoading(true)
    const data = await addOrganization(params)

    if (data?.status === 'success') {
      setTotalOrganizations(data.total)
      setIsLoading(false)
      toast.success('Organizations created.', "We've created your organization for you.")
      const OrgData = await getOrganization(params)

      if (OrgData) {
        setTotalOrganizations(OrgData.total)
        setIsDataLoading(false)
      } else {
        setIsDataLoading(false)
      }
      setIsOpenAddModel(false)
    } else {
      toast.error('Organizations creation Failed', data.message)
      setIsLoading(false)
      setAlert(true)
      setAlertMessage(data.message)
    }
  }

  const onCloseAddModel = () => {
    setIsLoading(false)
    setIsOpenAddModel(false)
  }

  const onCloseModal = async () => {
    setopenModal(false)
  }

  const showAllHandler = () => {
    setShowAll(false)
    setFilteredParams({})
    setPaginationProps({
      page: 1,
      limit: 10
    })
  }
  const clearMessages = () => {
    setSuccess(false)
    setAlert(false)
  }

  /**
   * @description - Function to handle the selection of multiple organizations
   * @param e HTML Input On Change Event Object
   * @param dataTableRow
   */
  const selectionCheckboxOnChangeHandler = (e: ChangeEvent<HTMLInputElement>, dataTableRow: IDataTableRow) => {
    const selectedRows = selectedOrganizations.selectedRows || []
    if (e.target.checked) {
      handleOnSelectedRowsChange({
        ...selectedOrganizations,
        selectedRows: [...selectedRows, dataTableRow]
      })
    } else {
      const filteredRows = selectedRows.filter((row: IDataTableRow) => row.id !== dataTableRow.id)
      handleOnSelectedRowsChange({
        selectedRows: filteredRows
      })
    }
  }

  /**
   * @description - Function to check if the organization is selected
   * @param dataTableRow
   * @returns `boolean`
   */
  const isRowSelected = (dataTableRow: IDataTableRow) => {
    const selectedRows = selectedOrganizations.selectedRows || []
    return selectedRows.some((row: IDataTableRow) => row.id === dataTableRow.id)
  }

  const columns = [
    {
      name: '',
      width: '50px',
      cell: (row: IDataTableRow) => {
        const isChecked = isRowSelected(row)
        return (
          <div>
            <input
              style={{
                cursor: 'pointer'
              }}
              type="checkbox"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                selectionCheckboxOnChangeHandler(e, row)
              }}
              checked={isChecked}
            />
          </div>
        )
      }
    },
    {
      name: '#',
      selector: 'id',

      sortable: true,

      width: '40px',
      cell: (row: any, index: any) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={index + 1 + paginationProps.page * paginationProps.limit - paginationProps.limit}>
            <p>{index + 1 + paginationProps.page * paginationProps.limit - paginationProps.limit}</p>
          </Tooltip>
        </div>
      )
    },
    {
      name: 'Date ',
      selector: (row: any) => row.createdAt,

      sortable: true,

      width: '200px',
      cell: (row: any) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={moment(row.createdAt).format('ddd DD-MMM-YYYY, hh:mm A')}>
            {moment(row.createdAt).format('ddd DD-MMM-YYYY, hh:mm A')}
          </Tooltip>
        </div>
      )
    },
    {
      name: 'Organizations',
      selector: (row: any) => row.name,

      sortable: true,

      // width: "250px",
      cell: (row: any) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={row.name}>{row.name}</Tooltip>
        </div>
      )
    },
    {
      name: 'City',
      selector: (row: any) => row.address.city,

      sortable: true,

      width: '100px',
      cell: (row: any) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={row.address.city}>{row.address.city}</Tooltip>
        </div>
      )
    },
    {
      name: 'Status',
      selector: (row: any) => row.active,

      sortable: true,

      width: '80px',
      cell: (row: any) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={row.active ? <p>Active</p> : <p>InActive</p>}>
            {row.active ? <p>Active</p> : <p>InActive</p>}
          </Tooltip>
        </div>
      )
    },
    {
      name: 'Industry',
      selector: (row: any) => row.industry,

      sortable: true,

      width: '150px',
      cell: (row: any) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={row.industry}>{row.industry}</Tooltip>
        </div>
      )
    },
    {
      name: 'Business nature',
      selector: (row: any) => row.businessType.name,

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
          <Tooltip label={row.businessType.name}>{row.businessType.name}</Tooltip>
        </div>
      )
    }
  ]

  const handleOnSelectedRowsChange = (e: any) => {
    setSelectedOrganizations({
      ...e,
      selectedRows: [...e.selectedRows]
    })
    if (shouldSendSMSToAll) {
      setShouldSendSMSToAll(false)
    }
  }

  const handlePushNotification = async (notification: Notification) => {
    setIsSendingNotification(true)

    const payload = {
      notification,
      organizations: selectedOrganizations?.selectedRows?.map(({ id }: any) => id) || [],
      pushToAll: false
    }

    if (payload.organizations.length === 0) {
      payload.pushToAll = true
    }

    return apiManager
      .fetch({
        name: 'PushNotificationToOrganizations',
        config: { data: payload }
      })
      .then(() => {
        toast.success('Sent message successfully!', "We've notify to your employee for you.")
      })
      .catch((e) => {
        toast.error('Something was wrong!', e.response?.data?.message || 'Please try again later!')
      })
      .finally(() => setIsSendingNotification(false))
  }

  const onChangeRowsPerPage = (limit: number, page: number) => {
    setPaginationProps({
      page: 1,
      limit
    })
  }

  const handleSendBulkSMS = (message: string) => {
    setIsSendingSMS(true)

    return apiManager
      .fetch({
        name: 'SendSimpleBulkSMS',
        config: {
          data: {
            message,
            organizations: selectedOrganizations?.selectedRows?.map(({ id }: any) => id) || [],
            sendToAll: shouldSendSMSToAll
          }
        }
      })
      .then(() => {
        toast.success('Sent SMS message successfully!', "We've notify to your employee for you.")
      })
      .catch((e) => {
        toast.error('Something was wrong!', e.response?.data?.message || 'Please try again later!')
      })
      .finally(() => setIsSendingSMS(false))
  }
  return (
    <>
      <Flex mb="1">
        {/* <Input
					type="search"
					value={defaultOrganization}
					placeholder="Search s"
					onChange={(event: any) => {
						getOrganization(event);
					}}
					width="300px"
				/> */}
        <Spacer />
        {showAll && (
          <Button bg="#7367F0" colorScheme="#ffffff" onClick={showAllHandler}>
            Show All
          </Button>
        )}
        <Button bg="#7367F0" colorScheme="#ffffff" ml="3" onClick={() => setIsOpenAddModel(true)}>
          <AddIcon />
        </Button>

        <PushNotification
          isPushToAll={!selectedOrganizations?.selectedRows?.length}
          onChangePushToAll={(e) => (e ? setSelectedOrganizations({}) : null)}
          onSubmit={handlePushNotification}
          isLoading={isSendingNotification}
        />

        <SendBulkSMS
          isSendToAll={shouldSendSMSToAll}
          onChangePushToAll={(e) => {
            if (e) {
              setSelectedOrganizations({})
            }
            setShouldSendSMSToAll(!shouldSendSMSToAll)
          }}
          onSubmit={handleSendBulkSMS}
          isLoading={isSendingSMS}
        />

        <Button bg="#7367F0" ml="3" colorScheme="#ffffff" onClick={refresh}>
          <RepeatIcon width="7" height="7" color="#ffffff" />
        </Button>

        <Button bg={showAll ? '#42ba96' : '#7367F0'} ml="3" colorScheme="#ffffff" onClick={onOpen}>
          <Icon as={FilterIcon} />
        </Button>
      </Flex>
      <FilterOrganization
        isOpen={isOpen}
        onClose={onClose}
        filterOrganization={filterOrganizations}
        isLoading={isLoading}
        alertMessage={alert}
        filteredParams={filteredParams}
        success={success}
        setSuccess={setSuccess}
        clearMessages={clearMessages}
      />

      <AddOrganizations
        AddOrganization={addOrganizationData}
        isOpen={isOpenAddModel}
        onClose={onCloseAddModel}
        isLoading={isLoading}
        alert={alert}
        alertMessage={alertMessage}
      />

      {isDataLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          paginationDefaultPage={paginationProps.page}
          columns={columns}
          data={organizationRecord}
          pagination={true}
          paginationPerPage={paginationProps.limit || 10}
          paginationRowsPerPageOptions={[10, 50, 100, 250]}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationServer
          // selectableRows
          fixedHeader
          onChangePage={(page) => {
            setPaginationProps({
              ...paginationProps,
              page
            })
            setFilteredParams({
              ...filteredParams,
              page,
              limit: paginationProps.limit
            })
          }}
          paginationTotalRows={totalOrganizations}
          expandableRows
          onRowExpandToggled={(bol: boolean, row: any) => {
            viewManageData(row, bol)
          }}
          customStyles={customStyles}
          expandableRowExpanded={(row: any) => row.id === rowId}
          expandableRowsComponent={
            <ViewManage
              manageData={manageData}
              organizationData={organizationData}
              manageLoading={manageLoading}
              filteredParams={filteredParams}
              page={paginationProps.page}
              limit={paginationProps.limit}
              onClose={() => {
                setRowId('')
              }}
            />
          }
        />
      )}
    </>
  )
}

export default s
