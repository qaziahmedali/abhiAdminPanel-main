import React, { useState } from 'react'
import { Table, Tr, Td, Tbody, Th, Button, Spinner, useToast } from '@chakra-ui/react'
import { useEasyActions, useEasyState } from '../../../store/hooks'
import _ from 'lodash'
import { VendorTranactionResult } from '@/types/transactions/vendorTransaction'
import { DownloadIcon, ExternalLinkIcon, UnlockIcon } from '@chakra-ui/icons'
import DownloadModal from './DownloadModel'
import { OneLinkVendorTransactionReqResData } from '@/types/transactions/oneLinkVendorTransactionReqRes'
import TransactionResponse from './TransactionResponse'
import ApproveRejectModel from './ApproveRejectModel'

export interface VendorTransactionDetailProps {
  BankDetail: VendorTranactionResult | null
  page: number
  limit: number
  closeTab: any
}

const VendorTransactionDetail: React.FC<VendorTransactionDetailProps> = (props) => {
  const toast = useToast()
  const {
    approveRejectVendorTransactions,
    downloadReceiptsVendorTransactionRequest,
    getVendorOneLinkTransactionsReqRes
  } = useEasyActions((state) => state.monitor)
  const { oneLinkVendorransactionsResponse } = useEasyState((state) => state.monitor)

  const [downloadModel, setDownloadModel] = useState(false)
  const [downloadModelLoading, setDownloadModelLoading] = useState(false)
  const [downloadModelData, setDownloadModelData] = useState({})

  const [trModel, setTRModel] = useState(false)
  const [trModelLoading, setTRModelLoading] = useState(false)

  const [arModel, setARModel] = useState(false)
  const [approvedModelLoading, setApprovedModelLoading] = useState(false)
  const [rowId, setRowId] = useState('')
  const [approvedAmount, setApprovedAmount] = useState<number>(0)

  const downloadHandler = async (row: any) => {
    setDownloadModelLoading(true)
    const params = {
      id: row?.id
    }

    const downloadReceipt = await downloadReceiptsVendorTransactionRequest(params)
    if (downloadReceipt?.status === 'success') {
      setDownloadModelData(downloadReceipt.data)
      setDownloadModelLoading(false)
      setDownloadModel(true)
    } else {
      setDownloadModelLoading(false)
      setDownloadModelData(downloadReceipt)
      setDownloadModel(true)
    }
  }

  const closeDownloadModel = () => {
    setDownloadModel(false)
  }

  const JSONHandler = async (row: any) => {
    setTRModelLoading(true)
    const getRes: OneLinkVendorTransactionReqResData = await getVendorOneLinkTransactionsReqRes(row.id)

    if (getRes) {
      setTRModelLoading(false)
      setTRModel(true)
    }
  }

  const onCloseTR = () => {
    setTRModel(false)
  }

  const ApproveRejectHandler = (row: any) => {
    setRowId(row.id)
    setApprovedAmount(Number(row?.requestedAmount))
    setARModel(true)
  }

  const onCloseAR = () => {
    setARModel(false)
  }

  const approveHandler = async (rowId: string, approvedAmount: number) => {
    setApprovedModelLoading(true)
    setARModel(false)
    let params = {
      page: props?.page,
      limit: props?.limit,
      vendorTransactionId: rowId,
      status: 'approve',
      approvedAmount: approvedAmount,
      initiator: 'admin_web'
    }
    const approveData = await approveRejectVendorTransactions(params)
    if (approveData.status === 'success') {
      setApprovedModelLoading(false)
      props?.closeTab()
    } else {
      setApprovedModelLoading(false)
      toast({
        title: 'Error!',
        description: approveData?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }
  const rejectHandler = async (rowId: string, approvedAmount: number) => {
    setApprovedModelLoading(true)
    setARModel(false)
    let payload = {
      page: props?.page,
      limit: props?.limit,
      vendorTransactionId: rowId,
      status: 'reject',
      approvedAmount: approvedAmount,
      initiator: 'admin_web'
    }
    const rejectData = await approveRejectVendorTransactions(payload)
    if (rejectData.status === 'success') {
      setApprovedModelLoading(false)
      props?.closeTab()
    } else {
      setApprovedModelLoading(false)
      toast({
        title: 'Error!',
        description: rejectData?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  return (
    <div style={{ marginLeft: '50px', backgroundColor: '#f7fafc' }}>
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Th>
              <p> National Taxation Number</p>{' '}
            </Th>
            <Td>{props.BankDetail?.vendor?.ntn ? props.BankDetail?.vendor?.ntn : '-'}</Td>
          </Tr>
          <Tr>
            <Th>
              <p> Bank Name</p>{' '}
            </Th>
            <Td>
              {props?.BankDetail?.vendor?.selectedBankAccount?.bank?.bankName
                ? props?.BankDetail?.vendor?.selectedBankAccount?.bank?.bankName
                : '-'}
            </Td>
          </Tr>
          <Tr>
            <Th>
              <p> Account No.</p>{' '}
            </Th>
            <Td>
              {props?.BankDetail?.vendor?.selectedBankAccount?.accountNumber
                ? props?.BankDetail?.vendor?.selectedBankAccount?.accountNumber
                : '-'}
            </Td>
          </Tr>
          <Tr>
            <Th>
              <p> Attachments</p>{' '}
            </Th>
            <Td>
              <Button bg="#7367F0" onClick={() => downloadHandler(props?.BankDetail)} colorScheme="#fff">
                {downloadModelLoading ? <Spinner /> : <DownloadIcon width="5" height="5" />}
              </Button>
            </Td>
          </Tr>
          <Tr>
            <Th>
              <p> Request/Response</p>{' '}
            </Th>
            <Td>
              <Button bg="#7367F0" colorScheme="#fff" onClick={() => JSONHandler(props?.BankDetail)}>
                {trModelLoading ? <Spinner /> : <ExternalLinkIcon width="5" height="5" />}
              </Button>
            </Td>
          </Tr>
          <Tr>
            <Th>
              <p> Actions</p>{' '}
            </Th>
            <Td>
              <div
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipses',
                  whiteSpace: 'nowrap'
                }}
              >
                <Button
                  bg="#7367F0"
                  onClick={() => ApproveRejectHandler(props?.BankDetail)}
                  colorScheme="#fff"
                  disabled={props?.BankDetail?.transactionStatus == 'awaited' ? false : true}
                >
                  {approvedModelLoading ? <Spinner /> : <UnlockIcon />}
                </Button>
              </div>
            </Td>
          </Tr>
        </Tbody>
      </Table>

      <DownloadModal isOpen={downloadModel} onClose={closeDownloadModel} data={downloadModelData} />

      <TransactionResponse
        isOpen={trModel}
        onClose={onCloseTR}
        OneLinkTransactionsResponse={oneLinkVendorransactionsResponse}
      />

      <ApproveRejectModel
        isOpen={arModel}
        onClose={onCloseAR}
        RowId={rowId}
        approvedAmount={approvedAmount}
        approveHandler={approveHandler}
        rejectHandler={rejectHandler}
      />
    </div>
  )
}

export default VendorTransactionDetail
