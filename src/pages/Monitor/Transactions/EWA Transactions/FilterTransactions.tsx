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
  Text
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { formatDateWithDashes } from '@/utils/helper'
import { IFilteredParams, IGetBillInfoFilters } from '@/types/store-types'

export interface FilterTransactionsProps {
  isOpen: boolean
  onClose: () => void
  filterTransaction: (params: IFilteredParams) => Promise<void>
  alertMessage: string
  alert: boolean
  isLoading: boolean
  filterParams: IFilteredParams
  limit?: number
}

const FilterTransactions: React.FC<FilterTransactionsProps> = (props) => {
  const [isFilterApplied, setIsFilterApplied] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, setValue, watch } = useForm<IFilteredParams>({
    mode: 'onSubmit',
    defaultValues: {
      startDate: new Date('2020-01-01'),
      employeeFirstName: '',
      employeeLastName: '',
      endDate: new Date(),
      transactionType: '',
      employeeCode: '',
      organization: '',
      accountToTitle: '',
      amount: '',
      phone: '',
      cnic: '',
      source: '',
      status: ''
    }
  })

  const onSubmit = async (data: IFilteredParams) => {
    if (
      data.employeeFirstName === '' &&
      data.employeeLastName === '' &&
      data.organization === '' &&
      data.employeeCode === '' &&
      data.amount === '' &&
      data.phone === '' &&
      data.accountToTitle === '' &&
      data.status === '' &&
      data.source === '' &&
      data.transactionType === '' &&
      formatDateWithDashes(data.startDate) === formatDateWithDashes(new Date('2020-01-01')) &&
      formatDateWithDashes(data.endDate) === formatDateWithDashes(new Date())
    ) {
      setIsFilterApplied(false)
      return
    }
    setIsLoading(true)
    setIsFilterApplied(true)
    await props.filterTransaction(data)
    setIsLoading(false)
  }

  const transactionTypes = [
    'Payroll',
    'Advance',
    'BillPayment',
    'legacyPayroll',
    'vendorPayment',
    'AbhiDost',
    'EWA',
    'ASA',
    'EWAAbhiDost',
    'ASAAbhiDost',
    'EWAPersonal',
    'ASAPersonal',
    'AbhiPay'
  ]

  return (
    <>
      <Drawer isOpen={props.isOpen} placement="right" size="sm" onClose={props.onClose}>
        <DrawerOverlay />
        <DrawerContent overflowY="scroll">
          <DrawerCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerHeader borderBottomWidth="1px">
              Filter Employee Transactions
            </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="employeeFirstName">Emp. First Name</FormLabel>
                  <Input
                    placeholder="e.g. Waqas"
                    {...register('employeeFirstName', {
                      maxLength: 255
                    })}
                  />
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="employeeLastName">Emp. Last Name</FormLabel>
                  <Input
                    placeholder="e.g. Ahmed"
                    {...register('employeeLastName', {
                      maxLength: 255
                    })}
                  />
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="cnic">CNIC</FormLabel>
                  <Input
                    placeholder="e.g. 3111111111111"
                    {...register("cnic", {
                      maxLength: 13,
                    })}
                  />
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="employeeCode">Emp. ID</FormLabel>
                  <Input
                    placeholder="e.g. 8909"
                    {...register('employeeCode', {
                      maxLength: 255
                    })}
                  />
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="accountToTitle">Account Title</FormLabel>
                  <Input
                    placeholder="e.g. Muhammad Waqas"
                    {...register('accountToTitle', {
                      maxLength: 255
                    })}
                  />
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="organization">Oragnization</FormLabel>
                  <Input
                    placeholder="e.g. Abhi"
                    {...register('organization', {
                      maxLength: 255
                    })}
                  />
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="amount">Amount</FormLabel>
                  <Input
                    placeholder="e.g. 1000"
                    {...register('amount', {
                      maxLength: 255,
                      pattern: /^\d*$/
                    })}
                  />
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="transactionType">Transaction Type</FormLabel>
                  <Select {...register('transactionType')} placeholder="Select Type">
                    {transactionTypes.map((transactionType) => {
                      return <option value={transactionType}>{transactionType}</option>
                    })}
                  </Select>
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="source">Source</FormLabel>
                  <Select {...register('source')} placeholder="Select source">
                    <option value="employee_web">Web</option>
                    <option value="employee_mobile"> Mobile</option>
                    <option value="employer_web">Employer</option>
                    <option value="admin_web">Admin</option>
                    <option value="ussd">USSD</option>
                    <option value="other">Other</option>
                  </Select>
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={0}>
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <Select {...register('status')} placeholder="Select status">
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </Select>
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

export default FilterTransactions
