import React, { useState } from 'react'
import DataTable from 'react-data-table-component'

import { Button, Heading, Flex, Stack, Box, usePrevious, useToast, Spinner } from '@chakra-ui/react'
import { customStyles } from '@/config/styles/customStyles'
import { useEasyActions, useEasyState } from '@/store/hooks'
import { DeleteRoleData } from '@/types/users/Roles'
import RoleToFeatureUi from './RoleToFeatureUi'
import { AssignedFeaturesUi, FeatureUi } from '@/types/users/FeatureUi'

export interface FrontEndAclProps {
  roleId: string
}

const FrontEndAcl: React.FC<FrontEndAclProps> = (props) => {
  const { getAllFeatureUi, getAllRolesToFeatureUi, postAssignRoleToFeatureUi, deleteRoleToFeatureUi } = useEasyActions(
    (state) => state.user
  )
  const { featuresUi, rolesToFeaturesUi } = useEasyState((state) => state.user)

  const [rolesData, setRoleData] = useState<FeatureUi[]>([])
  const [rolesTotal, setRolesTotal] = useState<number>(0)
  const [rolesToFeatureUiTotal, setRolesToFeatureUiTotal] = useState<number>(0)
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false)
  const [paginationFrontendProps, setPaginationFrontendProps] = useState({
    offset: 1,
    limit: 10
  })

  const [paginationFrontendRolesProps, setPaginationFrontendRolesProps] = useState({
    offset: 1,
    limit: 10
  })
  const [rowIndex, setRowIndex] = useState<number>(0)
  // const [search, setSearch] = useState<string>("");

  const toast = useToast()
  const prevCount: any = usePrevious(paginationFrontendProps?.offset)

  React.useEffect(() => {
    getRolesData()
    getAssignUsersRoles()
    if (paginationFrontendProps.offset > prevCount) {
      setRowIndex(rowIndex + 10)
    } else if (paginationFrontendProps.offset < prevCount) {
      setRowIndex(rowIndex - 10)
    }
  }, [paginationFrontendProps])

  React.useEffect(() => {
    getAssignUsersRoles()
  }, [paginationFrontendRolesProps])

  // let dummyFeaturesUi: FeatureUi[] = featuresUi;
  React.useEffect(() => {
    // rolesToFeaturesUi.map(
    //   (rolesToFeaturesUiItem: AssignedFeaturesUi, index: number) => {
    //     dummyFeaturesUi = dummyFeaturesUi.filter(
    //       (FeaturesUiItem: FeatureUi, index: number) =>
    //         FeaturesUiItem?.id != rolesToFeaturesUiItem?.featuresUiId
    //     );
    //   }
    // );

    setRoleData(featuresUi)
    // setRolesTotal(dummyFeaturesUi?.length);
  }, [featuresUi, rolesToFeaturesUi])

  const getRolesData = async () => {
    setIsDataLoading(true)
    let params: { limit: number; offset: number } = {
      ...paginationFrontendProps
    }
    const data = await getAllFeatureUi(params)

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
      ...paginationFrontendProps,
      roleId: props.roleId
    }
    const data = await getAllRolesToFeatureUi(params)
    if (data?.status == 'success') {
      setRolesToFeatureUiTotal(data.data.total)
      setIsDataLoading(false)
    } else {
      setIsDataLoading(false)
    }
  }

  const deleteRole = async (featuresUiId: string) => {
    setIsDataLoading(true)
    let payload: { roleId: string; featuresUiId: string } = {
      roleId: props?.roleId,
      featuresUiId
    }
    const data: DeleteRoleData = await deleteRoleToFeatureUi(payload)

    if (data?.message) {
      getRolesData()
      getAssignUsersRoles()
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
      toast({
        title: data?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  const assignRole = async (row: FeatureUi) => {
    setIsDataLoading(true)
    let payload: { roleId: string; featuresUiId: string } = {
      roleId: props?.roleId,
      featuresUiId: row?.id
    }
    const data: DeleteRoleData = await postAssignRoleToFeatureUi(payload)

    if (data?.message) {
      getRolesData()
      getAssignUsersRoles()
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
      toast({
        title: data?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  const onChangeRowsPerPage = (limit: number, page: number) => {
    setPaginationFrontendProps({
      offset: page,
      limit
    })
  }

  const onChangeRolesRowsPerPage = (limit: number, page: number) => {
    setPaginationFrontendRolesProps({
      offset: page,
      limit
    })
  }
  const columns = [
    {
      name: '#',
      sortable: true,
      width: '40px',
      cell: (row: any, index: number) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {(paginationFrontendProps.offset - 1) * paginationFrontendProps.limit + index + 1}
        </div>
      )
    },

    {
      name: 'Internal Name',
      selector: (row: FeatureUi) => row?.internalName,
      sortable: true,
      cell: (row: FeatureUi) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {row?.internalName ? row?.internalName : '-'}
        </div>
      )
    },
    {
      name: 'Platform Service Name',
      selector: (row: FeatureUi) => row?.platformServices?.name,
      sortable: true,
      cell: (row: FeatureUi) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {row?.platformServices?.name ? row?.platformServices?.name : '-'}
        </div>
      )
    },

    {
      name: 'Actions',
      width: '180px',
      selector: 'view',
      cell: (row: FeatureUi) => {
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
        <Heading size="md">Assigned Feature UI</Heading>
        <RoleToFeatureUi
          rolesToFeatureUi={rolesToFeaturesUi}
          deleteBackendFeatureRoles={deleteRole}
          paginationProps={paginationFrontendRolesProps}
          onChangeRowsPerPage={onChangeRolesRowsPerPage}
          rolesToFeatureUiTotal={rolesToFeatureUiTotal}
          isDataLoading={isDataLoading}
        />
      </Box>

      <Box ml="2" width="50%" borderWidth={1} p={4}>
        <Stack spacing="24px">
          <Heading size="md">Feature UI</Heading>

          {/* <Input
            type="search"
            variant="outline"
            placeholder="Search here"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Spacer /> */}

          {isDataLoading ? (
            <Spinner />
          ) : (
            <DataTable
              columns={columns}
              data={rolesData}
              pagination
              paginationServer
              paginationDefaultPage={paginationFrontendProps.offset}
              paginationPerPage={paginationFrontendProps.limit || 10}
              paginationRowsPerPageOptions={[10, 50, 100, 250]}
              onChangeRowsPerPage={onChangeRowsPerPage}
              onChangePage={(page: any) => {
                setPaginationFrontendProps({
                  ...paginationFrontendProps,
                  offset: page
                })
              }}
              paginationTotalRows={rolesTotal}
              fixedHeader
              customStyles={customStyles}
            />
          )}
        </Stack>
      </Box>
    </Flex>
  )
}

export default FrontEndAcl
