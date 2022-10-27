import React, { useState } from 'react'
import { Button, Flex, Icon, Spacer, Tooltip } from '@chakra-ui/react'

import { AddIcon, RepeatIcon } from '@chakra-ui/icons'
import { useEasyActions, useEasyState } from '@/store/hooks'
import DataTable from 'react-data-table-component'
import LoadingSpinner from '@/components/common/Spinner'
import { customStyles } from '@/config/styles/customStyles'
import { useAbhiToast } from '@/Hook/useAbhiToast'
import FilterIcon from '@/components/common/FilterIcon'
import { ASLResult } from '@/types/Monitor/AbhiSuperLeague'
import moment from 'moment'

export interface AbhiSuperLeagueProps {}

const AbhiSuperLeague: React.FC<AbhiSuperLeagueProps> = (props) => {
  const { getGameResults } = useEasyActions((state) => state.monitor)

  const { gameResults } = useEasyState((state) => state.monitor)

  const toast = useAbhiToast()

  const [openModal, setOpenModal] = useState(false)
  const [rowId, setRowId] = useState('')
  const [gameRecords, setGameRecords] = useState<ASLResult[]>([])
  const [prizeData, setPrizeData] = useState<ASLResult | null>(null)

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
    getGameData()
  }, [paginationProps])

  React.useEffect(() => {
    setGameRecords(gameResults)
  }, [gameResults])

  const getGameData = async () => {
    setIsDataLoading(true)

    let params: any = {
      ...paginationProps
    }
    const response = await getGameResults(params)
    if (response.status === 'success') {
      setTotalPrizes(response.data.total)
      setIsDataLoading(false)
    } else {
      setIsDataLoading(false)
    }
  }

  const viewManageData = async (row: ASLResult, bol: boolean) => {
    setRowId(row?.id)
    setPrizeData(row)
  }

  const refresh = () => {
    getGameData()
  }

  const onChangeRowsPerPage = (limit: number, page: number) => {
    setPaginationProps({
      page: 1,
      limit
    })
  }

  const onCloseAddModel = () => {
    setIsLoading(false)
    setIsOpenAddModel(false)
  }

  const onCloseModal = async () => {
    setOpenModal(false)
  }

  const showAllHandler = () => {
    setShowAll(false)
    setPaginationProps({
      page: 1,
      limit: 10
    })
  }

  const columns = [
    {
      name: '#',
      selector: (row: ASLResult) => row.id,
      sortable: true,
      width: '40px',
      cell: (row: ASLResult, index: number) => (
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
      name: 'Employee Name',
      selector: (row: ASLResult) => row.player.persons?.[0].firstName,
      sortable: true,
      width: '200px',
      cell: (row: ASLResult) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={row.player.persons?.[0].firstName + row.player.persons?.[0].lastName}>
            {row.player.persons?.[0].firstName + ' ' + row.player.persons?.[0].lastName}
          </Tooltip>
        </div>
      )
    },
    {
      name: 'CNIC',
      selector: (row: ASLResult) => row.player.persons?.[0].cnic,
      sortable: true,
      width: '200px',
      cell: (row: ASLResult) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={row.player.persons?.[0].cnic ? row.player.persons?.[0].cnic : '-'}>
            {row.player.persons?.[0].cnic ? row.player.persons?.[0].cnic : '-'}
          </Tooltip>
        </div>
      )
    },
    {
      name: 'Organization',
      selector: (row: ASLResult) => row.player.persons?.[0].employees?.[0].organization.name,
      sortable: true,
      width: '200px',
      cell: (row: ASLResult) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={row.player.persons?.[0].employees?.[0].organization.name ?? '-'}>
            {row.player.persons?.[0].employees?.[0].organization.name ?? '-'}
          </Tooltip>
        </div>
      )
    },
    {
      name: 'Wining Date',
      selector: (row: ASLResult) => row?.createdAt,
      sortable: true,
      width: '200px',
      cell: (row: ASLResult) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={moment(row?.createdAt).format('MMM Do,YYYY[\n]HH:mm A')}>
            {moment(row?.createdAt).format('MMM Do,YYYY[\n]HH:mm A')}
          </Tooltip>
        </div>
      )
    },
    {
      name: 'Wining Prize',
      selector: (row: ASLResult) => row?.winningPrize,
      sortable: true,
      width: '200px',
      cell: (row: ASLResult) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={row?.winningPrize ?? '-'}>{row?.winningPrize ?? '-'}</Tooltip>
        </div>
      )
    },
    {
      name: 'Status',
      selector: (row: ASLResult) => row,
      sortable: true,
      width: '200px',
      cell: (row: ASLResult) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={'-'}>{'-'}</Tooltip>
        </div>
      )
    },
    {
      name: 'Action',
      selector: (row: ASLResult) => row.action,
      sortable: true,
      width: '200px',
      cell: (row: ASLResult) => (
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Tooltip label={row?.action ?? '-'}>{row?.action ?? '-'}</Tooltip>
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

        <Button bg="#7367F0" ml="3" colorScheme="#ffffff" onClick={refresh}>
          <RepeatIcon width="7" height="7" color="#ffffff" />
        </Button>

        <Button bg={showAll ? '#42ba96' : '#7367F0'} ml="3" colorScheme="#ffffff">
          <Icon as={FilterIcon} />
        </Button>
      </Flex>

      {isDataLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          paginationDefaultPage={paginationProps.page}
          columns={columns}
          data={gameRecords}
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
          //   expandableRowsComponent={<ViewPrize prizeData={prizeData} />}
        />
      )}
    </>
  )
}

export default AbhiSuperLeague
