import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Button, usePrevious } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

import { customStyles } from '@/config/styles/customStyles'
import LoadingSpinner from '@/components/common/Spinner'
import { UsersPlatformServices } from '@/types/users/Modules'

export interface UserPlatformServicesProps {
  userId: string
  userPlatformServicesData: UsersPlatformServices[]
  userPlatformServicesDataTotal: number
  deletePlatformService: any
  paginationProps: {
    offset: number
    limit: number
  }
  onChangeRowsPerPage: (page: number, limit: number) => void
}

const UserPlatformServices: React.FC<UserPlatformServicesProps> = (props) => {
  const [userRolesData, setUserRoleData] = useState<UsersPlatformServices[]>([])
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false)

  const [rowIndex, setRowIndex] = useState<number>(0)

  const prevCount: any = usePrevious(props?.paginationProps?.offset)
  React.useEffect(() => {
    if (props?.paginationProps?.offset > prevCount) {
      setRowIndex(rowIndex + 10)
    } else if (props?.paginationProps?.offset < prevCount) {
      setRowIndex(rowIndex - 10)
    }
  }, [props?.paginationProps])

  React.useEffect(() => {
    setUserRoleData(props?.userPlatformServicesData)
  }, [props?.userPlatformServicesData])

  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,
      cell: (row: UsersPlatformServices, index: number) => (
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
      selector: (row: UsersPlatformServices) => row?.platformServices?.name,
      sortable: true,
      cell: (row: UsersPlatformServices, index: number) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipses',
            whiteSpace: 'nowrap'
          }}
        >
          {row?.platformServices?.name ? row?.platformServices?.name : '-'}
          {/* <Tooltip label={row?.name ? row?.name : "-"}>
            {row?.name ? row?.name : "-"}
          </Tooltip> */}
        </div>
      )
    },
    {
      name: 'Description',
      selector: (row: UsersPlatformServices) => row?.platformServices?.description,
      sortable: true,
      cell: (row: UsersPlatformServices, index: number) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipses',
            whiteSpace: 'nowrap'
          }}
        >
          {row?.platformServices?.description ? row?.platformServices?.description : '-'}
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

      cell: (row: UsersPlatformServices, index: number) => (
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
              props?.deletePlatformService(row?.platformServicesId)
            }}
          >
            <DeleteIcon width={4} height={4} />
          </Button>
        </div>
      )
    }
  ]

  return (
    <>
      {isDataLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          columns={columns}
          data={props?.userPlatformServicesData}
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
          paginationTotalRows={props?.userPlatformServicesDataTotal}
          customStyles={customStyles}
        />
      )}
    </>
  )
}

export default UserPlatformServices
