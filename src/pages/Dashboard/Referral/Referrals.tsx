import React, { useState } from "react";
import moment from "moment";
import { Flex, Spacer, Button, useDisclosure, Tooltip } from "@chakra-ui/react";
import { useEasyActions, useEasyState } from "../../../store/hooks";

import FilterReferral from "../Referral/FilterReferral";
import ExportData from "../Referral/ExportData";
import LoadingSpinner from "../../../components/common/Spinner";
import { ReferralsResult } from "@/types/referrals/Referrals";
import DataTable from "react-data-table-component";
import FilterIcon from "@/components/common/FilterIcon";
import { customStyles } from "@/config/styles/customStyles";
import ExportIcon from "@/components/common/ExportIcon";
import { RepeatIcon } from "@chakra-ui/icons";
import { getDayStartDate, getDayEndDate } from "@/utils/helper";

export interface ReferralProps {}
export interface FilteredParams {
  startDate: Date
  endDate: Date
}
const Referral: React.FC<ReferralProps> = (props) => {
  const { getReferrals, filterReferrals } = useEasyActions((state) => state.dashboard)
  const { referrals } = useEasyState((state) => state.dashboard)
  const [referralData, setReferralData] = useState<ReferralsResult[]>([])
  const [filteredParams, setFilteredParams] = useState<FilteredParams | null>(null)

  const [alert, setAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [edModel, setEDModel] = useState(false)

  const [showAll, setShowAll] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [totalReferrals, setTotalReferrals] = useState(0)
  const [paginationProps, setPaginationProps] = useState({
    offset: 1,
    limit: 10
  })
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  React.useEffect(() => {
    getReferralsData()
  }, [paginationProps])

  React.useEffect(() => {
    setReferralData(referrals)
  }, [referrals])

  const getReferralsData = async () => {
    setIsDataLoading(true)
    let params: any = {
      ...filteredParams,
      ...paginationProps
    }

    if (filteredParams != null) {
      const data = await filterReferrals({
        ...params,
        startDate: getDayStartDate(params.startDate),
        endDate: getDayEndDate(params.endDate),
      });
      if (data) {
        setReferralData(data.results)
        setTotalReferrals(data.total)
        setIsDataLoading(false)
        setIsLoading(false)
        setSuccess(true)
        setShowAll(true)
        onClose()
        setSuccess(false)
      } else {
        setShowAll(true)
        setIsDataLoading(false)
        setIsLoading(false)
        setSuccess(false)
      }
    } else {
      const data = await getReferrals(params)
      if (data) {
        setReferralData(data.results)
        setTotalReferrals(data.total)
        setIsDataLoading(false)
      } else {
        setIsDataLoading(false)
      }
    }
  }

  const refresh = () => {
    getReferralsData()
  }

  const exportData = () => {
    setEDModel(true)
  }

  const onCloseED = () => {
    setEDModel(false)
  }

  const filterReferral = async (filterParams: any) => {
    setFilteredParams(filterParams)
    setPaginationProps({
      offset: 1,
      limit: 10
    })
  }

  const clearFilter = () => {
    setFilteredParams(null)
    setShowAll(false)
    setPaginationProps({
      offset: 1,
      limit: 10
    })
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
      cell: (row: any, index: any) => <p>{index + 1}</p>
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
      name: 'Contact Person',
      selector: 'contactPersonFullName',
      sortable: true,

      width: '150px'
    },
    {
      name: 'Company',
      selector: 'companyName',
      sortable: true
    },
    {
      name: 'Designation',
      selector: 'designation',
      sortable: true,

      width: '170px'
    },

    {
      name: 'Contact No',
      selector: 'contactNo',
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
      </Flex>
      <FilterReferral
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoading}
        alertMessage={alert}
        filterExceptions={filterReferral}
        FilteredParams={filteredParams}
        success={success}
      />

      <ExportData isOpen={edModel} onClose={onCloseED} params={filteredParams} />

      {isDataLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          paginationDefaultPage={paginationProps.offset}
          columns={columns}
          data={referralData}
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
          paginationTotalRows={totalReferrals}
          customStyles={customStyles}
        />
      )}
    </>
  )
}

export default Referral
function setIsDataLoading(arg0: boolean) {
  throw new Error('Function not implemented.')
}
