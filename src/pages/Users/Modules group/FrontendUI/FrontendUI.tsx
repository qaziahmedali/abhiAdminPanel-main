import React, { useEffect, useState } from 'react'
import { Flex, Spacer, Button, Tooltip, Input, Select, usePrevious, useToast } from '@chakra-ui/react'

import { useEasyActions, useEasyState } from '../../../../store/hooks'
import DataTable from 'react-data-table-component'
import LoadingSpinner from '../../../../components/common/Spinner'
import { customStyles } from '../../../../config/styles/customStyles'

import { AddIcon, DeleteIcon, EditIcon, RepeatIcon } from '@chakra-ui/icons'

import AddFrontendUI from './AddFrontendUI'
import { FeatureUi } from '@/types/users/FeatureUi'

export interface FeaturesUiProps {}

const FrontendUI: React.FC<FeaturesUiProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [userData, setUserData] = useState<FeatureUi | null>()
  const [showAll, setShowAll] = useState(false)

  const [isDataLoading, setIsDataLoading] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalUsers, setTotalUsers] = useState(0)

  const [paginationProps, setPaginationProps] = useState({
    offset: 1,
    limit: 10
  })
  const [rowIndex, setRowIndex] = useState<number>(0)

  const [usersRecord, setUsersRecord] = useState<FeatureUi[]>([])

  const { getAllFeatureUi, createFeatureUi, updateFeatureUi, deleteFeatureUi } = useEasyActions((state) => state.user)
  const { featuresUi } = useEasyState((state) => state.user)
  const prevCount: any = usePrevious(paginationProps.offset)
  const toast = useToast()

  useEffect(() => {
    getUserData()
    if (paginationProps.offset > prevCount) {
      setRowIndex(rowIndex + 10)
    } else if (paginationProps.offset < prevCount && paginationProps.offset !== 1) {
      setRowIndex(rowIndex - 10)
    }
  }, [paginationProps])

  React.useEffect(() => {
    setUsersRecord(featuresUi)
  }, [featuresUi])

  const getUserData = async () => {
    setIsDataLoading(true)

    let params: { offset: number; limit: number } = {
      ...paginationProps
    }
    const data = await getAllFeatureUi(params)
    if (data?.status == 'success') {
      setTotalUsers(data?.data.total)

      setIsDataLoading(false)
    } else {
      setIsDataLoading(false)
    }
  }

  const editUserHandler = (row: FeatureUi) => {
    setUserData(row)
    setIsEditable(true)

    setIsOpen(true)
  }

  const addHandler = () => {
    setIsEditable(false)

    setIsOpen(true)
    setUserData(null)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const addFeatureUiData = async (payload: any) => {
    setIsLoading(true)
    const data = await createFeatureUi(payload)
    if (data?.status == 'success') {
      getUserData()
      setIsLoading(false)
      onClose()
      toast({
        title: 'Features UI created.',
        description: 'Features UI  has been created for you.',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    } else {
      setIsLoading(false)
      toast({
        title: 'Features UI creation Failed.',
        description: 'Features UI has been created for you.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }
  const updateFeatureUiData = async (params: any) => {
    setIsLoading(true)
    const data = await updateFeatureUi(params)

    if (data) {
      getUserData()
      setIsLoading(false)
      onClose()
      toast({
        title: 'Features UI updated.',
        description: 'Features UI  has been updated for you.',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    } else {
      setIsLoading(false)
      toast({
        title: 'Features UI  updation Failed.',
        description: 'Features UI has been updated for you.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }
  const deleteFeatureUiData = async (params: any) => {
    setIsDataLoading(true)
    const data = await deleteFeatureUi(params)
    if (data) {
      getUserData()
      setIsDataLoading(false)
      onClose()
      toast({
        title: 'Features UI deleted.',
        description: 'Features UI  has been deleted for you.',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    } else {
      setIsDataLoading(false)
      toast({
        title: 'Features UI  deletion Failed.',
        description: 'Features UI has been deleted for you.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  const showAllHandler = () => {
    getUserData()
  }
  const refresh = () => {
    getUserData()
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
      cell: (row: FeatureUi, index: number) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipses',
            whiteSpace: 'nowrap'
          }}
        >
          {(paginationProps.offset - 1) * paginationProps.limit + index + 1}
          {/* <Tooltip label={rowIndex + index + 1}>{rowIndex + index + 1}</Tooltip> */}
        </div>
      )
    },
    {
      name: 'Internal Name',
      selector: (row: FeatureUi) => row?.internalName,
      sortable: true,
      cell: (row: FeatureUi) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {row?.internalName ? row?.internalName : '-'}
        </div>
      )
    },
    {
      name: 'Platform Service Name',
      selector: (row: FeatureUi) => row?.platformServices?.name,
      sortable: true,
      cell: (row: FeatureUi) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {row?.platformServices?.name ? row?.platformServices?.name : '-'}
        </div>
      )
    },
    {
      name: 'Actions',
      selector: 'view',
      cell: (row: FeatureUi) => {
        return (
          <>
            <Button onClick={() => editUserHandler(row)}>
              <Tooltip label="Edit" aria-label="Edit">
                <EditIcon />
              </Tooltip>
            </Button>
            <Button ml="2" onClick={() => deleteFeatureUiData(row)}>
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
        {/* <Select
          value={moduleSelect}
          width="250px"
          placeholder="All Modules"
          onChange={(event: any) => setModuleSelect(event.currentTarget.value)}
        >
          <option value="all">All</option> 
           {organizations.map((value: any, index: any) => {
							return (
								<option key={index} value={value.id}>
									{value.name}
								</option>
							);
						})} 
          <option value="M1">Module 1</option>
          <option value="M2">Module 2</option>
          <option value="M3">Module 3</option>
          <option value="M4">Module 4</option>
        </Select>
        <Input
          width={200}
          type="search"
          variant="outline"
          placeholder="Search UI Feature "
          value={searchUI}
          onChange={(e) => {
            setSearchUI(e.target.value);
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

      <AddFrontendUI
        isOpen={isOpen}
        onClose={onClose}
        isEditable={isEditable}
        featureUiData={userData}
        isLoading={isLoading}
        updateFeatureUi={updateFeatureUiData}
        addFeatureUi={addFeatureUiData}
      />

      {isDataLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          columns={columns}
          data={usersRecord}
          pagination={true}
          paginationPerPage={paginationProps.limit || 10}
          paginationRowsPerPageOptions={[10, 50, 100, 250]}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationDefaultPage={paginationProps.offset}
          paginationServer
          onChangePage={(page: any) => setPaginationProps({ ...paginationProps, offset: page })}
          paginationTotalRows={totalUsers}
          customStyles={customStyles}
          noHeader={true}
        />
      )}
    </>
  )
}

export default FrontendUI
