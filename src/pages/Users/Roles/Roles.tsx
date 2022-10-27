import React, { useState } from 'react'
import { Flex, Spacer, Button, Tooltip, useToast, usePrevious } from '@chakra-ui/react'

import { useEasyActions, useEasyState } from '../../../store/hooks'
import DataTable from 'react-data-table-component'
import AddRoles from './AddRoles'
import ViewRole from './ViewRole'

import { AddIcon, DeleteIcon, EditIcon, RepeatIcon, ViewIcon } from '@chakra-ui/icons'
import { customStyles } from '@/config/styles/customStyles'
import { RoleResults, RolesData } from '@/types/users/Roles'
import LoadingSpinner from '@/components/common/Spinner'
import UpdateRoles from './UpdateRoles'
import DeleteRoles from './DeleteRoles'

export interface ManagePageProps {}

const Roles: React.FC<ManagePageProps> = (props) => {
  const { getAllRoles, createRoles, updateRoles, deleteRoles } = useEasyActions((state) => state.user)
  const { roles } = useEasyState((state) => state.user)

  const [rolesData, setRoleData] = useState<RoleResults[]>([])
  const [rolesTotal, setRolesTotal] = useState<number>(0)
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false)
  const [paginationProps, setPaginationProps] = useState({
    offset: 1,
    limit: 10
  })
  const [rowIndex, setRowIndex] = useState<number>(0)
  const [rowId, setRowId] = useState<string>('')
  const [rowsId, setRowsId] = useState<string>('')

  const [isOpenAddModel, setIsOpenAddModel] = useState<boolean>(false)
  const [isOpenUpdateModel, setIsOpenUpdateModel] = useState<boolean>(false)
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [updateRowData, setUpdateRowData] = useState<RoleResults>()

  const toast = useToast()

  const prevCount: any = usePrevious(paginationProps.offset)
  React.useEffect(() => {
    getRolesData()
    if (paginationProps.offset > prevCount) {
      setRowIndex(rowIndex + 10)
    } else if (paginationProps.offset < prevCount) {
      setRowIndex(rowIndex - 10)
    }
  }, [paginationProps])

  React.useEffect(() => {
    setRoleData(roles)
    setRowId('')
  }, [roles])

  const getRolesData = async () => {
    setIsDataLoading(true)
    let params: any = {
      ...paginationProps
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

  const addRole = async (params: any) => {
    setIsLoading(true)
    const data = await createRoles(params)
    if (data?.status === 'success') {
      getRolesData()
      setIsLoading(false)

      toast({
        title: 'Role created.',
        description: 'Roles has been created for you.',
        status: 'success',
        duration: 5000,
        isClosable: true
      })

      setIsOpenAddModel(false)
    } else {
      toast({
        title: 'Roles creation Failed',
        description: data.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
      setIsLoading(false)
    }
  }

  const UpdateModel = (row: any) => {
    setIsOpenUpdateModel(true)
    setUpdateRowData(row)
  }

  const updateRole = async (params: { name: string; roleType: string; rowId: string }) => {
    setIsLoading(true)

    const data = await updateRoles(params)

    if (data?.status === 'success') {
      getRolesData()
      setIsLoading(false)
      setIsOpenUpdateModel(false)

      toast({
        title: 'Role updated.',
        description: 'Roles has been updated for you.',
        status: 'success',
        duration: 5000,
        isClosable: true
      })

      setIsOpenAddModel(false)
    } else {
      toast({
        title: 'Roles updation Failed',
        description: data.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
      setIsLoading(false)
    }
  }

  const viewManageData = async (row: any, bol: boolean) => {
    setRowId(row?.id)
  }

  const deleteRole = async (params: { rowId: string }) => {
    setIsDataLoading(true)

    const data = await deleteRoles(params)

    if (data?.status === 'success') {
      getRolesData()
      setIsDataLoading(false)
      setIsOpenDeleteModel(false)

      toast({
        title: 'Role Deleted.',
        description: 'Roles has been Deleted.',
        status: 'success',
        duration: 5000,
        isClosable: true
      })

      setIsOpenDeleteModel(false)
    } else {
      toast({
        title: 'Roles deletion Failed',
        description: data.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
      setIsDataLoading(false)
    }
  }
  const closeAddModel = () => {
    setIsOpenAddModel(false)
  }

  const closeUpdateModel = () => {
    setIsOpenUpdateModel(false)
  }

  const closeDeleteModel = () => {
    setIsOpenDeleteModel(false)
  }

  const refresh = () => {
    getRolesData()
  }

  const onChangeRowsPerPage = (limit: number, page: number) => {
    setPaginationProps({
      offset: page,
      limit
    })
  }

  const columns = [
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
          <Tooltip label={rowIndex + index + 1}>
            <p> {(paginationProps.offset - 1) * paginationProps.limit + index + 1}</p>
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
      name: 'Role Type',
      selector: (row: any) => row?.roleType,
      sortable: true,
      cell: (row: any) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>{row.roleType ? row?.roleType : '-'}</div>
      )
    },
    {
      name: 'Access Type',
      selector: (row: any) => row?.accessType,
      sortable: true,
      cell: (row: any) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>{row.accessType ? row?.accessType : '-'}</div>
      )
    },
    {
      name: 'Actions',
      selector: 'view',
      cell: (row: RoleResults) => {
        return (
          <>
            <Button
              onClick={() => {
                UpdateModel(row)
              }}
            >
              <Tooltip label="Edit" aria-label="Edit">
                <EditIcon />
              </Tooltip>
            </Button>
            <Button
              ml="2"
              onClick={() => {
                setRowsId(row?.id)
                setIsOpenDeleteModel(true)
              }}
            >
              <Tooltip label="Delete" aria-label="Delete">
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
        <Button bg="#7367F0" ml="3" colorScheme="#ffffff" onClick={refresh}>
          <RepeatIcon width="7" height="7" color="#ffffff" />
        </Button>

        <Button
          ml="2"
          bg="#7367F0"
          colorScheme="#ffffff"
          onClick={() => {
            setIsOpenAddModel(true)
          }}
        >
          <AddIcon />
        </Button>
      </Flex>

      <AddRoles isOpen={isOpenAddModel} onClose={closeAddModel} isLoading={isLoading} addRole={addRole} />

      <UpdateRoles
        isOpen={isOpenUpdateModel}
        onClose={closeUpdateModel}
        isLoading={isLoading}
        updateRole={updateRole}
        rowData={updateRowData}
      />

      <DeleteRoles
        isOpen={isOpenDeleteModel}
        onClose={closeDeleteModel}
        isLoading={isLoading}
        rowId={rowsId}
        deleteRole={deleteRole}
      />

      {isDataLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          paginationDefaultPage={paginationProps.offset}
          columns={columns}
          data={rolesData}
          fixedHeader
          pagination
          paginationServer
          paginationPerPage={paginationProps.limit || 10}
          paginationRowsPerPageOptions={[10, 50, 100, 250]}
          onChangeRowsPerPage={onChangeRowsPerPage}
          onChangePage={(page: any) => setPaginationProps({ ...paginationProps, offset: page })}
          paginationTotalRows={rolesTotal}
          customStyles={customStyles}
          expandableRows
          onRowExpandToggled={(bol: boolean, row: any) => {
            viewManageData(row, bol)
          }}
          expandableRowExpanded={(row: any) => row.id === rowId}
          expandableRowsComponent={<ViewRole roleId={rowId} />}
        />
      )}
    </>
  )
}

export default Roles
