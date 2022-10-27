import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  NumberInput,
  NumberInputField,
  Table,
  Tr,
  Td,
  Tbody
} from '@chakra-ui/react'
import { useEasyActions } from '../../../store/hooks'

export interface ApproveRejectModelProps {
  isOpen: boolean
  onClose: any
  approveHandler: any

  rejectHandler: any

  RowId: string

  approvedAmount: number
}

const ApproveRejectModel: React.FC<ApproveRejectModelProps> = (props) => {
  const [approvedAmount, setApprovedAmount] = useState<number>(props?.approvedAmount)

  useEffect(() => {
    setApprovedAmount(props?.approvedAmount)
  }, [props?.approvedAmount])

  const cancelHandler = () => {
    props.onClose()
  }

  return (
    <Modal scrollBehavior="inside" isCentered={true} size="2xl" isOpen={props.isOpen} onClose={cancelHandler}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Approve/Reject Transaction </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div style={{ marginLeft: '50px', backgroundColor: '#f7fafc' }}>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td>
                    <FormLabel htmlFor="Approved Amount"> Enter Approved Amount</FormLabel>
                  </Td>
                  <Td>
                    <NumberInput
                      // defaultValue={props?.approvedAmount}
                      value={approvedAmount}
                      step={1}
                      min={0}
                      placeholder="1,00,000"
                      inputMode="numeric"
                      onChange={(event) => setApprovedAmount(Number(event.replace(/[^0-9]/gi, '')))}
                    >
                      <NumberInputField />
                    </NumberInput>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <p> Actions</p>{' '}
                  </Td>
                  <Td>
                    <div
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipses',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Button
                        bg="teal"
                        onClick={() => props?.approveHandler(props?.RowId, approvedAmount)}
                        colorScheme="#fff"
                      >
                        Approve
                      </Button>{' '}
                      <Button
                        bg="#ff0000"
                        onClick={() => props?.rejectHandler(props?.RowId, approvedAmount)}
                        colorScheme="#fff"
                      >
                        Reject
                      </Button>
                    </div>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button bg="#7367F0" mr={3} color="whiteAlpha.900" onClick={cancelHandler}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ApproveRejectModel
