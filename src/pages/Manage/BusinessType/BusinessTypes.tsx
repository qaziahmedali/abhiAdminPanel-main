import React, { useState } from 'react'
import { Tooltip, Flex, Spacer, Button } from '@chakra-ui/react'
import { EditIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { useEasyActions, useEasyState } from '../../../store/hooks'
import LoadingSpinner from '../../../components/common/Spinner'
import AddBusinessType from './AddBusinessType'
import BusinessDocument from './BusinessDocument'
import AddDocument from './AddDocument'
import DataTable from 'react-data-table-component'
import { customStyles } from '../../../config/styles/customStyles'

export interface BusinessTypeProps {}

const BusinessTypes: React.FC<BusinessTypeProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [openDocument, setOpenDoucment] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [documentData, setDocumentData] = useState<any | null>([])
  const [editAction, setEditAction] = useState(false)
  const [typeData, setTypeData] = useState({})
  const [typeId, setTypeId] = useState('')
  const [offset, setOffset] = useState(1)
  const [limit, setLimit] = useState(10)
  const [rowId, setRowId] = useState('')
  const [isDocumentLoading, setIsDocumentLoading] = useState(false)

  const [totalBusinessTypes, setTotalBusinessTypes] = useState(0)

  const { getBusinessTypes, getBusinessDoucument } = useEasyActions((actions) => actions.manage)

  const { businessDocument } = useEasyState((state) => state.manage)

  React.useEffect(() => {
    getBusinessTypesData()
  }, [offset, limit])

  React.useEffect(() => {
    setDocumentData(businessDocument)
  }, [businessDocument])

  const getBusinessTypesData = async () => {
    setIsLoading(true)

    let params: any = {
      offset,
      limit
    }
    const data = await getBusinessTypes(params)
    if (data) {
      setIsLoading(false)
      setTotalBusinessTypes(data.total)
    } else {
      setIsLoading(false)
    }
  }

  const addBusinessDocument = (row: any) => {
    setTypeId(row.id)
    setOpenDoucment(true)
  }

  const closeBusinessDocument = () => {
    setOpenDoucment(false)
  }

  const editBusinessTpes = (row: any) => {
    setTypeData(row)
    setTypeId(row.id)
    setEditAction(true)
    setIsOpen(!isOpen)
  }

  const addBusinessTypes = () => {
    setTypeData({})
    setEditAction(false)
    setIsOpen(!isOpen)
  }

  const handleRowChange = (state: boolean, data: any) => {
    setRowId(data.id)
    setIsDocumentLoading(true)
    if (state) {
      getBusinessDoucumentData(data)
    } else {
      setIsDocumentLoading(false)
      setDocumentData([])
    }
  }

  const getBusinessDoucumentData = async (type: any) => {
    const data = await getBusinessDoucument(type.id)
    if (data) {
      setDocumentData(businessDocument)
      setIsDocumentLoading(false)
    } else {
      setIsDocumentLoading(false)
    }
  }

  const onChangeRowsPerPage = (updatedLimit: number, page: number) => {
    setLimit(updatedLimit)
  }

  const businessArr = useEasyState((state) => state.manage.businessTypes)

  const columns = [
    {
      name: '#',
      selector: '#',
      sortable: true,

      width: '50px',
      cell: (row: any, index: any) => <p>{index + 1}</p>
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,

      width: '300px',
      cell: (row: any) => <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>{row.name}</div>
    },

    {
      name: 'Country',
      selector: 'country',
      sortable: true
    },

    {
      name: 'Actions',
      selector: 'edit',

      cell: (row: any) => {
        return (
          <>
            <Button onClick={() => addBusinessDocument(row)}>
              <Tooltip label="Add Document" aria-label="Add Document">
                <PlusSquareIcon />
              </Tooltip>
            </Button>
            <Button ml="2" onClick={() => editBusinessTpes(row)}>
              <Tooltip label="Edit" aria-label="Edit">
                <EditIcon />
              </Tooltip>
            </Button>
            {/* <Button ml="2">
              <Tooltip label="Delete" aria-label="Delete">
                <DeleteIcon />
              </Tooltip>
            </Button> */}
          </>
        )
      }
    }
  ]

  return (
    <>
      <Flex mb="5">
        <Spacer />
        <Button bg="#7367F0" colorScheme="#ffffff" onClick={addBusinessTypes}>
          Add
        </Button>
      </Flex>
      <AddBusinessType
        isOpen={isOpen}
        onClose={addBusinessTypes}
        editBusinessType={editAction}
        typeData={typeData}
        lastUpdated={Date.now()}
      />
      <AddDocument
        isOpen={openDocument}
        onClose={closeBusinessDocument}
        editBusinessDocument={false}
        businessTypeId={typeId}
        documentData={''}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          columns={columns}
          data={businessArr}
          pagination={true}
          // paginationDefaultPage={offset}
          expandableRows={true}
          onChangePage={(page: any) => setOffset(page)}
          paginationTotalRows={totalBusinessTypes}
          paginationPerPage={limit}
          paginationRowsPerPageOptions={[10, 50, 100, 250]}
          onChangeRowsPerPage={onChangeRowsPerPage}
          onRowExpandToggled={handleRowChange}
          expandableRowExpanded={(row: any) => row.id === rowId}
          customStyles={customStyles}
          noHeader={true}
          expandableRowsComponent={
            <BusinessDocument
              businessTypeId={typeId}
              documentData={documentData}
              isDocumentLoading={isDocumentLoading}
            />
          }
        />
      )}
    </>
  )
}

export default BusinessTypes
