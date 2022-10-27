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
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Select,
  Tr,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useEasyActions, useEasyState } from '@/store/hooks'

import { EditIcon } from '@chakra-ui/icons'
import { apiManager } from '@/utils/apiManager/ApiManager'
import { merge } from 'lodash'
import { organizationService } from '@/services/organizationService'

type EmployeeGeneralTabProps = {
  bankAccount: any
  person: any
}

const EmployeeGeneralTab: React.FC<EmployeeGeneralTabProps> = (props) => {
  const toast = useToast()
  const { onOpen, onClose, isOpen } = useDisclosure()
  const [status, setStatus] = useState(false)
  const [userId, setUserId] = useState('')
  const [person, setPerson] = useState<any>({})
  const [bankAccount, setBankAccount] = useState<any>({})

  const [isLoading, setIsLoading] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const { employees } = useEasyState((state) => state.organization)
  const { setEmployees, updateUserStatus } = useEasyActions((state) => state.organization)

  useEffect(() => {
    if (props?.person) {
      setPerson(props.person)
      setIsChecked(props.person?.user?.skipFailedAttemptCount)
      setUserId(props.person.userId)
    }
  }, [props.person])

  useEffect(() => {
    if (props?.bankAccount) {
      setBankAccount(props?.bankAccount)
    }
  }, [props.bankAccount])

  const statusHandler = async () => {
    setIsLoading(true)
    let params = { userId, status }

    const data = await updateUserStatus(params)
    if (data.status == 'success') {
      setIsLoading(false)
      toast({
        title: 'Updated successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    } else {
      setIsLoading(false)
      toast({
        title: 'Error!',
        description: 'Something was wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  const handleSave = async () => {
    const emp = employees.find((e) => e.id === userId)

    if (isChecked !== emp?.person?.user?.skipFailedAttemptCount) {
      try {
        setIsLoading(true)
        await organizationService.updateEmployeeSkipLoginAttemptFlag(userId, isChecked)
        const newEmployees = employees.map((e) => {
          return e.id !== userId
            ? e
            : merge(e, {
                person: { user: { skipFailedAttemptCount: isChecked } }
              })
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

  const handleUnlockUser = () => {
    setIsUnlocking(true)
    const emp = employees.find((e) => e.personId === person?.id)

    if (emp) {
      apiManager
        .fetch({
          name: 'OrganizationEditEmployees',
          data: {
            employees: [{ id: emp.id, failAttemptCount: 5 }]
          }
        })
        .then(() => {
          const newEmployees = employees.map((e) => {
            return e.personId !== props.person.id
              ? e
              : merge(e, {
                  person: { user: { failAttemptCount: 5 } }
                })
          })

          setEmployees(newEmployees)

          toast({
            title: 'Updated successfully!',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right'
          })
        })
        .catch(() => {
          toast({
            title: 'Error!',
            description: 'Something was wrong',
            status: 'warning',
            duration: 9000,
            isClosable: true,
            position: 'top-right'
          })
        })
        .finally(() => setIsUnlocking(false))
    }
  }

  return (
    <Table variant="simple">
      <Tbody>
        <Tr>
          <Td>Account Title</Td>
          <Td>{bankAccount?.accountTitle || 'Account Title does not Exist'}</Td>
        </Tr>
        <Tr>
          <Td>Account No</Td>
          <Td>{bankAccount?.accountNumber || 'Account No does not Exist'}</Td>
        </Tr>
        <Tr>
          <Td>Bank Name</Td>
          <Td>{bankAccount?.bank?.bankName || 'Bank Name does not Exist'}</Td>
        </Tr>
        <Tr>
          <Td>IMD</Td>
          <Td>{bankAccount?.bank?.oneLinkBankDetails?.imd || 'IMD does not Exist'}</Td>
        </Tr>
        <Tr>
          <Td>CNIC</Td>
          <Td>{person?.cnic || '-'}</Td>
        </Tr>
        <Tr>
          <Td>Can be bypassed login failed counter</Td>
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
        <Tr>
          <Td>Employee Status</Td>
          <Td>
            <Select
              // placeholder="Select status"
              defaultValue={person?.user?.enabled ? 'enable' : 'disable'}
              onChange={(event) => setStatus(event.currentTarget.value === 'enable' ? true : false)}
            >
              <option value="enable">Enable</option>
              <option value="disable">Disable</option>
            </Select>
          </Td>
        </Tr>
        <Tr>
          <Td>User Account Status</Td>
          {person?.user?.failAttemptCount === 1 && !person?.user?.skipFailedAttemptCount ? (
            <Td>
              <span>Locked</span>
              <Button colorScheme="blue" onClick={handleUnlockUser} style={{ float: 'right' }}>
                {isUnlocking ? <Spinner /> : 'Reset User Account'}
              </Button>
            </Td>
          ) : (
            <Td>Unlocked</Td>
          )}
        </Tr>
        <Tr>
          <Td></Td>
          <Td>
            <Button colorScheme="blue" onClick={statusHandler} style={{ float: 'right' }}>
              {isLoading ? <Spinner /> : 'Submit'}
            </Button>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  )
}

export default EmployeeGeneralTab
