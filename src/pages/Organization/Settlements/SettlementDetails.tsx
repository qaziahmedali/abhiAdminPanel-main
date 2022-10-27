import React, { useState } from 'react'
import { Button, Center, Link, Spinner } from '@chakra-ui/react'
import Table from '../../../components/common/DataTable'
import moment from 'moment'
import { DownloadIcon } from '@chakra-ui/icons'
import { useEasyActions, useEasyState } from '../../../store/hooks'
export interface AccountDetailProps {
  settlementDetails: any
  isSettlementDetailsLoading: boolean
}

const SettlementDetails: React.FC<AccountDetailProps> = (props) => {
  const { getSignedUrlForDownload } = useEasyActions((state) => state.organization)
  const [fileDownload, setFileDownload] = useState(false)

  const onClickHandler = async (row: any) => {
    const obj = row.receipt.urlPath.split('/')
    let params = {
      fileName: obj[1],
      organizationId: obj[0]
    }
    downloadImage(params)
  }

  const downloadImage = async (params: any) => {
    setFileDownload(true)
    const result = await getSignedUrlForDownload(params)
    if (result) {
      setFileDownload(false)
      return result
    }
  }

  const columns = [
    {
      name: '#',
      selector: '#',
      sortable: true,
      width: '50px',
      cell: (row: any, index: any) => <p>{index + 1}</p>
    },
    {
      name: 'Payroll Date',
      selector: 'transactionDate',
      sortable: true,
      cell: (row: any) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {moment(row.transactionDate).format('MMM Do,YYYY HH:mm:ss')}
        </div>
      )
    },
    {
      name: 'Amount',
      selector: 'amount',
      sortable: true,
      width: '100px'
    },
    {
      name: 'Status',
      selector: 'approved',
      sortable: true,
      cell: (row: any) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>{row.approved ? 'Approved' : 'Rejected'}</div>
      )
    },
    {
      name: 'Receipt',
      selector: 'receipt.urlPath',
      sortable: true,
      cell: (row: any) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          <Button ml="2" onClick={() => onClickHandler(row)}>
            <DownloadIcon />
          </Button>
        </div>
      )
    }
  ]
  return (
    <>
      {props.isSettlementDetailsLoading || fileDownload ? (
        <Center m="5">
          <Spinner size="lg" />
        </Center>
      ) : (
        <div style={{ marginLeft: '50px' }}>
          <Table columns={columns} data={props.settlementDetails} />
        </div>
      )}
    </>
  )
}

export default SettlementDetails
