import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

import { customStyles } from '@/config/styles/customStyles'
import LoadingSpinner from '@/components/common/Spinner'
import { PlatformService, UsersPlatformServices } from '@/types/users/Modules'
import { useEasyActions, useEasyState } from '@/store/hooks'
import { Box, Button, Flex, Heading, Stack, usePrevious, useToast } from '@chakra-ui/react'
import UserPlatformServices from './UserPlatformServices'
export interface ModulesProps {
  userId: string
}

const Module: React.FC<ModulesProps> = (props) => {
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [totalPlatformServices, setTotalPlatformServices] = useState<number>(0)
  const [userPlatformServiceTotal, setUserPlatformServiceTotal] = useState<number>(0)

  const [rowIndex, setRowIndex] = useState(0)

  const [paginationModulesProps, setPaginationRolesProps] = useState({
    offset: 1,
    limit: 10
  })

  const [paginationUsersModulesProps, setPaginationUsersRolesProps] = useState({
    offset: 1,
    limit: 10
  })

  const [platformServiceRecord, setPlatformServiceRecord] = useState<PlatformService[]>([])

  const { getPlatformServices, getUserPlatformServices, PostUserPlatformServices, DeletePlatformServices } =
    useEasyActions((state) => state.user)
  const { platformService, usersPlatformService } = useEasyState((state) => state.user)
  const prevCount: any = usePrevious(paginationModulesProps?.offset)
  const toast = useToast()
  useEffect(() => {
    getPlatformServicesData()
    getUserPlatformServicesData()
    if (paginationModulesProps?.offset > prevCount) {
      setRowIndex(rowIndex + 10)
    } else if (paginationModulesProps?.offset < prevCount) {
      setRowIndex(rowIndex - 10)
    }
  }, [paginationModulesProps])

  // let dummyplatformService: PlatformService[] = platformService;
  React.useEffect(() => {
    // usersPlatformService.map(
    //   (userPlatformServiceItem: UsersPlatformServices, index: number) => {
    //     dummyplatformService = dummyplatformService.filter(
    //       (platformServiceItem: PlatformService, index: number) =>
    //         platformServiceItem?.id !=
    //         userPlatformServiceItem?.platformServicesId
    //     );
    //   }
    // );

    setPlatformServiceRecord(platformService)
  }, [platformService, usersPlatformService])

  const getPlatformServicesData = async () => {
    setIsDataLoading(true)
    let params: any = {
      ...paginationModulesProps
    }
    const data = await getPlatformServices(params)

    if (data?.status === 'success') {
      setTotalPlatformServices(data?.data?.total)

      setIsDataLoading(false)
    } else {
      setIsDataLoading(false)
    }
  }

  const getUserPlatformServicesData = async () => {
    setIsDataLoading(true)
    let params: any = {
      ...paginationUsersModulesProps,
      userId: props.userId
    }
    const data = await getUserPlatformServices(params)

    if (data?.status == 'success') {
      setUserPlatformServiceTotal(data?.data?.total)
      setIsDataLoading(false)
    } else {
      setIsDataLoading(false)
    }
  }

  const deletePlatformServices = async (platformServicesId: string) => {
    setIsDataLoading(true)
    let payload: {
      platformServicesId: string
      userId: string
    } = {
      userId: props?.userId,
      platformServicesId
    }
    const response = await DeletePlatformServices(payload)

    if (response?.status == 'success') {
      getUserPlatformServicesData()
      getPlatformServicesData()
      toast({
        title: response?.data?.message,
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

  const assignPlatformService = async (platformServicesId: string) => {
    setIsDataLoading(true)
    let payload: {
      platformServicesId: string
      userId: string
    } = {
      userId: props?.userId,
      platformServicesId
    }
    const response = await PostUserPlatformServices(payload)
    if (response?.status == 'success') {
      getPlatformServicesData()
      getUserPlatformServicesData()
      toast({
        title: response?.data?.message,
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

  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,
      cell: (row: PlatformService, index: number) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipses',
            whiteSpace: 'nowrap'
          }}
        >
          {rowIndex + index + 1}
          {/* <Tooltip label={rowIndex + index + 1}>{rowIndex + index + 1}</Tooltip> */}
        </div>
      )
    },
    {
      name: 'Name',
      selector: (row: PlatformService) => row?.name,
      sortable: true,
      cell: (row: PlatformService, index: number) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipses',
            whiteSpace: 'nowrap'
          }}
        >
          {row?.name ? row?.name : '-'}
          {/* <Tooltip label={row?.name ? row?.name : "-"}>
            {row?.name ? row?.name : "-"}
          </Tooltip> */}
        </div>
      )
    },
    {
      name: 'Description',
      selector: (row: PlatformService) => row?.description,
      sortable: true,
      cell: (row: PlatformService, index: number) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipses',
            whiteSpace: 'nowrap'
          }}
        >
          {row?.description ? row?.description : '-'}
          {/* <Tooltip label={row?.description ? row?.description : "-"}>
            {row?.description ? row?.description : "-"}
          </Tooltip> */}
        </div>
      )
    },
    {
      name: 'Action',
      selector: 'type',
      sortable: true,

      cell: (row: PlatformService, index: number) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Button bg="#7367F0" colorScheme="#ffffff" onClick={() => assignPlatformService(row?.id)}>
            Assign Service
          </Button>
        </div>
      )
    }
  ]

  return (
    <Flex>
      <Box ml="2" width="34%" borderWidth={1} p={4}>
        <Stack spacing="24px">
          <Heading size="md"> Assigned Platform Services </Heading>
          <UserPlatformServices
            userId={props.userId}
            userPlatformServicesData={usersPlatformService}
            paginationProps={paginationUsersModulesProps}
            onChangeRowsPerPage={onChangeRolesRowsPerPage}
            userPlatformServicesDataTotal={userPlatformServiceTotal}
            deletePlatformService={deletePlatformServices}
          />
        </Stack>
      </Box>
      <Box ml="2" width="35%" borderWidth={1} p={4}>
        <Stack spacing="24px">
          <Heading size="md"> Platform Services </Heading>
          {isDataLoading ? (
            <LoadingSpinner />
          ) : (
            <DataTable
              columns={columns}
              data={platformServiceRecord}
              pagination
              paginationServer
              paginationDefaultPage={paginationModulesProps.offset}
              paginationPerPage={paginationModulesProps.limit || 10}
              paginationRowsPerPageOptions={[10, 50, 100, 250]}
              onChangeRowsPerPage={onChangeRowsPerPage}
              onChangePage={(page: any) => {
                setPaginationRolesProps({
                  ...paginationModulesProps,
                  offset: page
                })
              }}
              paginationTotalRows={totalPlatformServices}
              customStyles={customStyles}
              noHeader={true}
            />
          )}
        </Stack>
      </Box>
    </Flex>
  )
}

export default Module
