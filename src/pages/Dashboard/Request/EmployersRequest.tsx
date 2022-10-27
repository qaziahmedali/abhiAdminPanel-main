import React, { useState } from 'react'
import { Flex, Spacer, Button, useDisclosure, Tooltip } from '@chakra-ui/react'
import { useEasyState } from '../../../store/hooks'
import { ViewIcon } from '@chakra-ui/icons'
import moment from 'moment'
import ViewRequest from './ViewRequest'
import FilterRequest from './FilterRequest'
import FilterIcon from '@/components/common/FilterIcon'
import Table from '@/components/common/DataTable'

export interface EmployeersRequestProps {}

const EmployersRequest: React.FC<EmployeersRequestProps> = (props) => {
  const { organizations } = useEasyState((state) => state.organization)

  const [openModal, setopenModal] = useState(false)
  const [viewModal, setViewModal] = useState(false)

  const [viewResponse, setResponse] = useState(false)

  const [alert, setAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [showAll, setShowAll] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const viewRequestData = async (row: any) => {
    setopenModal(!openModal)
    //  setManageData(row);
  }

  const filterRequest = (params: any) => {
    setAlert(false)
    setIsLoading(true)
    onClose()
  }

  const onChangePage = (page: any, totalRows: any) => {}

  const clearFilter = () => {}

  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,
      width: '30px',
      cell: (row: any, index: any) => <p>{index + 1}</p>
    },
    {
      name: 'Date ',
      selector: 'date',
      sortable: true,
      cell: (row: any) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {moment(row.createdAt).format('MMM Do,YYYY')}
        </div>
      )
    },
    {
      name: 'Organization',
      selector: 'name',
      sortable: true,
      cell: (row: any) => <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>{row.name}</div>
    },
    {
      name: 'Industry',
      selector: 'industry',
      sortable: true
    },
    {
      name: 'Business nature',
      selector: 'module',
      sortable: true,
      width: '150px',
      cell: (row: any) => <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>{row.businessType.name}</div>
    },
    {
      name: 'Representive',
      selector: 'level',
      sortable: true
    },
    {
      name: 'City',
      selector: 'level',
      sortable: true,
      cell: (row: any) => <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>{row.address.city}</div>
    },
    {
      name: 'Country',
      selector: 'level',
      sortable: true,
      cell: (row: any) => <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>{row.businessType.country}</div>
    },
    {
      name: 'Status',
      selector: 'level',
      sortable: true,
      cell: (row: any) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {row.active ? <p>Active</p> : <p>InActive</p>}
        </div>
      )
    },
    {
      name: 'Actions',
      selector: 'view',
      cell: (row: any) => {
        return (
          <>
            <Button onClick={() => viewRequestData(row)}>
              <Tooltip label="Edit" aria-label="Edit">
                <ViewIcon />
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
        <Spacer />

        {showAll && (
          <Button bg="#7367F0" colorScheme="#ffffff" onClick={clearFilter}>
            Show All
          </Button>
        )}
        <Button bg="#7367F0" colorScheme="#ffffff" ml="3" onClick={onOpen}>
          <FilterIcon />
        </Button>
      </Flex>
      <ViewRequest isOpen={openModal} setTemplate={viewRequestData} manageData={''} />
      <FilterRequest
        isOpen={isOpen}
        onClose={onClose}
        alertMessage={alert}
        isLoading={isLoading}
        filterRequest={filterRequest}
      />

      <Table
        columns={columns}
        data={organizations}
        onChangePage={onChangePage}
        paginationTotalRows={organizations.length}
      />
    </>
  )
}

export default EmployersRequest
