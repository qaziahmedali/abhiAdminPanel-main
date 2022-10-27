import { BankDetailData, BankDetailResult } from '@/types/Manage/BankDetails'
import { BusinessTypesData, BusinessTypesResult } from '@/types/Manage/businessType'
import { TariffGetAllTariff, TariffResults } from '@/types/Manage/Tariff'

import { All1LinkResponseCodesData } from '@/types/Manage/All1LinkResponseCodes'
import { AppConstants } from '../utils/appConstants'
import { DeliveryFeeResult } from '@/types/Manage/DeliveryFees'
import {
  EmailTemplateData,
  ICreateEmailTemplatePayload,
  ISendTestEmailPayload,
  IUpdateEmailTemplatePayload
} from '@/types/Manage/EmailTemplateType'
import { OneLinkDefaultValuesData } from '@/types/Manage/OneLinkDefaultValue'
import { PaymentPurposesResults } from '@/types/Manage/PaymentPurpose'
import { apiManager } from '@/utils/apiManager/ApiManager'
import { catchTry } from '@/utils/betterTry'
import {
  IBaseSMSTemplatePayload,
  ISMSTemplateCreateResult,
  ISMSTemplateCreateServicePayload,
  ISMSTemplateResult,
  ISMSTemplateUpdateResult,
  ISMSTemplateUpdateServicePayload
} from '../types/Manage/SMSTemplateType'
import { AxiosResponse } from 'axios'
import { AbhiResponse } from '../utils/apiManager/responces'
import {
  ICreateBillerPayment,
  IGetBillerPaymentPayload,
  IGetBillerPaymentResponse,
  IUpdateBillerPayment
} from '@/types/Manage/BillerPayment'
import { IPrizesCreatePayload, IPrizesPayload, IPrizesPostPayload, PrizesData } from '@/types/Manage/PrizesType'

class ManageService {
  login = (payload: any) => {
    return apiManager.login(payload.email, payload.password)
  }

  manageTariff = async (params: any) => {
    const manageTariffUrl = await catchTry(
      apiManager.fetch<TariffResults>({
        name: 'ManageGetAllTariffs',
        queryParams: {
          offset: params.offset,
          limit: params.limit
        }
      })
    )

    if (manageTariffUrl instanceof Error) {
      return false
    }
    return manageTariffUrl.data
  }

  getServiceDeliveryFee = async () => {
    const serviceDeliveryFeeUrl = await catchTry(
      apiManager.fetch<DeliveryFeeResult>({
        name: 'ManageGetServiceDeliveryFee'
      })
    )

    if (serviceDeliveryFeeUrl instanceof Error) {
      return false
    }
    return serviceDeliveryFeeUrl.data
  }

  addTariff = async (payload: any) => {
    const tariffTiersUrl = await catchTry(
      apiManager.fetch<TariffGetAllTariff>({
        name: 'ManageCreateTariff',
        data: payload
      })
    )

    if (tariffTiersUrl instanceof Error) {
      return false
    }
    return tariffTiersUrl.data
  }

  updateTariffModelTiers = async (payload: any, tariffId: string) => {
    const updateTariffModelTiersUrl = await catchTry(
      apiManager.fetch<TariffGetAllTariff>({
        name: 'ManageUpdateTariff',
        data: payload,
        pathVariables: {
          id: tariffId
        }
      })
    )

    if (updateTariffModelTiersUrl instanceof Error) {
      return false
    }
    return updateTariffModelTiersUrl.data
  }
  tariffModelTipping = async (payload: any) => {
    const tariffModelTippingUrl = await catchTry(
      apiManager.fetch<TariffGetAllTariff>({
        name: 'ManageUpdateTariff',
        data: payload
      })
    )

    if (tariffModelTippingUrl instanceof Error) {
      return false
    }
    return tariffModelTippingUrl.data
  }

