import React, { useState } from 'react'
import {
  Heading,
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
  FormLabel,
  Spinner
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import { CalendarIcon } from '@chakra-ui/icons'

export interface FilterSettlementProps {
  isOpen: boolean
  onClose: any
  isLoading: boolean
  alertMessage: boolean
  clearMessages: any
  filterSettlement: any
  success: boolean
  organizationId: string
}

const FilterSettlement: React.FC<FilterSettlementProps> = (props) => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [requiredFields, setRequiredFields] = useState(false)

  const StartDate = () => {
    const date = new Date()
    // console.log(date);

    setStartDate(date)
  }
  const EndDate = () => {
    const date = new Date()
    // console.log(date);

    setEndDate(date)
  }
  const clearMessages = () => {
    setRequiredFields(false)
    props.clearMessages()
  }

  const handleSubmit = async () => {
    clearMessages()
    if (startDate && endDate && startDate.getTime() > endDate.getTime()) {
      setEndDate(startDate)
    }

    if (startDate && endDate) {
      let paramsData = {
        from: startDate,
        to: endDate,
        organizationId: props.organizationId
      }
      props.filterSettlement(paramsData)
    } else {
      setRequiredFields(true)
    }
  }

  return (
    <>
      <Drawer isOpen={props.isOpen} placement="right" size="md" onClose={props.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Filter Settlements</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Heading size="sm">Period</Heading>

              <Grid templateColumns="repeat(6, 2fr)" gap={0}>
                <FormLabel htmlFor="to">
                  To
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

                <FormLabel ml="2" htmlFor="from">
                  From
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
              </Grid>

              {/* <Heading size="sm">Period</Heading>

              <Grid templateColumns="repeat(6, 2fr)" gap={0}>
                <FormLabel htmlFor="to">To</FormLabel>
                <DatePicker
                  isClearable
                  selected={periodStartDate}
                  onChange={(date: any) => setPeriodStartDate(date)}
                  placeholderText="Enter End date"
                />

                <FormLabel ml="2" htmlFor="from">
                  From
                </FormLabel>
                <DatePicker
                  isClearable
                  selected={periodEndDate}
                  onChange={(date: any) => setPeriodEndDate(date)}
                  placeholderText="Enter End date"
                />
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="arrears">Arrears</FormLabel>
                <Input
                               placeholder="Please enter arrears"
                  onChange={(event) => setArrears(event.currentTarget.value)}
                />
              </Grid>
              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="amountDue">Amount Due</FormLabel>
                <Input
                                   placeholder="Please enter due amount"
                  onChange={(event) => setDueAmount(event.currentTarget.value)}
                />
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="amountRecived">Amount Recieved</FormLabel>
                <Input
                  d"
                  placeholder="Please enter amount"
                  onChange={(event) =>
                    setRecievedAmount(event.currentTarget.value)
                  }
                />
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="balance">Balance</FormLabel>
                <Input
                               placeholder="Please enter balance"
                  onChange={(event) => setBalance(event.currentTarget.value)}
                />
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="status">Status</FormLabel>
                <Input
                            placeholder="Please enter status"
                  onChange={(event) => setStatus(event.currentTarget.value)}
                />
              </Grid> */}
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
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

export default FilterSettlement
