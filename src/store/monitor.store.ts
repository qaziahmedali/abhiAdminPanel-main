import { IMonitor } from '@/types/store-types'
import { AxiosError } from 'axios'
import { action, thunk, Thunk, Action } from 'easy-peasy'

import { monitorService } from '../services/monitorService'
import { AppConstants } from '../utils/appConstants'

export const monitor: IMonitor = {
  transactions: new Array(),
  vendorTransactions: new Array(),
  platformErrors: new Array(),
  notifications: new Array(),
  OneLinkTransactionsResponse: Object(),
  oneLinkVendorransactionsResponse: Object(),
  billInfo: {
    total: 0,
    results: []
  },
  gameResults: new Array(),

  setTransactions: action((state, payload) => {
    state.transactions = payload
  }),
  setVendorTransactions: action((state, payload) => {
    state.vendorTransactions = payload
  }),

  setPlatformErrors: action((state, payload) => {
    state.platformErrors = payload
  }),

  setNotifications: action((state, payload) => {
    state.notifications = payload
  }),

  setOneLinkTransactionsResponse: action((state, payload) => {
    state.OneLinkTransactionsResponse = payload
  }),

  setOneLinkVendorTransactionsResponse: action((state, payload) => {
    state.oneLinkVendorransactionsResponse = payload
  }),

  setBillInfo: action((state, payload) => {
    state.billInfo = payload
  }),

  setGameResult: action((state, payload) => {
    state.gameResults = payload
  }),

  getTransactions: thunk(async (actions, params) => {
    const response = await monitorService.getTransactions(params)
    if (response === false) {
      return
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setTransactions(response.data.results)
      return response.data
    } else {
      return false
    }
  }),

  filterTransactions: thunk(async (actions, params) => {
    const response = await monitorService.filterTransactions(params)

    if (response instanceof Error) {
      return response
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setTransactions(response.data.results)
      return response.data
    } else {
      return false
    }
  }),

  getVendorTransactions: thunk(async (actions, params) => {
    const response = await monitorService.getVendorTransactions(params)
    if (response instanceof Error) {
      const axiosResponse = response as AxiosError

      return axiosResponse.response?.data
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setVendorTransactions(response.data.results)
      return response.data
    } else {
      return false
    }
  }),

  approveRejectVendorTransactions: thunk(async (actions, params) => {
    let payload = {
      vendorTransactionId: params.vendorTransactionId,
      status: params.status,
      approvedAmount: params.approvedAmount,
      initiator: params.initiator
    }
    const response = await monitorService.approveRejectVendorTransactions(payload)
    if (response instanceof Error) {
      const axiosResponse = response as AxiosError

      return axiosResponse.response?.data
    }
    if (response?.status === AppConstants.SUCCESS) {
      const response = await monitorService.getVendorTransactions({
        page: params?.page,
        limit: params?.limit
      })
      if (response instanceof Error) {
        const axiosResponse = response as AxiosError

        return axiosResponse.response?.data
      }
      if (response?.status === AppConstants.SUCCESS) {
        actions.setVendorTransactions(response.data.results)
        return response
      } else {
        return false
      }
    } else {
      return false
    }
  }),

  filterVendorTransactions: thunk(async (actions, params) => {
    const response = await monitorService.filterVendorTransactions(params)

    if (response instanceof Error) {
      const axiosResponse = response as AxiosError

      return axiosResponse.response?.data
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setVendorTransactions(response.data.results)
      return response.data
    } else {
      return false
    }
  }),

  exportVendorTransactionData: thunk(async (actions, params) => {
    const response = await monitorService.exportVendorTransactionData(params)

    if (response instanceof Error) {
      const axiosError = response as AxiosError

      return axiosError.response?.data
    } else {
      return response
    }
  }),

  downloadReceiptsVendorTransactionRequest: thunk(async (actions, params) => {
    const response = await monitorService.downloadReceiptsVendorTransactionRequest(params?.id)

    if (response instanceof Error) {
      const axiosResponse = response as AxiosError

      return axiosResponse.response?.data
    }
    if (response?.status === AppConstants.SUCCESS) {
      return response
    } else {
      return false
    }
  }),
  getVendorOneLinkTransactionsReqRes: thunk(async (actions, params) => {
    const response = await monitorService.getVendorOneLinkTransactionsReqRes(params)

    if (response instanceof Error) {
      const axiosResponse = response as AxiosError

      return axiosResponse.response?.data
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setOneLinkVendorTransactionsResponse(response.data)
      return response
    } else {
      return false
    }
  }),

  exportTransactionData: thunk(async (actions, params) => {
    const response = await monitorService.exportTransactionData(params)

    if (response instanceof Error) {
      const axiosError = response as AxiosError

      return axiosError.response?.data
    } else {
      return response
    }
  }),

  UpdateTransactionStatus: thunk(async (actions, params) => {
    const response = await monitorService.OrganizationEmployeeTransactionStatusUpdate(params)
    if (!response) {
      return false
    } else {
      return response
    }
  }),

  getOneLinkTransactionsResponse: thunk(async (actions, params) => {
    const response = await monitorService.oneLinkTransactionReqRes(params)
    if (response === false) {
      return
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setOneLinkTransactionsResponse(response.data)
      return response.data
    } else {
      return false
    }
  }),

  employeeApproveTransaction: thunk(async (actions, payload) => {
    const response = await monitorService.employeeApproveTransaction(payload)
    if (response === false) {
      return
    }
    if (response.status === AppConstants.SUCCESS) {
      return response.data
    } else {
      return false
    }
  }),

  getPlatformErrors: thunk(async (actions, params) => {
    const response = await monitorService.getPlatformErrors(params)
    if (response === false) {
      return
    }
    if (response.status === AppConstants.SUCCESS) {
      // actions.setPlatformErrors(response.data.results);
      return response.data
    } else {
      return false
    }
  }),

  filterPlatformErrors: thunk(async (actions, params) => {
    const response = await monitorService.filterPlatformErrors(params)
    if (response === false) {
      return
    }
    if (response.status === AppConstants.SUCCESS) {
      // actions.setPlatformErrors(response.data.results);
      return response.data
    } else {
      return false
    }
  }),

  getNotifications: thunk(async (actions, params) => {
    const response = await monitorService.getNotifications(params)
    if (response === false) {
      return
    }

    if (response?.status === AppConstants.SUCCESS) {
      // actions.setNotifications(response.data.results);
      return response.data
    } else {
      return false
    }
  }),

  filterNotifications: thunk(async (actions, params) => {
    const response = await monitorService.filterNotifications(params)
    if (response === false) {
      return
    }

    if (response.status === AppConstants.SUCCESS) {
      // actions.setNotifications(response.data.results);
      return response.data
    } else {
      return false
    }
  }),

  getBillPaymentTransactions: thunk(async (_, params) => {
    return await monitorService.getBillPaymentTransactions(params)
  }),

  getGameResults: thunk(async (actions, params) => {
    const response = await monitorService.getGameResults(params)
    if (response === false) {
      return
    }
    if (response.status === AppConstants.SUCCESS) {
      actions.setGameResult(response.data.results)
      return response
    } else {
      return false
    }
  })
}
