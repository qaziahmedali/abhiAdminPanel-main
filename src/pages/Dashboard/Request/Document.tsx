import React from 'react'
import { Table, Tr, Td, Th, Thead, Tbody } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'

export interface DocumentProps {
  documents: any
}

const Documents: React.FC<DocumentProps> = (props) => {
  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Name</Th>
            <Th> Description</Th>

            <Th> Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.documents.map((val: any, index: any) => {
            return (
              <Tr key={index}>
                <Td>{index + 1}</Td>

                <Td>{val.name}</Td>
                <Td>{val.description}</Td>
                <Td>
                  {' '}
                  <Link> Download</Link>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </>
  )
}

export default Documents
