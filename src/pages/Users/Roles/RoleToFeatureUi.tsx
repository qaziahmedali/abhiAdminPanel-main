import { customStyles } from '@/config/styles/customStyles'
import { AssignedFeaturesUi } from '@/types/users/FeatureUi'
import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Spinner, Stack, usePrevious } from '@chakra-ui/react'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
export interface RoleToFeatureUiProps {
  rolesToFeatureUi: AssignedFeaturesUi[]
  rolesToFeatureUiTotal: number
  paginationProps: {
    offset: number
    limit: number
  }
  onChangeRowsPerPage: (page: number, limit: number) => void
  deleteBackendFeatureRoles: any
  isDataLoading: boolean
}
const RoleToFeatureUi: React.FC<RoleToFeatureUiProps> = (props) => {
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
      cell: (row: AssignedFeaturesUi, index: number) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {(props?.paginationProps.offset - 1) * props?.paginationProps.limit + index + 1}
        </div>
      )
    },
    {
      name: 'Internal Name',
      selector: (row: AssignedFeaturesUi) => row?.featuresUi?.internalName,
      sortable: true,
      cell: (row: AssignedFeaturesUi) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {row?.featuresUi?.internalName ? row?.featuresUi?.internalName : '-'}
        </div>
      )
    },
    {
      name: 'Platform Service Name',
      selector: (row: AssignedFeaturesUi) => row?.featuresUi?.platformServices?.name,
      sortable: true,
      cell: (row: AssignedFeaturesUi) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {row?.featuresUi?.platformServices?.name ? row?.featuresUi?.platformServices?.name : '-'}
        </div>
      )
    },

    {
      name: 'Action',
      selector: 'type',
      sortable: true,

      cell: (row: AssignedFeaturesUi, index: any) => (
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
              props?.deleteBackendFeatureRoles(row?.featuresUiId)
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
        {props?.isDataLoading ? (
          <Spinner />
        ) : (
          <DataTable
            columns={columns}
            data={props?.rolesToFeatureUi}
            pagination
            paginationServer
            paginationDefaultPage={props?.paginationProps.offset}
            paginationPerPage={props?.paginationProps.limit || 10}
            paginationRowsPerPageOptions={[10, 50, 100, 250]}
            onChangeRowsPerPage={props?.onChangeRowsPerPage}
            onChangePage={(page: any) => {
              props?.onChangeRowsPerPage(props?.paginationProps.limit, page)
            }}
            fixedHeader
            paginationTotalRows={props?.rolesToFeatureUiTotal}
            customStyles={customStyles}
          />
        )}
      </Stack>
    </Box>
  )
}

export default RoleToFeatureUi
