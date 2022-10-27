import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import PaymentPurposes from './PaymentPurposes'
import Configurations from './Configurations'
import Banks from './Banks'
import ResponseCodes from './ResponseCodes'
import BillerPayment from './BillerPayment/BillerPayment'

export interface OneLinkProps {}

const OneLink: React.FC<OneLinkProps> = () => {
  return (
    <>
      <Tabs colorScheme="blue">
        <TabList>
          <Tab>Configurations</Tab>
          <Tab>Banks</Tab>
          <Tab>Payment purposes</Tab>
          <Tab>Response Codes</Tab>
          <Tab>Biller Payments</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Configurations />
          </TabPanel>

          <TabPanel>
            <Banks />
          </TabPanel>

          <TabPanel>
            <PaymentPurposes />
          </TabPanel>

          <TabPanel>
            <ResponseCodes />
          </TabPanel>
          <TabPanel>
            <BillerPayment />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default OneLink
