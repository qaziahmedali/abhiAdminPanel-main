import { IBillInfo } from '../store-types'
import { UserResults } from '../users/Users'

export type TBillerType = 'Utility' | 'Education' | 'Bank' | 'Mobile' | 'Gov' | 'Donation' | 'Other'
export type TBillStatus = 'U' | 'P' | 'B' | 'T'

export type TBillTransactionStatus = 'paid' | 'unpaid' | 'overdue' | 'error' | 'in-progress'
export type TGatewayName = 'oneLinkDefault' | 'oneLink2nd'

export interface IBillerUser {
  id: string
  name: string
  consumerNo: string
  consumerName?: string
  billStatus?: TBillStatus
  allowReschedule?: boolean
  countAllowed?: number
  countExecuted?: number
  amountLimit?: number
  startDate?: Date
  dueDate?: Date
  amountBeforeDueDate?: number
  amountAfterDueDate?: number
  biller: IBillerPayment
  billerId: string
  user: UserResults
  userId: string
  billsInfo: IBillInfo[]
  updatedBy?: UserResults
  updatedById?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ICreateBillerPayment {
  name: string
  enabled?: boolean
  allowReschedule?: boolean
  code1Link: string
  type: TBillerType
  startDate?: Date
  endDate?: Date
  paymentGateway: string
}

export interface IBillerPaymentBase {
  name: string
  enabled?: boolean
  allowReschedule?: boolean
  code1Link: string
  type: TBillerType
  startDate?: string
  endDate?: string
  paymentGateway: string
}

export interface IBillerPayment extends IBillerPaymentBase {
  id: string
  billsUsers: IBillerUser[]
  updatedBy?: UserResults
  updatedById?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IUpdateBillerPayment extends ICreateBillerPayment {
  id: string
}

export interface IBillerPaymentFilters {
  name?: string
  enabled?: boolean
  allowReschedule?: boolean
  code1Link?: string
  type?: TBillerType
  startDate?: Date
  endDate?: Date
  paymentGateway?: string
}

export interface IGetBillerPaymentPayload extends IBillerPaymentFilters {
  page: number
  limit: number
}

export interface IGetBillerPaymentResponse {
  total: number
  results: IBillerPayment[]
}
