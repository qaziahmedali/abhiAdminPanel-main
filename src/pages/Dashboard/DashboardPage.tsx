import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { resetStore } from '../../store'
import { useEasyActions } from '../../store/hooks'
import MainLayout from '../../components/common/layouts/Mainlayout'
import Referrals from './Referral/Referrals'
import Guest from './Guest/Guest'
import EmployersRequest from './Request/EmployersRequest'

export interface DashboardPageProps {}
const DashboardPage: React.FC<DashboardPageProps> = (props) => {
  let history = useHistory()
  const { setLoginStatus } = useEasyActions((state) => state.user)

  async function handleLogout() {
    await resetStore()
    setLoginStatus(false)
    history.push('/')
  }
  return (
    <>
      <MainLayout title="Dashboard">
        <Tabs colorScheme="blue">
          <TabList>
            <Tab>Referrals</Tab>
            <Tab>Guest</Tab>

            <Tab>Employers Request</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Referrals />
            </TabPanel>

            <TabPanel>
              <Guest />
            </TabPanel>

            <TabPanel>
              {' '}
              <EmployersRequest />{' '}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </MainLayout>
    </>
  )
}

export default DashboardPage
