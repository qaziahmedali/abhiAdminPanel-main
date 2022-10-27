import React, { useState } from 'react'
import {
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
  Stack,
  FormLabel,
  Input,
  Spinner,
  Select
} from '@chakra-ui/react'
import { OrganizationResults } from '@/types/organizations/organizations'
import { useEasyActions, useEasyState } from '@/store/hooks'
import { Autocomplete, Option } from 'chakra-ui-simple-autocomplete'
export interface ManagePageProps {
  isOpen: boolean
  onClose: any
  filterUsers: any
  clearMessages: any
  isLoading: boolean
  success: boolean
  alert: boolean
}

const FilterUsers: React.FC<ManagePageProps> = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [organization, setOrganization] = useState('')
  const [phone, setPhone] = useState('')
  const [cnic, setCnic] = useState('')
  // const [currentOrganizations, setCurrentOrganizations] = React.useState<
  //   Option[]
  // >([]);
  // const [managerType, setManagerType] = useState<string>("");
  // const [firstName, setFirstName] = useState<string>("");
  // const [lastName, setLastName] = useState<string>("");
  // const [fullName, setFullName] = useState<string>("");
  // const [status, setStatus] = useState<string>("");
  // const [mobileNo, setMobileNo] = useState<string>("");
  // const [page, setPage] = useState(1);
  // const [isPasswordChanged, setIsPasswordChanged] = useState<string>("");
  // const { allOrganizations } = useEasyState((state) => state.organization);
  // const { getOrganizationNames } = useEasyActions(
  //   (state) => state.organization
  // );
  // const [startDate, setStartDate] = useState<Date>(
  //   new Date(new Date().getFullYear() - 1, 0, 1)
  // );
  // const [endDate, setEndDate] = useState<Date | null>(null);

  const [requiredFields, setRequiredFields] = useState(false)
  // const StartDate = () => {
  //   const date = new Date();

  //   setStartDate(date);
  // };
  // const EndDate = () => {
  //   const date = new Date();

  //   setEndDate(date);
  // };

  // let options = allOrganizations?.map((item, index) => ({
  //   value: item.id,
  //   label: item.name,
  // }));
  const clearMessages = () => {
    setRequiredFields(false)
    // setCurrentOrganizations([]);
    // setManagerType("");
    // setFirstName("");
    // setLastName("");
    // setFullName("");
    // setMobileNo("");
    // setIsPasswordChanged("");
    // setStartDate(new Date(new Date().getFullYear() - 1, 0, 1));
    // setEndDate(null);
    props.clearMessages()
  }

  // React.useEffect(() => {
  //   getOrganizations();
  // }, [page]);

  const handleSubmit = async () => {
    clearMessages()
    // if (startDate && endDate && startDate.getTime() > endDate.getTime()) {
    //   setEndDate(startDate);
    // }

    // if (
    //   currentOrganizations ||
    //   managerType ||
    //   firstName ||
    //   lastName ||
    //   fullName ||
    //   status ||
    //   mobileNo ||
    //   isPasswordChanged
    // ) {
    //   let paramsData = {
    //     organizationId: currentOrganizations?.[0]?.value,
    //     managerType,
    //     firstName,
    //     lastName,
    //     fullName,
    //     status,
    //     mobileNo,
    //     isPasswordChanged,
    //   };
    if (firstName || lastName || email || phone || cnic) {
      let paramsData = {
        firstName,
        lastName,
        email,
        phone,
        cnic
      }

      props.filterUsers(paramsData)
    } else {
      setRequiredFields(true)
    }
  }

  const cancelHandler = () => {
    props.onClose()
    clearMessages()
  }
  // const getOrganizations = async () => {
  //   let params = {
  //     limit: Number.MAX_SAFE_INTEGER,
  //     page,
  //   };
  //   const OrgData: OrganizationResults[] = await getOrganizationNames(params);

  //   options = OrgData?.map((item, index) => ({
  //     value: item.id,
  //     label: item.name,
  //   }));
  // };

  return (
    <>
      <Drawer isOpen={props.isOpen} placement="right" size="sm" onClose={props.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Filter Users</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              {/* <Grid templateColumns="repeat(2, 2fr)" gap={0}>
                <FormLabel htmlFor="startDate">
                  Start Date
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
              </Grid>

              <Grid templateColumns="repeat(2, 2fr)" gap={0}>
                <FormLabel ml="2" htmlFor="endDate">
                  End Date
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
              </Grid> */}

              {/* <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="Select Organization">
                  Select Organization
                </FormLabel>
                {options[0] == null ? (
                  <Spinner />
                ) : (
                  <Autocomplete
                    options={options}
                    allowCreation={true}
                    result={currentOrganizations}
                    setResult={(options: Option[]) => {
                      if (options[0]) {
                        setCurrentOrganizations([options[0]]);
                      } else {
                        setCurrentOrganizations([]);
                      }
                    }}
                    placeholder="Search Organization"
                  />
                )}
              </Grid>
              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="managerType">Manager Type</FormLabel>
                <Select
                  placeholder="Manager Type"
                  value={managerType}
                  onChange={(event) =>
                    setManagerType(event.currentTarget.value)
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="support">Support</option>
                  <option value="ops">Ops</option>
                </Select>
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  placeholder="First Name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.currentTarget.value)}
                />
              </Grid>
              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(event) => setLastName(event.currentTarget.value)}
                />
              </Grid>
              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="fullName">Full Name</FormLabel>
                <Input
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(event) => setFullName(event.currentTarget.value)}
                />
              </Grid>
              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="status">Status</FormLabel>
                <Select
                  placeholder="Status"
                  value={status}
                  onChange={(event) => setStatus(event.currentTarget.value)}
                >
                  <option value="active">Active</option>
                  <option value="no">Inactive</option>
                </Select>
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="mobileNo">Mobile No</FormLabel>
                <Input
                  placeholder="Mobile No"
                  value={mobileNo}
                  onChange={(event) => setMobileNo(event.currentTarget.value)}
                />
              </Grid>
              <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                <FormLabel htmlFor="isPasswordChanged">
                  Is Passwrod Changed
                </FormLabel>
                <Select
                  placeholder="Is Passwrod Changed"
                  value={isPasswordChanged}
                  onChange={(event) =>
                    setIsPasswordChanged(event.currentTarget.value)
                  }
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
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
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            {props.alert && (
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
            <Button type="submit" bg="#7367F0" colorScheme="#ffffff" onClick={handleSubmit}>
              {props.isLoading ? <Spinner /> : 'Apply'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default FilterUsers
