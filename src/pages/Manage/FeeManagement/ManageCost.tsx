import React from 'react'
import { Table, Tr, Td, Th, Tbody } from '@chakra-ui/react'
import { useEasyActions, useEasyState } from '../../../store/hooks'
import UpdateCost from './UpdateCost'

export interface ManageCostProps {}

const ManageCost: React.FC<ManageCostProps> = (props) => {
  const { getServiceDeliveryFee } = useEasyActions((actions) => actions.manage)

  React.useEffect(() => {
    serviceDeliveryFee()
  }, [])

  const serviceDeliveryFee = async () => {
    const response = await getServiceDeliveryFee()
  }

  const deliveryFee = useEasyState((state) => state.manage.serviceDeliveryFee)

  return (
    <>
      <UpdateCost deliveryFee={deliveryFee} />

      <Table variant="simple">
        <Tbody>
          <Tr>
            <Th> Currency </Th>
            <Th> {deliveryFee && deliveryFee?.currency}</Th>
          </Tr>
          <Tr>
            <Td>Cost of borrowing bank rate</Td>
            <Td> {deliveryFee && deliveryFee?.costOfBorrowingBankRate}</Td>
          </Tr>
          <Tr>
            <Td>Cost of service delivery</Td>
            <Td>{deliveryFee && deliveryFee?.costOfServiceDelivery}</Td>
          </Tr>
          <Tr>
            <Td>Other Cost</Td>
            <Td> {deliveryFee && deliveryFee?.otherCost}</Td>
          </Tr>

          <Tr>
            <Td>Other Cost Type</Td>
            <Td> {deliveryFee && deliveryFee?.otherCostType}</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  )
}

export default ManageCost
