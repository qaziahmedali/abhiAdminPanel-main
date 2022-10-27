import React, { useState } from 'react'
import { Tooltip, Flex, Spacer, Button, Center, Spinner } from '@chakra-ui/react'

import Table from '../../../components/common/DataTable'
import AddDocument from './AddDocument'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

export interface BusinessDocumentProps {
  businessTypeId: string
  documentData: any
  isDocumentLoading: boolean
}

const BusinessDocument: React.FC<BusinessDocumentProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [editAction, setEditAction] = useState(false)

  const [documentField, setDocumentField] = useState({})
  const [businessTypeId, setBusinessTypeId] = useState('')

  const updateBusinessDocument = (row: any) => {
    setDocumentField(row)
    setEditAction(true)
    setIsOpen(!isOpen)
    setBusinessTypeId(row.businessTypeId)
  }

  const addBusinessDocument = () => {
    setEditAction(false)
    setIsOpen(!isOpen)
  }

  const onChangePage = (page: any, totalRows: any) => {}
  const columns = [
    {
      name: '#',
      selector: '#',
      sortable: true,

      width: '50px',
      cell: (row: any, index: any) => <p>{index + 1}</p>
    },
    {
      name: 'Document Name',
      selector: 'name',
      sortable: true,

      cell: (row: any) => <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>{row.name}</div>
    },
    {
      name: 'Format',
      selector: 'acceptableFormats',
      sortable: true,

      width: '100px'
    },

    {
      name: 'Max Size',
      selector: 'maxFileSize',
      sortable: true,

      width: '100px'
    },

    {
      name: 'Actions',
      selector: 'edit',

      cell: (row: any) => {
        return (
          <>
            <Button onClick={() => updateBusinessDocument(row)}>
              <Tooltip label="Edit" aria-label="Edit">
                <EditIcon />
              </Tooltip>
            </Button>
            <Tooltip label="Delete" aria-label="Delete">
              <Button ml="2">
                <DeleteIcon />
              </Button>
            </Tooltip>
          </>
        )
      }
    }
  ]

  return (
    <>
      <Flex m="2">
        <Spacer />
      </Flex>
      <AddDocument
        isOpen={isOpen}
        onClose={addBusinessDocument}
        editBusinessDocument={editAction}
        businessTypeId={businessTypeId}
        documentData={documentField}
      />
      {props.isDocumentLoading ? (
        <Center m="5">
          <Spinner size="lg" />
        </Center>
      ) : (
        <div style={{ marginLeft: '50px' }}>
          <Table
            columns={columns}
            data={props.documentData}
            onChangePage={onChangePage}
            paginationTotalRows={props.documentData.length}
          />
        </div>
      )}
    </>
  )
}

export default BusinessDocument
