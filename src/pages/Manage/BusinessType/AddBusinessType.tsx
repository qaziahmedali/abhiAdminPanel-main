import React, { useState, useMemo } from 'react'
import {
  Select,
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
  FormControl,
  Input
} from '@chakra-ui/react'
import { useEasyActions } from '../../../store/hooks'
import countryList from 'react-select-country-list'
import { useForm } from 'react-hook-form'

export interface AddBusinessTypesProps {
  isOpen: boolean
  onClose: any
  editBusinessType: boolean
  typeData: any
  lastUpdated: any
}

const AddBusinessType: React.FC<AddBusinessTypesProps> = (props) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [country, setCountry] = useState('')
  const [success, setSuccess] = useState(false)
  const [update, setUpdate] = useState(false)
  const [alert, setAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [requiredFields, setRequiredFields] = useState(false)

  const options = useMemo(() => countryList().getData(), [])
  const {
    handleSubmit,
    formState: { errors }
  } = useForm()

  React.useEffect(() => {
    if (props.editBusinessType) {
      setName(props.typeData.name)
      setDescription(props.typeData.description)
      setCountry(props.typeData.country)
    } else {
      setName('')
      setDescription('')
      setCountry('Pakistan')
    }
  }, [props])

  const { addBusinessTypes, getBusinessTypes, updateBusinessTypes } = useEasyActions((actions) => actions.manage)

  const onSubmit = async () => {
    if (!name || !description || !country) {
      setRequiredFields(true)
      return
    }
    setAlert(false)
    setSuccess(false)
    setUpdate(false)
    setIsLoading(true)

    let businessTypes = {
      name,
      description,
      country: country
    }
    if (props.editBusinessType) {
      updateBusinessTypes({
        ...businessTypes,
        businessTypeId: props.typeData.id
      })
        .then((res: any) => {
          getBusinessTypes()
          setUpdate(true)
          setIsLoading(false)
        })
        .catch((error: any) => {
          setIsLoading(false)
          setAlert(true)
        })
    } else {
      addBusinessTypes(businessTypes)
        .then((res: any) => {
          getBusinessTypes()
          setSuccess(true)
          setIsLoading(false)
        })
        .catch((error: any) => {
          setIsLoading(false)
          setAlert(true)
        })
    }
  }

  const cancelHandler = () => {
    props.onClose()
    setAlert(false)
    setSuccess(false)
  }

  return (
    <>
      <Drawer isOpen={props.isOpen} placement="right" size="sm" onClose={props.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Business Types</DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)} id="businessTypeForm">
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
                    <FormLabel htmlFor="country">Country</FormLabel>
                    <Select
                      placeholder="Select country"
                      value={country}
                      onChange={(event) => setCountry(event.currentTarget.value)}
                    >
                      {options.map((value, index) => {
                        return <option key={index}>{value.label}</option>
                      })}
                    </Select>
                  </Box>
                </Stack>
              </FormControl>
            </form>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            {requiredFields && (
              <Text color="red" mr="5">
                Required Fields are missing
              </Text>
            )}
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
            <Button form="businessTypeForm" type="submit" bg="#7367F0" colorScheme="#ffffff">
              {isLoading ? <Spinner size="md" /> : 'Submit'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default AddBusinessType
