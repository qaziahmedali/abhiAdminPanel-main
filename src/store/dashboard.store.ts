import { IDashboard } from '@/types/store-types'
import { AxiosError } from 'axios'
import { action, thunk, Thunk, Action } from 'easy-peasy'
import { dashboardService } from '../services/dashboardService'
import { AppConstants } from '../utils/appConstants'

export const dashboard: IDashboard = {
  referrals: new Array(),
  guests: new Array(),

  setReferral: action((state, payload) => {
    state.referrals = payload
  }),

  setGuest: action((state, payload) => {
    state.guests = payload
  }),

  getReferrals: thunk(async (actions, params) => {
    const response = await dashboardService.getReferrals(params)
    if (response === false) {
      return
    }

    if (response?.status === AppConstants.SUCCESS) {
      actions.setReferral(response.data.results)
      return response.data
    }
  }),
  filterReferrals: thunk(async (actions, params) => {
    const response = await dashboardService.filterReferrals(params)
    if (response === false) {
      return
    }

    if (response?.status === AppConstants.SUCCESS) {
      actions.setReferral(response.data.results)
      return response.data
    }
  }),

  exportRefferalData: thunk(async (actions, params) => {
    const response = await dashboardService.exportRefferalData(params)

    if (response instanceof Error) {
      const axiosError = response as AxiosError

      return axiosError.response?.data
    } else {
      return response
    }
  }),
  exportGuestData: thunk(async (actions, params) => {
    const response = await dashboardService.exportGuestData(params)

    if (response instanceof Error) {
      const axiosError = response as AxiosError

      return axiosError.response?.data
    }

    if (response?.status === AppConstants.SUCCESS) {
      return response
    }
  }),
  getGuests: thunk(async (actions, params) => {
    const response = await dashboardService.GetGuestUserDetails(params)
    if (response instanceof Error) {
      const axiosError = response as AxiosError

      return axiosError.response?.data
    }

    if (response?.status === AppConstants.SUCCESS) {
      actions.setGuest(response.data.results)
      return response?.data
    }
  }),
  filterGuests: thunk(async (actions, params) => {
    const response = await dashboardService.filterGuestUserDetails(params)
    if (response instanceof Error) {
      const axiosError = response as AxiosError

      return axiosError.response?.data
    }

    if (response?.status === AppConstants.SUCCESS) {
      actions.setGuest(response.data.results)
      return response?.data
    }
  })
}
