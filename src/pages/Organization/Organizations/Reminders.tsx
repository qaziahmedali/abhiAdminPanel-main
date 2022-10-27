import React, { useState } from 'react'
import { Stack, Select, Table, Tbody, Tr, Td } from '@chakra-ui/react'
import { Flex, Spacer, Button, useDisclosure, Tooltip } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { useEasyActions } from '../../../store/hooks'
//import Table from "../../../components/common/DataTable";

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

const Reminders: React.FC<ManagePageProps> = (props) => {
  let history = useHistory()
  const { setLoginStatus } = useEasyActions((state) => state.user)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true
    },
    {
      name: 'Document Name',
      selector: 'date',
      sortable: true
    },
    {
      name: 'Path',
      selector: 'date',
      sortable: true
    },

    {
      name: '',
      selector: 'view',
      cell: () => {
        return <Button>Download</Button>
      }
    }
  ]

  const [name, setName] = useState('')
  const [employee, setEmployeeName] = useState('')
  const [amount, setAmount] = useState('')
  const [organization, setOrganization] = useState('')
  const [status, setStatus] = useState('')
  const [source, setSource] = useState('')
  const weekDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Firday', 'Saturday', 'Sunday']
  return (
    <>
      <Stack spacing="24px">
        <Table mt="5" size="sm">
          <Tbody>
            <Tr>
              <Td>Weekly Reminders</Td>
              <Td></Td>
            </Tr>

            <Tr>
              <Td>Bi Weekly reminder</Td>
              <Td>Day of week for reminder</Td>
              <Td>
                <Select placeholder="Select Day">
                  {weekDay.map((day, index) => {
                    return <option key={index}>{day}</option>
                  })}
                </Select>
              </Td>
            </Tr>

            <Tr>
              <Td>Monthly Reminder</Td>
              <Td>No of days before month end</Td>
              <Td>5</Td>
            </Tr>
          </Tbody>
        </Table>
        {/* <FormLabel htmlFor="week">Weekly Reminder</FormLabel>
          <FormLabel htmlFor="day">Day of week for reminder</FormLabel>
          <Select placeholder="Select option">
            {weekDay.map((day, index) => {
              return <option key={index}>{day}</option>;
            })}
          </Select> */}

        {/* <Input
           
            placeholder="Weekly Reminder"
            onChange={(event) => setEmployeeName(event.currentTarget.value)}
          /> */}

        {/* <Grid templateColumns="repeat(2, 1fr)" gap={0}>
          <FormLabel htmlFor="name">Bi Weekly reminder</FormLabel>
        </Grid>

        <Grid templateColumns="repeat(3, 1fr)" gap={0}>
          <FormLabel htmlFor="name">Monthly reminder</FormLabel>
          <FormLabel htmlFor="day">No of days before month end</FormLabel>

          <Input
            //ref={firstField}
       
            placeholder="days"
            onChange={(event) => setEmployeeName(event.currentTarget.value)}
          />
        </Grid> */}
      </Stack>
      <Flex mt="3">
        <Spacer />
        <Button colorScheme="green" mr={3}>
          Cancel
        </Button>
        <Button type="submit" bg="#7367F0" color="#ffffff">
          Submit
        </Button>
      </Flex>
    </>
  )
}

export default Reminders
