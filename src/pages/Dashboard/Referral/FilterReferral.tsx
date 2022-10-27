import React, { useEffect, useState } from 'react'
import {
  Select,
  Text,
  Spinner,
  Button,
  Grid,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  FormLabel
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CalendarIcon } from '@chakra-ui/icons'

export interface FilterReferralProps {
  isOpen: boolean
  onClose: any
  isLoading: boolean
  alertMessage: boolean
  filterExceptions: any
  success: boolean
  FilteredParams: {
    startDate: Date
    endDate: Date
  } | null
}

const FilterReferrals: React.FC<FilterReferralProps> = (props) => {
  const [type, setType] = useState('')
  const [module, setModule] = useState('')
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().getFullYear() - 1, 0, 1))
  const [endDate, setEndDate] = useState<Date>(new Date())

  const [requiredFields, setRequiredFields] = useState(false)

  const StartDate = () => {
    const date = new Date()
    setStartDate(date)
  }
  const EndDate = () => {
    const date = new Date()
    setEndDate(date)
  }
  useEffect(() => {
    setStartDate(props?.FilteredParams?.startDate || new Date(new Date().getFullYear() - 1, 0, 1))
    setEndDate(props?.FilteredParams?.endDate || new Date())
    setRequiredFields(false)
  }, [props.isOpen])

  const handleSubmit = async () => {
    if (startDate && endDate && startDate.getTime() > endDate.getTime()) {
      setEndDate(startDate)
    }

    setRequiredFields(false)
    if (startDate || endDate || module || type) {
      props.filterExceptions({
        startDate: startDate, //startDate && startDate.toDateString(),
        endDate: endDate, //endDate && endDate.toDateString(),
        module,
        type
      })
    } else {
      setRequiredFields(true)
    }
  }

  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        placement="right"
        size="sm"
        // initialFocusRef={firstField}
        onClose={props.onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Filter Referral</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Grid templateColumns="repeat(2, 2fr)" gap={0}>
                <FormLabel htmlFor="username">
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
              </Grid>
              <Grid templateColumns="repeat(2, 2fr)" gap={0}>
                <FormLabel ml="2" htmlFor="endDate">
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
                  placeholderText="Enter End date"
                  selected={endDate}
                  onChange={(date: any) => setEndDate(date)}
                />
                {/* <DatePicker onChange={onChange} value={value} /> */}
              </Grid>

              {false && (
                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="type">Type</FormLabel>

                  <Select
                    defaultValue=""
                    placeholder="Select type"
                    onChange={(event) => setType(event.currentTarget.value)}
                  >
                    <option value="exception">Exception</option>
                    <option value="warning"> Warning</option>
                    <option value="error"> Error</option>
                  </Select>
                </Grid>
              )}
              {false && (
                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="module">Module</FormLabel>

                  <Select
                    defaultValue=""
                    placeholder="Select type"
                    onChange={(event) => setModule(event.currentTarget.value)}
                  >
                    <option value="employee_web">Employee Web</option>
                    <option value="employee_mobile"> Employee Mobile</option>
                    <option value="admin_web">Admin Web</option>
                    {/* <option value="all"> All</option>
                     */}
                  </Select>
                </Grid>
              )}
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            {props.alertMessage && (
              <Text color="red" mr="3">
                {' '}
                Something went wrong
              </Text>
            )}
            {props.success && (
              <Text color="green" mr="5">
                Success
              </Text>
            )}
            {requiredFields && (
              <Text color="red" mr="3">
                {' '}
                Required Fields are missing
              </Text>
            )}

            <Button colorScheme="green" mr={3} onClick={props.onClose}>
              Cancel
            </Button>
            <Button type="submit" bg="#7367F0" colorScheme="#ffffff" onClick={handleSubmit}>
              {props.isLoading ? <Spinner /> : 'Apply'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default FilterReferrals
