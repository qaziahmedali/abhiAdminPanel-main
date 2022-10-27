import { Button, Flex, FormLabel, Grid, Input, Select, Spacer, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'

import { Initiator, TariffData } from '@/types/store-types'
import LoadingSpinner from '../../../components/common/Spinner'
import { apiManager } from '@/utils/apiManager/ApiManager'
import { useEasyState } from '../../../store/hooks'
import { OrganizationByID } from '@/types/organizations/organizationById'

export interface GeneralProps {
  data: any
  organizationData: OrganizationByID
  manageLoading: boolean
  setTariffData: any
  setOrganizationStatus: any
  tariff: TariffData
  setBillPaymentTariff: (val:string) => void
}

const Manage: React.FC<GeneralProps> = (props) => {
  // These default values are added in Database
  const defaultPhone = '+920000000000'
  const defaultEmail = 'undefined@abhi.com.pk'

  const [logo, setLogo] = useState('')
  const [employee, setEmployeeName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')

  const [phoneNo, setPhoneNo] = useState('')
  const [businessTypes, setBusinessType] = useState('')
  const [industry, setIndustry] = useState('')
  const [tariff, setTarrif] = useState('')

  const [email, setEmail] = useState('')
  const [referall, setReferall] = useState('')
  const [isLoadingEmployerLoginUrl, setIsLoadingEmployerLoginUrl] = useState(false)
  const [isLoadingSupporterLoginUrl, setIsLoadingSupporterLoginUrl] = useState(false)

  const tarrifs = useEasyState((state) => state.manage.tarrifs)

  React.useEffect(() => {
    setEmployeeName(props?.organizationData?.name)
    setEmail(props?.organizationData?.email?.email === defaultEmail ? ' ' : props?.organizationData?.email?.email)
    setAddress(props?.organizationData?.address?.address)
    setCity(props?.organizationData?.address?.city)
    setPhoneNo(props?.organizationData?.phone?.phoneNo === defaultPhone ? ' ' : props?.organizationData?.phone?.phoneNo)
    setIndustry(props?.organizationData?.industry)
    setBusinessType(props?.organizationData?.businessType?.name)

    tarrifs.map((value) => {
      if (value.id === props?.organizationData.tariffId) {
        setTarrif(value.name)
      }
    })
  }, [props.organizationData])

  const setOrganizationStatus = (value: string) => {
    props.setOrganizationStatus(value)
  }
  // const setTariffData = (value: any) => {
  // 	tarrifs.map((val) => {
  // 		if (JSON.stringify(val.name) === JSON.stringify(tariff)) {
  // 			console.log(val.id);
  // 			setTarrif(value);
  // 			props.setTariffData(val.id);
  // 		}
  // 	});
  // };

  const handleLoginAsSupporter = async (target: keyof Initiator) => {
    const payload = {
      target,
      organizationId: props.organizationData.id
    }

    setIsLoadingSupporterLoginUrl(true)
    try {
      const data = await apiManager.fetch<{ redirectUrl: string }>({
        name: 'LoginAsOrganizationSuppoter',
        config: {
          data: payload
        }
      })

      window.open(data.data.data.redirectUrl, '__blank')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingSupporterLoginUrl(false)
    }
  }
  const handleLoginAsEmployer = async (target: keyof Initiator) => {
    const payload = {
      target,
      organizationId: props.organizationData.id
    }

    setIsLoadingEmployerLoginUrl(true)
    try {
      const data = await apiManager.fetch<{ redirectUrl: string }>({
        name: 'LoginAsOrganizationSuppoter',
        config: {
          data: payload
        }
      })

      window.open(data.data.data.redirectUrl, '__blank')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingEmployerLoginUrl(false)
    }
  }

  return (
    <>
      {!props.manageLoading ? (
        <Stack spacing="24px">
          {false && (
            <Grid templateColumns="repeat(2, 1fr)" gap={0}>
              <FormLabel htmlFor="logo">Logo</FormLabel>

              <Input placeholder="" onChange={(event) => setLogo(event.currentTarget.value)} />
            </Grid>
          )}

          {false && (
            <Grid templateColumns="repeat(2, 1fr)" gap={0}>
              <FormLabel htmlFor="employeeName">Name</FormLabel>
              <Input
                value={props.organizationData.name}
                placeholder="Please enter name"
                onChange={(event) => setEmployeeName(event.currentTarget.value)}
              />
            </Grid>
          )}
          <Grid templateColumns="repeat(2, 1fr)" gap={0}>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Input
              disabled
              value={`${address}, ${city}`}
              placeholder="Please enter address"
              onChange={(event) => setAddress(event.currentTarget.value)}
            />
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={0}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              disabled
              value={email}
              placeholder="Please enter email"
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={0}>
            <FormLabel htmlFor="phoneNo">Phone #</FormLabel>
            <Input
              disabled
              value={phoneNo}
              placeholder="Please enter phone"
              onChange={(event) => setPhoneNo(event.currentTarget.value)}
            />
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={0}>
            <FormLabel htmlFor="businessTypes">Business type</FormLabel>
            <Input
              disabled
              value={businessTypes}
              placeholder="Please enter business type"
              onChange={(event) => setBusinessType(event.currentTarget.value)}
            />
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={0}>
            <FormLabel htmlFor="industry">Industry</FormLabel>
            <Input
              disabled
              value={industry}
              placeholder="Please enter industry"
              onChange={(event) => setIndustry(event.currentTarget.value)}
            />
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={0}>
            <FormLabel htmlFor="tariff">Tariff</FormLabel>

            <Select
              defaultValue={props.organizationData.tariffId}
              onChange={(event) => props?.setTariffData(event.currentTarget.value)}
            >
              {props?.tariff?.results?.map((val: any, index: any) => {
                return (
                  <option id={index} value={val.id} key={index}>
                    {val.name}
                  </option>
                )
              })}
            </Select>
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={0}>
						<FormLabel htmlFor="tariff">Bill Payment Tariff</FormLabel>

						<Select
							defaultValue={props.organizationData.billPaymentTariffId}
							onChange={(event) =>{
                console.log("event.currentTarget.value",event.currentTarget.value);
                console.log("props.organizationData.billPaymentTariffId",props.organizationData.billPaymentTariffId);
								props?.setBillPaymentTariff(event.currentTarget.value)
              }
							}
						>
							{props?.tariff?.results?.map((val: any, index: any) => {
								return (
									<option id={index} value={val.id} key={index}>
										{val.name}
									</option>
								);
							})}
						</Select>
					</Grid>
					<Grid templateColumns="repeat(2, 1fr)" gap={0}>
						<FormLabel htmlFor="Status">Status</FormLabel>

            <Select
              // size="sm"
              // width="150px"
              defaultValue={props.data.active ? 'active' : 'inActive'}
              placeholder="Change Status"
              onChange={(event) => setOrganizationStatus(event.currentTarget.value)}
            >
              <option key="active" value="active">
                Active
              </option>
              <option key="inActive" value="inActive">
                In Active
              </option>
            </Select>
          </Grid>

          {false && (
            <Grid templateColumns="repeat(2, 1fr)" gap={0}>
              <FormLabel htmlFor="referall">Referral</FormLabel>
              <Input placeholder="Please enter referall" onChange={(event) => setReferall(event.currentTarget.value)} />
            </Grid>
          )}

          <Grid templateColumns="repeat(2, 1fr)" gap={0}>
            <FormLabel>Login as Supporter</FormLabel>

            <Flex>
              <Button
                onClick={() => handleLoginAsEmployer('employer_web')}
                isDisabled={isLoadingEmployerLoginUrl}
                isLoading={isLoadingEmployerLoginUrl}
              >
                Employer Portal
              </Button>
            </Flex>
          </Grid>
          <Grid templateColumns="repeat(2, 1fr)" gap={0}>
            <FormLabel>Login as Supporter</FormLabel>

            <Flex>
              <Button
                onClick={() => handleLoginAsSupporter('vendor_web')}
                isDisabled={isLoadingSupporterLoginUrl}
                isLoading={isLoadingSupporterLoginUrl}
              >
                Vendor Portal
              </Button>
            </Flex>
          </Grid>
        </Stack>
      ) : (
        <Stack m="20">
          <LoadingSpinner />
        </Stack>
      )}
      <Flex mt="3">
        <Spacer />
      </Flex>
    </>
  )
}

export default Manage
