import React from 'react'
import { Tab, TabList, TabPanels, Tabs, TabPanel } from '@chakra-ui/react'
import EmployeeGeneralTab from './elements/General'
import EmployeePoliciesTab from './elements/Policies'
import { useEasyState } from '@/store/hooks'

type EmployeeDetailProps = {
  employeeId: string
}

const EmployeeDetail: React.FC<EmployeeDetailProps> = (props) => {
  const { employees } = useEasyState((state) => state.organization)

  const employee = employees.find((e) => e.id === props.employeeId)

  const jsonConfig = employee?.organizationEmployeesConfigurations[0]?.jsonConfig

  return (
    <Tabs>
      <TabList>
        <Tab>General</Tab>
        <Tab>Policies</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <EmployeeGeneralTab bankAccount={employee?.selectedBankAccount} person={employee?.person} />
        </TabPanel>
        <TabPanel>
          <EmployeePoliciesTab jsonConfig={jsonConfig} employeeId={props.employeeId} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default EmployeeDetail
