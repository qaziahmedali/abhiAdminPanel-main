import React, { useState } from 'react'
import { Text, Heading, Flex, Spacer, Button, useDisclosure, Tooltip } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

import { useEasyActions } from './../../store/hooks'
import Table from '../../components/common/DataTable'
import StatusView from './StatusView'
import { ViewIcon } from '@chakra-ui/icons'

const data = [
  {
    id: 1,
    date: 'Business 1',
    type: 'exception',
    description: 'description',
    module: 'module',
    level: 'high',
    view: 'completed'
  },
  {
    id: 2,
    date: 'Business 2',
    type: 'error',
    description: 'description',
    module: 'module',
    level: 'high',
    view: 'completed'
  },
  {
    id: 3,
    date: 'Business 3',
    type: 'warning',
    description: 'description',
    module: 'module',
    level: 'high',
    view: 'completed'
  },
  {
    id: 4,
    date: 'Business 4',
    type: 'warning',
    description: 'description',
    module: 'module',
    level: 'mdeium',
    view: 'completed'
  }
]

export interface ManagePageProps {}

const JobView: React.FC<ManagePageProps> = (props) => {
  const { onOpen } = useDisclosure()
  const [statusView, setStatusView] = useState(false)

  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true
    },
    {
      name: 'Date & Time',
      selector: 'date',
      sortable: true
    },
    {
      name: 'Organization name',
      selector: 'type',
      sortable: true
    },

    {
      name: 'Status',
      selector: 'type',
      sortable: true
    },

    {
      name: 'Remarks',
      selector: 'type',
      sortable: true
    },
    {
      name: 'Action',
      selector: 'view',
      cell: () => {
        return (
          <>
            <Button onClick={statusViewHandler}>
              <Tooltip label="View" aria-label="View">
                <ViewIcon />
              </Tooltip>
            </Button>
          </>
        )
      }
    }
  ]

  const statusViewHandler = () => {
    setStatusView(!statusView)
  }

  return (
    <>
      <Flex m="5">
        <Heading size="md">Job View</Heading>
        <Spacer />
        <Button bg="#7367F0" colorScheme="#ffffff" onClick={onOpen}>
          Filters
        </Button>
      </Flex>
      <Table columns={columns} data={data} />
      {statusView && <StatusView />}
    </>
  )
}

export default JobView
