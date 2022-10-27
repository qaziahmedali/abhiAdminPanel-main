import '../../../config/styles/style.css'

import React, { useState } from 'react'
import DataTable from 'react-data-table-component'

import { customStyles } from '@/config/styles/customStyles'
import { EditIcon } from '@chakra-ui/icons'
import { Button, Flex, Spacer, Tooltip } from '@chakra-ui/react'

import LoadingSpinner from '../../../components/common/Spinner'
import { useEasyActions, useEasyState } from '../../../store/hooks'
import AddTier from './AddTier'
import AddTipping from './AddTipping'

export interface ManageTariffProps {}

const ManageTariff: React.FC<ManageTariffProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [pricingModel, setPricingModel] = useState(false)
  const [tariffId, setTariffId] = useState('')
  const [tierData, setTierData] = useState({})

  const [offset, setOffset] = useState(1)
  const [limit, setLimit] = useState(10)

  const [totalTariff, setTotalTariff] = useState(0)
  const [tarrifs, setTarrifs] = useState<any>([])

  const { manageTariff } = useEasyActions((actions) => actions.manage)

  const tarrifsData = useEasyState((state) => state.manage.tarrifs)

  React.useEffect(() => {
    getTariffData()
  }, [offset, limit])

  React.useEffect(() => {
    setTarrifs(tarrifsData)
  }, [tarrifsData])

  const getTariffData = async () => {
    setIsLoading(true)
    const calculatedOffset = (offset - 1) * 10
    let params: any = { offset: calculatedOffset, limit }
    const data = await manageTariff(params)

    if (data) {
      setIsLoading(false)
      setTotalTariff(data.total)
    } else {
      setIsLoading(false)
    }
  }

  const onChangeRowsPerPage = (updateLimit: number, page?: number) => {
    setLimit(updateLimit)
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
      selector: 'name',
      sortable: true,
      width: '400px',
      cell: (row: any) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={row?.name}>{'' + row?.name}</Tooltip>
        </div>
      )
    },
    {
      name: 'Currency',
      selector: 'currency',
      sortable: true,

      width: '100px'
    },
    {
      name: 'Pricing Model',
      selector: 'pricingModel',
      sortable: true,

      width: '150px'
    },
    {
      name: 'WithDraw Amount',
      selector: 'minimumWithdrawAmount',
      sortable: true,

      width: '170px'
    },

    {
      name: 'Actions',
      selector: 'edit',

      cell: (row: any) => {
        return (
          <>
            <Button onClick={() => updateTierHandler(row)}>
              <Tooltip label="Edit" aria-label="Edit">
                <EditIcon />
              </Tooltip>
            </Button>
          </>
        )
      }
    }
  ]

  const addTierHandler = () => {
    setIsOpen(true)
    setPricingModel(false)
    setTierData({})
    setTariffId('')
  }

  const tippingHandler = () => {
    setTierData({})
    setPricingModel(true)
    setIsOpen(!isOpen)
    setTariffId('')
  }

  const updateTierHandler = (row: any) => {
    setTariffId(row.id)
    setTierData(row)

    setIsOpen(true)
    if (row.pricingModel === 'tipping') {
      setPricingModel(true)
    } else {
      setPricingModel(false)
    }
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const viewManageData = async (row: any) => {
    console.log(row)
  }

  return (
    <>
      <Flex mb="5">
        <Spacer />

        <Button bg="#7367F0" colorScheme="#ffffff" onClick={addTierHandler}>
          Add Tier
        </Button>
        <Button bg="#7367F0" colorScheme="#ffffff" align="right" ml="2" onClick={tippingHandler}>
          Add Tipping
        </Button>
      </Flex>
      {pricingModel ? (
        <AddTipping
          isOpen={isOpen}
          onClose={onClose}
          tierData={tierData}
          tariffId={tariffId}
          getTariffData={getTariffData}
        />
      ) : (
        <AddTier
          isOpen={isOpen}
          onClose={onClose}
          tariffId={tariffId}
          tierData={tierData}
          getTariffData={getTariffData}
        />
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          paginationDefaultPage={offset}
          columns={columns}
          data={tarrifs}
          customStyles={customStyles}
          pagination
          fixedHeader
          paginationServer
          paginationRowsPerPageOptions={[10, 50, 100, 250]}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationPerPage={limit}
          onChangePage={(page: any) => setOffset(page)}
          paginationTotalRows={totalTariff}
          // expandableRowExpanded={(row: any) => row.id === rowId}
        />
      )}
    </>
  )
}

export default ManageTariff
