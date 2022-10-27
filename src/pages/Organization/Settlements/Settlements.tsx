import React, { useState } from 'react'
import { Select, Flex, Spacer, Button, useDisclosure } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { useEasyActions, useEasyState } from '../../../store/hooks'
import FilterSettlement from './FilterSettlement'
import moment from 'moment'
import LoadingSpinner from '@/components/common/Spinner'
import DataTable from 'react-data-table-component'
import SettlementDetails from './SettlementDetails'
import { customStyles } from '@/config/styles/customStyles'
import ApplySettlement from './ApplySettlement'
import FilterIcon from '@/components/common/FilterIcon'

export interface SettlementPageProps {}

type OrgData = string | undefined
const Settlements: React.FC<SettlementPageProps> = (props) => {
  const { getSettlements, getSettlementDetails } = useEasyActions((state) => state.organization)
  let history = useHistory()
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [rowId, setRowId] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [isSettlementDetailsLoading, setIsSettlementDetailsLoading] = useState(false)
  const [settlementDetailsData, setSettlementDetailsData] = useState<any | null>({})

  const [organization, setOrganization] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { organizations, settlementDetails } = useEasyState((state) => state.organization)

  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [isOpenForm, setIsOpenForm] = useState(false)

  React.useEffect(() => {
    if (organization) {
      getSettlementsData(organization)
    }
  }, [organization])

  React.useEffect(() => {
    // console.log("useEffect", settlementDetails);

    setSettlementDetailsData(settlementDetails)
  }, [settlementDetails])

  const getSettlementsData = async (organization: any) => {
    setIsDataLoading(true)
    let params: any = {
      organizationId: organization
    }
    const data = await getSettlements(params)
    if (data) {
      setIsDataLoading(false)
    } else {
      setIsDataLoading(false)
    }
  }

  const handleRowChange = (state: boolean, data: any) => {
    setRowId(data.id)
    setIsSettlementDetailsLoading(true)
    if (state) {
      let firstDay = new Date(moment().month(`${data.currentMonth}`).startOf('month').format('DD-MMM-YYYY'))
      let lastDay = new Date(moment().month(`${data.currentMonth}`).endOf('month').format('DD-MMM-YYYY'))
      let params = {
        from: firstDay,
        to: lastDay,
        organizationId: data.organizationId
      }
      getSettlementsDetailsData(params)
    } else {
      setIsSettlementDetailsLoading(false)
      setSettlementDetailsData([])
    }
  }

  const getSettlementsDetailsData = async (params: any) => {
    const data = await getSettlementDetails(params)
    if (data) {
      setShowAll(true)
      setSettlementDetailsData(settlementDetails)
      setIsSettlementDetailsLoading(false)
    } else {
      setIsSettlementDetailsLoading(false)
    }
  }

  const setOrganizationDropDownData = async (event: any) => {
    const currentOrganizationId: OrgData = organizations?.find((x: any) => x.name === event)?.id
    if (currentOrganizationId == null) {
      return
    }
    setOrganization(currentOrganizationId)
  }
  const data = useEasyState((state) => state.organization.settlements)

  const clearMessages = () => {
    setAlert(false)
    setSuccess(false)
  }

  const applySettlement = () => {
    setIsOpenForm(!isOpenForm)
  }
  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,
      center: true,
      cell: (row: any, index: any) => <p>{index + 1}</p>
    },
    {
      name: 'Period',
      selector: 'currentTimeStamp',
      sortable: true,
      center: true
    },
    {
      name: 'Amount Due',
      selector: 'amountDue',
      sortable: true,
      center: true
    },
    {
      name: 'Amount Received',
      selector: 'amountReceived',
      sortable: true,
      center: true
    },
    {
      name: 'Balance',
      selector: 'balance',
      sortable: true,
      center: true
    }
  ]

  return (
    <>
      <Flex mb="5">
        <Select
          width="250px"
          placeholder="Select Organization"
          onChange={(event: any) => setOrganizationDropDownData(event.currentTarget.value)}
        >
          {organizations?.map((value: any, index: any) => {
            return <option key={index}>{value.name}</option>
          })}
        </Select>

        <Spacer />
        <Button bg="#7367F0" colorScheme="#ffffff" onClick={applySettlement}>
          Apply
        </Button>
        <Button ml="2" bg="#7367F0" colorScheme="#ffffff" onClick={onOpen}>
          <FilterIcon />
        </Button>

        <ApplySettlement organizationId={organization} isOpen={isOpenForm} onClose={applySettlement} />
      </Flex>
      {isDataLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          pagination={true}
          paginationServer
          expandableRows
          onRowExpandToggled={handleRowChange}
          customStyles={customStyles}
          noHeader={true}
          expandableRowExpanded={(row: any) => row.id === rowId}
          expandableRowsComponent={
            <SettlementDetails
              isSettlementDetailsLoading={isSettlementDetailsLoading}
              settlementDetails={settlementDetailsData}
            />
          }
        />
      )}
      <FilterSettlement
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoading}
        filterSettlement={getSettlements}
        alertMessage={alert}
        clearMessages={clearMessages}
        success={success}
        organizationId={organization}
      />
    </>
  )
}

export default Settlements
