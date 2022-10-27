import React, { useState, useEffect } from 'react'
import { Text, Flex, Spinner, Button, Box, Spacer, useToast } from '@chakra-ui/react'
import { useEasyActions, useEasyState } from '../../../store/hooks'
import Manage from './Manage'
import { FilteredParams } from './Organization'
import { OrganizationByID } from '@/types/organizations/organizationById'

export interface ViewManageProps {
  // isOpen: boolean;
  // onClose: any;
  manageData: any
  organizationData: OrganizationByID
  manageLoading: boolean
  filteredParams: FilteredParams
  page: number
  limit: number
  onClose: () => void
}

const ViewManage: React.FC<ViewManageProps> = (props) => {
  const { page, limit, filteredParams, onClose } = props
  const toast = useToast()
  const [isLoading, setisLoading] = useState(false)
  const [status, setStatus] = useState(false)
  const [tariffId, setTariffId] = useState('')
  const [billPaymentTariffId, setBillPaymentTariffId] = useState('')
  const [success, setSuccess] = useState(false)
  const [alert, setAlert] = useState(false)
  const [curtTab, setCurtTab] = useState(0)
  const { updateOrganization, getOrganization } = useEasyActions((state) => state.organization)

  const { Tariff, selectedOrganizationId } = useEasyState((state) => state.organization)

  useEffect(() => {
    setStatus(props?.manageData?.active)
    setTariffId(props?.organizationData?.tariffId || '')
    setBillPaymentTariffId(props?.organizationData?.billPaymentTariffId || '')
  }, [props])

  const setOrganizationStatus = (value: any) => {
    value === 'active' ? setStatus(true) : setStatus(false)
  }

  const setTariffData = (value: string) => {
    setTariffId(value)
  }
  const setBillPaymentTariffData = (value: string) => {
    setBillPaymentTariffId(value)
  }

  const cancelHandler = () => {
    onClose()
    setSuccess(false)
    setAlert(false)
  }

  const updateOrganizationHandler = async () => {
    setSuccess(false)
    setAlert(false)
    setisLoading(true)
    let organizationObj = {
      id: selectedOrganizationId,
      tariffId: tariffId,
      billPaymentTariffId: billPaymentTariffId,
      active: status
    }

    const data = await updateOrganization(organizationObj)
    if (data) {
      let params: any = {
        page,
        limit,
        ...filteredParams
      }
      setisLoading(false)
      await getOrganization(params)
      toast({
        title: 'Organizations updated successfully.',
        description: "We've updated your organization for you.",
        status: 'success',
        duration: 5000,
        isClosable: true
      })
      onClose()
    } else {
      setAlert(true)
      setisLoading(false)
    }
  }

  return (
    <>
      <Box borderWidth={1} p={4} bg="gray.50">
        <Manage
          data={props?.manageData}
          organizationData={props?.organizationData}
          manageLoading={props?.manageLoading}
          setOrganizationStatus={setOrganizationStatus}
          setTariffData={setTariffData}
          tariff={Tariff}
          setBillPaymentTariff={setBillPaymentTariffData}
          onChangeTab={setCurtTab}
        />

        {alert && (
          <Text color="red" mr="5">
            Something went wrong
          </Text>
        )}
        {success && (
          <Text color="green" mr="5">
            Success!
          </Text>
        )}

        {curtTab !== 3 && (
          <Flex mb="5">
            <Spacer />
            <Button colorScheme="green" mr={3} onClick={cancelHandler}>
              Cancel
            </Button>
            <Button colorScheme="blue" mr={3} onClick={updateOrganizationHandler}>
              {isLoading ? <Spinner /> : 'Save'}
            </Button>
          </Flex>
        )}
      </Box>
    </>
  )
}

export default ViewManage
