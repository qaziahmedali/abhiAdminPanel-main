import React, { useState } from "react";
import moment from "moment";
import { Flex, Spacer, Button, useDisclosure } from "@chakra-ui/react";
import { useEasyActions, useEasyState } from "../../../store/hooks";
import LoadingSpinner from "../../../components/common/Spinner";
import DataTable from "react-data-table-component";
import FilterIcon from "@/components/common/FilterIcon";
import { customStyles } from "@/config/styles/customStyles";
import ExportIcon from "@/components/common/ExportIcon";
import ExportData from "./ExportData";
import { GuestResult } from "@/types/referrals/Guest";
import FilterGuests from "./FilterGuest";
import { RepeatIcon } from "@chakra-ui/icons";
import { getDayStartDate, getDayEndDate } from "@/utils/helper";

export interface ReferralProps {}

const Guest: React.FC<ReferralProps> = (props) => {
  const { getGuests, filterGuests } = useEasyActions((state) => state.dashboard)
  const { guests } = useEasyState((state) => state.dashboard)
  const [guestData, setGuestData] = useState<GuestResult[]>([])
  const [filteredParams, setFilteredParams] = useState({})

  const [edModel, setEDModel] = useState(false)

  const [alert, setAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [showAll, setShowAll] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [totalGuests, setTotalGuests] = useState(0)
  const [paginationProps, setPaginationProps] = useState({
    offset: 1,
    limit: 10
  })
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  React.useEffect(() => {
    if (Object.keys(filteredParams).length > 0) {
      filterGuest({
        ...filteredParams,
        ...paginationProps
      })
      return
    }
    getGuestData()
  }, [paginationProps])

  React.useEffect(() => {
    setGuestData(guests)
  }, [guests])

  const getGuestData = async () => {
    setIsDataLoading(true)
    let params: any = {
      ...paginationProps
    }
    const data = await getGuests(params)

    if (data) {
      setGuestData(data.results)
      setTotalGuests(data.total)
      setIsDataLoading(false)
    } else {
      setIsDataLoading(false)
    }
  }
  const exportData = () => {
    setEDModel(true)
  }

  const onCloseED = () => {
    setEDModel(false)
  }

  const onFilterChange = (params: any) => {
    setFilteredParams(params)
    setPaginationProps({
      offset: 1,
      limit: 10
    })
  }

  const filterGuest = async (filterParams: any) => {
    setAlert(false)
    setIsLoading(true)
    setSuccess(false)

    const data = await filterGuests({
      ...filterParams,
      startDate: getDayStartDate(filterParams.startDate),
      endDate: getDayEndDate(filterParams.endDate),
    });

    if (data) {
      setGuestData(data.results)
      setShowAll(true)
      setTotalGuests(data.total)
      setIsDataLoading(false)
      setIsLoading(false)
      setSuccess(true)
      onClose()
    } else {
      setIsDataLoading(false)
      setTotalGuests(data.total)
      setIsLoading(false)
      setSuccess(false)
    }
  }

  const clearFilter = () => {
    setShowAll(false)
    setFilteredParams({})
    setPaginationProps({
      offset: 1,
      limit: 10
    })
  }

  const refresh = () => {
    getGuestData()
  }

  const onChangeRowsPerPage = (updatedLimit: number, page: number) => {
    setPaginationProps({
      offset: page,
      limit: updatedLimit
    })
  }

  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,

      width: '50px',
      cell: (row: any, index: any) => <p>{index + 1 + paginationProps.offset * 10 - 10}</p>
    },
    {
      name: 'Date & Time',
      selector: (row: any) => row.createdAt,
      sortable: true,

      width: '200px',
      cell: (row: any) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {moment(row.createdAt).format('MMM Do,YYYY HH:mm:ss')}
        </div>
      )
    },
    {
      name: 'Name',
      selector: (row: any) => row?.name,
      sortable: true
    },
    {
      name: 'Company',
      selector: (row: any) => row?.company,
      sortable: true,

      width: '170px'
    },

    {
      name: 'Email',
      selector: (row: any) => row?.email,
      sortable: true
    },

    {
      name: 'Phone',
      selector: (row: any) => row?.phone,
      sortable: true
    }
  ]

  return (
    <>
      <Flex mb="5">
        <Spacer />

        {showAll && (
          <Button bg="#7367F0" colorScheme="#ffffff" onClick={clearFilter}>
            Show All
          </Button>
        )}
        <Button bg="#7367F0" colorScheme="#ffffff" ml="3" onClick={exportData}>
          <ExportIcon />
        </Button>

        <Button bg="#7367F0" colorScheme="#ffffff" ml="3" onClick={refresh}>
          <RepeatIcon width="7" height="7" color="#ffffff" />
        </Button>

        <Button bg={showAll ? '#42ba96' : '#7367F0'} colorScheme="#ffffff" ml="3" onClick={onOpen}>
          <FilterIcon />
        </Button>
      </Flex>{' '}
      <FilterGuests
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoading}
        alertMessage={alert}
        filterExceptions={onFilterChange}
        success={success}
      />
      <ExportData isOpen={edModel} onClose={onCloseED} params={filteredParams} />
      {isDataLoading || isLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          paginationDefaultPage={paginationProps.offset}
          columns={columns}
          data={guests}
          fixedHeader
          pagination={true}
          paginationServer
          paginationPerPage={paginationProps.limit}
          paginationRowsPerPageOptions={[10, 50, 100, 250]}
          onChangeRowsPerPage={onChangeRowsPerPage}
          onChangePage={(page: any) =>
            setPaginationProps({
              ...paginationProps,
              offset: page
            })
          }
          paginationTotalRows={totalGuests}
          customStyles={customStyles}
        />
      )}
    </>
  )
}

export default Guest
function setIsDataLoading(arg0: boolean) {
  throw new Error('Function not implemented.')
}
