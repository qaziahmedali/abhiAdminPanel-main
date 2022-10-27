import React, { useState } from 'react'
import {
  Text,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'
import { useEasyActions } from '../../../store/hooks'
import _ from 'lodash'

export interface ConfirmModalProps {
  isOpen: boolean
  onClose: any
  selectedEmployees: any
}

const ConfirmModal: React.FC<ConfirmModalProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)

  const { employeeOnboarding } = useEasyActions((state) => state.organization)

  const cancelHandler = () => {
    setAlert(false)
    setSuccess(false)
    props.onClose()
  }

  const submitHandler = async () => {
    setIsLoading(true)
    if (!_.isEmpty(props.selectedEmployees.users)) {
      const response = await employeeOnboarding(props.selectedEmployees)
      if (response) {
        setIsLoading(false)
        setSuccess(true)
      } else {
        setIsLoading(false)
        setAlert(true)
      }
    }
  }

  return (
    <Modal scrollBehavior="inside" isCentered={true} size="2xl" isOpen={props.isOpen} onClose={cancelHandler}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Please Confirm </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!_.isEmpty(props.selectedEmployees.users) ? (
            <Text> Are you sure to send SMS and Email to selected employees ?</Text>
          ) : (
            <Text> Please select employees to send SMS and Email.</Text>
          )}
        </ModalBody>

        <ModalFooter>
          {alert && (
            <Text color="red" mr="5">
              Something went wrong
            </Text>
          )}
          {success && (
            <Text color="green" mr="5">
              Success
            </Text>
          )}

          {!_.isEmpty(props.selectedEmployees.users) && !success ? (
            <>
              <Button colorScheme="green" mr={3} onClick={cancelHandler}>
                No
              </Button>
              <Button colorScheme="blue" mr={3} onClick={submitHandler}>
                {isLoading ? <Spinner /> : 'Yes'}
              </Button>
            </>
          ) : (
            <Button colorScheme="green" mr={3} onClick={cancelHandler}>
              Ok
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal
