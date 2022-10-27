import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import EmailAndTemplates from './EmailAndTemplates'
import SMSTemplates from './SmsTemplates/SmsTemplates'

function AllTemplates() {
  const [tabIndex, setTabIndex] = React.useState(0)

  return (
    <Tabs colorScheme="blue" onChange={setTabIndex}>
      <TabList>
        <Tab>Email Templates</Tab>
        <Tab>SMS Templates</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <EmailAndTemplates />
        </TabPanel>
        <TabPanel>
          <SMSTemplates tabIndex={tabIndex} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default AllTemplates
