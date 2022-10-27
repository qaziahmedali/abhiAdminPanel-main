import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import ManageCost from './ManageCost'
import ManageTariff from './ManageTariff'

export interface FreeManagementProps {}

const FeeManagement: React.FC<FreeManagementProps> = () => {
  return (
    <Tabs colorScheme="blue">
      {/* variant="unstyled" */}
      <TabList>
        <Tab>Tariff</Tab>
        <Tab>Cost</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ManageTariff />
        </TabPanel>

        <TabPanel>
          <ManageCost />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default FeeManagement
