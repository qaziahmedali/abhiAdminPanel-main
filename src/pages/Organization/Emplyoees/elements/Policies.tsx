import { employeeService } from '@/services/employeeService'
import { useEasyActions, useEasyState } from '@/store/hooks'
import { JsonConfigPublic } from '@/types/organizations/organizationById'
import { Button } from '@chakra-ui/button'
import { Flex } from '@chakra-ui/layout'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody
} from '@chakra-ui/popover'
import { Portal } from '@chakra-ui/portal'
import { useDisclosure } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/toast'
import React, { useRef, useState } from 'react'
import ReactJson from 'react-json-view'

type EmployeePoliciesTabProps = {
  employeeId: string
  jsonConfig: JsonConfigPublic | undefined
}

const EmployeePoliciesTab: React.FC<EmployeePoliciesTabProps> = (props) => {
  const toast = useToast()
  const [isUpdating, setUpdating] = useState(false)
  const [isDeleting, setDeleting] = useState(false)
  const jsonConfig = useRef<any>(props.jsonConfig)
  const { onOpen, onClose, isOpen } = useDisclosure()

  const { employees } = useEasyState((state) => state.organization)
  const { setEmployees } = useEasyActions((state) => state.organization)

  const updateConfig = (configs?: any) => {
    setUpdating(true)
    return employeeService
      .updateOrganizationEmployeeConfigs(props.employeeId, configs)
      .then((res: any) => {
        toast({
          title: 'Update employee configurations successfully!',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right'
        })

        jsonConfig.current = res.data.data.jsonConfig
        setEmployees(
          employees.map((e) => {
            if (e.id === props.employeeId) {
              return {
                ...e,
                organizationEmployeesConfigurations: [{ jsonConfig: jsonConfig.current }]
              }
            }

            return e
          })
        )
      })
      .catch((e) =>
        toast({
          title: 'Update employee configurations failed!',
          description: e.message || 'Something was wrong!',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right'
        })
      )
      .finally(() => setUpdating(false))
  }

  const deleteConfig = () => {
    setDeleting(true)
    return employeeService
      .deleteOrganizationEmployeeConfigs(props.employeeId)
      .then(() => {
        toast({
          title: 'Delete employee configurations successfully!',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        })

        jsonConfig.current = null
        setEmployees(
          employees.map((e) => {
            if (e.id === props.employeeId) {
              return {
                ...e,
                organizationEmployeesConfigurations: []
              }
            }

            return e
          })
        )
      })
      .catch((e) =>
        toast({
          title: 'Delete employee configurations failed!',
          description: e.message || 'Something was wrong!',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        })
      )
      .finally(() => setDeleting(false))
  }

  return !jsonConfig.current ? (
    <Button disabled={isUpdating} isLoading={isUpdating} onClick={() => updateConfig()}>
      Import config from Organization
    </Button>
  ) : (
    <>
      <ReactJson
        src={jsonConfig.current}
        theme="marrakesh"
        style={{ textAlign: 'left' }}
        onEdit={({ updated_src }) => (jsonConfig.current = updated_src)}
      />

      <Flex w="full" justifyContent="flex-end" mt="4">
        <Popover onClose={onClose} isOpen={isOpen} onOpen={onOpen}>
          <PopoverTrigger>
            <Button mr={4} colorScheme="red" disabled={isDeleting}>
              Delete
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Confirm</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Flex justifyContent="flex-end" alignItems="center">
                  <Button mr={4} colorScheme="yellow" onClick={onClose} disabled={isDeleting}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={deleteConfig} isLoading={isDeleting}>
                    Delete
                  </Button>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>

        <Button
          colorScheme="green"
          disabled={isUpdating || isDeleting}
          isLoading={isUpdating}
          onClick={() => updateConfig(jsonConfig.current)}
        >
          Update
        </Button>
      </Flex>
    </>
  )
}

export default EmployeePoliciesTab
