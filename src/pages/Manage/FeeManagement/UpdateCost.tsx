import React, { useState } from 'react'
import {
  Grid,
  Text,
  Button,
  Flex,
  Spacer,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Box,
  FormControl,
  FormLabel,
  useDisclosure,
  Select,
  Spinner,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react'
import { useEasyActions } from '../../../store/hooks'

import { useForm } from 'react-hook-form'
export interface UpdateCostProps {
  deliveryFee: any
}

const UpdateCost: React.FC<UpdateCostProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currency, setCurrency] = useState<any | null>('')
  const [bankRate, setBankRate] = useState<any | null>('')
  const [serviceDeliveryCost, setServiceDeliveryCost] = useState<any | null>('')
  const [serviceDelivery, setServiceDelivery] = useState<any | null>('')

  const [otherCostType, setOtherCostType] = useState('')
  const [cost, setCost] = useState('')
  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [requiredFields, setRequiredFields] = useState(false)

  React.useEffect(() => {
    if (props?.deliveryFee) {
      setCurrency(props.deliveryFee.currency)
      setBankRate(props.deliveryFee.costOfBorrowingBankRate)
      setServiceDeliveryCost(props.deliveryFee.costOfServiceDelivery)
      setCost(props.deliveryFee.otherCost)
      setOtherCostType(props.deliveryFee.otherCostType)
      setServiceDelivery(props.deliveryFee.costOfServiceDelivery)
    }
  }, [props.deliveryFee])

  const { updateDeliveryFee } = useEasyActions((actions) => actions.manage)

  const {
    handleSubmit,
    formState: { errors }
  } = useForm()
  const cancelHandler = () => {
    onClose()
    setAlert(false)
    setSuccess(false)

    setRequiredFields(false)
  }

  const onSubmit = () => {
    if (!currency || !bankRate || !serviceDeliveryCost || !cost || !otherCostType) {
      setRequiredFields(true)
      return
    }
    setIsLoading(true)
    setAlert(false)
    setRequiredFields(false)
    setSuccess(false)
    setInvalid(false)

    let deliveryFee = {
      costOfServiceDelivery: parseInt(serviceDeliveryCost),
      costOfBorrowingBankRate: parseInt(bankRate),
      currency,
      otherCost: parseInt(cost),
      otherCostType: otherCostType
    }

    updateDeliveryFee(deliveryFee)
      .then((res: any) => {
        console.log('Response', res)
        setIsLoading(false)
        setSuccess(true)
      })
      .catch((error: any) => {
        setIsLoading(false)
        console.log('ERROR', error)
        setAlert(true)
      })
  }
  return (
    <>
      <Flex mb="5">
        <Spacer />
        <Button bg="#7367F0" colorScheme="#ffffff" onClick={onOpen}>
          Update
        </Button>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" size="sm" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Cost</DrawerHeader>

            <DrawerBody>
              <form onSubmit={handleSubmit(onSubmit)} id="costForm">
                <FormControl isRequired>
                  <Stack spacing="30px">
                    <Box>
                      <FormLabel htmlFor="currency">Currency</FormLabel>

                      <Select
                        value={currency}
                        placeholder="Please enter currency"
                        onChange={(event) => setCurrency(event.currentTarget.value)}
                      >
                        <option value="PKR">PKR</option>
                        <option value="USD">USD</option>
                      </Select>
                    </Box>
                    <Box>
                      <FormLabel htmlFor="bankrate">Cost of borrowing bank rate (%)</FormLabel>

                      <NumberInput
                        defaultValue={bankRate}
                        min={1}
                        max={100}
                        placeholder="Please enter bank rate"
                        onChange={(value) => setBankRate(value)}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Box>

                    <Box>
                      <FormLabel htmlFor="serviceFee">Cost of service deilvery</FormLabel>

                      <NumberInput
                        defaultValue={serviceDeliveryCost}
                        placeholder="Please enter user service deilvery"
                        onChange={(value) => setServiceDeliveryCost(value)}
                      >
                        <NumberInputField />
                      </NumberInput>
                    </Box>

                    <Box>
                      <FormLabel htmlFor="cost">Other Cost</FormLabel>
                      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                        <NumberInput
                          defaultValue={cost}
                          min={1}
                          max={otherCostType === 'percentage' ? 100 : undefined}
                          placeholder="Please enter cost"
                          onChange={(value) => setCost(value)}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>

                        <Select
                          value={otherCostType}
                          ml="3"
                          placeholder="Select type"
                          onChange={(event) => setOtherCostType(event.currentTarget.value)}
                        >
                          <option value="absolute">Absolute</option>
                          <option value="percentage"> Percentage</option>
                        </Select>
                      </Grid>
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
                  Required Fields are missing.
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
              <Button form="costForm" type="submit" bg="#7367F0" colorScheme="#ffffff">
                {isLoading ? <Spinner /> : 'Submit'}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default UpdateCost
