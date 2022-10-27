import React, { useState } from 'react'
import {
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
  Select,
  Switch,
  Text
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { formatDateWithDashes } from '@/utils/helper'
import { IBillerPaymentFilters } from '@/types/Manage/BillerPayment'

export interface FilterBillerPaymentProps {
  isOpen: boolean
  onClose: () => void
  filterBiller: (params: IBillerPaymentFilters) => Promise<void>
}

const FilterBillerPayment: React.FC<FilterBillerPaymentProps> = (props) => {
  const [isFilterApplied, setIsFilterApplied] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, setValue, watch } = useForm<IBillerPaymentFilters>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      type: 'Utility',
      code1Link: '',
      enabled: false,
      allowReschedule: false,
      paymentGateway: '',
      startDate: new Date('2020-01-01'),
      endDate: new Date()
    }
  })

  const onSubmit = async (data: IBillerPaymentFilters) => {
    if (
      data.name === '' &&
      data.code1Link === '' &&
      data.type === 'Utility' &&
      data.paymentGateway === '' &&
      formatDateWithDashes(data.startDate) === formatDateWithDashes(new Date('2020-01-01')) &&
      formatDateWithDashes(data.endDate) === formatDateWithDashes(new Date()) &&
      !data.enabled &&
      !data.allowReschedule
    ) {
      setIsFilterApplied(false)
      return
    }
    setIsLoading(true)
    setIsFilterApplied(true)
    await props.filterBiller(data)
    setIsLoading(false)
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerHeader borderBottomWidth="1px">Filter Biller Payment</DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="allowReschedule">Allow Reschedule</FormLabel>
                  <Switch colorScheme="teal" size="lg" {...register('allowReschedule')} />
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    placeholder="Enter name"
                    {...register('name', {
                      maxLength: 255
                    })}
                  />
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="code1Link">1Link Code</FormLabel>
                  <Input
                    placeholder="Enter 1Link Code"
                    {...register('code1Link', {
                      maxLength: 255
                    })}
                  />
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="paymentGateway">Payment Gateway</FormLabel>
                  <Input
                    placeholder="e.g. oneLinkDefault"
                    {...register('paymentGateway', {
                      maxLength: 255
                    })}
                  />
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="startDate">Start Date</FormLabel>
                  <Input
                    type="date"
                    id="startDate"
                    onChange={(e) => {
                      setValue('startDate', new Date(e.target.value))
                    }}
                    value={formatDateWithDashes(watch('startDate'))}
                  />
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="endDate">End Date</FormLabel>
                  <Input
                    id="endDate"
                    type="date"
                    onChange={(e) => {
                      setValue('endDate', new Date(e.target.value))
                    }}
                    value={formatDateWithDashes(watch('endDate'))}
                  />
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="type">Biller Type</FormLabel>
                  <Select {...register('type')}>
                    <option value="Utility">Utility</option>
                    <option value="Education">Education</option>
                    <option value="Bank">Bank</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Govt">Govt</option>
                    <option value="Donation">Donation</option>
                    <option value="Other">Other</option>
                  </Select>
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="enabled">Enabled</FormLabel>
                  <Switch colorScheme="teal" size="lg" {...register('enabled')} />
                </Grid>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              {!isFilterApplied && (
                <Text color="red" flexGrow={1}>
                  Please fill at least one field
                </Text>
              )}
              <Button colorScheme="green" mr={3} onClick={props.onClose}>
                Cancel
              </Button>
              <Button type="submit" bg="#7367F0" colorScheme="#ffffff">
                {isLoading && <Spinner />}
                Submit
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default FilterBillerPayment
