import React, { useEffect, useState } from 'react'
import { Flex, Spacer, Button, Tooltip, usePrevious, useToast } from '@chakra-ui/react'

import { useEasyActions, useEasyState } from '../../../../store/hooks'
import DataTable from 'react-data-table-component'
import LoadingSpinner from '../../../../components/common/Spinner'
import { customStyles } from '../../../../config/styles/customStyles'

import AddBackend from './AddBackend'
import { AddIcon, DeleteIcon, EditIcon, RepeatIcon } from '@chakra-ui/icons'
import { BackendFeatureGroup } from '@/types/users/BackendFeatureGroup'

export interface BackendFeatureGroupProps {}

const BackendFeatureGroups: React.FC<BackendFeatureGroupProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [backendFeaturesGroupData, setBackendFeaturesGroupData] = useState({})
  const [userRoles, setUserRoles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [totalRecords, setTotalRecords] = useState(0)
  const [rowIndex, setRowIndex] = useState(0)
  // const [searchName, setSearchName] = useState("");
  // const [searchBackend, setSearchBackend] = useState("");
  const [paginationProps, setPaginationProps] = useState({
    offset: 1,
    limit: 10
  })

  const toast = useToast()
  const prevCount: any = usePrevious(paginationProps.offset)

  const [backendFeaturesGroupRecord, setBackendFeaturesGroupRecord] = useState<BackendFeatureGroup[]>([])

  const { getAllBackendFeatureGroup, createBackendFeatureGroup, updateBackendFeatureGroup, deleteBackendFeatureGroup } =
    useEasyActions((state) => state.user)
  const { backendFeaturesGroup } = useEasyState((state) => state.user)

  useEffect(() => {
    getBackendFeatureGroupData()
    if (paginationProps.offset > prevCount) {
      setRowIndex(rowIndex + 10)
    } else if (paginationProps.offset < prevCount && paginationProps.offset !== 1) {
      setRowIndex(rowIndex - 10)
    }
  }, [paginationProps])

  React.useEffect(() => {
    setBackendFeaturesGroupRecord(backendFeaturesGroup)
  }, [backendFeaturesGroup])

  const getBackendFeatureGroupData = async () => {
    setIsDataLoading(true)
    let params: any = {
      ...paginationProps
    }

    const data = await getAllBackendFeatureGroup(params)

    if (data?.status == 'success') {
      setTotalRecords(data?.data?.total)

      setIsDataLoading(false)
    } else {
      setIsDataLoading(false)
    }
  }

  const editUserHandler = (row: any) => {
    setBackendFeaturesGroupData(row)
    setIsEditable(true)
    setIsOpen(true)
  }

  const addHandler = () => {
    setIsEditable(false)
    setBackendFeaturesGroupData({})
    setIsOpen(true)
  }

  const addBackendFeaturesGroup = async (params: any) => {
    setIsLoading(true)
    const data = await createBackendFeatureGroup(params)

    if (data?.status == 'success') {
      getBackendFeatureGroupData()
      setIsLoading(false)
      onClose()
      toast({
        title: 'Backend Features created.',
        description: 'Backend Features  has been created for you.',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    } else {
      setIsLoading(false)
      toast({
        title: 'Backend Features creation Failed.',
        description: 'Backend Features has been created for you.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }
  const updateBackendFeaturesGroup = async (params: any) => {
    setIsLoading(true)
    const data = await updateBackendFeatureGroup(params)
    if (data) {
      getBackendFeatureGroupData()
      setIsLoading(false)
      onClose()
      toast({
        title: 'Backend Features  updated.',
        description: 'Backend Features   has been updated for you.',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    } else {
      setIsLoading(false)
      toast({
        title: 'Backend Features   updation Failed.',
        description: 'Backend Features  has been created for you.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  const deleteBackendFeaturesGroup = async (row: BackendFeatureGroup) => {
    setIsDataLoading(true)
    const params = {
      id: row.id
    }
    const data = await deleteBackendFeatureGroup(params)
    if (data?.status == 'success') {
      getBackendFeatureGroupData()

      setIsDataLoading(false)

      toast({
        title: 'Backend Features deleted.',
        description: 'Backend Features  has been deleted for you.',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    } else {
      setIsDataLoading(false)
      toast({
        title: 'Backend Features  deletion Failed.',
        description: 'Backend Features has been created for you.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const showAllHandler = () => {
    getBackendFeatureGroupData()
  }
  const refresh = () => {
    getBackendFeatureGroupData()
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
      sortable: true,
      width: '40px',
      cell: (row: BackendFeatureGroup, index: number) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {(paginationProps.offset - 1) * paginationProps.limit + index + 1}
        </div>
      )
    },
    {
      name: 'Group Name',
      selector: (row: BackendFeatureGroup) => row?.groupName,
      sortable: true,
      cell: (row: BackendFeatureGroup) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>{row?.groupName ? row?.groupName : '-'}</div>
      )
    },
    {
      name: 'Internal Name',
      selector: (row: BackendFeatureGroup) => row?.internalName,
      sortable: true,
      cell: (row: BackendFeatureGroup) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {row?.internalName ? row?.internalName : '-'}
        </div>
      )
    },
    {
      name: 'End Point',
      selector: (row: BackendFeatureGroup) => row?.endPoint,
      sortable: true,
      cell: (row: BackendFeatureGroup) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>{row?.endPoint ? row?.endPoint : '-'}</div>
      )
    },
    {
      name: 'Http Method',
      selector: (row: BackendFeatureGroup) => row?.httpMethod,
      sortable: true,
      cell: (row: BackendFeatureGroup) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>{row?.httpMethod ? row?.httpMethod : '-'}</div>
      )
    },

    {
      name: 'Actions',
      selector: 'view',
      cell: (row: BackendFeatureGroup) => {
        return (
          <>
            <Button onClick={() => editUserHandler(row)}>
              <Tooltip label="Edit" aria-label="Edit">
                <EditIcon />
              </Tooltip>
            </Button>

            <Button ml="2" onClick={() => deleteBackendFeaturesGroup(row)}>
              <Tooltip label="Delete" aria-label="Delete">
                <DeleteIcon />
              </Tooltip>
            </Button>
          </>
        )
      }
    }
  ]

  return (
    <>
      <Flex mb="5">
        {/* <Input
          width={200}
          type="search"
          variant="outline"
          placeholder="Search Group Name"
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
          }}
        />
        <Input
          width={200}
          type="search"
          variant="outline"
          placeholder="Search Name"
          value={searchBackend}
          onChange={(e) => {
            setSearchBackend(e.target.value);
          }}
        /> */}
        <Spacer />
        {showAll && (
          <Button bg="#7367F0" colorScheme="#ffffff" onClick={showAllHandler}>
            Show All
          </Button>
        )}
        <Button bg="#7367F0" ml="3" colorScheme="#ffffff" onClick={refresh}>
          <RepeatIcon width="7" height="7" color="#ffffff" />
        </Button>

        <Button bg="#7367F0" ml="2" colorScheme="#ffffff" onClick={addHandler}>
          <AddIcon />
        </Button>
      </Flex>

      <AddBackend
        isOpen={isOpen}
        onClose={onClose}
        isEditable={isEditable}
        isLoading={isLoading}
        backendFeatureData={backendFeaturesGroupData}
        updateBackendFeaturesGroup={updateBackendFeaturesGroup}
        addBackendFeaturesGroup={addBackendFeaturesGroup}
      />

      {isDataLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          columns={columns}
          data={backendFeaturesGroupRecord}
          pagination={true}
          paginationDefaultPage={paginationProps.offset}
          paginationPerPage={paginationProps.limit || 10}
          paginationRowsPerPageOptions={[10, 50, 100, 250]}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationServer
          onChangePage={(page: any) => setPaginationProps({ ...paginationProps, offset: page })}
          paginationTotalRows={totalRecords}
          customStyles={customStyles}
          noHeader={true}
        />
      )}
    </>
  )
}

export default BackendFeatureGroups
