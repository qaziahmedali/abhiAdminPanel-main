import React, { useState, useRef } from 'react'
import {
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Select,
  ModalCloseButton,
  Button,
  Table,
  Tr,
  Td,
  Tbody
} from '@chakra-ui/react'
import { useEasyActions } from '../../../../store/hooks'
import _ from 'lodash'

export interface TransactionDetailProps {
  isOpen: boolean
  onClose: any
  BankDetail: any
  isApproved: boolean
  isRejected: boolean
  employeeApproveHandler: any
  employeeRejectHandler: any
  transactionId: any
}

const TransactionDetail: React.FC<TransactionDetailProps> = (props) => {
  const { UpdateTransactionStatus } = useEasyActions((state) => state.monitor)

  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const updateTransactionResponse = async () => {
    setLoading(true)
    const params: any = {
      uuid: props?.BankDetail?.id,
      status: status
    }
    const response = await UpdateTransactionStatus(params)
    if (response.status === 'success') {
      props.onClose()
    }
    setLoading(false)
  }

  const cancelHandler = () => {
    props.onClose()
  }

  return (
    <Modal scrollBehavior="inside" isCentered={true} size="2xl" isOpen={props.isOpen} onClose={cancelHandler}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Details </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div style={{ marginLeft: '50px', backgroundColor: '#f7fafc' }}>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td>
                    <p> Request Status</p>{' '}
                  </Td>
                  <Td>{props.BankDetail?.requestStatus}</Td>
                </Tr>
                <Tr>
                  <Td>
                    <p> Bank Name</p>{' '}
                  </Td>
                  <Td>
                    {props?.BankDetail
                      ? props.BankDetail.employee?.selectedBankAccount?.bank.bankName
                      : 'BankName has not been defined'}
                  </Td>
                </Tr>

                <Tr>
                  <Td>
                    <p> Employee Contribution %</p>{' '}
                  </Td>
                  <Td>{props.BankDetail?.employeeContribution ? props.BankDetail?.employeeContribution : '-'}</Td>
                </Tr>
                <Tr>
                  <Td>Transaction Status</Td>
                  <Td>
                    <Select
                      onChange={(event) => setStatus(event.currentTarget.value)}
                      defaultValue={props?.BankDetail?.transactionStatus}
                    >
                      <option value="awaited">Awaited</option>
                      <option value="disputed">Disputed</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                      <option value="completed">Completed</option>
                    </Select>
                    {/* <Button
                      size="sm"
                      onClick={() =>
                        props.employeeRejectHandler(props.BankDetail)
                      }
                      disabled={
                        props.BankDetail.requestStatus !== "pending_approval"
                      }
                    >
                      {props?.isRejected &&
                      props?.BankDetail?.id === props?.transactionId ? (
                        <Spinner />
                      ) : (
                        "Reject"
                      )}
                    </Button> */}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3} disabled={!status} onClick={updateTransactionResponse}>
            {loading ? <Spinner /> : 'save'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default TransactionDetail
