import React, { useState } from 'react'
import { Button, Flex, Spacer, Tooltip, Spinner } from '@chakra-ui/react'

import { useEasyActions, useEasyState } from '../../../store/hooks'
import LoadingSpinner from '../../../components/common/Spinner'

import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import AddBank from './AddBank'
import Table from '../../../components/common/DataTable'

export interface BanksProps {}

const Banks: React.FC<BanksProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [bankId, setBankId] = useState('')
  const [bankData, setBankData] = useState({})
  const [isDataLoading, setIsDataLoading] = useState(false)

  const [offset, setOffset] = useState(1)
  const [limit, setLimit] = useState(10)

  const [totalBanks, setTotalBanks] = useState(0)
  const [banksData, setBanksData] = useState<any>([])

  const { getBanks } = useEasyActions((actions) => actions.manage)
  const banks = useEasyState((state) => state.manage.banks)
  React.useEffect(() => {
    getBanksData()
  }, [offset, limit])

  React.useEffect(() => {
    setBanksData(banks)
  }, [banks])

  const getBanksData = async () => {
    setIsDataLoading(true)
    let params: any = {
      offset,
      limit
    }
    const data = await getBanks(params)
    if (data) {
      setIsDataLoading(false)
      setTotalBanks(data.total)
    } else {
      setIsDataLoading(false)
    }
  }

  const columns = [
    {
      name: '#',

      sortable: true,

      width: '50px',
      cell: (row: any, index: any) => <p>{index + 1}</p>
    },
    {
      name: 'Name',
      selector: (row: any) => {
        row?.bankName
      },
      sortable: true,

      width: '150px',
      cell: (row: any) => <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>{row?.bankName}</div>
    },

    {
      name: 'Account format',
      selector: (row: any) => {
        row?.bankAccountFormat
      },
      sortable: true,

      width: '150px',
      cell: (row: any) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {row?.bankAccountFormat ? row?.bankAccountFormat : 'N/A'}
        </div>
      )
    },
    {
      name: 'Account Regex',
      selector: (row: any) => {
        row?.bankAccountRegex
      },
      sortable: true,

      width: '150px',
      cell: (row: any) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {row?.bankAccountRegex ? row?.bankAccountRegex : 'N/A'}
        </div>
      )
    },

    {
      name: 'Country',
      selector: (row: any) => {
        row?.country
      },
      sortable: true,

      cell: (row: any) => <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>{row?.country}</div>
    },

    {
      name: 'IMD',
      selector: (row: any) => {
        row?.oneLinkBankDetails
      },
      sortable: true,

      cell: (row: any) => (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipses' }}>
          {row?.oneLinkBankDetails == null ? 'N/A' : row?.oneLinkBankDetails?.imd}
        </div>
      )
    },
    {
      name: 'Actions',
      selector: (row: any) => {
        row?.bankName
      },

      cell: (row: any) => {
        return (
          <>
            <Button onClick={() => bankHandler(row)}>
              <Tooltip label="Edit" aria-label="Edit">
                <EditIcon />
              </Tooltip>
            </Button>

            {false && (
              <Button ml="2" onClick={() => deletebankHandler(row)}>
                <Tooltip label="Delete" aria-label="Delete">
                  <DeleteIcon />
                </Tooltip>
              </Button>
            )}
          </>
        )
      }
    }
  ]

  const deletebankHandler = (row: any) => {}

  const bankHandler = (row: any) => {
    setBankId(row.id)
    setBankData(row)
    setIsOpen(true)
  }

  const closeBankHandler = () => {
    setIsOpen(false)
  }

  const onChangeRowsPerPage = (updateLimit: number, page?: number) => {
    setLimit(updateLimit)
  }

  return (
    <>
      <Flex mb="5">
        <Spacer />
        <Button bg="#7367F0" colorScheme="#ffffff" onClick={bankHandler}>
          Add
        </Button>
      </Flex>

      <AddBank
        isOpen={isOpen}
        onClose={closeBankHandler}
        bankId={bankId}
        bankData={bankData}
        getBanksData={getBanksData}
      />
      {isDataLoading ? (
        <LoadingSpinner />
      ) : (
        <Table
          columns={columns}
          data={banksData}
          paginationDefaultPage={offset === 0 ? 1 : offset}
          onChangePage={(page: any) => setOffset(page)}
          paginationTotalRows={totalBanks}
          limit={limit}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      )}
    </>
  )
}

export default Banks
