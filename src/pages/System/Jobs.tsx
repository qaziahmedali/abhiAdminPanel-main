import React, { useState } from 'react'
import { Flex, Spacer, Button, useDisclosure, Tooltip } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { useEasyActions } from './../../store/hooks'
import Table from '../../components/common/DataTable'
import { ViewIcon } from '@chakra-ui/icons'
import JobView from './JobView'

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

const Jobs: React.FC<ManagePageProps> = (props) => {
  let history = useHistory()
  const { setLoginStatus } = useEasyActions((state) => state.user)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [jobView, setJobView] = useState(false)
  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true
    },
    {
      name: 'Name',
      selector: 'date',
      sortable: true
    },
    {
      name: 'Schedule',
      selector: 'type',
      sortable: true
    },
    {
      name: 'Actions',
      selector: 'view',
      cell: () => {
        return (
          <>
            <Button onClick={viewHandler}>
              <Tooltip label="Edit" aria-label="Edit">
                <ViewIcon />
              </Tooltip>
            </Button>
          </>
        )
      }
    }
  ]

  const viewHandler = () => {
    setJobView(!jobView)
  }

  return (
    <>
      <Flex mb="5">
        <Spacer />
      </Flex>
      <Table columns={columns} data={data} />
      {jobView && <JobView />}
    </>
  )
}

export default Jobs
