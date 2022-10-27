import React, { useState } from 'react'
import {
  Button,
  Checkbox,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  Text,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Table,
  Tr,
  Td,
  Tbody,
  useToast,
  useDisclosure
} from '@chakra-ui/react'

import { EditIcon } from '@chakra-ui/icons'
import { organizationService } from '@/services/organizationService'
import { useEasyActions, useEasyState } from '@/store/hooks'

export interface AccountDetailProps {
  details: any
  department: string | null
  designation: string | null
  person: any
}

const AccountDetail: React.FC<AccountDetailProps> = (props) => {
  const toast = useToast()
  const { onOpen, onClose, isOpen } = useDisclosure()
  const { employeeId } = props.person

  const [isLoading, setIsLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(props.person?.user?.skipFailedAttemptCount)

  const { employees } = useEasyState((state) => state.organization)
  const { setEmployees } = useEasyActions((state) => state.organization)

  const handleSave = async () => {
    const emp = employees.find((e) => e.id === employeeId)

    if (isChecked !== emp?.person?.user?.skipFailedAttemptCount) {
      try {
        setIsLoading(true)
        await organizationService.updateEmployeeSkipLoginAttemptFlag(employeeId, isChecked)
        const newEmployees = employees.map((e) => {
          if (e.id === employeeId) {
            return {
              ...e,
              person: {
                ...e.person,
                user: {
                  ...props.person.user,
                  skipFailedAttemptCount: isChecked
                }
              }
            }
          }

          return e
        })

        setEmployees(newEmployees)
        setIsLoading(false)
        toast({
          title: 'Updated successfully!',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right'
        })
      } catch (error) {
        toast({
          title: 'Error!',
          description: 'Something was wrong',
          status: 'warning',
          duration: 9000,
          isClosable: true,
          position: 'top-right'
        })
      } finally {
        onClose()
      }
    }
  }

  return (
    <div style={{ marginLeft: '50px', backgroundColor: '#f7fafc' }}>
      <Table variant="simple">
        <Tbody style={{ float: 'right', marginRight: '40%' }}>
          <Tr>
            <Td>
              <p> Department</p>{' '}
            </Td>
            <Td>{props?.department ? props?.department : 'Department has not been defined'}</Td>
          </Tr>
          <Tr>
            <Td>
              <p> Designation</p>{' '}
            </Td>
            <Td>{props?.designation ? props?.designation : 'Designation has not been defined'}</Td>
          </Tr>
          <Tr>
            <Td>
              <p> Account Title</p>{' '}
            </Td>
            <Td>
              {props?.details.oneLinkEmployeeBankDetails.length > 0
                ? props?.details.oneLinkEmployeeBankDetails[0].accountTitleTo
                : 'Account Title does not Exist'}
            </Td>
          </Tr>
          <Tr>
            <Td>
              <p> Account No </p>{' '}
            </Td>
            <Td> {props?.details.accountNumber}</Td>
          </Tr>
          <Tr>
            <Td>
              {' '}
              <p>Bank Name </p>{' '}
            </Td>
            <Td> {props?.details.bank.bankName}</Td>
          </Tr>
          <Tr>
            <Td>
              <p> IMD</p>{' '}
            </Td>
            <Td> {props?.details.bank.oneLinkBankDetails?.imd}</Td>
          </Tr>
          <Tr>
            <Td>
              <p style={{ whiteSpace: 'nowrap' }}>Can be bypassed login failed counter</p>
            </Td>
            <Td>
              <Popover onClose={onClose} isOpen={isOpen} onOpen={onOpen}>
                <PopoverTrigger>
                  <IconButton aria-label="edit" size="sm" icon={<EditIcon />} />
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverHeader>Update</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Flex justifyContent="space-between" alignItems="center">
                        <Flex>
                          <Text mr={4}>Check or un-check</Text>
                          <Checkbox defaultChecked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                        </Flex>
                        <Button colorScheme="blue" onClick={handleSave} isLoading={isLoading}>
                          Save
                        </Button>
                      </Flex>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </div>
  )
}

export default AccountDetail
