import { catchTry } from '@/utils/betterTry'
import { TransactionRes } from '@/types/ApiResponse'
import { apiManager } from '@/utils/apiManager/ApiManager'
import { OneLinkReqResData } from '@/types/transactions/oneLinkReqRes'
import { exportTransactionData } from '@/types/transactions/exportTransaction'
import { VendorTranactionData } from '@/types/transactions/vendorTransaction'
import { OneLinkVendorTransactionReqResData } from '@/types/transactions/oneLinkVendorTransactionReqRes'
import moment from 'moment'
import {
  IFilteredParams,
  IGetBillInfoRequestPayload,
  IGetBillInfoResponsePayload,
  IVendorFilteredParams
} from '@/types/store-types'
import { IGetGameInfoRequestPayload, IGetGameInfoResponsePayload } from '@/types/Monitor/AbhiSuperLeague'

class MonitorService {
  [x: string]: any
  getTransactions = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<TransactionRes>({
        name: 'ManageGetAllEmployeesTransactionRequests',
        queryParams: {
          page: params.page,
          limit: params.limit
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    return res.data
  }

  filterTransactions = async (params: IFilteredParams) => {
    const res = await catchTry(
      apiManager.fetch<TransactionRes>({
        name: 'ManageGetAllEmployeesTransactionRequests',
        queryParams: {
          page: params.page,
          limit: params.limit,
          initiator: 'admin_web',
          cnic: params.cnic,
          phone: params.phone,
          employeeFirstName: params.employeeFirstName,
          employeeLastName: params.employeeLastName,
          organization: params.organization,
          amount: params.amount,
          status: params.status,
          from: params.startDate === null ? '' : params.startDate,
          to: params.endDate === null ? '' : params.endDate,
          employeeCode: params.employeeCode,
          transactionType: params.transactionType,
          source: params.source,
          accountToTitle: params.accountToTitle
        }
      })
    )

    if (res instanceof Error) {
      return res
    }
    return res.data
  }
  getVendorTransactions = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<VendorTranactionData>({
        name: 'GetAllVendorTransactionRequest',
        queryParams: {
          page: params?.page,
          limit: params?.limit
        }
      })
    )
    if (res instanceof Error) {
      return res
    }
    return res.data
  }

  approveRejectVendorTransactions = async (payload: any) => {
    const res = await catchTry(
      apiManager.fetch({
        name: 'ApproveRejectVendorTransactionAwaitedRequests',
        data: payload
      })
    )
    if (res instanceof Error) {
      return res
    }
    return res.data
  }

