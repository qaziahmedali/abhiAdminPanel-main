import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import MainLayout from '../../components/common/layouts/Mainlayout'
import FeeManagement from './FeeManagement/FeeManagement'
import BusinessTypes from './BusinessType/BusinessTypes'
import PaymentGateway from './PaymentGateway/PaymentGateway'
// import EmailAndTemplates from "./EmailAndTemplates/EmailAndTemplates";
import AllTemplates from './EmailAndTemplates/AllTemplates'
import AbhiSuperLeague from './AbhiSuperLeague/AbhiSuperLeague'

export interface ManagePageProps {}

const ManagePage: React.FC<ManagePageProps> = () => {
  return (
    <MainLayout title="Manage">
      <Tabs variant="line" colorScheme="blue">
        <TabList>
          <Tab>Fee Management</Tab>
          <Tab>Business Types</Tab>
          <Tab>Templates</Tab>
          <Tab>Payment Gateway</Tab>
          <Tab>Abhi Super League</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <FeeManagement />
          </TabPanel>

          <TabPanel>
            <BusinessTypes />
          </TabPanel>

          <TabPanel>
            <AllTemplates />
          </TabPanel>

          <TabPanel>
            <PaymentGateway />
          </TabPanel>
          <TabPanel>
            <AbhiSuperLeague />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainLayout>
  )
}

export default ManagePage
