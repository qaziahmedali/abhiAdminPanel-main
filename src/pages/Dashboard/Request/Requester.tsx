import React from 'react'
import { Table, Tr, Td, Tbody } from '@chakra-ui/react'

export interface RequesterProps {
  requester: any
}

const Requester: React.FC<RequesterProps> = (props) => {
  return (
    <Table variant="simple">
      <Tbody>
        <Tr>
          <Td> Name </Td>
          <Td> {props.requester.name}</Td>
        </Tr>
        <Tr>
          <Td>Phone</Td>
          <Td> {props.requester.phone}</Td>
        </Tr>
        <Tr>
          <Td>Email</Td>
          <Td> {props.requester.email}</Td>
        </Tr>
        <Tr>
          <Td>Designation</Td>
          <Td> {props.requester.designation}</Td>
        </Tr>
      </Tbody>
    </Table>
  )
}

export default Requester
