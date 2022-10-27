import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import General from './General'
import Documents from './Documents'
import Managers from './Managers'
import Policies from './Policies'
import { TariffData } from '@/types/store-types'
import { OrganizationByID } from '@/types/organizations/organizationById'

export interface ManageProps {
  data: any
  organizationData: OrganizationByID
  manageLoading: boolean
  setOrganizationStatus: any
  setTariffData: any
  tariff: TariffData
  setBillPaymentTariff: (val:string) => void
  onChangeTab: (tabIndex: number) => void
}

const Manage: React.FC<ManageProps> = (props) => {
  return (
    <>
      <Tabs colorScheme="green" onChange={props.onChangeTab}>
        <TabList>
          <Tab>General</Tab>
          <Tab>Documents</Tab>
          <Tab>Managers</Tab>
          <Tab>Policies</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <General
              data={props?.data}
              organizationData={props?.organizationData}
              manageLoading={props?.manageLoading}
              setTariffData={props?.setTariffData}
              tariff={props?.tariff}
              setBillPaymentTariff={props?.setBillPaymentTariff}
              setOrganizationStatus={props?.setOrganizationStatus}
            />
          </TabPanel>

          <TabPanel>
            <Documents />
          </TabPanel>

          <TabPanel>
            <Managers managers={props.data.organizationManagers} />
          </TabPanel>

          <TabPanel>
            <Policies organizationConfigurations={props?.organizationData?.organizationConfigurations} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* </Box> */}
    </>
  )
}

export default Manage
