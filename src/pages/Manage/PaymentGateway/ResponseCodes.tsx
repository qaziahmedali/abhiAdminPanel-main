import React, { useState } from 'react'
import { useEasyActions, useEasyState } from '../../../store/hooks'

import DataTable from 'react-data-table-component'
import { customStyles } from '@/config/styles/customStyles'

export interface ResponseCodesProps {}

const ResponseCodes: React.FC<ResponseCodesProps> = (props) => {
  const [offset, setOffset] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalResponseCodes, setTotalResponseCodes] = useState(0)
  const [isDataLoading, setIsDataLoading] = useState(false)

  const { getResponseCodes } = useEasyActions((actions) => actions.manage)
  const responseCodes = useEasyState((state) => state.manage.responseCodes)

  React.useEffect(() => {
    getResponseCodesData()
  }, [offset, limit])

  const getResponseCodesData = async () => {
    setIsDataLoading(true)
    let params: any = {
      offset,
      limit
    }
    const data = await getResponseCodes(params)
    if (data) {
      setIsDataLoading(false)
      setTotalResponseCodes(data.total)
    } else {
      setIsDataLoading(false)
    }
  }

  const onChangeRowsPerPage = (updatedLimit: number, page: number) => {
    setLimit(updatedLimit)
  }

  const columns = [
    {
      name: '#',
      sortable: true,

      width: '100px',
      cell: (row: any, index: any) => <p> {index + 1} </p>
    },
    {
      name: 'Code',
      selector: 'code',
      sortable: true,

      width: '150px'
    },
    {
      name: 'Description',
      selector: 'description',
      sortable: true,

      cell: (row: any) => <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>{row.description}</div>
    }
  ]

  return (
    <DataTable
      columns={columns}
      data={responseCodes}
      paginationDefaultPage={offset}
      fixedHeader
      pagination
      paginationServer
      paginationPerPage={limit}
      paginationRowsPerPageOptions={[10, 50, 100, 250]}
      onChangeRowsPerPage={onChangeRowsPerPage}
      onChangePage={(page: any) => setOffset(page)}
      paginationTotalRows={totalResponseCodes}
      customStyles={customStyles}
    />
  )
}

export default ResponseCodes
