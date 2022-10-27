import { AxiosError } from 'axios'
import { action, thunk } from 'easy-peasy'

import { AppConstants } from '../utils/appConstants'
import { IManage } from '@/types/store-types'
import { manageService } from '../services/manageService'
import { ISendTestEmailPayload } from '@/types/Manage/EmailTemplateType'
import {
  IBaseSMSTemplatePayload,
  ISMSTemplateCreateThunkPayload,
  ISMSTemplateResult
} from '../types/Manage/SMSTemplateType'
import { IGetBillerPaymentResponse } from '@/types/Manage/BillerPayment'
import { PrizesResult } from '@/types/Manage/PrizesType'

const manage: IManage = {
  tarrifs: new Array(),
  businessTypes: new Array(),
  businessDocument: new Array(),
  emailTemplates: new Array(),
  responseCodes: new Array(),
  paymentPurposes: new Array(),
  banks: new Array(),
  prizes: new Array(),
  billerPayment: {
    total: 0,
    results: []
  },
  drawerTitle: '',
  oneLinkDefaultValues: new Array(),
  serviceDeliveryFee: Object(),
  smsTemplates: [],
  smsTemplatesTotalCount: 0,

  setTarrif: action((state, payload: any) => {
    state.tarrifs = payload
  }),

  setEmailTemplates: action((state, payload: any) => {
    state.emailTemplates = payload
  }),

  setResponseCode: action((state, payload: any) => {
    state.responseCodes = payload
  }),

  setDefaultValues: action((state, payload: any) => {
    state.oneLinkDefaultValues = payload
  }),

  setBanks: action((state, payload: any) => {
    state.banks = payload
  }),

  setPaymentPurposes: action((state, payload: any) => {
    state.paymentPurposes = payload
  }),

  setDrawerTitle: action((state, payload: string) => {
    state.drawerTitle = payload
  }),

  setBillerPayment: action((state, payload: IGetBillerPaymentResponse) => {
    state.billerPayment = {
      ...payload
    }
  }),
  setPrizes: action((state, payload: PrizesResult[]) => {
    state.prizes = payload
  }),

  manageTariff: thunk(async (actions, params) => {
    const response = await manageService.manageTariff(params)

    if (response === false) {
      return
    }
    if (response.status === AppConstants.SUCCESS) {
      actions.setTarrif(response.data.results) // 👈 dispatch local actions to update state
      return response.data
    } else {
      return false
    }
  }),

  updateTariffModelTiers: thunk(async (actions, payload) => {
    let updateTierObj = {
      general: payload.general,
      tier: payload.tier,
      exceptions: payload.exceptions
    }

    const response = await manageService.updateTariffModelTiers(updateTierObj, payload.tariffId)

    return response
  }),

  tariffTiers: thunk(async (actions, payload) => {
    const response = await manageService.addTariff(payload)
    return response
  }),

  tariffTipping: thunk(async (actions, payload) => {
    const response = await manageService.addTariff(payload)

    return response
  }),

  updateTariffTipping: thunk(async (actions, payload) => {
    let updateTippingObj = {
      general: payload.general,
      tipping: payload.tipping
    }

    const response = await manageService.updateTariffModelTiers(updateTippingObj, payload.tariffId)
    return response
  }),

  tariffModelTierException: thunk(async (actions, payload) => {
    const response = await manageService.tariffModelTierException(payload)
    return response
  }),

  getBusinessTypes: thunk(async (actions, params) => {
    const response = await manageService.getBusinessTypes(params)

    if (response === false) {
      return
    }
    if (response.status === AppConstants.SUCCESS) {
      actions.setBusinessTypes(response.data.results)

      return response.data
    } else {
      return false
    }
  }),

  getBusinessDoucument: thunk(async (actions, typeId) => {
    const response = await manageService.getBusinessDocument(typeId)
    if (response === false) {
      return
    }
    if (response.status === AppConstants.SUCCESS) {
      // actions.setBusinessDocument(response.data.results);
      return response.data
    } else {
      false
    }
  }),

  updateBusinessDocument: thunk(async (actions, payload) => {
    let businessDocument = {
      name: payload.name,
      description: payload.description,
      country: payload.country,
      maxFileSize: payload.maxFileSize,
      acceptableFormats: payload.acceptableFormats,
      businessTypeId: payload.businessTypeId
    }

    const response = await manageService.updateBusinessDocument(businessDocument, payload.documentId)
    return response
  }),

  setBusinessDocument: action((state, payload: any) => {
    state.businessDocument = payload
  }),

  setBusinessTypes: action((state, payload: any) => {
    state.businessTypes = payload
  }),

  addBusinessTypes: thunk(async (actions, payload) => {
    const response = await manageService.addBusinessTypes(payload)
    return response
  }),

  addBusinessDocument: thunk(async (actions, payload) => {
    const response = await manageService.addBusinessDocument(payload)
    return response
  }),

  updateBusinessTypes: thunk(async (actions, payload) => {
    let businessTypesObj = {
      name: payload.name,
      description: payload.description,
      country: payload.country
    }

    const response = await manageService.updateBusinessTypes(businessTypesObj, payload.businessTypeId)
    return response
  }),

  updateTariff: thunk(async (actions, payload) => {
    const updated: any = await manageService.handleApiResponse(payload)
    actions.setTarrif(updated)
  }),

  getServiceDeliveryFee: thunk(async (actions) => {
    const response = await manageService.getServiceDeliveryFee()
    if (response === false) {
      return
    }
    if (response.status === AppConstants.SUCCESS) {
      actions.setServiceDeliveryFee(response.data.result)
      return response.data
    }
  }),

  getEmailTemplates: thunk(async (actions, params) => {
    const response = await manageService.getEmailTemplates(params)
    if (response == false) {
      return
    }
    if (response.status === AppConstants.SUCCESS) {
      actions.setEmailTemplates(response?.data?.results) //  dispatch local actions to update state

      return response
    } else {
      return false
    }
  }),

  getResponseCodes: thunk(async (actions, params) => {
    const response = await manageService.getResponseCodes(params)
    if (response === false) {
      return
    }
    if (response.status === AppConstants.SUCCESS) {
      actions.setResponseCode(response.data.results) // 👈 dispatch local actions to update state
      return response.data
    } else {
      return false
    }
  }),

  getDefaultValues: thunk(async (actions) => {
    const response = await manageService.getDefaultValues()
    if (response == false) {
      return
    }

    if (response.status === AppConstants.SUCCESS) {
      actions.setDefaultValues(response?.data?.result)
      return response.data
    } else {
      return false
    }
  }),

  getBanks: thunk(async (actions, params) => {
    const response = await manageService.getBanks(params)
    if (response === false) {
      return
    }
    if (response.status === AppConstants.SUCCESS) {
      actions.setBanks(response.data.results) // 👈 dispatch local actions to update state
      return response.data
    } else {
      return false
    }
  }),

  addBanks: thunk(async (actions, payload) => {
    const response = await manageService.addBanks(payload)
    if (response === false) {
      return
    }
    if (response.status === AppConstants.SUCCESS) {
      const response = await manageService.getBanks({ offset: 0, limit: 10 })
      if (response === false) {
        return
      }
      if (response.status === AppConstants.SUCCESS) {
        actions.setBanks(response.data.results) // 👈 dispatch local actions to update state
        return response.data
      } else {
        return false
      }
    } else {
      return false
    }
  }),

  updateBanks: thunk(async (actions, payload) => {
    let bankId = payload.bankId
    let bankPayload = {
      bankName: payload.bankName,
      country: payload.country,
      bankAccountFormat: payload.bankAccountFormat,
      bankAccountRegex: payload.bankAccountRegex,
      imd: payload.imd
    }
    const response = await manageService.updateBanks(bankPayload, bankId)
    if (response === false) {
      return
    }

    if (response.status === AppConstants.SUCCESS) {
      const response = await manageService.getBanks({ offset: 0, limit: 10 })
      if (response === false) {
        return
      }
      if (response.status === AppConstants.SUCCESS) {
        actions.setBanks(response.data.results) // 👈 dispatch local actions to update state
        return response.data
      } else {
        return false
      }
      return response
    } else {
      return false
    }
  }),

  updateDefaultValues: thunk(async (actions, payload) => {
    const response = await manageService.updateDefaultValues(payload)
    if (response === false) {
      return
    }
    if (response.status === AppConstants.SUCCESS) {
      actions.setDefaultValues(response.data.result)
      return response.data
    } else {
      return false
    }
  }),

  getPaymentPurposes: thunk(async (actions) => {
    const response = await manageService.getPaymentPurposes()
    if (response === false) {
      return
    }
    if (response.status === AppConstants.SUCCESS) {
      actions.setPaymentPurposes(response.data) // 👈 dispatch local actions to update state
      return response.data
    } else {
    }
  }),

  updateDeliveryFee: thunk(async (actions, payload) => {
    const response = await manageService.updateDeliveryFee(payload)

    if (response === false) {
      return
    }

    actions.setServiceDeliveryFee(response.data.result) // 👈 dispatch local actions to update state

    return response
  }),

  setServiceDeliveryFee: action((state, payload: any) => {
    state.serviceDeliveryFee = payload
  }),

  createEmailTemplate: thunk(async (_, payload) => {
    return manageService.createEmailTemplate(payload)
  }),

  updateEmailTemplate: thunk(async (_, payload) => {
    const { id } = payload
    delete payload.id
    return manageService.updateEmailTemplate(payload, id || '')
  }),

  sendTestEmailTemplate: thunk(async (_, payload: ISendTestEmailPayload) => {
    return manageService.sendTestEmailTemplate(payload)
  }),

  setSMSTemplates: action((state, payload: ISMSTemplateResult) => {
    state.smsTemplates = payload.results
    state.smsTemplatesTotalCount = payload.total
  }),

  getSMSTemplates: thunk(async (actions, payload: IBaseSMSTemplatePayload) => {
    const response = await manageService.getSMSTemplates(payload)
    actions.setSMSTemplates(response.data.data)
    return response
  }),

  updateSMSTemplate: thunk(async (_, payload) => {
    const { id, smsBody } = payload
    return manageService.updateSMSTemplate({ smsBody }, id || '')
  }),

  createSMSTemplate: thunk(async (_, payload: ISMSTemplateCreateThunkPayload) => {
    return manageService.createSMSTemplate(payload)
  }),

  getBillerPayment: thunk(async ({ setBillerPayment }, payload) => {
    const response = await manageService.getBillerPayment(payload)
    if (!response) {
      return response
    }
    setBillerPayment(response.data.data)
    return response
  }),

  createBillerPayment: thunk(async (_, payload) => {
    const response = await manageService.createBillerPayment(payload)
    return response
  }),

  updateBillerPayment: thunk(async (_, payload) => {
    const response = await manageService.updateBillerPayment(payload)
    return response
  }),

  deleteBillerPayment: thunk(async (_, billerPaymentId) => {
    const response = await manageService.deleteBillerPayment(billerPaymentId)
    return response
  }),

  getPrizes: thunk(async (action, payload) => {
    const response = await manageService.getPrizes(payload)
    if (response === false) {
      return
    }
    if (response.status === AppConstants.SUCCESS) {
      action.setPrizes(response.data.results)
    }
    return response
  }),

  postPrizes: thunk(async (_, payload) => {
    const response = await manageService.postPrizes(payload)
    if (response instanceof Error) {
      const axiosError = response as AxiosError<unknown, any>

      return axiosError?.response?.data
    }
    return response
  })
}

export default manage
