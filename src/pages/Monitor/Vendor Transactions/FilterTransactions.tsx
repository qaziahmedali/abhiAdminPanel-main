import React, { useEffect, useState } from 'react'
import {
  Select,
  Text,
  Button,
  Grid,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormErrorMessage,
  Stack,
  FormLabel,
  Input,
  Spinner,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CalendarIcon } from '@chakra-ui/icons'
import { IVendorFilteredParams } from '@/types/store-types'
export interface FilterTransactionsProps {
  isOpen: boolean
  onClose: () => void
  filterTransaction: (params: IVendorFilteredParams) => Promise<void>
  alertMessage: string
  alert: boolean
  isLoading: boolean
  filterParams: IVendorFilteredParams
  limit?: number
}

const FilterTransactions: React.FC<FilterTransactionsProps> = (props) => {
  const [isLoading, setLoading] = useState(false)

  const [vendorName, setVendorName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [vendorId, setVendorId] = useState('')
  const [requestedAmount, setRequestedAmount] = useState('')
  const [approvedAmount, setApprovedAmount] = useState('')
  // const [organization, setOrganization] = useState("");
  const [transactionStatus, setStatus] = useState('')
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().getFullYear() - 1, 0, 1))
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [requiredFields, setRequiredFields] = useState(false)
  const [ntn, setNtn] = useState('')

  const StartDate = () => {
    setStartDate(new Date())
  }

  const EndDate = () => {
    setEndDate(new Date())
  }

  useEffect(() => {
    
    setVendorName(props?.filterParams?.vendorName || "");
    setVendorId(props?.filterParams?.vendorId || "");
    setBusinessName(props?.filterParams?.businessName || "");
    setRequestedAmount(props?.filterParams?.requestedAmount || "");
    setApprovedAmount(props?.filterParams?.approvedAmount || "");
    setStatus(props?.filterParams?.transactionStatus || "");
    setStartDate(
      props?.filterParams?.startDate ||
        new Date(new Date().getFullYear() - 1, 0, 1)
    );
    setEndDate(props?.filterParams?.endDate || new Date());
    setRequiredFields(false);
    setNtn(props?.filterParams?.ntn || "");

    setRequiredFields(false)
    setLoading(props.isLoading)
  }, [props.isOpen, props.isLoading, props.filterParams])

  const validateStartDate = (value: string) => {
    return value ? false : 'End date is required!'
  }

  const validateEndDate = (value: string) => {
    return value ? false : 'End date is required!'
  }

  const handleSubmit = async () => {
    setRequiredFields(false)
    if (startDate && endDate && startDate.getTime() > endDate.getTime()) {
      setEndDate(startDate)
    }
    if (
      (startDate && endDate) ||
      vendorName ||
      businessName ||
      vendorId ||
      requestedAmount ||
      approvedAmount ||
      transactionStatus ||
      ntn
    ) {
      props.filterTransaction({
        page: 1,
        limit: props.limit || 10,
        startDate,
        endDate,
        vendorName,
        businessName,
        vendorId,
        requestedAmount,
        approvedAmount,
        transactionStatus,
        ntn
      })
    } else {
      setRequiredFields(true)
    }
  }

  return (
    <>
      <Formik
        initialValues={{ startDate: startDate, endDate: endDate }}
        onSubmit={(values, actions) => {
          console.log('VALUES', values, actions)
        }}
        validateOnChange
      >
        {({ errors, touched, isValidating }) => (
          <Form>
            <Drawer isOpen={props.isOpen} placement="right" size="sm" onClose={props.onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">
                  Filter Vendor Transactions
                </DrawerHeader>

                <DrawerBody>
                  <Stack spacing="24px">
                    <Field name="startDate" validate={validateStartDate}>
                      {({ field, form }: any) => (
                        <FormControl isInvalid={form.errors.startDate && form.touched.startDate}>
                          <Grid templateColumns="repeat(2, 2fr)" gap={0}>
                            <FormLabel htmlFor="startDate">
                              Start Date
                              <CalendarIcon
                                style={{ marginLeft: 12 }}
                                onClick={() => {
                                  StartDate()
                                }}
                              />
                            </FormLabel>

                            <DatePicker
                              isClearable
                              selected={startDate}
                              onChange={(date: any) => setStartDate(date)}
                              placeholderText="Enter Start date"
                            />

                            <FormErrorMessage>{!startDate && errors.startDate}</FormErrorMessage>
                          </Grid>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="endDate" validate={validateEndDate}>
                      {({ field, form }: any) => (
                        <FormControl isInvalid={form.errors.endDate && form.touched.endDate}>
                          <Grid templateColumns="repeat(2, 2fr)" gap={0}>
                            <FormLabel htmlFor="endDate">
                              End Date
                              <CalendarIcon
                                style={{ marginLeft: 12 }}
                                onClick={() => {
                                  EndDate()
                                }}
                              />
                            </FormLabel>
                            <DatePicker
                              isClearable
                              selected={endDate}
                              onChange={(date: any) => setEndDate(date)}
                              placeholderText="Enter End date"
                            />
                            <FormErrorMessage>{!endDate && errors.endDate}</FormErrorMessage>
                          </Grid>
                        </FormControl>
                      )}
                    </Field>

                    <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                      <FormLabel htmlFor="vendorName">Vendor Name</FormLabel>
                      <Input
                        value={vendorName}
                        placeholder="Vendor name"
                        onChange={(event) => setVendorName(event.currentTarget.value)}
                      />
                    </Grid>

                    <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                      <FormLabel htmlFor="vendorId">Vendor ID</FormLabel>
                      <Input
                        value={vendorId}
                        placeholder="Vendor ID"
                        onChange={(event) => setVendorId(event.currentTarget.value)}
                      />
                    </Grid>

                    <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                      <FormLabel htmlFor="businessName">Business Name</FormLabel>
                      <Input
                        value={businessName}
                        placeholder="Enter Business Name"
                        onChange={(event) => setBusinessName(event.currentTarget.value)}
                      />
                    </Grid>

                    <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                      <FormLabel htmlFor="Ntn">NTN</FormLabel>
                      <Input
                        value={ntn}
                        placeholder="Enter NTN"
                        onChange={(event) => setNtn(event.currentTarget.value)}
                      />
                    </Grid>

                    <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                      <FormLabel htmlFor="requestedAmount">Requested Amount</FormLabel>
                      <NumberInput
                        defaultValue={requestedAmount}
                        min={0}
                        placeholder="Enter requested amount"
                        onChange={(value) => setRequestedAmount(value)}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Grid>

                    <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                      <FormLabel htmlFor="approvedAmount">Approved Amount</FormLabel>
                      <NumberInput
                        defaultValue={approvedAmount}
                        min={0}
                        placeholder="Enter approved amount"
                        onChange={(value) => setApprovedAmount(value)}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Grid>

                    <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                      <FormLabel htmlFor="status">Status</FormLabel>

                      <Select
                        defaultValue={transactionStatus}
                        placeholder="Select Status"
                        onChange={(event) => setStatus(event.currentTarget.value)}
                      >
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                      </Select>
                    </Grid>
                  </Stack>
                </DrawerBody>

                <DrawerFooter borderTopWidth="1px">
                  {props.alertMessage && (
                    <Text color="red" mr="3">
                      {' '}
                      {props.alertMessage}
                    </Text>
                  )}

                  {requiredFields && (
                    <Text color="red" mr="3">
                      Start & end date is required
                    </Text>
                  )}
                  <Button colorScheme="green" mr={3} onClick={props.onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" bg="#7367F0" colorScheme="#ffffff" onClick={handleSubmit}>
                    {isLoading ? <Spinner /> : 'Apply'}
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default FilterTransactions
