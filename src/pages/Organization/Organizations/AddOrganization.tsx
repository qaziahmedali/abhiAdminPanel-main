import React, { useState, useEffect, Fragment } from 'react'
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
  Stack,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Spinner,
  Box
} from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { Autocomplete, Option } from 'chakra-ui-simple-autocomplete'
import 'react-datepicker/dist/react-datepicker.css'
import { useEasyActions, useEasyState } from '../../../store/hooks'
import { BusinessTypeResult, TariffResult } from '@/types/store-types/IOrganization'
export interface AddOrganizationsProps {
  isOpen: boolean
  onClose: any
  AddOrganization: any
  alertMessage: string
  alert: boolean
  isLoading: boolean
}

const AddOrganizations: React.FC<AddOrganizationsProps> = (props) => {
  const { getTariff, getBusinessType } = useEasyActions((state) => state.organization)

  const { Tariff, BusinessType } = useEasyState((state) => state.organization)
  // const [BankRecord, setBankRecord] = useState<BankResult[]>([]);
  const [TariffRecord, setTariffRecord] = useState<TariffResult[]>([])
  const [BusinessTypeRecord, setBusinessTypeRecord] = useState<BusinessTypeResult[]>([])

  // states
  const [organizationName, setOrganizationName] = useState('')
  const [industry, setIndustry] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('Pakistan')
  const [officialEmail, setOfficialEmail] = useState('')
  const [officialPhone, setOfficialPhone] = useState('')
  const [aliasValid, setAliasValid] = useState(false)
  // const [businessBankAccount, setBusinessBankAccount] = useState("");
  // const [bankAccountTitle, setBankAccountTitle] = useState("");
  // const [bankAccountNo, setBankAccountNo] = useState("");
  // const [tariffType, setTariffType] = useState("Tier");
  const [tariff, setTariff] = useState('')
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [cnic, setCnic] = useState("");
  // const [birthDate, setBirthDate] = useState<Date | null>(null);
  // const [joiningDate, setJoiningDate] = useState<Date | null>(null);
  // const [gender, setGender] = useState("Male");
  // const [bOfficialEmail, setBOfficialEmail] = useState("");
  // const [bOfficialPhone, setBOfficialPhone] = useState("");
  // const [empCode, setEmpCode] = useState("");
  // const [empBadge, setEmpBadge] = useState("Bronze");
  // const [netSalary, setNetSalary] = useState("");
  // const [department, setDepartment] = useState("");
  // const [designation, setDesignation] = useState("");
  // const [salaryBank, setSalaryBank] = useState("");
  // const [salaryBankAccountNo, setSalaryBankAccountNo] = useState("");
  // const [salaryBankAccountTitle, setSalaryBankAccountTitle] = useState("");
  const [supportAgent, setSupportAgent] = useState('')
  const [supportAgentValue, setSupportAgentValue] = useState('')

  const [requiredFields, setRequiredFields] = useState(false)
  const [validationMessage, setValidationMessage] = useState<string | null>(null)
  const [currentOrganizations, setCurrentOrganizations] = React.useState<Option[]>([])
  const { allOrganizations } = useEasyState((state) => state.organization)

  let optionsData = allOrganizations.filter((item) => item?.organizationType == 'parent')

  let options = optionsData?.map((item, index) => ({
    value: item.id,
    label: item.name
  }))

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    // console.log(
    // 	Bank?.results.sort((a, b) => a.bankName.localeCompare(b.bankName))
    // );
    // setBankRecord(
    //   Bank?.results?.sort((a, b) => a.bankName.localeCompare(b.bankName)) ?? []
    // );
    setTariffRecord(Tariff?.results)
    setBusinessTypeRecord(BusinessType?.results)
  }, [BusinessType, Tariff])

  useEffect(() => {
    setOrganizationName('')
    setIndustry('')
    setBusinessType('')
    setAddress('')
    setCity('')
    setCountry('Pakistan')
    setOfficialEmail('')
    setOfficialPhone('')
    setAliasValid(false)
    setTariff('')
    setSupportAgent('')
    setSupportAgentValue('')
    setCurrentOrganizations([])
    setRequiredFields(false)
  }, [props.isOpen])

  const getData = async () => {
    let params: any = {
      offset: 1,
      limit: 100 // Leave it 100
    }
    // const bankData = await getBank(params);
    await getTariff(params)
    await getBusinessType(params)
  }

  const handleSubmit = async () => {
    setRequiredFields(false)

    if (validate()) {
      return
    }

    if (organizationName && industry && businessType && address && city && tariff && supportAgentValue) {
      props.AddOrganization({
        name: organizationName,
        industry: industry,
        businessTypeId: businessType,
        address: address,
        city: city,
        email: officialEmail,
        phone: officialPhone,
        tariffId: tariff,
        managementAlias: supportAgentValue,
        parentOrganizationId: currentOrganizations.length > 0 ? currentOrganizations?.[0]?.value : ''
      })
    } else {
      setRequiredFields(true)
    }
  }

  const checkManagementAlias = (inputtxt: any) => {
    const value = inputtxt.target.value.replace(/[^A-Za-z]/gi, '').toLowerCase()
    setSupportAgentValue(value)
    setSupportAgent(value + '-admin@abhi.com.pk / ' + value + '-support@abhi.com.pk')
  }

  const validate = () => {
    let result = null

    // Validate Email
    if (officialEmail != '' && !validateEmail(officialEmail)) result = 'Email address is not valid!'

    if (result != '') {
      setValidationMessage(result)
    }

    return result
  }

  const validateEmail = (email: string) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
  }

  return (
    < >
      <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {
          console.log('VALUES', values, actions)
        }}
        validateOnChange
      >
        {({ errors, touched, isValidating }) => (
          <Form>
            <Drawer isOpen={props.isOpen} placement="right" size="md" onClose={props.onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">Add Organization</DrawerHeader>

                <DrawerBody>
                  <Stack spacing="24px">
                    <h1>
                      <b>Organization Information</b>
                    </h1>
                    {/* Parent Organization  */}

                    <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                      <FormLabel htmlFor="organization">Parent Organization</FormLabel>
                      <Box zIndex="1000" background="white">
                        {options[0] == null ? (
                          <Spinner />
                        ) : (
                          <Autocomplete
                            options={options}
                            allowCreation={true}
                            result={currentOrganizations}
                            setResult={(options: Option[]) => {
                              if (options[0]) {
                                setCurrentOrganizations([options[0]])
                              } else {
                                setCurrentOrganizations([])
                              }
                            }}
                            placeholder="Search Organization"
                          />
                        )}
                      </Box>
                    </Grid>

                    {/* Organization Name */}
                    <FormControl isRequired aria-required>
                      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                        <FormLabel htmlFor="organization">Organization Name</FormLabel>
                        <Input
                          placeholder="Organization Name"
                          value={organizationName}
                          onChange={(event) => setOrganizationName(event.currentTarget.value)}
                        />
                      </Grid>
                    </FormControl>

                    {/* Industry Name */}
                    <FormControl isRequired aria-required>
                      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                        <FormLabel htmlFor="Industry">Industry Name</FormLabel>
                        <Input
                          isRequired
                          placeholder="Industry Name"
                          value={industry}
                          onChange={(event) => setIndustry(event.currentTarget.value)}
                        />
                      </Grid>
                    </FormControl>

                    {/* Business Type */}
                    <FormControl isRequired aria-required>
                      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                        <FormLabel htmlFor="BusinessType">Business Type</FormLabel>

                        <Select
                          isRequired
                          placeholder={'Select Type'}
                          defaultValue={businessType}
                          onChange={(event) => setBusinessType(event.currentTarget.value)}
                        >
                          {BusinessTypeRecord ? (
                            BusinessTypeRecord.map((item, i) => (
                              <Fragment key={i}>
                                <option value={item.id}>{item.name}</option>
                              </Fragment>
                            ))
                          ) : (
                            <Fragment>
                              <option>---No Data Found---</option>
                            </Fragment>
                          )}
                        </Select>
                      </Grid>
                    </FormControl>

                    {/* Address */}
                    <FormControl isRequired aria-required>
                      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                        <FormLabel htmlFor="address">Address</FormLabel>
                        <Input
                          isRequired
                          placeholder="Address"
                          value={address}
                          onChange={(event) => setAddress(event.currentTarget.value)}
                        />
                      </Grid>
                    </FormControl>

                    {/* City */}
                    <FormControl isRequired aria-required>
                      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                        <FormLabel htmlFor="city">City</FormLabel>

                        <Input
                          isRequired
                          placeholder="City"
                          value={city}
                          onChange={(event) => setCity(event.currentTarget.value)}
                        />
                      </Grid>
                    </FormControl>

                    {/* Official Email */}
                    <FormControl aria-required>
                      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                        <FormLabel htmlFor="organization">Official Email</FormLabel>
                        <Input
                          placeholder="Official Email"
                          value={officialEmail}
                          isInvalid={
                            // It will validate email if email is entered
                            !validateEmail(officialEmail) && officialEmail != ''
                          }
                          onChange={(event) => setOfficialEmail(event.currentTarget.value)}
                        />
                      </Grid>
                    </FormControl>

                    {/* Official Phone */}
                    <FormControl aria-required>
                      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                        <FormLabel htmlFor="officialPhone">Official Phone</FormLabel>
                        {/* <Input
                          placeholder="Official Phone"
                          onChange={(event) =>
                            setOfficialPhone(event.currentTarget.value)
                          }
                        /> */}
                        <NumberInput
                          step={1}
                          min={0}
                          placeholder="Official Phone"
                          inputMode="tel"
                          onChange={(event) => setOfficialPhone(event)}
                        >
                          <NumberInputField />
                        </NumberInput>
                      </Grid>
                    </FormControl>

                    {/* BusinessBankAccount */}
                    {/* <FormControl isRequired aria-required>
											<Grid templateColumns="repeat(2, 1fr)" gap={0}>
												<FormLabel htmlFor="BusinessBankAccount">
													Business Bank Account
												</FormLabel>

												<Select
													isRequired
													defaultValue=""
													placeholder="Business Bank Account"
													onChange={(event) =>
														setBusinessBankAccount(event.currentTarget.value)
													}
												>
													{BankRecord ? (
														BankRecord.map((item, i) => (
															<Fragment key={i}>
																<option value={item.bankName}>
																	{item.bankName}
																</option>
															</Fragment>
														))
													) : (
														<Fragment key="1">
															<option>---No Data Found---</option>
														</Fragment>
													)}
													
												</Select>
											</Grid>
										</FormControl> */}

                    {/* BankAccountNo */}
                    {/* <FormControl isRequired aria-required>
											<Grid templateColumns="repeat(2, 1fr)" gap={0}>
												<FormLabel htmlFor="BankAccountNo">
													Bank Account No
												</FormLabel>
												<Input
												
													placeholder="Bank Accoun tNo"
													onChange={(event) =>
														setBankAccountNo(event.currentTarget.value)
													}
												/>
											</Grid>
										</FormControl> */}
                    {/* BankAccountTitle */}
                    {/* <FormControl isRequired aria-required>
											<Grid templateColumns="repeat(2, 1fr)" gap={0}>
												<FormLabel htmlFor="BankAccountTitle">
													Bank Account Title
												</FormLabel>
												<Input
													
													placeholder="Bank Account Title"
													onChange={(event) =>
														setBankAccountTitle(event.currentTarget.value)
													}
												/>
											</Grid>
										</FormControl> */}
                    {/* TariffType */}
                    {/* <FormControl isRequired aria-required>
											<Grid templateColumns="repeat(2, 1fr)" gap={0}>
												<FormLabel htmlFor="TariffType">Tariff Type</FormLabel>
												<RadioGroup
													defaultValue="Tier"
													onChange={(event) => setTariffType(event)}
												>
													<Stack spacing={5} direction="row">
														<Radio
															defaultChecked={true}
															colorScheme="red"
															value="Tier"
														>
															Tier
														</Radio>
														<Radio colorScheme="green" value="Tipping">
															Tipping
														</Radio>
													</Stack>
												</RadioGroup>
											</Grid>
										</FormControl> */}

                    {/* Tariff */}
                    <FormControl isRequired aria-required>
                      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                        <FormLabel htmlFor="Tariff">Tariff</FormLabel>

                        <Select
                          isRequired
                          defaultValue=""
                          placeholder="----Tariff----"
                          onChange={(event) => setTariff(event.currentTarget.value)}
                        >
                          {TariffRecord ? (
                            TariffRecord.map((item, i) => (
                              <Fragment key={i}>
                                <option value={item.id}>{item.name}</option>
                              </Fragment>
                            ))
                          ) : (
                            <Fragment key="1">
                              <option>---No Data Found---</option>
                            </Fragment>
                          )}
                          {/* <option value="2% Tier Tariff">2% Tier Tariff</option>
												<option value="Tariff2"> Tariff2</option>
												<option value="Tariff3">Tariff3</option> */}
                        </Select>
                        <Text></Text>
                      </Grid>
                    </FormControl>

                    {/* Support Agent */}
                    <FormControl isRequired aria-required>
                      <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                        <FormLabel htmlFor="supportAgent">Management Alias</FormLabel>
                        <Input
                          isInvalid={aliasValid}
                          value={supportAgentValue}
                          placeholder="Management Alias"
                          onChange={(event) => {
                            checkManagementAlias(event)
                          }}
                        />
                      </Grid>
                      <Grid templateColumns="repeat(1, 1fr)" gap={0}>
                        {supportAgentValue.length > 0 ? (
                          <>
                            <p style={{ color: 'red' }}>{supportAgentValue}-admin@abhi.com.pk</p>
                            <br />
                            <p style={{ color: 'red' }}>{supportAgentValue}-support@abhi.com.pk</p>
                          </>
                        ) : (
                          ''
                        )}
                      </Grid>
                    </FormControl>
                  </Stack>
                </DrawerBody>

                <DrawerFooter borderTopWidth="1px">
                  {/* {props.alert && (
                    <Text color="red" mr="3">
                      {" "}
                      {props.alertMessage}
                    </Text>
                  )}{" "} */}
                  {requiredFields && (
                    <Text color="red" mr="3">
                      {' '}
                      Required Fields are missing
                    </Text>
                  )}

                  {validationMessage && (
                    <Text color="red" mr="3">
                      {validationMessage}
                    </Text>
                  )}
                  <Button colorScheme="green" mr={3} onClick={props.onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" bg="#7367F0" colorScheme="#ffffff" onClick={handleSubmit}>
                    {props.isLoading ? <Spinner /> : 'Submit'}
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

export default AddOrganizations
