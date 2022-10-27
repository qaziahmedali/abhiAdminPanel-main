import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import MainLayout from '../../components/common/layouts/Mainlayout'
import TransactionPage from './Transactions/Transaction'
import VendorTransactions from './Vendor Transactions/VendorTransaction'
import AbhiSuperLeague from './ASL/AbhiSuperLeague'

export interface MonitorPageProps {}

const MonitorPage: React.FC<MonitorPageProps> = (props) => {
  return (
    <MainLayout title="Monitor">
      <Tabs colorScheme="blue">
        <TabList>
          <Tab>Employee Transactions</Tab>
          <Tab>Vendor Transactions</Tab>
          <Tab>Abhi Super League</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <TransactionPage />
          </TabPanel>

          <TabPanel>
            <VendorTransactions />
          </TabPanel>

          <TabPanel>
            <AbhiSuperLeague />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainLayout>
  )
}

export default MonitorPage
