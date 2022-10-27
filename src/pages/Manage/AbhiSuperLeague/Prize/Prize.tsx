import React, { useState } from 'react'
import { Button, Flex, Spacer, Tooltip } from '@chakra-ui/react'

import { AddIcon, RepeatIcon, ViewIcon } from '@chakra-ui/icons'
import { useEasyActions, useEasyState } from '@/store/hooks'
import DataTable from 'react-data-table-component'
import LoadingSpinner from '@/components/common/Spinner'
import { customStyles } from '@/config/styles/customStyles'
import AddPrizes from './AddPrize'
import { useAbhiToast } from '@/Hook/useAbhiToast'
import { PrizesResult } from '@/types/Manage/PrizesType'
import ViewPrize from './ViewPrize'
import ViewImage from './ViewImage'

export interface PrizesProps {}

const Prizes: React.FC<PrizesProps> = (props) => {
  const { getPrizes, postPrizes } = useEasyActions((state) => state.manage)

  const { prizes } = useEasyState((state) => state.manage)

  const toast = useAbhiToast()

  const [openModal, setOpenModal] = useState(false)
  const [viewImage, setViewImage] = useState(false)
  const [rowId, setRowId] = useState('')
  const [prizesRecord, setPrizesRecords] = useState<PrizesResult[]>([])
  const [prizeData, setPrizeData] = useState<PrizesResult | null>(null)

  const [isDataLoading, setIsDataLoading] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [totalPrizes, setTotalPrizes] = useState(0)
  const [isOpenAddModel, setIsOpenAddModel] = useState(false)

  const [showAll, setShowAll] = useState(false)
  const [paginationProps, setPaginationProps] = useState({
    page: 1,
    limit: 10
  })

  React.useEffect(() => {
    getOrganizationData()
  }, [paginationProps])

  React.useEffect(() => {
    setPrizesRecords(prizes)
  }, [prizes])

  const getOrganizationData = async () => {
    setIsDataLoading(true)

    let params: any = {
      ...paginationProps
    }
    const response = await getPrizes(params)
    if (response.status === 'success') {
      setTotalPrizes(response.data.total)
      setIsDataLoading(false)
    } else {
      setIsDataLoading(false)
    }
  }

  const viewManageData = async (row: PrizesResult, bol: boolean) => {
    setRowId(row?.id)
    setPrizeData(row)
    console.log('first', row)
  }

  const refresh = () => {
    getOrganizationData()
  }

  const onChangeRowsPerPage = (limit: number, page: number) => {
    setPaginationProps({
      page: 1,
      limit
    })
  }

  const addPrizeData = async (params: any) => {
    setIsLoading(true)
    const data = await postPrizes(params)
    if (data.status === 'success') {
      setIsOpenAddModel(false)
      setIsLoading(false)
      toast.success('Prize Added.', 'Prizes has been created')
      getOrganizationData()
    } else {
      toast.error('Prizes creation Failed', data.data?.body.message)
      setIsLoading(false)
    }
  }

  const onCloseAddModel = () => {
    setIsLoading(false)
    setIsOpenAddModel(false)
  }

  const onCloseModal = async () => {
    setOpenModal(false)
  }

  const closeViewImage = () => {
    setViewImage(false)
  }

  const showAllHandler = () => {
    setShowAll(false)
    setPaginationProps({
      page: 1,
      limit: 10
    })
  }

  const handleViewImage = (data: PrizesResult) => {
    setPrizeData(data)
    setViewImage(true)
  }

  const columns = [
    {
      name: '#',
      selector: (row: PrizesResult) => row.id,
      sortable: true,
      width: '40px',
      cell: (row: PrizesResult, index: number) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={(paginationProps.page - 1) * paginationProps.limit + index + 1}>
            <p>{(paginationProps.page - 1) * paginationProps.limit + index + 1}</p>
          </Tooltip>
        </div>
      )
    },
    {
      name: 'Title',
      selector: (row: PrizesResult) => row.name,
      sortable: true,
      width: '200px',
      cell: (row: PrizesResult) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={row?.name ? row?.name : '-'}>{row?.name ? row?.name : '-'}</Tooltip>
        </div>
      )
    },
    {
      name: 'Coins/Balls',
      selector: (row: PrizesResult) => row.coins,

      sortable: true,

      width: '200px',
      cell: (row: PrizesResult) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={row?.coins ? row?.coins : '-'}>{row?.coins ? row?.coins : '-'}</Tooltip>
        </div>
      )
    },
    {
      name: 'Image',
      selector: (row: PrizesResult) => row.image.name,
      sortable: true,
      width: '200px',
      cell: (row: PrizesResult) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          <Button ml="3" onClick={() => handleViewImage(row)}>
            <Tooltip label="Fetch Title" aria-label="Fetch Title">
              <ViewIcon width="5" height="5" />
            </Tooltip>
          </Button>
        </div>
      )
    }
  ]
  return (
    <>
      <Flex mb="1">
        <Spacer />
        {showAll && (
          <Button bg="#7367F0" colorScheme="#ffffff" onClick={showAllHandler}>
            Show All
          </Button>
        )}
        <Button bg="#7367F0" colorScheme="#ffffff" ml="3" onClick={() => setIsOpenAddModel(true)}>
          <AddIcon />
        </Button>

        <Button bg="#7367F0" ml="3" colorScheme="#ffffff" onClick={refresh}>
          <RepeatIcon width="7" height="7" color="#ffffff" />
        </Button>

        {/* <Button
					bg={showAll ? "#42ba96" : "#7367F0"}
					ml="3"
					colorScheme="#ffffff"
					onClick={set}
				> 
					<Icon as={FilterIcon} />
				</Button>*/}
      </Flex>

      <AddPrizes isOpen={isOpenAddModel} onClose={onCloseAddModel} addPrizes={addPrizeData} isLoading={isLoading} />

      <ViewImage isOpen={viewImage} onClose={closeViewImage} prize={prizeData!} />

      {isDataLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          paginationDefaultPage={paginationProps.page}
          columns={columns}
          data={prizesRecord}
          pagination={true}
          paginationPerPage={paginationProps.limit || 10}
          paginationRowsPerPageOptions={[10, 50, 100, 250]}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationServer
          fixedHeader
          onChangePage={(page) => {
            setPaginationProps({
              ...paginationProps,
              page
            })
          }}
          paginationTotalRows={totalPrizes}
          expandableRows
          onRowExpandToggled={(bol: boolean, row: any) => {
            viewManageData(row, bol)
          }}
          customStyles={customStyles}
          expandableRowExpanded={(row: any) => row.id === rowId}
          expandableRowsComponent={<ViewPrize prizeData={prizeData} />}
        />
      )}
    </>
  )
}

export default Prizes
