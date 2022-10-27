import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import React, { useState } from 'react'

import { useEasyActions } from '@/store/hooks'

type SendOnboardingSMSAndEmailProps = {
  organizations: string[]
  employeeIds: string[]
  modalLabel?: string
}

export const SendOnboardingSMSAndEmail: React.FC<SendOnboardingSMSAndEmailProps> = (props) => {
  const toast = useToast()
  const { onClose, onOpen, isOpen } = useDisclosure()

  const { employeeOnboarding } = useEasyActions((state) => state.organization)

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    const { organizations = [], employeeIds = [] } = props

    setIsLoading(true)
    try {
      if (employeeIds.length > 0) {
        await employeeOnboarding({ employeeIds })
      } else if (organizations.length > 0) {
        const promises = []
        for (const organizationId of organizations) {
          promises.push(employeeOnboarding({ organizationId }))
        }

        await Promise.all(promises)
      } else {
        return toast({
          title: 'Please select employees or organizations!',
          status: 'warning'
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      onClose()
    }
  }

  return (
    <>
      <Button bg="#7367F0" ml="3" colorScheme="#ffffff" onClick={onOpen}>
        {props.modalLabel || 'Send Welcome SMS & Email'}
      </Button>

      <Modal scrollBehavior="inside" isCentered={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Please confirm</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text>Are you sure to send SMS and Email to selected employees ?</Text>
          </ModalBody>

          <ModalFooter>
            <Button isDisabled={isLoading} onClick={onClose} mr={4}>
              Cancel
            </Button>
            <Button isLoading={isLoading} onClick={onSubmit} colorScheme="green">
              Ok
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
