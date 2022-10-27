import React, { useState } from 'react'
import {
  Spinner,
  Text,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Box,
  FormLabel,
  Input,
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react'
import { useEasyActions } from '../../../store/hooks'
import { useForm } from 'react-hook-form'
import Multiselect from 'multiselect-react-dropdown'

export interface AddBusinessTypesProps {
  isOpen: boolean
  onClose: any
  editBusinessDocument: boolean
  businessTypeId: string
  documentData: any
}

const AddDocument: React.FC<AddBusinessTypesProps> = (props) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [acceptableFormats, setFormat] = useState('')
  const [selectedValue, setSelectedValue] = useState<any>([])

  const [maxFileSize, setMaxFileSize] = useState<any | null>('')
  const [success, setSuccess] = useState(false)
  const [update, setUpdate] = useState(false)

  const [alert, setAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { addBusinessDocument, updateBusinessDocument, getBusinessDoucument } = useEasyActions(
    (actions) => actions.manage
  )

  const {
    handleSubmit,
    formState: { errors }
  } = useForm()

  React.useEffect(() => {
    if (props.editBusinessDocument) {
      setEditableFormats()
      setName(props.documentData.name)
      setDescription(props.documentData.description)
      setMaxFileSize(props.documentData.maxFileSize)
    }
  }, [props.documentData])

  const setEditableFormats = () => {
    const formats: any = []
    const splitFormats = props.documentData.acceptableFormats.split(',')
    splitFormats.map((value: any) => {
      switch (value) {
        case '.jpg':
          formats.push({ name: 'JPG', value })
          break
        case '.png':
          formats.push({ name: 'PNG', value })
          break

        default:
          formats.push({ name: 'PDF', value })
          break
      }
    })
    setSelectedValue(formats)
  }

  const cancelHandler = () => {
    props.onClose()
    setName('')
    setDescription('')
    setFormat('')
    setMaxFileSize('')
    setAlert(false)
    setSuccess(false)
    setUpdate(false)
  }

  const onSubmit = async () => {
    setAlert(false)
    setSuccess(false)
    setUpdate(false)
    setIsLoading(true)

    if (props.editBusinessDocument) {
      let businessDocument = {
        name,
        description,
        country: 'Pakistan',
        maxFileSize: parseInt(maxFileSize),
        acceptableFormats,
        businessTypeId: props.businessTypeId,
        documentId: props.documentData.id
      }

      updateBusinessDocument(businessDocument)
        .then((res: any) => {
          getBusinessDoucument(props.businessTypeId)
          setUpdate(true)
          setIsLoading(false)
        })
        .catch((error: any) => {
          console.log('ERROR', error)
          setIsLoading(false)
          setAlert(true)
        })
    } else {
      let businessDocument = {
        name,
        description,
        country: 'PAKISTAN',
        maxFileSize: parseInt(maxFileSize),
        acceptableFormats,
        businessTypeId: props.businessTypeId
      }
      addBusinessDocument(businessDocument)
        .then((res: any) => {
          getBusinessDoucument(props.businessTypeId)
          setSuccess(true)
          setIsLoading(false)
        })
        .catch((error: any) => {
          console.log('ERROR', error)
          setIsLoading(false)
          setAlert(true)
        })
    }
  }

  const onSelect: any = (selectedList: any, selectedItem: any) => {
    let value = selectedList.map((data: any) => data.value)
    let formatValues = JSON.stringify(value.join())
    setFormat(formatValues)
  }

  const onRemove: any = (selectedList: any, removedItem: any) => {
    let value = selectedList.map((data: any) => data.value)
    let formatValues = JSON.stringify(value.join())
    setFormat(formatValues)
  }

  const options = [
    { id: 1, name: 'PDF', value: '.pdf' },
    { id: 2, name: 'PNG', value: '.png' },
    { id: 3, name: 'JPG', value: '.jpg' }
  ]

  return (
    <>
      <Drawer isOpen={props.isOpen} placement="right" size="sm" onClose={props.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Document</DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)} id="businessDocumentForm">
              <FormControl isRequired>
                <Stack spacing="24px">
                  <Box>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      value={name}
                      placeholder="Please enter name"
                      onChange={(event) => setName(event.currentTarget.value)}
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Input
                      value={description ? description : ''}
                      placeholder="Please enter description"
                      onChange={(event) => setDescription(event.currentTarget.value)}
                    />
                  </Box>

                  <Box>
                    <FormLabel htmlFor="format">Formats</FormLabel>

                    <Multiselect
                      placeholder="Select Format"
                      options={options}
                      selectedValues={selectedValue}
                      onSelect={onSelect}
                      onRemove={onRemove}
                      displayValue="name"
                      style={{
                        option: {
                          color: 'black'
                        }
                      }}
                    />
                  </Box>

                  <Box>
                    <FormLabel htmlFor="size">Max Size (MBs)</FormLabel>

                    <NumberInput
                      value={maxFileSize}
                      defaultValue={1}
                      min={1}
                      max={100}
                      placeholder="Please enter max size"
                      onChange={(value) => setMaxFileSize(value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                </Stack>
              </FormControl>
            </form>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            {alert && (
              <Text color="red" mr="5">
                Something went wrong
              </Text>
            )}
            {success && (
              <Text color="green" mr="5">
                Sucessfully Added
              </Text>
            )}

            {update && (
              <Text color="green" mr="5">
                Updated Sucessfully.
              </Text>
            )}
            <Button colorScheme="green" mr={3} onClick={cancelHandler}>
              Cancel
            </Button>
            <Button form="businessDocumentForm" type="submit" bg="#7367F0" colorScheme="#ffffff">
              {isLoading ? <Spinner size="md" /> : 'Submit'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default AddDocument
