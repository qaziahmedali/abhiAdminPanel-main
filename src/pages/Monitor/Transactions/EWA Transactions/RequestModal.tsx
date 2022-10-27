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
import ReactJson from 'react-json-view'
import _ from 'lodash'

export interface RequestModalProps {
  isOpen: boolean
  onClose: any
  data: any
}

const RequestModal: React.FC<RequestModalProps> = (props) => {
  const data = !_.isEmpty(props.data) && props.data.financialTransactionsRequests[0]

  return (
    <Modal scrollBehavior="inside" isCentered={true} size="xl" isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Request</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ReactJson src={data.requestJson} theme="monokai" />
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export default RequestModal
