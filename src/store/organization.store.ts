import { IOrganization } from '@/types/store-types'
import { action, thunk } from 'easy-peasy'
import { organizationService } from '../services/organizationService'
import { AppConstants } from '../utils/appConstants'
import { AxiosError } from 'axios'

export const organization: IOrganization = {
  organizations: new Array(),
  allOrganizations: new Array(),
  vendors: new Array(),
  selectedOrganizationId: '',
  Tariff: Object(),
  Bank: Object(),
  BusinessType: Object(),
  employees: new Array(),
  settlements: new Array(),
  settlementDetails: new Array(),
  organizationData: Object(),
  EmployeeMonthlyBreakup: Object(),

  setSelectedOrganizationId: action((state, payload) => {
    state.selectedOrganizationId = payload
  }),

  setOrganizations: action((state, payload) => {
    state.organizations = payload
  }),

  setAllOrganizations: action((state, payload) => {
    state.allOrganizations = payload
  }),

  setOrganizationData: action((state, payload) => {
    state.organizationData = payload
  }),

  setEmployees: action((state, payload) => {
    state.employees = payload
  }),
  setVendors: action((state, payload) => {
    state.vendors = payload
  }),
  setEmployeeMonthlyBreakup: action((state, payload) => {
    state.EmployeeMonthlyBreakup = payload
  }),

  setSettlements: action((state, payload) => {
    state.settlements = payload
  }),

  setSettlementDetails: action((state, payload) => {
    state.settlementDetails = payload
  }),

  setTariffData: action((state, payload) => {
    state.Tariff = payload
  }),

  setBankData: action((state, payload) => {
    state.Bank = payload
  }),

  setBusinessTypeData: action((state, payload) => {
    state.BusinessType = payload
  }),

  getOrganization: thunk(async (actions, params) => {
    const response = await organizationService.getOrganization(params)
    if (response === false) {
      return
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setOrganizations(response.data.results)
      return response.data
    } else {
      return false
    }
  }),

  getSelectedOrganizationId: thunk(async (actions, params) => {
    actions.setSelectedOrganizationId(params)
  }),

  getOrganizationNames: thunk(async (actions, params) => {
    const response = await organizationService.getOrganization(params)
    if (response === false) {
      return
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setAllOrganizations(response.data.results)
      return response.data.results
    } else {
      return false
    }
  }),
  getAllVendors: thunk(async (actions, params) => {
    const response = await organizationService.getOrganizationVendors(params)
    if (response === false) {
      return
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setVendors(response.data.results)
      return response.data
    } else {
      return false
    }
  }),

  filterVendors: thunk(async (actions, params) => {
    const response = await organizationService.filterOrganizationVendors(params)
    if (response instanceof Error) {
      const responseError = response as AxiosError
      return responseError
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setVendors(response.data.results)
      return response.data
    } else {
      return false
    }
  }),

  getSettlements: thunk(async (actions, params) => {
    const response = await organizationService.getSettlements(params)
    if (response === false) {
      return
    }
    if (response.status === AppConstants.SUCCESS) {
      // actions.setSettlements(response.data.results);
      return response.data
    } else {
      return false
    }
  }),

  getSettlementDetails: thunk(async (actions, params) => {
    const response = await organizationService.getSettlementDetails(params)
    if (response === false) {
      return
    }
    if (response.status === AppConstants.SUCCESS) {
      // actions.setSettlementDetails(response.data.results);
      return response.data
    } else {
      return false
    }
  }),

  applySettlementRequest: thunk(async (actions, params) => {
    const response = await organizationService.applySettlementRequest(params)
    return response
  }),

  getOrganizationById: thunk(async (actions, payload) => {
    const response = await organizationService.getOrganizationById(payload)

    if (response === false) {
      return
    }

    if (response.status == AppConstants.SUCCESS) {
      actions.setOrganizationData(response.data.result)

      return response.data
    } else {
      return false
    }
  }),

  updateOrganization: thunk(async (actions, payload) => {
    let organizationId = payload.id
    let organizationPayload = {
      tariffId: payload.tariffId,
      billPaymentTariffId: payload.billPaymentTariffId,
      active: payload.active
    }
    const response = await organizationService.updateOrganization(organizationPayload, organizationId)

    if (response === false) {
      return
    }

    if (response.status === AppConstants.SUCCESS) {
      actions.setOrganizationData(response.data.result)
      return response.data
    } else {
      return false
    }
  }),

  filterOrganization: thunk(async (actions, params) => {
    const response = await organizationService.filterOrganization(params)
    if (response === false) {
      return
    }

    if (response?.status === AppConstants.SUCCESS) {
      actions.setOrganizations(response.data.results)
      return response.data
    } else {
      return false
    }
  }),

  addOrganization: thunk(async (actions, params, { getStoreActions }) => {
    const response = await organizationService.addOrganization(params)
    if (response instanceof Error) {
      const axiosError = response as AxiosError

      return axiosError
    } else {
      return response
    }
  }),

  // Todo: Change its name to getBanks (Because it is returning multiple banks)
  getBank: thunk(async (actions, params, { getStoreActions }) => {
    const response = await organizationService.getBank(params)
    if (response === false) {
      return
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setBankData(response.data)
    } else {
      return false
    }
  }),

  getTariff: thunk(async (actions, params, { getStoreActions }) => {
    const response = await organizationService.getTariff(params)
    if (response === false) {
      return
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setTariffData(response.data)
    } else {
      return false
    }
  }),

  getBusinessType: thunk(async (actions, params, { getStoreActions }) => {
    const response = await organizationService.getBusinessType(params)
    if (response === false) {
      return
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setBusinessTypeData(response.data)
    } else {
      return false
    }
  }),

  getEmployees: thunk(async (actions, params) => {
    const response = await organizationService.getEmployees(params)
    if (response === false) {
      return false;
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setEmployees(response.data.results)
      return response.data
    } else {
      return false
    }
  }),

  filterEmployees: thunk(async (actions, params) => {
    const response = await organizationService.filterEmployees(params)
    if (response instanceof Error) {
      return response
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setEmployees(response.data.results)
      return response.data.total
    } else {
      return false
    }
  }),
  exportEmployeeData: thunk(async (actions, params) => {
    const response = await organizationService.exportEmployeeData(params)
    if (response instanceof Error) {
      const axiosError = response as AxiosError

      return axiosError.response?.data
    } else {
      return response
    }
  }),
  getEmployeeMonthlyBreakup: thunk(async (actions, params) => {
    const response = await organizationService.getEmployeeMonthlyBreakup(params)

    if (response instanceof Error) {
      const axiosError = response as AxiosError

      return axiosError.response?.data
    } else {
      actions.setEmployeeMonthlyBreakup(response.data)

      return response
    }
  }),
  fetchTitle: thunk(async (actions, payload) => {
    const response = await organizationService.fetchTitle(payload)
    if (response === false) {
      return false;
    }

    if (response.status === AppConstants.SUCCESS) {
      return response
    } else {
      return false
    }
  }),

  employeeOnboarding: thunk(async (actions, payload) => {
    const response = await organizationService.employeesOnboarding(payload)
    if (response === false) {
      return
    }

    if (response.status === AppConstants.SUCCESS) {
      return response
    } else {
      return false
    }
  }),

  updateUserStatus: thunk(async (actions, payload) => {
    const response: any = await organizationService.updateUserStatus(payload)

    if (response.status === AppConstants.SUCCESS) {
      const response = await organizationService.getEmployees({
        page: 1,
        limit: 10
      })
      if (response === false) {
        return
      }
      if (response?.status === AppConstants.SUCCESS) {
        actions.setEmployees(response.data.results)
        return response
      } else {
        return false
      }
      // return response;
    } else {
      return response
    }
  }),

  getSignedUrl: thunk(async (actions, payload) => {
    const response = await organizationService.getSignedUrl(payload)
    if (response === false) {
      return
    }
    if (response.status === AppConstants.SUCCESS) {
      return response
    } else {
      return false
    }
  }),

  getSignedUrlForDownload: thunk(async (actions, payload) => {
    const response = await organizationService.getSignedUrlForDownload(payload)
    if (response === false) {
      return
    }
    if (response.status === AppConstants.SUCCESS) {
      return response
    } else {
      return false
    }
  }),

  uploadToS3: thunk(async (actions, payload) => {
    const response = await organizationService.uploadFileToS3(payload)
    if (response.status === AppConstants.SUCCESS) {
      return response
    } else {
      return false
    }
  })
}
