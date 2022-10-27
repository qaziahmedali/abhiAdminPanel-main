import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import MainLayout from '../../components/common/layouts/Mainlayout'
import Users from './Users/Users'
import Roles from './Roles/Roles'
import Modules from './Modules group/Modules'
import Backend from './Backendgroup/Backend'

export interface UsersPageProps {}

const UsersPage: React.FC<UsersPageProps> = (props) => {
  return (
    <MainLayout title="Users">
      <Tabs colorScheme="blue">
        <TabList>
          <Tab>Users</Tab>
          <Tab>Roles</Tab>
          <Tab>Platform Services</Tab>
          <Tab>Backend Features</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Users />
          </TabPanel>

          <TabPanel>
            <Roles />
          </TabPanel>
          <TabPanel>
            <Modules />
          </TabPanel>

          <TabPanel>
            <Backend />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainLayout>
  )
}

export default UsersPage
