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
import { IGetBillInfoFilters } from '@/types/store-types'

export interface IFilterBillPaymentProps {
  isOpen: boolean
  onClose: () => void
  selectedFiltersHandler: (params: IGetBillInfoFilters) => Promise<void>
}

const FilterBillPayment: React.FC<IFilterBillPaymentProps> = (props) => {
  const [isFilterApplied, setIsFilterApplied] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, setValue, watch } = useForm<IGetBillInfoFilters>({
    mode: 'onSubmit',
    defaultValues: {
      consumerNo: '',
      consumerName: '',
      transactionStatus: '',
      amountPaid: '',
      startDate: new Date('2020-01-01'),
      endDate: new Date()
    }
  })

  const onSubmit = async (data: IGetBillInfoFilters) => {
    if (
      data.consumerNo === '' &&
      data.consumerName === '' &&
      data.transactionStatus === '' &&
      data.amountPaid === '' &&
      formatDateWithDashes(data.startDate) === formatDateWithDashes(new Date('2020-01-01')) &&
      formatDateWithDashes(data.endDate) === formatDateWithDashes(new Date())
    ) {
      setIsFilterApplied(false)
      return
    }
    setIsLoading(true)
    setIsFilterApplied(true)
    await props.selectedFiltersHandler(data)
    setIsLoading(false)
  }
  return (
    <>
      <Drawer isOpen={props.isOpen} placement="right" size="sm" onClose={props.onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerHeader borderBottomWidth="1px">Filter Bill Payment</DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="consumerNo">Consumer No</FormLabel>
                  <Input
                    placeholder="Enter Consumer No"
                    {...register('consumerNo', {
                      maxLength: 255
                    })}
                  />
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="consumerName">Consumer Name</FormLabel>
                  <Input
                    placeholder="Enter Consumer Name"
                    {...register('consumerName', {
                      maxLength: 255
                    })}
                  />
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="transactionStatus">Transaction Status</FormLabel>
                  <Input
                    placeholder="e.g. completed"
                    {...register('transactionStatus', {
                      maxLength: 255
                    })}
                  />
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="amountPaid">Amount</FormLabel>
                  <Input
                    placeholder="e.g. 1000"
                    {...register('amountPaid', {
                      maxLength: 255,
                      pattern: /^\d*$/
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

export default FilterBillPayment
