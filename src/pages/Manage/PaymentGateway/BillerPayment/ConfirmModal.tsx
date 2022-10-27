import {
  Button,
  Flex,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import React from 'react'

export interface IConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  description: string
  heading: string
  onConfirm: () => Promise<void>
}

const ConfirmModal = ({ isOpen, onClose, onConfirm, description, heading }: IConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {heading && <ModalHeader>{heading}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>
          <Text>{description}</Text>
        </ModalBody>

        <ModalFooter>
          <Flex justifyContent="flex-end">
            <GridItem>
              <Button bg="#7367F0" colorScheme="#ffffff" type="button" onClick={onClose}>
                Cancel
              </Button>
            </GridItem>
            <GridItem>
              <Button bg="#7367F0" colorScheme="#ffffff" type="button" onClick={onConfirm}>
                Confirm
              </Button>
            </GridItem>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal
