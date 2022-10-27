import React, { useState } from 'react'
import { Button } from '@chakra-ui/react'
import { useEasyState } from '../../../store/hooks'
import Table from '../../../components/common/DataTable'
import { DownloadIcon } from '@chakra-ui/icons'

const data = [
  {
    id: 2,
    date: 'Incorporation Certificate',
    path: 's3://af-org/ic.png	',
    description: 'description',
    module: 'module',
    level: 'high',
    view: 'completed'
  }
]

export interface DocumentsProps {}

const Document: React.FC<DocumentsProps> = (props) => {
  const organizationData = useEasyState((state) => state.organization.organizationData)

  const [documents, setDocuments] = useState<any[]>([])

  React.useEffect(() => {
    setDocuments(organizationData?.documents)
  }, [organizationData])

  const onChangePage = (page: any, totalRows: any) => {}

  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,
      width: '50px'
    },
    {
      name: 'Document Name',
      selector: 'date',
      sortable: true
    },
    {
      name: 'Path',
      selector: 'path',
      sortable: true
    },

    {
      name: 'Download',
      selector: 'view',
      cell: () => {
        return (
          <Button>
            <DownloadIcon />
          </Button>
        )
      }
    }
  ]

  return (
    <Table
      columns={columns}
      data={documents ? documents : data}
      onChangePage={onChangePage}
      //paginationTotalRows={}
    />
  )
}

export default Document
