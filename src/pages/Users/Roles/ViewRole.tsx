import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import { useEasyActions } from '../../../store/hooks'

import FrontendAcl from './FrontendAcl'
import BackendAcl from './BackendAcl'

export interface ManagePageProps {
  roleId: string
}

const ViewRole: React.FC<ManagePageProps> = (props) => {
  return (
    <Tabs variant="line" colorScheme="gray">
      <TabList>
        <Tab>Frontend</Tab>
        <Tab>Backend</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <FrontendAcl roleId={props?.roleId} />
        </TabPanel>

        <TabPanel>
          <BackendAcl roleId={props?.roleId} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default ViewRole
