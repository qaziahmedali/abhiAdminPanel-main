import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Flex, Stack, Box, Button, Heading, usePrevious, Tooltip } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

import { customStyles } from '@/config/styles/customStyles'
import LoadingSpinner from '@/components/common/Spinner'

import { AssignRoles } from '@/types/users/Roles'
export interface UserRolesProps {
  userId: string
  usersRoles: AssignRoles[]
  usersRolesTotal: number
  deleteRole: any
  paginationProps: {
    offset: number
    limit: number
  }
  onChangeRowsPerPage: (page: number, limit: number) => void
}

const UsersRoles: React.FC<UserRolesProps> = (props) => {
  const [userRolesData, setUserRoleData] = useState<AssignRoles[]>([])
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false)

  const [rowIndex, setRowIndex] = useState<number>(0)

  const prevCount: any = usePrevious(props?.paginationProps.offset)
  React.useEffect(() => {
    if (props?.paginationProps.offset > prevCount) {
      setRowIndex(rowIndex + 10)
    } else if (props?.paginationProps.offset < prevCount) {
      setRowIndex(rowIndex - 10)
    }
  }, [props?.paginationProps])

  React.useEffect(() => {
    setUserRoleData(props?.usersRoles)
  }, [props?.usersRoles])

  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,

      width: '40px',
      cell: (row: AssignRoles, index: number) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={rowIndex + index + 1}>
            <p>{rowIndex + index + 1}</p>
          </Tooltip>
        </div>
      )
    },
    {
      name: 'Name',
      selector: (row: AssignRoles, index: number) => row?.role?.name,
      sortable: true,
      cell: (row: AssignRoles, index: number) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>{row?.role?.name ? row?.role?.name : '-'}</div>
      )
    },
    {
      name: 'Type',
      selector: (row: AssignRoles, index: number) => row?.role?.roleType,
      sortable: true,
      cell: (row: AssignRoles, index: number) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {row?.role?.roleType ? row?.role?.roleType : '-'}
        </div>
      )
    },

    {
      name: 'Action',
      selector: 'type',
      sortable: true,

      cell: (row: AssignRoles, index: number) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Button
            bg="#7367F0"
            colorScheme="#ffffff"
            onClick={() => {
              props?.deleteRole(row?.roleId)
            }}
          >
            <DeleteIcon width={4} height={4} />
          </Button>
        </div>
      )
    }
  ]

  return (
    <Flex>
      <Box width="100%">
        <Stack spacing="24px">
          <Heading size="md"> User Roles</Heading>
          {isDataLoading ? (
            <LoadingSpinner />
          ) : (
            <DataTable
              columns={columns}
              data={props?.usersRoles}
              fixedHeader
              pagination
              paginationServer
              paginationDefaultPage={props?.paginationProps.offset}
              paginationPerPage={props?.paginationProps.limit || 10}
              paginationRowsPerPageOptions={[10, 50, 100, 250]}
              onChangeRowsPerPage={props?.onChangeRowsPerPage}
              onChangePage={(page: any) => {
                props?.onChangeRowsPerPage(props?.paginationProps.limit, page)
              }}
              paginationTotalRows={props?.usersRolesTotal}
              customStyles={customStyles}
            />
          )}
        </Stack>
      </Box>
    </Flex>
  )
}

export default UsersRoles
