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

export interface ResponseModalProps {
  isOpen: boolean
  onClose: any
  data: any
}

const ResponseModal: React.FC<ResponseModalProps> = (props) => {
  const data = !_.isEmpty(props.data) && props.data.financialTransactionsResponses[0]

  return (
    <Modal scrollBehavior="inside" isCentered={true} size="xl" isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Response</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ReactJson src={data.responseJson} theme="monokai" />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export default ResponseModal
