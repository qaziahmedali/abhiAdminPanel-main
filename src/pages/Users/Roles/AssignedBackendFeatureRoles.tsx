import { customStyles } from '@/config/styles/customStyles'
import { AssignedBackendFeature } from '@/types/users/BackendFeatureGroup'
import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, Spinner, Stack, Tooltip, usePrevious } from '@chakra-ui/react'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
export interface AssignedBackendFeatureRolesProps {
  rolesBackendFeaturesGroup: AssignedBackendFeature[]
  rolesBackendFeaturesGroupTotal: number
  deleteBackendFeatureRoles: any

  paginationProps: {
    offset: number
    limit: number
  }
  onChangeRowsPerPage: (page: number, limit: number) => void

  isDataLoading: boolean
}
const AssignedBackendFeatureRoles: React.FC<AssignedBackendFeatureRolesProps> = (props) => {
  const [rowIndex, setRowIndex] = useState<number>(0)

  const prevCount: any = usePrevious(props?.paginationProps?.offset)

  React.useEffect(() => {
    if (props?.paginationProps.offset > prevCount) {
      setRowIndex(rowIndex + 10)
    } else if (props?.paginationProps.offset < prevCount) {
      setRowIndex(rowIndex - 10)
    }
  }, [props?.paginationProps])

  const columns = [
    {
      name: '#',
      sortable: true,
      width: '40px',
      cell: (row: AssignedBackendFeature, index: number) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {(props?.paginationProps.offset - 1) * props?.paginationProps.limit + index + 1}
        </div>
      )
    },
    {
      name: 'Group Name',
      selector: (row: AssignedBackendFeature) => row?.featuresBackend?.groupName,
      sortable: true,
      cell: (row: AssignedBackendFeature) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip label={row?.featuresBackend?.internalName ? row?.featuresBackend?.internalName : '-'}>
            {row?.featuresBackend?.groupName ? row?.featuresBackend?.groupName : '-'}
          </Tooltip>
        </div>
      )
    },
    {
      name: 'Internal Name',
      selector: (row: AssignedBackendFeature) => row?.featuresBackend?.internalName,
      sortable: true,
      cell: (row: AssignedBackendFeature) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip label={row?.featuresBackend?.internalName ? row?.featuresBackend?.internalName : '-'}>
            {row?.featuresBackend?.internalName ? row?.featuresBackend?.internalName.slice(0, 10) : '-'}
          </Tooltip>
        </div>
      )
    },
    {
      name: 'End Point',
      selector: (row: any) => row?.featuresBackend?.endPoint,
      sortable: true,
      cell: (row: any) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip label={row?.featuresBackend?.endPoint ? row?.featuresBackend?.endPoint : '-'}>
            {row?.featuresBackend?.endPoint ? row?.featuresBackend?.endPoint.slice(0, 10) : '-'}
          </Tooltip>
        </div>
      )
    },
    {
      name: 'Http Method',
      selector: (row: AssignedBackendFeature) => row?.featuresBackend?.httpMethod,
      sortable: true,
      cell: (row: AssignedBackendFeature) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Tooltip label={row?.featuresBackend?.httpMethod ? row?.featuresBackend?.httpMethod : '-'}>
            {row?.featuresBackend?.httpMethod ? row?.featuresBackend?.httpMethod : '-'}
          </Tooltip>
        </div>
      )
    },
    {
      name: 'Action',
      selector: 'type',
      sortable: true,

      cell: (row: any, index: any) => (
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
              props?.deleteBackendFeatureRoles(row)
            }}
          >
            <DeleteIcon width={4} height={4} />
          </Button>
        </div>
      )
    }
  ]

  return (
    <Box>
      <Stack spacing="24px">
        <Heading size="md"> Assigned Backend Features</Heading>
        {props?.isDataLoading ? (
          <Spinner />
        ) : (
          <DataTable
            columns={columns}
            data={props?.rolesBackendFeaturesGroup}
            pagination
            paginationServer
            paginationDefaultPage={props?.paginationProps.offset}
            paginationPerPage={props?.paginationProps.limit || 10}
            paginationRowsPerPageOptions={[10, 50, 100, 250]}
            onChangeRowsPerPage={props?.onChangeRowsPerPage}
            onChangePage={(page: any) => {
              props?.onChangeRowsPerPage(props?.paginationProps.limit, page)
            }}
            paginationTotalRows={props?.rolesBackendFeaturesGroupTotal}
            fixedHeader
            customStyles={customStyles}
          />
        )}
      </Stack>
    </Box>
  )
}

export default AssignedBackendFeatureRoles
