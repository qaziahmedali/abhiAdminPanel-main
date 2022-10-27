import React, { useEffect, useState } from 'react'
import { Flex, Spacer, Button, Tooltip, usePrevious, Box, Spinner } from '@chakra-ui/react'

import { useEasyActions, useEasyState } from '../../../store/hooks'
import DataTable from 'react-data-table-component'
import LoadingSpinner from '../../../components/common/Spinner'
import { customStyles } from '../../../config/styles/customStyles'
import FilterUsers from './FilterUsers'
// import AddUsers from "./AddUsers";

import moment from 'moment'

import { RepeatIcon } from '@chakra-ui/icons'
import { UserResults } from '@/types/users/Users'
import FilterIcon from '@/components/common/FilterIcon'
import ManageUserRoles from './ManageUserRoles'
import { currencyFormater } from '@/utils/formatters'
import { Autocomplete, Option } from 'chakra-ui-simple-autocomplete'
import { OrganizationResults } from '@/types/organizations/organizations'

export interface UsersProps {}

const Users: React.FC<UsersProps> = (props) => {
  // const [isFilterEnabled, setIsFilterEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  // const [isEditable, setIsEditable] = useState(false);
  // const [userData, setUserData] = useState({});
  const [currentOrganizations, setCurrentOrganizations] = React.useState<Option[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [totalUsers, setTotalUsers] = useState(0)
  const [paginationProps, setPaginationProps] = useState({
    page: 1,
    limit: 10
  })
  const [selectedFilters, setSelectedFilters] = useState({})

  const [rowIndex, setRowIndex] = useState<number>(0)

  const prevCount: any = usePrevious(paginationProps.page)
  const [rowId, setRowId] = useState<string>('')
  const [userId, setUserId] = useState<string>('')

  const [usersRecord, setUsersRecord] = useState<UserResults[]>([])

  const { getUsers, filterUsers } = useEasyActions((state) => state.user)
  const { getOrganizationNames } = useEasyActions((state) => state.organization)
  const { allOrganizations } = useEasyState((state) => state.organization)
  const { users } = useEasyState((state) => state.user)

  let options = allOrganizations?.map((item, index) => ({
    value: item.id,
    label: item.name
  }))
  useEffect(() => {
    setUsersRecord(users)
    setRowId('')
  }, [users])

  useEffect(() => {
    getOrganizations()
  }, [paginationProps])

  useEffect(() => {
    if (Object.keys(selectedFilters).length > 0) {
      filterUsersHandler(selectedFilters)
    } else {
      getUserData()
    }
    if (paginationProps.page > prevCount) {
      setRowIndex(rowIndex + 10)
    } else if (paginationProps.page < prevCount && paginationProps.page !== 1) {
      setRowIndex(rowIndex - 10)
    }
  }, [paginationProps])

  const getUserData = async () => {
    setIsDataLoading(true)

    let params = {
      ...paginationProps
    }

    const data = await getUsers(params)
    if (data) {
      setTotalUsers(data.total)
      setUsersRecord(data.results)
    }

    setIsDataLoading(false)
  }

  // const editUserHandler = (row: any) => {
  //   setUserData(row);
  //   setIsEditable(true);
  //   setIsFilterEnabled(false);
  //   setIsOpen(true);
  // };

  // const addHandler = () => {
  //   setIsEditable(false);
  //   setIsFilterEnabled(false);
  //   setIsOpen(true);
  //   setUserData({});
  // };

  const filterHandler = () => {
    // setIsFilterEnabled(true);
    setIsOpen(!isOpen)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const viewManageData = async (row: UserResults, bol: boolean) => {
    setRowId(row?.id)
    setUserId(row?.person?.userId)
  }

  const getOrganizations = async () => {
    let params = {
      limit: Number.MAX_SAFE_INTEGER,
      page: paginationProps.page
    }
    const OrgData: OrganizationResults[] = await getOrganizationNames(params)

    options = OrgData?.map((item, index) => ({
      value: item.id,
      label: item.name
    }))
  }

  const filterUsersHandler = (params: any) => {
    setIsLoading(true)
    setIsDataLoading(true)
    filterUsers({
      ...params,
      ...paginationProps
    })
      .then((res: any) => {
        setTotalUsers(res?.total)
        setUsersRecord(res?.results)
        setSuccess(true)
        setIsLoading(false)
        setShowAll(true)
        onClose()
        setIsDataLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
        setAlert(true)
        setIsDataLoading(false)
      })
  }

  const updateSelectedFilters = (params: any) => {
    setSelectedFilters(params)
    setPaginationProps({
      page: 1,
      limit: 10
    })
  }

  const showAllHandler = () => {
    setShowAll(false)
    setSuccess(false)
    setCurrentOrganizations([])
    setSelectedFilters({})
    setPaginationProps({
      page: 1,
      limit: 10
    })
  }

  const clearMessages = () => {
    setSuccess(false)
    setAlert(false)
  }

  const refresh = () => {
    getUserData()
  }

  const onChangeRowsPerPage = (limit: number, page: number) => {
    setPaginationProps({
      page: page,
      limit
    })
  }

  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,

      width: '80px',
      cell: (row: UserResults, index: number) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={(paginationProps.page - 1) * paginationProps.limit + index + 1}>
            <p>{(paginationProps.page - 1) * paginationProps.limit + index + 1}</p>
          </Tooltip>
        </div>
      )
    },
    {
      name: 'Date ',
      selector: (row: UserResults) => row.dateOfJoining,
      sortable: true,

      width: '120px',
      cell: (row: UserResults) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={moment(row?.dateOfJoining).format('ddd DD-MMM-YYYY, hh:mm A')}>
            {moment(row?.dateOfJoining).format('MMM Do, YYYY')}
          </Tooltip>
        </div>
      )
    },
    {
      name: 'First Name',
      selector: (row: UserResults) => row?.person?.firstName,
      sortable: true,

      width: '150px',
      cell: (row: UserResults) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={row?.person?.firstName ? row?.person?.firstName : '-'}>
            {row?.person?.firstName ? row?.person?.firstName : '-'}
          </Tooltip>
        </div>
      )
    },
    {
      name: 'Last Name',
      selector: (row: UserResults) => row.person.lastName,
      sortable: true,

      width: '150px',
      cell: (row: UserResults) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {/* <Tooltip label={row.person.lastName == true ? "Yes" : "No"}> */}
          {row.person.lastName ? row.person.lastName : '-'}
          {/* </Tooltip> */}
        </div>
      )
    },
    {
      name: 'Email',
      selector: (row: UserResults) => row.officialEmail?.email,
      sortable: true,

      width: '220px',
      cell: (row: UserResults) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {/* <Tooltip label={row?.otp ? row?.otp : "-"}> */}
          {row.officialEmail?.email ? row.officialEmail?.email : '-'}
          {/* </Tooltip> */}
        </div>
      )
    },
    {
      name: 'Phone',
      selector: (row: UserResults) => row.officialPhone?.phoneNo,
      sortable: true,

      // width: "70px",
      cell: (row: UserResults) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={row.officialPhone?.phoneNo ? row.officialPhone?.phoneNo : '-'}>
            {row.officialPhone?.phoneNo ? row.officialPhone?.phoneNo : '-'}
          </Tooltip>
        </div>
      )
    },
    {
      name: 'Bank Name',
      selector: (row: UserResults) => row?.selectedBankAccount?.bank?.bankName,
      sortable: true,

      width: '170px',
      cell: (row: UserResults) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {row?.selectedBankAccount?.bank?.bankName ? row?.selectedBankAccount?.bank?.bankName : '-'}
        </div>
      )
    },
    {
      name: 'Salary',
      selector: (row: UserResults) => row?.netSalary,
      sortable: true,

      // width: "70px",
      cell: (row: UserResults) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {row?.netSalary ? currencyFormater(row?.netSalary) : '-'}
        </div>
      )
    },
    {
      name: 'Provident Fund',
      selector: (row: UserResults) => row?.providentFund,
      sortable: true,

      // width: "70px",
      cell: (row: UserResults) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {row?.providentFund ? currencyFormater(row?.providentFund) : '-'}
        </div>
      )
    },
    {
      name: 'Status',
      selector: (row: UserResults) => row?.workingStatus,
      sortable: true,

      // width: "70px",
      cell: (row: UserResults) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {row?.workingStatus ? row?.workingStatus : '-'}
        </div>
      )
    },
    {
      name: 'System Access',
      selector: (row: UserResults) => row?.systemAccess,
      sortable: true,

      // width: "70px",
      cell: (row: UserResults) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {row?.systemAccess ? row?.systemAccess : '-'}
        </div>
      )
    }
    // {
    //   name: "Skip Failed Attempt Count",
    //   selector: (row: UserResults) => row?.skipFailedAttemptCount,
    //   sortable: true,

    //   // width: "70px",
    //   cell: (row: UserResults) => (
    //     <div
    //       style={{
    //         overflow: "hidden",
    //         textOverflow: "ellipsis",
    //         whiteSpace: "nowrap",
    //       }}
    //     >
    //       {row?.skipFailedAttemptCount ? row?.skipFailedAttemptCount : "-"}
    //     </div>
    //   ),
    // },
    // {
    //   name: "Person_Id",
    //   selector: (row: UserResults) => row?.persons?.[0]?.id,
    //   sortable: true,

    //   width: "300px",
    //   cell: (row: UserResults) => (
    //     <div
    //       style={{
    //         overflow: "hidden",
    //         textOverflow: "ellipsis",
    //         whiteSpace: "nowrap",
    //       }}
    //     >
    //       <Tooltip label={row?.persons?.[0]?.id ? row?.persons?.[0]?.id : "-"}>
    //         {row?.persons?.[0]?.id ? row?.persons?.[0]?.id : "-"}
    //       </Tooltip>
    //     </div>
    //   ),
    // },

    // {
    //   name: "Actions",
    //   selector: "view",

    //   width: "120px",
    //   cell: (row: UserResults) => {
    //     return (
    //       <>
    //         <Button onClick={() => editUserHandler(row)}>
    //           <Tooltip label="Edit" aria-label="Edit">
    //             <EditIcon />
    //           </Tooltip>
    //         </Button>
    //         <Button ml="2">
    //           <Tooltip label="Delete" aria-label="Delete">
    //             <DeleteIcon />
    //           </Tooltip>
    //         </Button>
    //       </>
    //     );
    //   },
    // },
  ]

  return (
    <>
      <Flex mb="5">
        <Box position="absolute" zIndex="1000" background="white">
          {options[0] == null ? (
            <Spinner />
          ) : (
            <Autocomplete
              options={options}
              allowCreation={true}
              result={currentOrganizations}
              setResult={(options: Option[]) => {
                if (options[0]) {
                  setCurrentOrganizations([options[0]])
                  filterUsersHandler({
                    organizationId: options?.[0].value
                  })
                } else {
                  setCurrentOrganizations([])
                  filterUsersHandler({ organizationId: null })
                }
              }}
              placeholder="Search Organization"
            />
          )}
        </Box>
        <Spacer />
        {showAll && (
          <Button bg="#7367F0" colorScheme="#ffffff" onClick={showAllHandler}>
            Show All
          </Button>
        )}
        <Button bg="#7367F0" ml="3" colorScheme="#ffffff" onClick={refresh}>
          <RepeatIcon width="7" height="7" color="#ffffff" />
        </Button>
        {/* <Button bg="#7367F0" ml="2" colorScheme="#ffffff" onClick={addHandler}>
          <AddIcon />
        </Button> */}
        <Button ml="2" bg={showAll ? '#42ba96' : '#7367F0'} colorScheme="#ffffff" onClick={filterHandler}>
          <FilterIcon />
        </Button>
      </Flex>
      {/* {isFilterEnabled ? ( */}
      <FilterUsers
        isOpen={isOpen}
        onClose={onClose}
        filterUsers={updateSelectedFilters}
        clearMessages={clearMessages}
        isLoading={isLoading}
        success={success}
        alert={alert}
      />
      {/* ) : ( 
        <AddUsers
          isOpen={isOpen}
          onClose={onClose}
          isEditable={isEditable}
          userData={userData}
        />
      )} */}

      {isDataLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          columns={columns}
          data={usersRecord}
          pagination={true}
          paginationServer
          paginationDefaultPage={paginationProps.page}
          paginationPerPage={paginationProps.limit || 10}
          paginationRowsPerPageOptions={[10, 50, 100, 250]}
          onChangeRowsPerPage={onChangeRowsPerPage}
          fixedHeader
          onChangePage={(page: any) => setPaginationProps({ ...paginationProps, page: page })}
          paginationTotalRows={totalUsers}
          expandableRows
          onRowExpandToggled={(bol: boolean, row: any) => {
            viewManageData(row, bol)
          }}
          customStyles={customStyles}
          noHeader={true}
          expandableRowExpanded={(row: any) => row.id === rowId}
          expandableRowsComponent={<ManageUserRoles userId={userId} />}
        />
      )}
    </>
  )
}

export default Users
