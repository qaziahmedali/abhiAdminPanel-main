import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { resetStore } from '../../store'
import { useEasyActions } from '../../store/hooks'
import MainLayout from '../../components/common/layouts/Mainlayout'
import Table from '../../components/common/DataTable'
import Jobs from './Jobs'
import Settings from './Settings'

export interface MonitorPageProps {}

const SystemPage: React.FC<MonitorPageProps> = (props) => {
  return (
    <MainLayout title="System">
      <Tabs colorScheme="blue">
        <TabList>
          <Tab>Settings</Tab>
          <Tab>Jobs</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Settings />
          </TabPanel>

          <TabPanel>
            <Jobs />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainLayout>
  )
}

export default SystemPage