  updateDeliveryFee = async (payload: any) => {
    const tariffModelTippingUrl = await catchTry(
      apiManager.fetch<DeliveryFeeResult>({
        name: 'ManageUpdateServiceDeliveryFee',
        data: payload
      })
    )

    if (tariffModelTippingUrl instanceof Error) {
      return false
    }
    return tariffModelTippingUrl.data
  }

  tariffModelTierException = async (payload: any) => {
    const tariffModelTierExceptionUrl = await catchTry(
      apiManager.fetch<TariffGetAllTariff>({
        name: 'ManageUpdateTariff',
        data: payload
      })
    )

    if (tariffModelTierExceptionUrl instanceof Error) {
      return false
    }
    return tariffModelTierExceptionUrl.data

    // AppConstants.BASE_URL + AppConstants.TARIFF_MODEL_TIER_EXCEPTION;
    // return await axios.post(tariffModelTierExceptionUrl, payload);
  }

  gettariffModelTierException = async () => {
    const tariffModelTierExceptionUrl = await catchTry(
      apiManager.fetch<TariffGetAllTariff>({
        name: 'ManageGetTariffModelTierExceptions'
      })
    )

    if (tariffModelTierExceptionUrl instanceof Error) {
      return false
    }
    return tariffModelTierExceptionUrl.data

    // AppConstants.BASE_URL + AppConstants.TARIFF_MODEL_TIER_EXCEPTION;
    // return await axios.get(tariffModelTierExceptionUrl);
  }

  getBusinessTypes = async (params: any) => {
    const getBusinessTypesUrl = await catchTry(
      apiManager.fetch<BusinessTypesData>({
        name: 'ManageGetAllBusinessTypes',
        queryParams: {
          offset: params.offset,
          limit: params.limit
        }
      })
    )

    if (getBusinessTypesUrl instanceof Error) {
      return false
    }
    return getBusinessTypesUrl.data
  }

  addBusinessTypes = async (payload: any) => {
    const addBusinessTypesUrl = await catchTry(
      apiManager.fetch<BusinessTypesResult>({
        name: 'ManageCreateBusinessType',
        data: payload
      })
    )

    if (addBusinessTypesUrl instanceof Error) {
      return false
    }
    return addBusinessTypesUrl.data

    // AppConstants.BASE_URL + AppConstants.ADD_BUSINESS_TYPES;
    // return await axios.post(addBusinessTypesUrl, payload);
  }

  addBusinessDocument = async (payload: any) => {
    const addBusinessTypesUrl = await catchTry(
      apiManager.fetch<BusinessTypesResult>({
        name: 'ManageCreateBusinessDocumentsDescription',
        data: payload
      })
    )

    if (addBusinessTypesUrl instanceof Error) {
      return false
    }
    return addBusinessTypesUrl.data
    // AppConstants.BASE_URL + AppConstants.BUSINESS_DOCUMENTS_DESCRIPTION;
    // return await axios.post(addBusinessTypesUrl, payload);
  }

  getBusinessDocument = async (typeId: any) => {
    const getBusinessDocumentUrl = await catchTry(
      apiManager.fetch({
        name: 'ManageGetBusinessDocumentsDescription',
        pathVariables: {
          id: typeId
        }
      })
    )

    if (getBusinessDocumentUrl instanceof Error) {
      return false
    }
    return getBusinessDocumentUrl.data
  }

  updateBusinessDocument = async (payload: any, documentId: any) => {
    const updateBusinessDocumentUrl = await catchTry(
      apiManager.fetch<BusinessTypesResult>({
        name: 'ManageCreateBusinessDocumentsDescription',
        data: payload,
        pathVariables: {
          documentId
        }
      })
    )

    if (updateBusinessDocumentUrl instanceof Error) {
      return false
    }
    return updateBusinessDocumentUrl.data

    // AppConstants.BASE_URL + AppConstants.UPDATE_BUSINESS_DOCUMENTS + documentId;
    // return await axios.put(updateBusinessDocumentUrl, payload);
  }

