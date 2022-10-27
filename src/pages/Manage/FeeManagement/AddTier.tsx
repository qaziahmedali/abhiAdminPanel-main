import _, { omit } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { apiManager } from '@/utils/apiManager/ApiManager'
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Spacer,
  Spinner,
  Stack,
  Text
} from '@chakra-ui/react'

import { useEasyActions } from '../../../store/hooks'
import ExceptionTier from './ExceptionTier'

export interface TierProps {
  isOpen: boolean
  onClose: any
  tariffId: string
  tierData: any
  getTariffData: any
}

interface ExceptionDataProps {
  exceptionType: string
  fee: number
  id: string
  index: number
  monthDay: number
}

const AddTier: React.FC<TierProps> = (props) => {
  const [name, setName] = useState('')
  const [currency, setCurrency] = useState('')
  const [description, setDescription] = useState('')
  const [drawerTitle, setDrawerTitle] = useState('Add Tier')
  const [factor, setFactor] = useState<any | null>(0)
  const [fee, setFee] = useState<any | null>(0)
  const [amount, setAmount] = useState<any | null>(0)
  const [type, setType] = useState('')
  const [employeeContibution, setEmployeeContribution] = useState<any | null>({})
  const [withDrawAmount, setWithDrawAmount] = useState<any | null>(500)
  const [monthDay, setMonthDay] = useState<any | null>(0)
  const [exceptionType, setExceptionType] = useState('')
  const [exceptionFee, setExceptionFee] = useState<any | null>(0)

  const [paramId, setParamId] = useState(0)

  const [exceptionParameter, setExceptionParamter] = useState<any | null>([])
  const [requiredFields, setRequiredFields] = useState(false)

  const [alert, setAlert] = useState(false)
  const [exceptionAlert, setExceptionAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { tariffTiers, updateTariffModelTiers } = useEasyActions((actions) => actions.manage)
  const { handleSubmit } = useForm()

  useEffect(() => {
    setIsLoading(false)
    setAlert(false)
    setExceptionAlert(false)
    setSuccess(false)
  }, [props.isOpen])

  useEffect(() => {
    const val = props.tierData.tariffModelTiers && props.tierData.tariffModelTiers[0]

    if (!_.isEmpty(props.tierData)) {
      setName(props.tierData.name)
      setCurrency(props.tierData.currency)
      setDescription(props.tierData.description)
      setWithDrawAmount(parseInt(props.tierData.minimumWithdrawAmount ? props.tierData.minimumWithdrawAmount : 500))
      if (val && val.denominator) setFactor(val.denominator)
      if (val && val.tierType) setType(val.tierType)
      if (val && val.amount) setAmount(val.amount)
      if (val && val.fee) setFee(val.fee)

      if (props.tariffId) {
        apiManager
          .fetch({
            name: 'ManageGetTariff',
            pathVariables: { id: props.tariffId }
          })
          .then((r) => {
            const { tariffModelTierExceptions, employeeContribution } = (r.data.data as any).tariffModelTiers[0]

            setEmployeeContribution(employeeContribution)

            setExceptionParamter(
              tariffModelTierExceptions.map((i: any) => {
                return {
                  id: i.id,
                  exceptionType: i.exceptionType,
                  fee: parseFloat(i.fee),
                  monthDay: parseInt(i.monthDay)
                }
              })
            )
          })
      }

      setDrawerTitle('Edit Tier')
    } else {
      setDrawerTitle('Add Tier')
      setName('')
      setCurrency('')
      setDescription('')
      setEmployeeContribution('')
      setWithDrawAmount(500)
      setFactor('')
      setType('')
      setAmount('')
      setFee('')
      setExceptionParamter([])
    }
  }, [props.tierData])

  const parameterHandler = () => {
    let paramsArr: any = []

    if (monthDay && exceptionType && exceptionFee) {
      setParamId(paramId + 1)
      const validate = exceptionParameter.filter((data: ExceptionDataProps) => data?.monthDay == monthDay)

      if (validate.length == 0) {
        setExceptionAlert(false)
        paramsArr.push({
          monthDay: parseInt(monthDay),
          exceptionType: exceptionType,
          fee: parseFloat(exceptionFee)
        })

        setExceptionParamter([...exceptionParameter, ...paramsArr])
      } else {
        setExceptionAlert(true)
        setMonthDay(0)
      }
    } else {
      console.log('Required FIelds missing')
    }
  }

  const updateExceptionParameter = (data: any) => {
    setExceptionParamter(data)
  }

  const cancelHandler = () => {
    props.onClose()
    setAlert(false)
    setSuccess(false)
    setRequiredFields(false)
  }

  const submit = async () => {
    if (
      !name ||
      !description ||
      !currency ||
      !employeeContibution ||
      !withDrawAmount ||
      !factor ||
      !type ||
      !fee ||
      !amount
    ) {
      setRequiredFields(true)
    }

    setIsLoading(true)
    setRequiredFields(false)
    setAlert(false)
    setSuccess(false)

    let tierObjData = {
      general: {
        name: name,
        description: description,
        currency: currency,
        pricingModel: 'tier',
        minimumWithdrawAmount: parseInt(withDrawAmount)
      },
      tier: {
        denominator: parseInt(factor),
        amount: parseInt(amount),
        tierType: type,
        fee: parseFloat(fee),
        employeeContribution: parseInt(employeeContibution),
        ...(props.tierData.tariffModelTiers?.[0] && {
          id: props.tierData.tariffModelTiers[0].id
        })
      },
      // remove index property before submit
      exceptions: exceptionParameter.map((i: any) => omit(i, 'index'))
    }

    if (props.tariffId) {
      updateTariffModelTiers({ ...tierObjData, tariffId: props.tariffId })
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
      tariffTiers(tierObjData)
        .then((res: any) => {
          props.getTariffData()
          setIsLoading(false)
          props.onClose()
          setSuccess(true)
        })
        .catch((error: any) => {
          console.log('ERROR', error)
          setAlert(true)
          setIsLoading(false)
        })
    }
  }
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ]
  return (
    <Drawer isOpen={props.isOpen} placement="right" size="lg" onClose={props.onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerContent>
          <DrawerCloseButton color="white" />
          <DrawerHeader bg="blue.800" color="white" borderBottomWidth="1px">
            {drawerTitle}
          </DrawerHeader>
          <DrawerBody>
            <form onSubmit={handleSubmit(submit)} id="tierForm">
              <FormControl>
                <Container>
                  <Box borderWidth={1} p={4} margin={''}>
                    <Stack spacing="12px">
                      <Heading size="lg">General</Heading>

                      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                          type="text"
                          value={name}
                          placeholder="Please enter name"
                          onChange={(event) => setName(event.currentTarget.value)}
                        />
                      </Grid>

                      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <Input
                          value={description ? description : ''}
                          placeholder="Please enter description"
                          onChange={(event) => setDescription(event.currentTarget.value)}
                        />
                      </Grid>

                      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                        <FormLabel htmlFor="currency">Currency</FormLabel>

                        <Select
                          value={currency}
                          placeholder="Select Currency"
                          onChange={(event) => setCurrency(event.currentTarget.value)}
                        >
                          <option value="PKR">PKR</option>
                          <option value="USD">USD</option>
                        </Select>
                      </Grid>

                      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                        <FormLabel htmlFor="username">Employee Contribution</FormLabel>
                        <NumberInput
                          value={employeeContibution}
                          defaultValue={0}
                          min={0}
                          max={100}
                          placeholder="Please enter  contribution"
                          onChange={(value) => {
                            setEmployeeContribution(value)
                          }}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Grid>

                      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                        <FormLabel htmlFor="withdrawAmount">Minimum Withdraw Amount</FormLabel>
                        <NumberInput
                          value={withDrawAmount ?? 500}
                          min={500}
                          defaultValue={500}
                          placeholder="Please enter amount"
                          onChange={(value) => {
                            setWithDrawAmount(value)
                          }}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Grid>
                    </Stack>
                  </Box>
                </Container>

                <Container>
                  <Box borderWidth={1} p={4} mt="3" margin={''}>
                    <Stack spacing="12px">
                      <Heading size="lg">Tier Parameters</Heading>
                      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                        <FormLabel htmlFor="denominator">Denominator</FormLabel>
                        <Select
                          defaultValue={factor}
                          placeholder="Select Factor"
                          onChange={(event) => setFactor(event.currentTarget.value)}
                        >
                          {days.map((value, index) => {
                            return <option key={index}>{value}</option>
                          })}
                        </Select>
                      </Grid>

                      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                        <FormLabel htmlFor="type">Type</FormLabel>
                        <Select
                          defaultValue={type}
                          placeholder="Select Type"
                          onChange={(event) => setType(event.currentTarget.value)}
                        >
                          <option value="absolute">Absolute</option>
                          <option value="percentage">Percentage</option>
                        </Select>
                      </Grid>

                      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                        <FormLabel htmlFor="amount">Tier Amount</FormLabel>

                        <NumberInput
                          defaultValue={amount}
                          min={0}
                          max={type === 'percentage' ? 100 : undefined}
                          placeholder="Please enter amount"
                          onChange={(value) => setAmount(value)}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Grid>
                      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                        <FormLabel htmlFor="fee">Fee</FormLabel>

                        <NumberInput
                          defaultValue={fee}
                          min={0}
                          placeholder="Please enter fee"
                          onChange={(value) => setFee(value)}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Grid>
                    </Stack>
                  </Box>
                </Container>

                <Container>
                  <Text fontSize="2xl"></Text>
                  <Box borderWidth={1} p={4} mt="3">
                    <Heading size="lg">Exceptions</Heading>
                    <Popover placement="left-start" closeOnBlur={true}>
                      <Flex>
                        <Spacer />
                        <PopoverTrigger>
                          <Button bg="#7367F0" colorScheme="#ffffff" m="2">
                            Add
                          </Button>
                        </PopoverTrigger>
                      </Flex>
                      <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
                        <PopoverHeader pt={4} fontWeight="bold" border="0">
                          New Exception Parameters
                        </PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                          <Stack spacing="12px">
                            <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                              <FormLabel htmlFor="username">Day</FormLabel>
                              <Select
                                color="grey"
                                placeholder="Select Day"
                                onChange={(event) => setMonthDay(event.currentTarget.value)}
                              >
                                {days.map((value, index) => {
                                  return <option key={index}>{value}</option>
                                })}
                              </Select>
                            </Grid>

                            <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                              <FormLabel htmlFor="type">Type</FormLabel>
                              <Select
                                color="grey"
                                placeholder="Select Type"
                                onChange={(event) => setExceptionType(event.currentTarget.value)}
                              >
                                <option value="absolute">Absolute</option>
                                <option value="percentage">Percentage</option>
                              </Select>
                            </Grid>

                            <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                              <FormLabel htmlFor="amount">Amount</FormLabel>

                              <NumberInput
                                defaultValue={exceptionFee}
                                precision={2}
                                min={0}
                                max={exceptionType === 'percentage' ? 100 : undefined}
                                placeholder="Please input amount"
                                onChange={(value) => setExceptionFee(value)}
                              >
                                <NumberInputField />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                            </Grid>
                          </Stack>
                        </PopoverBody>
                        <PopoverFooter border="0" d="flex" alignItems="center" justifyContent="space-between" pb={4}>
                          {/* */}
                          <Spacer />
                          {exceptionAlert && (
                            <p style={{ color: 'white', marginLeft: '5px' }}>
                              Data cannot be added on same day. Add some other data.
                            </p>
                          )}
                          <ButtonGroup size="sm">
                            <Button colorScheme="blue" onClick={parameterHandler}>
                              ADD
                            </Button>
                          </ButtonGroup>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                    <ExceptionTier
                      exceptionParameter={exceptionParameter}
                      updateExceptionParameter={updateExceptionParameter}
                    />
                  </Box>
                </Container>
              </FormControl>
            </form>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            {requiredFields && (
              <Text color="red" mr="5">
                Required Fields are missing
              </Text>
            )}
            {success && (
              <Text color="green" mr="5">
                Success!
              </Text>
            )}
            {alert && (
              <Text color="red" mr="5">
                SomeThing Went Wrong
              </Text>
            )}
            <Button colorScheme="green" mr={3} onClick={cancelHandler}>
              Cancel
            </Button>
            <Button form="tierForm" type="submit" bg="#7367F0" colorScheme="#ffffff">
              {isLoading ? <Spinner /> : 'Submit'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerContent>
    </Drawer>
  )
}

export default AddTier
