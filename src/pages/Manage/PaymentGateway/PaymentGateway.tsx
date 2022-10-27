import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Link from './1Link'

export interface PaymentGatewayProps {}

const PaymenetGateway: React.FC<PaymentGatewayProps> = (props) => {
  return (
    <>
      <Tabs variant="unstyled" colorScheme="blue">
        <TabList>
          <Tab>1 Link</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Link />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default PaymenetGateway
