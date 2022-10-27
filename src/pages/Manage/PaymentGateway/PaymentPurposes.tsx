import React, { useState } from 'react'
import { Icon } from '@chakra-ui/react'
import { useEasyActions, useEasyState } from '../../../store/hooks'
import Table from '../../../components/common/DataTable'
import { MdSettings } from 'react-icons/md'

export interface PaymentPurposesProps {}

const PaymentPurposes: React.FC<PaymentPurposesProps> = (props) => {
  const [offset, setOffset] = useState(1)
  const [limit, setLimit] = useState(10)

  const [totalPaymentPurposes, setTotalPaymentPurposes] = useState(10)
  const [isDataLoading, setIsDataLoading] = useState(false)

  const { getPaymentPurposes } = useEasyActions((actions) => actions.manage)
  const paymentPurposes = useEasyState((state) => state.manage.paymentPurposes)

  React.useEffect(() => {
    getPaymentPurposesData()
  }, [offset, limit])

  const getPaymentPurposesData = async () => {
    setIsDataLoading(true)
    let params: any = {
      offset,
      limit
    }
    const data = await getPaymentPurposes(params)
    if (data) {
      setIsDataLoading(false)
      setTotalPaymentPurposes(data.total)
    } else {
      setIsDataLoading(false)
    }
  }

  const onChangeRowsPerPage = (updatedLimit: number, page: number) => {
    setLimit(updatedLimit)
  }

  const columns = [
    {
      name: '#',
      sortable: true,

      width: '100px',
      cell: (row: any, index: any) => <p>{index + 1}</p>
    },
    {
      name: 'Payment Purpose',
      selector: 'paymentPurpose',
      sortable: true,

      width: '150px'
    },
    {
      name: 'Icon',
      selector: 'IconUrl',
      sortable: true,

      cell: (row: any) => (
        <>
          <Icon as={row.IconUrl ? row.iconUrl : MdSettings}></Icon>
        </>
      )
    }
  ]

  return (
    <Table
      columns={columns}
      data={paymentPurposes}
      paginationDefaultPage={offset}
      onChangePage={(page: any) => setOffset(page)}
      paginationTotalRows={totalPaymentPurposes}
      limit={limit}
      onChangeRowsPerPage={onChangeRowsPerPage}
    />
  )
}

export default PaymentPurposes
