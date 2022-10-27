import React, { useState, useEffect } from 'react'
import {
  Button,
  Spinner,
  Text,
  Select,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  Stack,
  Box,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react'
import { useEasyActions, useEasyState } from '../../../store/hooks'
import { useForm } from 'react-hook-form'
import _ from 'lodash'

export interface AddPricingProps {
  isOpen: boolean
  onClose: any
  getTariffData: any
  tierData: any
  tariffId: string
}

const AddPricing: React.FC<AddPricingProps> = (props) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [currency, setCurrency] = useState('')
  const [type, setType] = useState('')
  const [minBasePrice, setMinBasePrice] = useState<any | null>(0)
  const [maxBasePrice, setMaxBasePrice] = useState<any | null>(0)
  const [withDrawAmount, setWithDrawAmount] = useState<any | null>(500)
  const [drawerTitle, setDrawerTitle] = useState('Add Tipping')

  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [requiredFields, setRequiredFields] = useState(false)

  const { tariffTipping, manageTariff, updateTariffTipping } = useEasyActions((actions) => actions.manage)

  const {
    handleSubmit,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    const val = props.tierData.tariffModelTipping && props.tierData.tariffModelTipping[0]
    if (!_.isEmpty(props.tierData)) {
      setName(props.tierData.name)
      setCurrency(props.tierData.currency)
      setWithDrawAmount(parseInt(props.tierData.minimumWithdrawAmount))
      setDescription(props.tierData.description)
      setType(val && val.tipType)
      setMinBasePrice(val && val.minBasePrice)
      setMaxBasePrice(val && val.maxBasePrice)
      setDrawerTitle('Edit Tipping')
    } else {
      setDrawerTitle('Add Tipping')
      setName('')
      setCurrency('')
      setDescription('')
      setWithDrawAmount('')
      setType('')
      setMinBasePrice('')
      setMaxBasePrice('')
    }
  }, [props.tierData])

  const defaultMaxValue = () => {
    return parseInt(minBasePrice) + 1
  }

  const cancelHandler = () => {
    props.onClose()
    setAlert(false)
    setSuccess(false)

    setRequiredFields(false)
  }
  const onSubmit = async () => {
    if (!name && !description && !currency && !type && !minBasePrice && !maxBasePrice) {
      setRequiredFields(true)
      return
    }

    setIsLoading(true)
    setAlert(false)
    setSuccess(false)
    setRequiredFields(false)

    let tippingObj = {
      general: {
        name: name,
        description: description,
        currency: currency,
        pricingModel: 'tipping',
        minimumWithdrawAmount: withDrawAmount
      },
      tipping: {
        minBasePrice: parseInt(minBasePrice),
        maxBasePrice: parseInt(maxBasePrice),
        tipType: type
      }
    }

    if (props.tariffId) {
      updateTariffTipping({ ...tippingObj, tariffId: props.tariffId })
        .then((res: any) => {
          console.log(res)
          props.getTariffData()
          setIsLoading(false)
          setSuccess(true)
          props.onClose()
        })
        .catch((error: any) => {
          console.log('ERROR', error)
          setAlert(true)
          setIsLoading(false)
        })
    } else {
      tariffTipping(tippingObj)
        .then((res: any) => {
          setIsLoading(false)
          setSuccess(true)
          props.getTariffData()
        })
        .catch((error: any) => {
          setIsLoading(false)
          console.log('ERROR', error)
          setAlert(true)
        })
    }
  }

  return (
    <Drawer isOpen={props.isOpen} placement="right" size="sm" onClose={props.onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">{drawerTitle}</DrawerHeader>

        <DrawerBody>
          <form onSubmit={handleSubmit(onSubmit)} id="tippingForm">
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
                    value={description && description}
                    placeholder="Please enter description"
                    onChange={(event) => setDescription(event.currentTarget.value)}
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="withdrawAmount">Minimum Withdraw Amount</FormLabel>
                  <NumberInput
                    value={withDrawAmount}
                    min={500}
                    defaultValue={500}
                    placeholder="Please enter amount"
                    onChange={(value) => setWithDrawAmount(value)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>

                <Box>
                  <FormLabel htmlFor="currency">Currency</FormLabel>
                  <Select
                    value={currency}
                    placeholder="Select Currency"
                    onChange={(event) => setCurrency(event.currentTarget.value)}
                  >
                    <option value="PKR">PKR</option>
                    <option value="USD">USD</option>
                  </Select>
                </Box>

                <Box>
                  <FormLabel htmlFor="type">Type</FormLabel>
                  <Select
                    value={type}
                    placeholder="Select type"
                    onChange={(event) => setType(event.currentTarget.value)}
                  >
                    <option value="absolute">Absolute</option>
                    <option value="percentage"> Percentage</option>
                  </Select>
                </Box>

                <Box>
                  <FormLabel htmlFor="minBasePrice">Min Base Price</FormLabel>

                  <NumberInput
                    value={minBasePrice}
                    defaultValue={1}
                    min={1}
                    onChange={(value) => setMinBasePrice(value)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>

                <Box>
                  <FormLabel htmlFor="maxBasePrice">Max Base Price</FormLabel>
                  <NumberInput
                    value={maxBasePrice}
                    min={defaultMaxValue()}
                    onChange={(value) => setMaxBasePrice(value)}
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
          {success && (
            <Text color="green" mr="5">
              Successfully Added
            </Text>
          )}
          {requiredFields && (
            <Text color="red" mr="5">
              Required fields are missing.
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
          <Button type="submit" form="tippingForm" colorScheme="blue">
            {isLoading ? <Spinner /> : 'Submit'}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default AddPricing
