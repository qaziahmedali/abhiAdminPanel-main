import React, { useState } from 'react'
import DataTable from 'react-data-table-component'

import { Button, Heading, Flex, Stack, Box, usePrevious, useToast, Spinner, Tooltip } from '@chakra-ui/react'
import { customStyles } from '@/config/styles/customStyles'
import { useEasyActions, useEasyState } from '@/store/hooks'
import { BackendFeatureGroup } from '@/types/users/BackendFeatureGroup'
import { DeleteRoleData } from '@/types/users/Roles'
import AssignedBackendFeatureRoles from './AssignedBackendFeatureRoles'

export interface BackendAclProps {
  roleId: string
}

const BackEndAcl: React.FC<BackendAclProps> = (props) => {
  const {
    getAllBackendFeatureGroup,
    getAllAssignedBackendFeatureGroup,
    postAssignedBackendFeature,
    deleteAssignedBackendFeature
  } = useEasyActions((state) => state.user)
  const { backendFeaturesGroup, rolesBackendFeaturesGroup } = useEasyState((state) => state.user)

  const [rolesData, setRoleData] = useState<BackendFeatureGroup[]>([])
  const [rolesTotal, setRolesTotal] = useState<number>(0)
  const [rolesBackendFeaturesGroupTotal, setRolesBackendFeaturesGroupTotal] = useState<number>(0)
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false)
  const [rowIndex, setRowIndex] = useState<number>(0)
  // const [search, setSearch] = useState<string>("");
  const [paginationBackendProps, setPaginationBackendProps] = useState({
    offset: 1,
    limit: 10
  })

  const [paginationBackendRolesProps, setPaginationBackendRolesProps] = useState({
    offset: 1,
    limit: 10
  })

  const prevCount: any = usePrevious(paginationBackendProps.offset)

  const toast = useToast()

  React.useEffect(() => {
    getRolesData()
    getAssignUsersRoles()
    if (paginationBackendProps.offset > prevCount) {
      setRowIndex(rowIndex + 10)
    } else if (paginationBackendProps.offset < prevCount) {
      setRowIndex(rowIndex - 10)
    }
  }, [paginationBackendProps])

  React.useEffect(() => {
    getAssignUsersRoles()
  }, [paginationBackendRolesProps])
  // let dummybackendFeatures: BackendFeatureGroup[] = backendFeaturesGroup;
  React.useEffect(() => {
    // rolesBackendFeaturesGroup.map(
    //   (rolesBackendFeaturesItem: AssignedBackendFeature, index: number) => {
    //     dummybackendFeatures = dummybackendFeatures.filter(
    //       (backendFeaturesItem: BackendFeatureGroup, index: number) =>
    //         backendFeaturesItem?.id !=
    //         rolesBackendFeaturesItem?.featuresBackendId
    //     );
    //   }
    // );

    setRoleData(backendFeaturesGroup)
    // setRolesTotal(dummybackendFeatures?.length);
  }, [backendFeaturesGroup, rolesBackendFeaturesGroup])

  const getRolesData = async () => {
    setIsDataLoading(true)
    let params: any = {
      ...paginationBackendProps
    }
    const data = await getAllBackendFeatureGroup(params)

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
      ...paginationBackendRolesProps,
      roleId: props.roleId
    }
    const data = await getAllAssignedBackendFeatureGroup(params)

    if (data?.status == 'success') {
      setRolesBackendFeaturesGroupTotal(data?.data?.total)
      setIsDataLoading(false)
    } else {
      setIsDataLoading(false)
    }
  }
  const getAssignedUsersRoles = async (pag: { offset: number; limit: number }) => {
    setIsDataLoading(true)
    let params: any = {
      offset: pag.offset,
      limit: pag.limit,
      roleId: props.roleId
    }
    const data = await getAllAssignedBackendFeatureGroup(params)

    if (data?.status == 'success') {
      setRolesBackendFeaturesGroupTotal(data?.data?.total)
      setIsDataLoading(false)
    } else {
      setIsDataLoading(false)
    }
  }

  const deleteRole = async (featuresBackendId: string) => {
    setIsDataLoading(true)
    let payload: { roleId: string; featuresBackendId: string } = {
      roleId: props?.roleId,
      featuresBackendId
    }
    const data: DeleteRoleData = await deleteAssignedBackendFeature(payload)

    if (data?.message) {
      getAssignUsersRoles()
      getRolesData()
      toast({
        title: data?.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })

      setIsDataLoading(false)
    } else {
      setIsDataLoading(false)
    }
  }

  const assignRole = async (row: BackendFeatureGroup) => {
    setIsDataLoading(true)
    let payload: { roleId: string; featuresBackendId: string } = {
      roleId: props?.roleId,
      featuresBackendId: row?.id
    }
    const data: DeleteRoleData = await postAssignedBackendFeature(payload)

    if (data?.message) {
      getAssignUsersRoles()
      getRolesData()
      toast({
        title: data?.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })

      setIsDataLoading(false)
    } else {
      setIsDataLoading(false)
    }
  }

  const onChangeRowsPerPage = (limit: number, page: number) => {
    setPaginationBackendProps({
      offset: page,
      limit
    })
  }

  const onChangeRolesRowsPerPage = (limit: number, page: number) => {
    setPaginationBackendRolesProps({
      offset: page,
      limit
    })
  }

  const columns = [
    {
      name: '#',
      sortable: true,
      width: '40px',
      cell: (row: BackendFeatureGroup, index: number) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {(paginationBackendProps.offset - 1) * paginationBackendProps.limit + index + 1}
        </div>
      )
    },
    {
      name: 'Group Name',
      selector: (row: BackendFeatureGroup) => row?.groupName,
      sortable: true,
      cell: (row: BackendFeatureGroup) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip label={row?.groupName ? row?.groupName : '-'}>{row?.groupName ? row?.groupName : '-'}</Tooltip>
        </div>
      )
    },
    {
      name: 'Internal Name',
      selector: (row: BackendFeatureGroup) => row?.internalName,
      sortable: true,
      cell: (row: BackendFeatureGroup) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip label={row?.internalName ? row?.internalName : '-'}>
            {row?.internalName ? row?.internalName.slice(0, 10) : '-'}
          </Tooltip>
        </div>
      )
    },
    {
      name: 'End Point',
      selector: (row: BackendFeatureGroup) => row?.endPoint,
      sortable: true,
      cell: (row: BackendFeatureGroup) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip label={row?.endPoint ? row?.endPoint : '-'}>
            {row?.endPoint ? row?.endPoint.slice(0, 10) : '-'}
          </Tooltip>
        </div>
      )
    },
    {
      name: 'Http Method',
      selector: (row: BackendFeatureGroup) => row?.httpMethod,
      sortable: true,
      cell: (row: BackendFeatureGroup) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip label={row?.httpMethod ? row?.httpMethod : '-'}>{row?.httpMethod ? row?.httpMethod : '-'}</Tooltip>
        </div>
      )
    },

    {
      name: 'Actions',
      width: '180px',
      selector: 'view',
      cell: (row: BackendFeatureGroup) => {
        return (
          <>
            <Button ml="2" bg="#7367F0" colorScheme="#ffffff" onClick={() => assignRole(row)}>
              Assign Feature
            </Button>
          </>
        )
      }
    }
  ]
  return (
    <Flex>
      <Box width="50%" borderWidth={1} p={4}>
        <AssignedBackendFeatureRoles
          rolesBackendFeaturesGroup={rolesBackendFeaturesGroup}
          rolesBackendFeaturesGroupTotal={rolesBackendFeaturesGroupTotal}
          paginationProps={paginationBackendRolesProps}
          onChangeRowsPerPage={onChangeRolesRowsPerPage}
          deleteBackendFeatureRoles={deleteRole}
          isDataLoading={isDataLoading}
        />
      </Box>

      <Box ml="2" width="50%" borderWidth={1} p={4}>
        <Stack spacing="24px">
          <Heading size="md"> Backend Features</Heading>

          {/* <Input
            type="search"
            variant="outline"
            placeholder="Search here"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          /> 
          <Spacer />*/}
          {isDataLoading ? (
            <Spinner />
          ) : (
            <DataTable
              columns={columns}
              data={rolesData}
              fixedHeader
              customStyles={customStyles}
              pagination
              paginationServer
              paginationDefaultPage={paginationBackendProps.offset}
              paginationPerPage={paginationBackendProps.limit || 10}
              paginationRowsPerPageOptions={[10, 50, 100, 250]}
              onChangeRowsPerPage={onChangeRowsPerPage}
              onChangePage={(page: any) => {
                setPaginationBackendProps({
                  ...paginationBackendProps,
                  offset: page
                })
              }}
              paginationTotalRows={rolesTotal}
            />
          )}
        </Stack>
      </Box>
    </Flex>
  )
}

export default BackEndAcl
