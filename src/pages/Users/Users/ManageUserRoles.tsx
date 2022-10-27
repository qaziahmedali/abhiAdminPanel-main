import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import Roles from './Roles'
import Modules from './Modules'

export interface ManagePageProps {
  userId: string
}

const ViewRole: React.FC<ManagePageProps> = (props) => {
  return (
    <Tabs variant="line" colorScheme="gray">
      <TabList>
        <Tab>Roles</Tab>
        <Tab>Platform Services</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Roles userId={props.userId} />
        </TabPanel>

        <TabPanel>
          <Modules userId={props.userId} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default ViewRole
