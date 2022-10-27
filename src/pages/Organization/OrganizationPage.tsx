import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import MainLayout from '../../components/common/layouts/Mainlayout'
import Organization from './Organizations/Organization'
import Employees from './Emplyoees/Employees'
import Settlements from './Settlements/Settlements'
import Vendors from './Vendors/Vendors'

export interface OrganizationPageProps {}

const OrganizationPage: React.FC<OrganizationPageProps> = (props) => {
  return (
    <MainLayout title="Organization">
      <Tabs colorScheme="blue">
        <TabList>
          <Tab>Organization</Tab>
          <Tab>Employees</Tab>
          <Tab>Vendors</Tab>
          <Tab>Settlements</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Organization />
          </TabPanel>

          <TabPanel>
            <Employees />
          </TabPanel>

          <TabPanel>
            <Vendors />
          </TabPanel>

          <TabPanel>
            <Settlements />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainLayout>
  )
}

export default OrganizationPage
