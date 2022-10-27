import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  Stack,
  Text
} from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'

import countryList from 'react-select-country-list'
import { useEasyActions } from '../../../store/hooks'
import { useForm } from 'react-hook-form'

export interface AddBankProps {
  isOpen: boolean
  onClose: any
  bankId: string
  bankData: any
  getBanksData: any
}

const AddBank: React.FC<AddBankProps> = (props) => {
  const [bankName, setBankName] = useState('')
  const [accountFormat, setAccountFormat] = useState('')
  const [accountRegex, setAccountRegex] = useState('')
  const [requiredFields, setRequiredFields] = useState(false)
  const [country, setCountry] = useState('')
  const [imd, setIMD] = useState('')

  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [updated, setUpdated] = useState(false)
  const { getBanks, addBanks, updateBanks } = useEasyActions((actions) => actions.manage)
  const options = useMemo(() => countryList().getData(), [])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  React.useEffect(() => {
    if (props?.bankId) {
      setBankName(props?.bankData?.bankName)
      setAccountFormat(props?.bankData?.bankAccountFormat)
      setAccountRegex(props?.bankData?.bankAccountRegex)
      setIMD(props?.bankData?.oneLinkBankDetails?.imd || '')
      setCountry(props?.bankData?.country)
    } else {
      setBankName('')
      setAccountFormat('')
      setAccountRegex('')
      setIMD('')
      setCountry('')
    }
    setAlert(false)
    setSuccess(false)
    setCountry('Pakistan')
  }, [props])

  const cancelHandler = () => {
    props.onClose()
    setAlert(false)
    setSuccess(false)
    setInvalid(false)
    setUpdated(false)
    setRequiredFields(false)
  }

  const onSubmit = async () => {
    if (!bankName || !accountFormat || !accountRegex || !imd) {
      setRequiredFields(true)
      return
    }
    setIsLoading(true)
    setAlert(false)
    setSuccess(false)
    setInvalid(false)
    setUpdated(false)
    setRequiredFields(false)

    let bank = {
      bankId: props.bankId,
      bankName: bankName,
      country: country,
      bankAccountFormat: accountFormat,
      bankAccountRegex: accountRegex,
      imd: imd
    }

    if (props.bankId) {
      const data = await updateBanks(bank)
      if (data) {
        setIsLoading(false)
        setUpdated(true)
        props.getBanksData()
        getBanks()
      } else {
        setIsLoading(false)
        setAlert(true)
      }
    } else {
      const data = await addBanks(bank)
      if (data) {
        setIsLoading(false)
        setSuccess(true)
        props.getBanksData()
      } else {
        setIsLoading(false)
        setAlert(true)
      }
    }
  }
  return (
    <>
      <Drawer isOpen={props.isOpen} placement="right" size="sm" onClose={props.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={props.onClose} />
          <DrawerHeader borderBottomWidth="1px">Banks</DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit(onSubmit)} id="addBankForm">
              <FormControl isRequired>
                <Stack spacing="24px">
                  <Box>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      value={bankName}
                      placeholder="Please enter bank name"
                      onChange={(event) => setBankName(event.currentTarget.value)}
                    />
                  </Box>
                  <Box>
                    <FormLabel htmlFor="format">Account Format</FormLabel>
                    <Input
                      value={accountFormat ? accountFormat : ''}
                      placeholder="Please enter account format"
                      onChange={(event) => setAccountFormat(event.currentTarget.value)}
                    />
                  </Box>

                  <Box>
                    <FormLabel htmlFor="regex">Account Regex</FormLabel>
                    <Input
                      value={accountRegex ? accountRegex : ''}
                      placeholder="Please enter account regex"
                      onChange={(event) => setAccountRegex(event.currentTarget.value)}
                    />
                  </Box>

                  <Box>
                    <FormLabel htmlFor="country">Country</FormLabel>
                    <Select
                      value={country}
                      placeholder="Please enter country"
                      onChange={(event) => setCountry(event.currentTarget.value)}
                    >
                      {options.map((value, index) => {
                        return <option key={index}>{value.label}</option>
                      })}
                    </Select>
                  </Box>

                  <Box>
                    <FormLabel htmlFor="IMD">IMD</FormLabel>
                    <Input
                      value={imd ? imd : ''}
                      placeholder="Please enter IMD of bank"
                      onChange={(event) => setIMD(event.currentTarget.value)}
                    />
                    {/* <NumberInput
                   
                    defaultValue={0}
                    min={0}
                    placeholder="Please enter IMD"
                    onChange={(value) => setIMD(value)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput> */}
                  </Box>
                </Stack>
              </FormControl>
            </form>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            {updated && (
              <Text color="green" mr="5">
                Updated Successfully
              </Text>
            )}

            {requiredFields && (
              <Text color="red" mr="5">
                Required Fields are missing
              </Text>
            )}
            {success && (
              <Text color="green" mr="5">
                Successfully Added
              </Text>
            )}

            {alert && (
              <Text color="red" mr="5">
                Something went wrong
              </Text>
            )}
            <Button colorScheme="green" mr={3} onClick={cancelHandler}>
              Cancel
            </Button>
            <Button form="addBankForm" type="submit" bg="#7367F0" colorScheme="#ffffff">
              {isLoading ? <Spinner /> : 'Submit'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default AddBank
