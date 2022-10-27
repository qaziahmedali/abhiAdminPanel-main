import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center
} from '@chakra-ui/react'
import ReactJson from 'react-json-view'
import { EmployeeMontlyBreakUpData } from '@/types/organizations/EmployeeMonthlyBreakup'
export interface EmployeeMonthlyProps {
  isOpen: boolean
  onClose: any
  EmployeeMonthlyBreakup: any
}
const EmployeeMonthlyBreakUp: React.FC<EmployeeMonthlyProps> = (props) => {
  const [employeeMonthlyBreakup, setEmployeeMonthlyBreakup] = useState<EmployeeMontlyBreakUpData | null>(null)

  useEffect(() => {
    setEmployeeMonthlyBreakup(props?.EmployeeMonthlyBreakup)
  }, [props?.EmployeeMonthlyBreakup])

  const cancelHandler = () => {
    setEmployeeMonthlyBreakup(null)

    props.onClose()
  }

  return (
    <Modal scrollBehavior="inside" isCentered={true} size="3xl" isOpen={props.isOpen} onClose={cancelHandler}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Employee Monthly Breakup </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {employeeMonthlyBreakup && Object.keys(employeeMonthlyBreakup).length > 0 ? (
            <ReactJson
              src={employeeMonthlyBreakup}
              theme="monokai"
              // onEdit={(edit) => {
              //   console.log(edit);
              // }}
            />
          ) : (
            <Center>No Data Found</Center>
          )}
        </ModalBody>

        <ModalFooter>
          {/* <Button colorScheme="green" mr={3} onClick={cancelHandler}>
                            Close
                        </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EmployeeMonthlyBreakUp
