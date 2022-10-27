import React, { useEffect, useState } from 'react'
import { Tooltip } from '@chakra-ui/react'

import { useEasyActions, useEasyState } from '../../../../store/hooks'
import DataTable from 'react-data-table-component'
import LoadingSpinner from '../../../../components/common/Spinner'
import { customStyles } from '../../../../config/styles/customStyles'
import { PlatformService } from '@/types/users/Modules'

const usePrevious = (value: any) => {
  const ref = React.useRef()
  React.useEffect(() => {
    ref.current = value
  })
  return ref.current
}
export interface ModulesProps {}

const Module: React.FC<ModulesProps> = (props) => {
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [totalModules, setTotalModules] = useState(0)

  const [rowIndex, setRowIndex] = useState(0)

  const [paginationProps, setPaginationProps] = useState({
    offset: 1,
    limit: 10
  })

  const [platformServiceRecord, setModulesRecord] = useState<PlatformService[]>([])

  const { getPlatformServices } = useEasyActions((state) => state.user)
  const { platformService } = useEasyState((state) => state.user)
  const prevCount: any = usePrevious(paginationProps.offset)

  useEffect(() => {
    getPlatformServicesData()
    if (paginationProps.offset > prevCount) {
      setRowIndex(rowIndex + 10)
    } else if (paginationProps.offset < prevCount && paginationProps.offset !== 1) {
      setRowIndex(rowIndex - 10)
    }
  }, [paginationProps])

  React.useEffect(() => {
    setModulesRecord(platformService)
  }, [platformService])

  const getPlatformServicesData = async () => {
    setIsDataLoading(true)
    let params: any = {
      ...paginationProps
    }
    const data = await getPlatformServices(params)

    if (data?.status === 'success') {
      setTotalModules(data?.data?.total)

      setIsDataLoading(false)
    } else {
      setIsDataLoading(false)
    }
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
      selector: (row: any) => row?.name,
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
      selector: (row: any) => row?.description,
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
    }
  ]

  return (
    <>
      {isDataLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          paginationDefaultPage={paginationProps.offset}
          columns={columns}
          data={platformServiceRecord}
          pagination={true}
          paginationPerPage={paginationProps.limit || 10}
          paginationRowsPerPageOptions={[10, 50, 100, 250]}
          onChangeRowsPerPage={onChangeRowsPerPage}
          fixedHeader
          paginationServer
          onChangePage={(page: any) => setPaginationProps({ ...paginationProps, offset: page.selected })}
          paginationTotalRows={totalModules}
          customStyles={customStyles}
          noHeader={true}
        />
      )}
    </>
  )
}

export default Module
