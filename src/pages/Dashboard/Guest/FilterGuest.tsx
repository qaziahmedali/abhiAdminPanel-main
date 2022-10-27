import React, { useState, useEffect } from 'react'

import {
  Input,
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

export interface FilterGuestsProps {
  isOpen: boolean
  onClose: any
  isLoading: boolean
  alertMessage: boolean
  filterExceptions: any
  success: boolean
}

const FilterGuests: React.FC<FilterGuestsProps> = (props) => {
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().getFullYear() - 1, 0, 1))
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [requiredFields, setRequiredFields] = useState(false)

  const StartDate = () => {
    const date = new Date()
    setStartDate(date)
  }
  const EndDate = () => {
    const date = new Date()
    setEndDate(date)
  }

  const handleSubmit = async () => {
    if (startDate && endDate && startDate.getTime() > endDate.getTime()) {
      setEndDate(startDate)
    }
    setRequiredFields(false)
    if (startDate || endDate || name || company || email || phone) {
      props.filterExceptions({
        startDate,
        endDate,
        name,
        company,
        email,
        phone
      })
    } else {
      setRequiredFields(true)
    }
  }
  // useEffect(() => {
  //   setStartDate(new Date("01/01/2021"));
  //   setEndDate(new Date());
  //   setName("");
  //   setEmail("");
  //   setCompany("");
  //   setPhone("");
  // }, [props.isOpen]);

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
          <DrawerHeader borderBottomWidth="1px">Filter Guests</DrawerHeader>

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
              </Grid>
              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input placeholder="Enter Name" onChange={(event) => setName(event.currentTarget.value)} />
              </Grid>
              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="company">company</FormLabel>
                <Input placeholder="Enter company" onChange={(event) => setCompany(event.currentTarget.value)} />
              </Grid>
              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="email">email</FormLabel>
                <Input placeholder="Enter email" onChange={(event) => setEmail(event.currentTarget.value)} />
              </Grid>
              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="phone">phone</FormLabel>
                <Input placeholder="Enter phone" onChange={(event) => setPhone(event.currentTarget.value)} />
              </Grid>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            {props.alertMessage && (
              <Text color="red" mr="3">
                {' '}
                Something went wrong
              </Text>
            )}
            {/* {props.success && (
              <Text color="green" mr="5">
                Success
              </Text>
            )} */}
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

export default FilterGuests
