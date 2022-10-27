import React from 'react'
import { Table, Tr, Td, Tbody } from '@chakra-ui/react'

export interface OrganizationProps {
  organization: any
}

const Organization: React.FC<OrganizationProps> = (props) => {
  return (
    <Table variant="simple">
      <Tbody>
        <Tr>
          <Td> Name </Td>
          <Td> {props.organization.name}</Td>
        </Tr>
        <Tr>
          <Td>Address</Td>
          <Td> {props.organization.address}</Td>
        </Tr>
        <Tr>
          <Td>City</Td>
          <Td>{props.organization.city}</Td>
        </Tr>
        <Tr>
          <Td>Country</Td>
          <Td> {props.organization.country}</Td>
        </Tr>
        <Tr>
          <Td>Business Type</Td>
          <Td> {props.organization.businessType}</Td>
        </Tr>
        <Tr>
          <Td>Industry </Td>
          <Td> {props.organization.industry}</Td>
        </Tr>
      </Tbody>
    </Table>
  )
}

export default Organization