  downloadReceiptsVendorTransactionRequest = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch({
        name: 'DownloadReceiptsVendorTransactionRequest',
        pathVariables: {
          id: params
        }
      })
    )

    if (res instanceof Error) {
      return res
    }
    return res.data
  }
  filterVendorTransactions = async (params: IVendorFilteredParams) => {
    const res = await catchTry(
      apiManager.fetch<VendorTranactionData>({
        name: 'GetAllVendorTransactionRequest',
        queryParams: {
          page: params.page,
          limit: params.limit,
          initiator: 'admin_web',
          requestedAmount: params.requestedAmount,
          approvedAmount: params.approvedAmount,
          vendorName: params.vendorName,
          vendorId: params.vendorId,
          businessName: params.businessName,
          ntn: params.ntn,
          transactionStatus: params.transactionStatus,
          from: params.startDate === null ? '' : params.startDate,
          to: params.endDate === null ? '' : params.endDate
        }
      })
    )

    if (res instanceof Error) {
      return res
    }
    return res.data
  }
  exportVendorTransactionData = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<VendorTranactionData>({
        name: 'GetAllVendorTransactionRequest',
        queryParams: params
      })
    )

    if (res instanceof Error) {
      return res
    }
    return res.data
  }

  getVendorOneLinkTransactionsReqRes = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<OneLinkVendorTransactionReqResData>({
        name: 'GetVendorsOneLinkTransactionResReq',
        queryParams: {
          vendorTransactionRequestId: params
        }
      })
    )

    if (res instanceof Error) {
      return res
    }
    return res.data
  }

  exportTransactionData = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<exportTransactionData>({
        name: 'ManageGetAllEmployeesTransactionRequests',
        queryParams: {
          ...(params.initiator && { initiator: params.initiator }),
          cnic: params.cnic ? params.cnic : '',
          phone: params.phone ? params.phone : '',
          employeeName: params.employeeName ? params.employeeName : '',
          organization: params.organization ? params.organization : '',
          amount: params.amount ? params.amount : '',
          status: params.status ? params.status : '',
          from: params?.startDate
            ? moment(params?.startDate).format('YYYY-MM-DD')
            : moment(new Date('01/01/2021')).format('YYYY-MM-DD'),
          to: params?.endDate ? moment(params?.endDate).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD'),
          offset: params.offset ? params.offset : 1,
          limit: params.limit ? params.limit : 10,
          recipient: params?.email,
          output: params?.output
        }
      })
    )
    if (res instanceof Error) {
      return res
    }

    return res.data
  }

  oneLinkTransactionReqRes = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<OneLinkReqResData>({
        name: 'GetOneLinkTransactionResReq',
        queryParams: {
          employeeTransactionId: params
        }
      })
    )

    if (res instanceof Error) {
      return false
    }

    return res.data
  }

  OrganizationEmployeeTransactionStatusUpdate = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch({
        name: 'OrganizationUpdateEmployeeTransactionStatus',
        pathVariables: {
          transactionId: params.uuid
        },
        data: {
          status: params.status
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    console.log('RES', res.data)
    return res.data
  }
  employeeApproveTransaction = async (payload: any) => {
    const res = await catchTry(
      apiManager.fetch({
        name: 'TransactionEmployeeApproveTransaction',
        queryParams: {
          payload
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    return res.data
  }

  getPlatformErrors = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch({
        name: 'MonitorGetAllPlatformErrors',
        queryParams: {
          offset: params.offset,
          limit: params.limit
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    return res.data
  }

  filterPlatformErrors = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch({
        name: 'MonitorGetAllPlatformErrors',
        queryParams: {
          type: params.type ? params.type : '',
          module: params.module ? params.module : '',
          from: params.startDate ? params.startDate : '',
          to: params.endDate ? params.endDate : '',
          offset: params.offset || 1,
          limit: params.limit || 10
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    return res.data
  }

  getNotifications = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch({
        name: 'MonitorGetAllNotifications',
        queryParams: {
          offset: params.offset,
          limit: params.limit
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    return res.data
  }

  filterNotifications = async (params: any) => {
    const notificationsUrl = await catchTry(
      apiManager.fetch({
        name: 'MonitorGetAllNotifications',
        queryParams: {
          occurrence: params.occurance ? params.occurance : '',
          status: params.status ? params.status : '',
          organization: params.organization ? params.organization : '',
          from: params.startDate ? params.startDate : '',
          to: params.endDate ? params.endDate : '',
          offset: params.offset || 1,
          limit: params.limit || 10
        }
      })
    )

    if (notificationsUrl instanceof Error) {
      return false
    }
    return notificationsUrl.data
  }

  getBillPaymentTransactions = async (params: IGetBillInfoRequestPayload) => {
    const res = await catchTry(
      apiManager.fetch<IGetBillInfoResponsePayload>({
        name: 'GetBillPaymentTransactions',
        queryParams: {
          ...params
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    return res
  }

  getGameResults = async (params: IGetGameInfoRequestPayload) => {
    const res = await catchTry(
      apiManager.fetch<IGetGameInfoResponsePayload>({
        name: 'GetGameResults',
        queryParams: {
          ...params
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    return res.data
  }
}

export const monitorService = new MonitorService()