  getEmailTemplates = async (params: any) => {
    const getEmailTemplatesUrl = await catchTry(
      apiManager.fetch<EmailTemplateData>({
        name: 'ManageGetAllEmailTemplates',
        queryParams: {
          offset: params.offset,
          limit: params.limit
        }
      })
    )

    if (getEmailTemplatesUrl instanceof Error) {
      return false
    }
    return getEmailTemplatesUrl.data
  }

  getResponseCodes = async (params: any) => {
    const getResponseCodesUrl = await catchTry(
      apiManager.fetch<All1LinkResponseCodesData>({
        name: 'ManageGetAll1LinkResponseCodes',
        queryParams: {
          offset: params?.offset,
          limit: params?.limit
        }
      })
    )

    if (getResponseCodesUrl instanceof Error) {
      return false
    }
    return getResponseCodesUrl.data
  }

  getDefaultValues = async () => {
    const getDefaultValuesUrl = await catchTry(
      apiManager.fetch<OneLinkDefaultValuesData>({
        name: 'ConfigGetOneLinkDefaultValues'
      })
    )
    if (getDefaultValuesUrl instanceof Error) {
      return false
    }
    return getDefaultValuesUrl.data

    //   AppConstants.BASE_URL + AppConstants.ONE_LINK_DEFAULT_VALUES;
    // return await axios.get(getDefaultValuesUrl);
  }

  updateDefaultValues = async (payload: any) => {
    const updateDefaultValuesUrl = await catchTry(
      apiManager.fetch<OneLinkDefaultValuesData>({
        name: 'ConfigUpdateOneLinkDefaultValues',
        data: payload
      })
    )
    if (updateDefaultValuesUrl instanceof Error) {
      return false
    }
    return updateDefaultValuesUrl.data

    //   AppConstants.BASE_URL + AppConstants.ONE_LINK_DEFAULT_VALUES;
    // return await axios.put(updateDefaultValuesUrl, payload);
  }

  getBanks = async (params: any) => {
    const getBanksUrl = await catchTry(
      apiManager.fetch<BankDetailData>({
        name: 'ManageGetAllBanks',
        queryParams: {
          offset: params.offset,
          limit: params.limit
        }
      })
    )

    if (getBanksUrl instanceof Error) {
      return false
    }

    return getBanksUrl.data
  }

  addBanks = async (payload: any) => {
    const addBanksUrl = await catchTry(
      apiManager.fetch<BankDetailResult>({
        name: 'ManageCreateBank',
        data: payload
      })
    )
    if (addBanksUrl instanceof Error) {
      return false
    }
    return addBanksUrl.data
  }

  updateBanks = async (payload: any, bankId: string) => {
    const updateBanksUrl = await catchTry(
      apiManager.fetch<BankDetailResult>({
        name: 'ManageUpdateBank',
        pathVariables: {
          id: bankId
        },
        data: payload
      })
    )
    if (updateBanksUrl instanceof Error) {
      return false
    }
    return updateBanksUrl.data
  }

  getPaymentPurposes = async () => {
    const getPaymentPurposesUrl = await catchTry(
      apiManager.fetch<PaymentPurposesResults[]>({
        name: 'GetPaymentPurposes'
      })
    )

    if (getPaymentPurposesUrl instanceof Error) {
      return false
    }
    return getPaymentPurposesUrl.data
  }

  updateBusinessTypes = async (payload: any, businessTypeId: string) => {
    const updateBusinessTypesUrl = await catchTry(
      apiManager.fetch<BusinessTypesResult>({
        name: 'ManageUpdateBusinessType',
        data: payload,
        pathVariables: {
          businessTypeId
        }
      })
    )
    if (updateBusinessTypesUrl instanceof Error) {
      return false
    }
    return updateBusinessTypesUrl.data
  }

  getTransactions = async () => {
    const getTransactionsUrl = await catchTry(
      apiManager.fetch({
        name: 'OrgGetAllEmployeesTransactionRequests'
      })
    )
    if (getTransactionsUrl instanceof Error) {
      return false
    }
    return getTransactionsUrl.data
  }

