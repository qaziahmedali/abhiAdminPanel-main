import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Spinner,
  ModalCloseButton,
  Center,
  Stack,
  Button,
  FormLabel,
  Input,
  Grid,
  useToast
} from '@chakra-ui/react'
import { useEasyActions } from '../../../store/hooks'

export interface ExportDataProps {
  isOpen: boolean
  onClose: any
  params: any
}

const ExportData: React.FC<ExportDataProps> = (props) => {
  const { exportRefferalData } = useEasyActions((state) => state.dashboard)
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [output, setOutput] = useState('file')

  const submitHandler = async () => {
    let params = {
      output,
      ...props.params,
      email
    }
    setIsLoading(true)
    const data = await exportRefferalData(params)

    if (data?.message === 'Success') {
      setIsLoading(false)
      if (data.data.total === 0) {
        toast({
          title: 'Warning!',
          description: 'No data to export!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        })
      } else {
        toast({
          title: 'Send successfully!',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        })
      }

      props.onClose()
    } else {
      setIsLoading(false)
      toast({
        title: 'Error!',
        description: data?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
      props.onClose()
    }
  }

  const cancelHandler = () => {
    setEmail('')
    setOutput('file')
    setIsLoading(false)
    props.onClose()
  }

  return (
    <Modal scrollBehavior="inside" isCentered={true} size="2xl" isOpen={props.isOpen} onClose={cancelHandler}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Export Refferal Details </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="24px">
            <Center>
              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="email">Enter Receiver Email</FormLabel>
                <Input placeholder="Receiver Email" onChange={(event) => setEmail(event.currentTarget.value)} />
              </Grid>
            </Center>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button bg="#7367F0" mr={3} color="white" onClick={cancelHandler}>
            Close
          </Button>

          <Button colorScheme="green" color="white" mr={3} onClick={submitHandler}>
            {isLoading ? <Spinner /> : 'Submit'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ExportData
