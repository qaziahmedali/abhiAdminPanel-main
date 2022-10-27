import React from 'react'
import { Heading, Flex, Spacer, Button, useDisclosure, Tooltip } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

import { useEasyActions } from './../../store/hooks'
import Table from '../../components/common/DataTable'
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

const StatusView: React.FC<ManagePageProps> = (props) => {
  const { onOpen } = useDisclosure()

  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true
    },
    {
      name: 'Date and Time',
      selector: 'date',
      sortable: true
    },
    {
      name: 'Status',
      selector: 'type',
      sortable: true
    },
    {
      name: 'Remarks',
      selector: 'view',
      cell: () => {
        return (
          <>
            <Button onClick={onOpen}>
              <Tooltip label="View" aria-label="View">
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
      <Flex m="5">
        <Heading size="md">Organization Status View</Heading>
        <Spacer />
        <Button bg="#7367F0" colorScheme="#ffffff" onClick={onOpen}>
          Log
        </Button>
      </Flex>
      <Table columns={columns} data={data} />
    </>
  )
}

export default StatusView
