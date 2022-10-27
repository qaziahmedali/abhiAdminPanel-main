import React from 'react'
import { Link } from '@chakra-ui/react'
import Table from '../../../components/common/DataTable'

import { ExternalLinkIcon } from '@chakra-ui/icons'

export interface ManagersProps {
  managers: any
}

const Managers: React.FC<ManagersProps> = (props) => {
  const onChangePage = (page: any, totalRows: any) => {}

  const columns = [
    {
      name: '#',
      selector: 'id',
      sortable: true,
      width: '50px',
      cell: (row: any, index: any) => <p>{index + 1}</p>
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      cell: (row: any) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {row.manager.person.firstName + ' ' + row.manager.person.lastName}
        </div>
      )
    },
    {
      name: 'Designation',
      selector: 'organizationManagementRole',
      sortable: true
    },
    {
      name: 'Portal role(s)',
      selector: 'role',
      sortable: true
    },
    {
      name: 'Action',
      selector: 'action',
      sortable: true,
      cell: (row: any) => (
        <Link href="https://google.com" isExternal color="red">
          Sign in as customer <ExternalLinkIcon mx="2px" />
        </Link>
      )
    }
  ]

  return (
    <Table
      columns={columns}
      data={props?.managers}
      onChangePage={onChangePage}
      paginationTotalRows={props?.managers?.length}
    />
  )
}

export default Managers
