import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import EWATransactions from './EWA Transactions/EWATransactions'
import BillPayment from './BillPayment/BillPayment'

export interface TransactionPageProps {}

const TransactionPage: React.FC<TransactionPageProps> = (props) => {
  return (
    <Tabs colorScheme="blue">
      <TabList>
        <Tab>All</Tab>
        <Tab>Bill Payments</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <EWATransactions />
        </TabPanel>
        <TabPanel>
          <BillPayment />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default TransactionPage
