import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Flex, Stack, Box, Button, useToast, Heading, usePrevious, Tooltip } from '@chakra-ui/react'

import { customStyles } from '@/config/styles/customStyles'
import LoadingSpinner from '@/components/common/Spinner'
import { useEasyActions, useEasyState } from '@/store/hooks'
import { DeleteRoleData, RoleResults } from '@/types/users/Roles'
import UsersRoles from './UserRoles'
export interface RolesProps {
  userId: string
}

const Roles: React.FC<RolesProps> = (props) => {
  const { getAllRoles, getAllUsersRoles, assignUsersRoles, deleteUsersRoles } = useEasyActions((state) => state.user)
  const { roles, usersRoles } = useEasyState((state) => state.user)
  const [rolesData, setRoleData] = useState<RoleResults[]>([])
  const [rolesTotal, setRolesTotal] = useState<number>(0)
  const [usersRolesTotal, setUsersRolesTotal] = useState<number>(0)
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false)
  const [paginationRolesProps, setPaginationRolesProps] = useState({
    offset: 1,
    limit: 10
  })

  const [paginationUsersRolesProps, setPaginationUsersRolesProps] = useState({
    offset: 1,
    limit: 10
  })
  const [rowIndex, setRowIndex] = useState<number>(1)

  const prevCount: any = usePrevious(paginationRolesProps?.offset)

  const toast = useToast()
  React.useEffect(() => {
    getRolesData()
    getAssignUsersRoles()
    if (paginationRolesProps?.offset > prevCount) {
      setRowIndex(rowIndex + 10)
    } else if (paginationRolesProps?.offset < prevCount) {
      setRowIndex(rowIndex - 10)
    }
  }, [paginationRolesProps])
  React.useEffect(() => {
    getAssignUsersRoles()
  }, [paginationUsersRolesProps])

  // let dummyRoles: RoleResults[] = roles;
  React.useEffect(() => {
    // usersRoles.map((userRoleItem: AssignRoles, index: number) => {
    //   dummyRoles = dummyRoles.filter(
    //     (RoleItem: RoleResults, index: number) =>
    //       RoleItem?.id != userRoleItem.roleId
    //   );
    // });

    setRoleData(roles)
    // setRolesTotal(dummyRoles.length);
  }, [roles, usersRoles])

  const getRolesData = async () => {
    setIsDataLoading(true)
    let params: any = {
      ...paginationRolesProps
    }
    const data = await getAllRoles(params)

    if (data?.status == 'success') {
      setRoleData(data?.data?.results)
      setRolesTotal(data?.data?.total)
      setIsDataLoading(false)
    } else {
      setIsDataLoading(false)
    }
  }

  const getAssignUsersRoles = async () => {
    setIsDataLoading(true)
    let params: any = {
      ...paginationUsersRolesProps,
      userId: props.userId
    }
    const data = await getAllUsersRoles(params)

    if (data?.status == 'success') {
      setUsersRolesTotal(data?.data?.total)
      setIsDataLoading(false)
    } else {
      setIsDataLoading(false)
    }
  }

  const deleteRole = async (roleId: string) => {
    setIsDataLoading(true)
    let payload: { userId: string; roleId: string } = {
      userId: props?.userId,
      roleId
    }
    const data: DeleteRoleData = await deleteUsersRoles(payload)

    if (data?.message) {
      toast({
        title: data?.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
      getRolesData()
      getAssignUsersRoles()
      setIsDataLoading(false)
    } else {
      setIsDataLoading(false)
    }
  }

  const assignRole = async (roleId: string) => {
    setIsDataLoading(true)
    let payload: { userId: string; roleId: string } = {
      userId: props?.userId,
      roleId
    }
    const data: DeleteRoleData = await assignUsersRoles(payload)

    if (data?.message) {
      toast({
        title: data?.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
      getRolesData()
      getAssignUsersRoles()
      setIsDataLoading(false)
    } else {
      setIsDataLoading(false)
    }
  }

  const onChangeRowsPerPage = (limit: number, page: number) => {
    setPaginationRolesProps({
      offset: page,
      limit
    })
  }

  const onChangeRolesRowsPerPage = (limit: number, page: number) => {
    setPaginationUsersRolesProps({
      offset: page,
      limit
    })
  }
  const rolesColumns = [
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
          <Tooltip label={rowIndex + index}>
            <p>{rowIndex + index}</p>
          </Tooltip>
        </div>
      )
    },
    {
      name: 'Name',
      selector: (row: any) => row?.name,
      sortable: true,
      cell: (row: any) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>{row?.name ? row?.name : '-'}</div>
      )
    },
    {
      name: 'Type',
      selector: (row: any) => row?.roleType,
      sortable: true,
      cell: (row: any) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>{row.roleType ? row?.roleType : '-'}</div>
      )
    },

    {
      name: 'Action',
      selector: 'type',
      sortable: true,

      cell: (row: RoleResults, index: number) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Button bg="#7367F0" colorScheme="#ffffff" onClick={() => assignRole(row?.id)}>
            Assign Role
          </Button>
        </div>
      )
    }
  ]

  return (
    <Flex>
      <Box ml="2" width="35%" borderWidth={1} p={4}>
        <Stack spacing="24px">
          <UsersRoles
            userId={props.userId}
            usersRoles={usersRoles}
            paginationProps={paginationUsersRolesProps}
            onChangeRowsPerPage={onChangeRolesRowsPerPage}
            usersRolesTotal={usersRolesTotal}
            deleteRole={deleteRole}
          />
        </Stack>
      </Box>

      <Box ml="2" width="34%" borderWidth={1} p={4}>
        <Stack spacing="24px">
          <Heading size="md"> Roles </Heading>

          {isDataLoading ? (
            <LoadingSpinner />
          ) : (
            <DataTable
              columns={rolesColumns}
              data={rolesData}
              fixedHeader
              pagination
              paginationServer
              paginationDefaultPage={paginationRolesProps.offset}
              paginationPerPage={paginationRolesProps.limit || 10}
              paginationRowsPerPageOptions={[10, 50, 100, 250]}
              onChangeRowsPerPage={onChangeRowsPerPage}
              onChangePage={(page: any) => {
                setPaginationRolesProps({
                  ...paginationRolesProps,
                  offset: page
                })
              }}
              paginationTotalRows={rolesTotal}
              customStyles={customStyles}
            />
          )}
        </Stack>
      </Box>
    </Flex>
  )
}

export default Roles
