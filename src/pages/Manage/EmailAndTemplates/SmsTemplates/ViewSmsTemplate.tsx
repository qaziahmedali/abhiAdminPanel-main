import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
export interface IViewSmsTemplate {
  isOpen: boolean
  name: string
  smsBody: string
  onClose: () => void
}

const ViewSmsTemplate: React.FC<IViewSmsTemplate> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p
            dangerouslySetInnerHTML={{
              __html: props.smsBody.replaceAll('\n', '<br />')
            }}
          />
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export default ViewSmsTemplate
