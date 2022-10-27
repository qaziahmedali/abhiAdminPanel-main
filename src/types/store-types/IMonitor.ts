import { Action, Thunk } from 'easy-peasy'
import { TransactionResult } from '../transactions/transactions'
import { OneLinkReqResData } from '../transactions/oneLinkReqRes'
import { VendorTranactionResult } from '../transactions/vendorTransaction'
import { OneLinkVendorTransactionReqResData } from '../transactions/oneLinkVendorTransactionReqRes'
import { IBillerPayment, IBillerUser } from '../Manage/BillerPayment'
import { UserResults } from '../users/Users'
import { AxiosResponse } from 'axios'
import { AbhiResponse } from '@/utils/apiManager/responces'
import { ASLResult, IGetGameInfoRequestPayload } from '../Monitor/AbhiSuperLeague'

export interface IFilteredParams {
  startDate?: Date
  endDate?: Date
  cnic?: string
  phone?: string
  initiator?: string
  status?: string
  organization?: string
  amount?: string
  page?: number
  limit?: number
  employeeFirstName?: string
  employeeLastName?: string
  source?: string
  employeeCode?: string
  transactionType?: string
  accountToTitle?: string
}

export interface IVendorFilteredParams {
  startDate?: Date
  endDate?: Date
  transactionStatus?: string
  vendorId?: string
  ntn?: string
  approvedAmount?: string
  requestedAmount?: string
  page?: number
  limit?: number
  vendorName?: string
  businessName?: string
}

export type BillStatus = 'U' | 'P' | 'B' | 'T'
export type BillTransactionStatus = 'paid' | 'unpaid' | 'overdue' | 'error' | 'in-progress'
export interface IBillInfo {
  id: string
  consumerNo: string
  consumerName: string
  transactionStatus: BillTransactionStatus
  billStatus: BillStatus
  error: string
  amountPaid: number
  paymentDate?: Date
  dueDate?: Date
  amountBeforeDueDate?: number
  amountAfterDueDate?: number
  executionNumber: number
  biller: IBillerPayment
  billerId: string
  billsUsers: IBillerUser
  billsUsersId: string
  user: UserResults
  userId: string
  transaction: TransactionResult
  transactionId: string
}
export interface IGetBillInfoResponsePayload {
  total: number
  results: IBillInfo[]
}

export interface IGetBillInfoFilters {
  consumerNo?: string
  consumerName?: string
  transactionStatus?: string
  billStatus?: BillStatus
  amountPaid?: string
  paymentDate?: Date
  dueDate?: Date
  amountBeforeDueDate?: number
  amountAfterDueDate?: number
  executionNumber?: number
  startDate?: Date
  endDate?: Date
}
export interface IGetBillInfoRequestPayload extends IGetBillInfoFilters {
  page: number
  limit: number
}

interface MonitorState {
  transactions: TransactionResult[]

  vendorTransactions: VendorTranactionResult[]
  platformErrors: PlatformErrors | any
  notifications: Notifications | any
  OneLinkTransactionsResponse: OneLinkReqResData

  oneLinkVendorransactionsResponse: OneLinkVendorTransactionReqResData
  billInfo: IGetBillInfoResponsePayload
  gameResults: ASLResult[]
}

interface MonitorActions {
  setTransactions: Action<this, TransactionResult[]>

  setVendorTransactions: Action<this, VendorTranactionResult[]>
  setPlatformErrors: Action<this, PlatformErrors>
  setNotifications: Action<this, Notifications>
  setOneLinkTransactionsResponse: Action<this, OneLinkReqResData>

  setOneLinkVendorTransactionsResponse: Action<this, OneLinkVendorTransactionReqResData>
  setBillInfo: Action<this, IGetBillInfoResponsePayload>
  setGameResult: Action<this, ASLResult[]>
}

interface MonitorThunk {
  getTransactions: Thunk<this, IFilteredParams>

  getVendorTransactions: Thunk<this, { page?: number; limit?: number }>
  downloadReceiptsVendorTransactionRequest: Thunk<this, { id: string }>

  getVendorOneLinkTransactionsReqRes: Thunk<this, { id: string }>
  approveRejectVendorTransactions: Thunk<
    this,
    {
      page?: number
      limit?: number
      vendorTransactionId: string
      status: string
      approvedAmount: number
      initiator: string
    },
    { offset?: number; limit?: number }
  >

  filterVendorTransactions: Thunk<this, IVendorFilteredParams>

  exportVendorTransactionData: Thunk<
    this,
    {
      page?: number
      limit?: number
      initiator?: string
      amount?: number
      phone?: number
      vendorName?: string
      ntn?: string
      email?: string
      transactionStatus?: string
      requestedAmount?: number
      approvedAmount?: number
      from?: Date
      to?: Date
      output?: string
      recipient?: string
      vendorId?: string
      businessName?: string
    }
  >
  UpdateTransactionStatus: Thunk<this>
  getPlatformErrors: Thunk<this>
  employeeApproveTransaction: Thunk<this, EmployeeTransactionPayload>
  getOneLinkTransactionsResponse: Thunk<this, any>
  getNotifications: Thunk<this>
  filterNotifications: Thunk<this>
  filterPlatformErrors: Thunk<this>
  filterTransactions: Thunk<this, IFilteredParams>
  exportTransactionData: Thunk<this>
  getBillPaymentTransactions: Thunk<
    this,
    IGetBillInfoRequestPayload,
    undefined,
    {},
    Promise<AxiosResponse<AbhiResponse<IGetBillInfoResponsePayload>> | false>
  >
  getGameResults: Thunk<this, IGetGameInfoRequestPayload>
}

export interface IMonitor extends MonitorState, MonitorActions, MonitorThunk {}

export interface Transaction {
  employeeId: string
  organizationId: string
  amount: string
  tariffId: string
  requestStatus: string
  transactionStatus: string
  organization: {
    name: string
  }
  employee: {
    employeesBadge: string
  }
}

export interface EmployeeTransactionPayload {
  transaction_id: string
  initiator: string
}
export interface PlatformErrors {
  platformServiceId: string
  detail: string
  description: string
  type: string
}

export interface Notifications {
  platformServiceId: string
  detail: string
  description: string
  type: string
}

export interface Initiator {
  employee_web: 'Web'
  employee_mobile: 'Mobile'
  employer_web: 'Employer'
  vendor_web: 'Vendor'
  admin_web: 'Admin'
  ussd: 'USSD'
  other: 'Other'
}
