import React, { useEffect, useState } from 'react'
import {
  Button,
  Grid,
  Select,
  Text,
  Spinner,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  FormLabel,
  Input
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import { useEasyActions, useEasyState } from '../../../store/hooks'
import { CalendarIcon } from '@chakra-ui/icons'
import 'react-datepicker/dist/react-datepicker.css'
import { FilteredParams } from './Organization'
export interface ManagePageProps {
  isOpen: boolean
  onClose: any
  filterOrganization: any
  isLoading: boolean
  alertMessage: boolean
  success: boolean
  setSuccess: any
  clearMessages: any
  filteredParams: FilteredParams
}

const FilterOrganization: React.FC<ManagePageProps> = (props) => {
  const [name, setName] = useState('')
  const [industry, setIndustry] = useState('')
  const [businessNature, setBusinessNature] = useState('')

  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [showInactive, setShowInactive] = useState('false')
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().getFullYear() - 1, 0, 1))
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [requiredFields, setRequiredFields] = useState(false)

  useEffect(() => {
    setName(props?.filteredParams?.name || '')
    setIndustry(props?.filteredParams?.industry || '')
    setBusinessNature(props?.filteredParams?.businessNature || '')
    setCity(props?.filteredParams?.city || '')

    setCountry(props?.filteredParams?.country || '')
    setShowInactive(props?.filteredParams?.showInactive || 'false')

    setStartDate(props?.filteredParams?.startDate || new Date(new Date().getFullYear() - 1, 0, 1))
    setEndDate(props?.filteredParams?.endDate || new Date())
    setRequiredFields(false)

    props.setSuccess(false)
  }, [props.isOpen, props.filteredParams])

  const { BusinessType } = useEasyState((state) => state.organization)
  const { getBusinessType } = useEasyActions((state) => state.organization)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    let params: any = {
      page: 1,
      limit: 10
    }
    // const bankData = await getBank(params);
    await getBusinessType(params)
  }

  const clearMessages = () => {
    setRequiredFields(false)
    props.clearMessages()
  }

  const StartDate = () => {
    setStartDate(new Date())
  }

  const EndDate = () => {
    setEndDate(new Date())
  }

  const filterOrganization = async () => {
    clearMessages()

    if (startDate && endDate && startDate.getTime() > endDate.getTime()) {
      setEndDate(startDate)
    }

    if ((startDate && endDate) || name || industry || country || city || businessNature || status) {
      let paramsData = {
        startDate: startDate,
        endDate: endDate,
        name,
        industry,
        country,
        city,
        businessNature,
        showInactive
      }
      props.filterOrganization(paramsData)
    } else {
      setRequiredFields(true)
    }
  }

  const cancelHandler = () => {
    props.onClose()
    clearMessages()
  }

  return (
    <>
      <Drawer isOpen={props.isOpen} placement="right" size="sm" onClose={props.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Filter Organizations</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
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
              </Grid>

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
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="organization-name">Organization</FormLabel>
                <Input
                  placeholder=" Enter organization"
                  value={name}
                  onChange={(event) => setName(event.currentTarget.value)}
                />
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="industry">Industry</FormLabel>
                <Input
                  placeholder=" Enter Industry"
                  value={industry}
                  onChange={(event) => setIndustry(event.currentTarget.value)}
                />
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="business">Business Nature</FormLabel>

                <Select
                  placeholder="Select Business Nature"
                  defaultValue={businessNature}
                  onChange={(event) => setBusinessNature(event.currentTarget.value)}
                >
                  {BusinessType?.results?.length > 0 ? (
                    BusinessType?.results?.map((value, index) => {
                      return (
                        <option key={index} value={value?.name}>
                          {value?.name}
                        </option>
                      )
                    })
                  ) : (
                    <option>No Item found</option>
                  )}
                </Select>
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="city">City</FormLabel>
                <Input
                  value={city}
                  placeholder=" Enter city"
                  onChange={(event) => setCity(event.currentTarget.value)}
                />
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="status">Status</FormLabel>

                <Select
                  defaultValue={showInactive}
                  placeholder="Select Status"
                  onChange={(event) => setShowInactive(event.currentTarget.value)}
                >
                  <option value="false">Active</option>;<option value="true">InActive</option>;
                </Select>
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

            {props.success && (
              <Text color="green" mr="3">
                {' '}
                Success
              </Text>
            )}
            {requiredFields && (
              <Text color="red" mr="3">
                {' '}
                Required Fields are missing
              </Text>
            )}

            <Button colorScheme="green" mr={3} onClick={cancelHandler}>
              Cancel
            </Button>
            <Button type="submit" bg="#7367F0" colorScheme="#ffffff" onClick={filterOrganization}>
              {props.isLoading ? <Spinner /> : 'Apply'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default FilterOrganization
