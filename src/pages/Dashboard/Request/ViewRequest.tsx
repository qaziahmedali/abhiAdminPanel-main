import React from 'react'
import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'

import Documents from './Document'
import Requester from './Requester'
import Organization from './Organization'

export interface RequesterProps {
  isOpen: boolean
  setTemplate: any
  manageData: any
}

const viewRequester: React.FC<RequesterProps> = (props) => {
  let orgData = {
    name: 'Tkxel',
    address: 'Lahore',
    city: 'Lahore',
    country: 'Pakistan',
    businessType: 'Develpor',
    industry: 'IT'
  }

  const documentData = [
    { name: 'ABC', description: 'description' },
    { name: 'XYZ', description: 'description' }
  ]

  let requesterData = {
    name: 'Mouzam_Ali',
    phone: '03145209757',
    email: 'mouzam.ali@tkxel.com',
    designation: 'Software Developer'
  }

  return (
    <Modal size="2xl" isOpen={props.isOpen} onClose={props.setTemplate}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          <Tabs colorScheme="blue">
            <TabList>
              <Tab>Organization</Tab>
              <Tab>Documents</Tab>
              <Tab>Requester</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Organization organization={orgData} />
              </TabPanel>

              <TabPanel>
                <Documents documents={documentData} />
              </TabPanel>

              <TabPanel>
                <Requester requester={requesterData} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={props.setTemplate}>
            Approve
          </Button>
          <Button colorScheme="blue" mr={3}>
            Decline
          </Button>

          {/* <Button variant="ghost"> Action</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default viewRequester