  handleApiResponse = (data: any) => {
    if (!data) return

    let url = AppConstants.BASE_URL + AppConstants.LOGIN
  }

  createEmailTemplate = async (payload: ICreateEmailTemplatePayload) => {
    return apiManager.fetch({
      name: 'ManageCreateEmailTemplate',
      data: {
        ...payload
      }
    })
  }

  updateEmailTemplate = async (payload: IUpdateEmailTemplatePayload, id: string) => {
    return apiManager.fetch({
      name: 'ManageUpdateEmailTemplate',
      data: {
        ...payload
      },
      pathVariables: {
        id
      }
    })
  }

  sendTestEmailTemplate = async (payload: ISendTestEmailPayload) => {
    return apiManager.fetch({
      name: 'ManageTestEmailTemplate',
      data: {
        ...payload
      }
    })
  }

  getBillerPayment = async (payload: IGetBillerPaymentPayload) => {
    const getBillerPayment = await catchTry(
      apiManager.fetch<IGetBillerPaymentResponse>({
        name: 'BillPaymentGetAllBillers',
        queryParams: {
          ...payload
        }
      })
    )
    if (getBillerPayment instanceof Error) {
      return false
    }
    return getBillerPayment
  }

  createBillerPayment = async (reqPayload: ICreateBillerPayment) => {
    const response = await catchTry(
      apiManager.fetch({
        name: 'BillPaymentPostBiller',
        data: reqPayload
      })
    )
    if (response instanceof Error) {
      return false
    }
    return response
  }

  updateBillerPayment = async (payload: IUpdateBillerPayment) => {
    const updateBillerPayment = await catchTry(
      apiManager.fetch({
        name: 'BillPaymentPatchUpdateBiller',
        data: payload,
        pathVariables: {
          id: payload.id
        }
      })
    )
    if (updateBillerPayment instanceof Error) {
      return false
    }
    return updateBillerPayment
  }

  deleteBillerPayment = async (billerPaymentId: string) => {
    const deleteBillerPayment = await catchTry(
      apiManager.fetch<{}>({
        name: 'BillPaymentDeleteBiller',
        pathVariables: {
          id: billerPaymentId
        }
      })
    )
    if (deleteBillerPayment instanceof Error) {
      return false
    }
    return deleteBillerPayment
  }

  getSMSTemplates = async (
    payload: IBaseSMSTemplatePayload
  ): Promise<AxiosResponse<AbhiResponse<ISMSTemplateResult>>> => {
    return apiManager.fetch({
      name: 'ManageGetAllSMSTemplates',
      queryParams: {
        ...payload
      }
    })
  }

  updateSMSTemplate = async (
    payload: ISMSTemplateUpdateServicePayload,
    id: string
  ): Promise<AxiosResponse<AbhiResponse<ISMSTemplateUpdateResult>, any>> => {
    return apiManager.fetch({
      name: 'ManageUpdateSMSTemplate',
      data: {
        ...payload
      },
      pathVariables: {
        id
      }
    })
  }

  createSMSTemplate = async (
    payload: ISMSTemplateCreateServicePayload
  ): Promise<AxiosResponse<AbhiResponse<ISMSTemplateCreateResult>, any>> => {
    return apiManager.fetch({
      name: 'ManageCreateSMSTemplate',
      data: {
        ...payload
      }
    })
  }

  getPrizes = async (payload: IPrizesPayload) => {
    const prizes = await catchTry(
      apiManager.fetch<PrizesData>({
        name: 'GetPrizesList',
        queryParams: {
          ...payload
        }
      })
    )
    if (prizes instanceof Error) {
      return false
    }
    return prizes.data
  }

  postPrizes = async (payload: IPrizesPostPayload) => {
    const prizes = await catchTry(
      apiManager.fetch<IPrizesCreatePayload>({
        name: 'PostNewPrize',
        data: {
          ...payload
        }
      })
    )
    if (prizes instanceof Error) {
      return prizes
    }
    return prizes.data
  }
}

export const manageService = new ManageService()
