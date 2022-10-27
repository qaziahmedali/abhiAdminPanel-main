import React, { useEffect, useState } from 'react'
import {
  Button,
  Grid,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  FormLabel,
  Input,
  Spinner
} from '@chakra-ui/react'

import 'react-datepicker/dist/react-datepicker.css'

export interface ManagePageProps {
  isOpen: boolean
  onClose: any
  filterEmployees: any
  isLoading: boolean
  alert: boolean
  alertMessage: string
  clearMessages: any
  success: boolean
  filteredParams: any
}

const FilterEmployees: React.FC<ManagePageProps> = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [organization, setOrganization] = useState('')
  const [phone, setPhone] = useState('')
  const [cnic, setCnic] = useState('')
  // const [department, setDepartment] = useState("");
  // const [designation, setDesignation] = useState("");
  // const [gender, setGender] = useState("");

  // //
  // const [startDate, setStartDate] = useState<Date | null>(null);
  // const [endDate, setEndDate] = useState<Date | null>(null);

  const [requiredFields, setRequiredFields] = useState(false)

  // const [birthStartDate, setBirthStartDate] = useState<Date | null>(null);
  // const [birthEndDate, setBirthEndDate] = useState<Date | null>(null);

  useEffect(() => {
    setFirstName(props?.filteredParams?.firstName || '')
    setLastName(props?.filteredParams?.lastName || '')
    setEmail(props?.filteredParams?.email || '')
    setOrganization(props?.filteredParams?.organization || '')
    setPhone(props?.filteredParams?.phone || '')
    setCnic(props?.filteredParams?.cnic || '')
    // setDepartment("");
    // setDesignation("");
    // setStartDate(null);
    // setEndDate(null);
    setRequiredFields(false)
    // setGender("");
    // setPhone("");
    // setBirthStartDate(null);
    // setBirthEndDate(null);
  }, [props.isOpen, props.filteredParams])

  // const StartDate = () => {
  //   const date = new Date();

  //   setStartDate(date);
  // };
  // const EndDate = () => {
  //   const date = new Date();

  //   setEndDate(date);
  // };
  // const BirthStartDate = () => {
  //   const date = new Date();

  //   setBirthStartDate(date);
  // };
  // const BirthEndDate = () => {
  //   const date = new Date();

  //   setBirthEndDate(date);
  // };

  // const genderOptions = ["Male", "Female", "Not Specified"];
  // const clearMessages = () => {
  //   setRequiredFields(false);
  //   props.clearMessages();
  // };

  const handleSubmit = async () => {
    // clearMessages();
    // if (startDate && endDate && startDate.getTime() > endDate.getTime()) {
    //   setEndDate(startDate);
    // }
    // if (
    //   birthStartDate &&
    //   birthEndDate &&
    //   birthStartDate.getTime() > birthEndDate.getTime()
    // ) {
    //   setBirthEndDate(birthStartDate);
    // }
    if (
      // (startDate && endDate) ||
      // (birthStartDate && birthEndDate) ||
      // gender ||
      firstName ||
      lastName ||
      email ||
      phone ||
      cnic
      // department ||
      // designation
    ) {
      let paramsData = {
        // dateOfJoiningFrom: startDate,
        // dateOfJoiningTo: endDate,

        // dateOfBirthFrom: birthStartDate,
        // dateOfBirthTo: birthEndDate,
        // gender,
        firstName,
        lastName,
        email,
        phone,
        cnic
        // department,
        // designation,
      }
      props.filterEmployees(paramsData)
    } else {
      setRequiredFields(true)
    }
  }

  const cancelHandler = () => {
    props.onClose()
  }

  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        placement="right"
        size="md"
        // initialFocusRef={firstField}
        onClose={props.onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Filter Employees</DrawerHeader>

          <DrawerBody>
            <Stack spacing="12px">
              {/*<Heading size="sm">Date of joining</Heading>

              <Grid templateColumns="repeat(6, 2fr)" gap={0}>
                <FormLabel htmlFor="to">
                  To
                  <CalendarIcon
                    style={{ marginLeft: 12 }}
                    onClick={() => {
                      StartDate();
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
                      EndDate();
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

              <Heading size="sm">Date of birth</Heading>

              <Grid templateColumns="repeat(6, 2fr)" gap={0}>
                <FormLabel htmlFor="username">
                  To
                  <CalendarIcon
                    style={{ marginLeft: 12 }}
                    onClick={() => {
                      BirthStartDate();
                    }}
                  />
                </FormLabel>
                <DatePicker
                  isClearable
                  selected={birthStartDate}
                  onChange={(date: any) => setBirthStartDate(date)}
                  placeholderText="Enter End date"
                />

                <FormLabel ml="2" htmlFor="username">
                  From
                  <CalendarIcon
                    style={{ marginLeft: 12 }}
                    onClick={() => {
                      BirthEndDate();
                    }}
                  />
                </FormLabel>
                <DatePicker
                  isClearable
                  selected={birthEndDate}
                  onChange={(date: any) => setBirthEndDate(date)}
                  placeholderText="Enter End date"
                />
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="gender">Gender</FormLabel>
                <Select
                  placeholder="Select Gender"
                  onChange={(date: any) => setGender(date)}
                >
                  {genderOptions.map((value, index) => {
                    return <option key={index}>{value}</option>;
                  })}
                </Select>
              </Grid> */}

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="name">First Name</FormLabel>
                <Input
                  value={firstName}
                  placeholder="Please enter first name"
                  onChange={(event) => setFirstName(event.currentTarget.value)}
                />
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="name">Last Name</FormLabel>
                <Input
                  value={lastName}
                  placeholder="Please enter last name"
                  onChange={(event) => setLastName(event.currentTarget.value)}
                />
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  value={email}
                  placeholder="Please enter email"
                  onChange={(event) => setEmail(event.currentTarget.value)}
                />
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="phone">Phone</FormLabel>
                <Input
                  value={phone}
                  placeholder="Please enter phone"
                  onChange={(event) => setPhone(event.currentTarget.value)}
                />
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="phone">CNIC</FormLabel>
                <Input
                  value={cnic}
                  placeholder="Please enter CNIC"
                  onChange={(event) => setCnic(event.currentTarget.value)}
                />
              </Grid>

              {/* <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="designation">Designation</FormLabel>
                <Input
                  ion"
                  placeholder="Please enter designation"
                  onChange={(event) =>
                    setDesignation(event.currentTarget.value)
                  }
                />
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="department">Department</FormLabel>
                <Input
                  it"
                  placeholder="Please enter department"
                  onChange={(event) => setDepartment(event.currentTarget.value)}
                />
              </Grid> */}
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            {props.alert && (
              <Text color="red" mr="3">
                {' '}
                {props.alertMessage}
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
            <Button type="submit" bg="#7367F0" colorScheme="#ffffff" onClick={handleSubmit}>
              {props.isLoading ? <Spinner /> : 'Apply'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default FilterEmployees
