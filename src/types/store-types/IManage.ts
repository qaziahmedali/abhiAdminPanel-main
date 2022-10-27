import { AbhiResponse } from '@/utils/apiManager/responces'
import { AxiosResponse } from 'axios'
import { Action, Thunk } from 'easy-peasy'

import { All1LinkResponseCodesResult } from '../Manage/All1LinkResponseCodes'
import { BankDetailResult } from '../Manage/BankDetails'
import {
  ICreateBillerPayment,
  IGetBillerPaymentPayload,
  IGetBillerPaymentResponse,
  IUpdateBillerPayment
} from '../Manage/BillerPayment'
import { BusinessTypesResult } from '../Manage/businessType'
import {
  EmailTemplateResult,
  ICreateEmailTemplatePayload,
  IUpdateEmailTemplatePayload
} from '../Manage/EmailTemplateType'
import { OneLinkDefaultValuesResult } from '../Manage/OneLinkDefaultValue'
import { PaymentPurposesResults } from '../Manage/PaymentPurpose'
import {
  IPrizesCreatePayload,
  IPrizesPayload,
  IPrizesPostPayload,
  PrizesData,
  PrizesResult
} from '../Manage/PrizesType'
import {
  IBaseSMSTemplatePayload,
  ISMSTemplate,
  ISMSTemplateCreateResult,
  ISMSTemplateCreateThunkPayload,
  ISMSTemplateResult,
  ISMSTemplateUpdateResult,
  ISMSTemplateUpdateThunkPayload
} from '../Manage/SMSTemplateType'
import { TariffResult } from '../Manage/Tariff'

interface ManageState {
  tarrifs: TariffResult[]
  businessTypes: BusinessTypesResult[]
  businessDocument: Array<BusinessTypes>

  emailTemplates: Array<EmailTemplateResult>
  responseCodes: Array<All1LinkResponseCodesResult>
  paymentPurposes: Array<PaymentPurposesResults[]>
  oneLinkDefaultValues: OneLinkDefaultValuesResult[]
  serviceDeliveryFee: DeliveryFee
  banks: Array<BankDetailResult>
  drawerTitle: string
  smsTemplates: ISMSTemplate[]
  smsTemplatesTotalCount: number
  billerPayment: IGetBillerPaymentResponse
  prizes: PrizesResult[]
}

interface ManageActions {
  setTarrif: Action<this, TariffResult[]>
  setBusinessTypes: Action<this, BusinessTypesResult[]>
  setBusinessDocument: Action<this, string>
  setSMSTemplates: Action<this, ISMSTemplateResult>
  setEmailTemplates: Action<this, EmailTemplateResult[]>
  setResponseCode: Action<this, All1LinkResponseCodesResult[]>
  setPaymentPurposes: Action<this, PaymentPurposesResults[]>
  setDefaultValues: Action<this, OneLinkDefaultValuesResult[]>
  setServiceDeliveryFee: Action<this, DeliveryFee>
  setBanks: Action<this, BankDetailResult[]>
  setDrawerTitle: Action<this, string>
  setBillerPayment: Action<this, IGetBillerPaymentResponse>
  setPrizes: Action<this, PrizesResult[]>
}

interface ManageThunk {
  manageTariff: Thunk<this, { offset?: Number; limit?: Number }>
  getServiceDeliveryFee: Thunk<this>
  getBusinessTypes: Thunk<this>
  getBusinessDoucument: Thunk<this, string>
  getEmailTemplates: Thunk<this>
  getResponseCodes: Thunk<this>
  getPaymentPurposes: Thunk<this>
  getDefaultValues: Thunk<this>
  getBanks: Thunk<this>

  updateTariff: Thunk<this, IManagePayload>
  tariffTiers: Thunk<this, ITariffModelTierPayload>
  updateTariffModelTiers: Thunk<this, IUpdateTariffModelTierPayload>
  updateTariffTipping: Thunk<this, IUpdateTariffModelTippingPayload>

  tariffModelTierException: Thunk<this, ITariffModelTierExceptionPayload>
  addBusinessTypes: Thunk<this, BusinessTypes>
  updateBusinessTypes: Thunk<this, UpdateBusinessTypePayload>
  addBanks: Thunk<this, Banks>
  updateBanks: Thunk<this, UpdateBanks>

  addBusinessDocument: Thunk<this, BusinessDocumentPayload>
  updateBusinessDocument: Thunk<this, UpdateBusinessDocumentPayload, undefined>
  tariffTipping: Thunk<this, TariffTipping>
  updateDeliveryFee: Thunk<this, ServiceDeliveryFee>
  updateDefaultValues: Thunk<this, DefaultValues>

  createEmailTemplate: Thunk<this, ICreateEmailTemplatePayload>
  updateEmailTemplate: Thunk<this, IUpdateEmailTemplatePayload>
  sendTestEmailTemplate: Thunk<this, IUpdateEmailTemplatePayload>

  getSMSTemplates: Thunk<
    this,
    IBaseSMSTemplatePayload,
    undefined,
    {},
    Promise<AxiosResponse<AbhiResponse<ISMSTemplateResult>>>
  >
  updateSMSTemplate: Thunk<
    this,
    ISMSTemplateUpdateThunkPayload,
    undefined,
    {},
    Promise<AxiosResponse<AbhiResponse<ISMSTemplateUpdateResult>>>
  >
  createSMSTemplate: Thunk<
    this,
    ISMSTemplateCreateThunkPayload,
    undefined,
    {},
    Promise<AxiosResponse<AbhiResponse<ISMSTemplateCreateResult>>>
  >

  getBillerPayment: Thunk<
    this,
    IGetBillerPaymentPayload,
    undefined,
    {},
    Promise<AxiosResponse<AbhiResponse<IGetBillerPaymentResponse>> | false>
  >
  createBillerPayment: Thunk<
    this,
    ICreateBillerPayment,
    undefined,
    {},
    Promise<AxiosResponse<AbhiResponse<{}>> | false>
  >
  updateBillerPayment: Thunk<
    this,
    IUpdateBillerPayment,
    undefined,
    {},
    Promise<AxiosResponse<AbhiResponse<{}>> | false>
  >
  deleteBillerPayment: Thunk<this, string, undefined, {}, Promise<AxiosResponse<AbhiResponse<{}>> | false>>

  getPrizes: Thunk<this, IPrizesPayload>

  postPrizes: Thunk<this, IPrizesPostPayload>
}

export interface IManage extends ManageState, ManageActions, ManageThunk {}

export interface Tarrif {
  id: string
  name: string
  description: string
  currency: string
  pricingModel: string
}

export interface BankId {
  id: string
}
export interface TariffTipping {
  general: {
    name: string
    description: string
    currency: string
    pricingModel: string
  }
  tipping: {
    minBasePrice: number
    maxBasePrice: number
    tipType: string
  }
}

export interface BusinessTypes {
  name: string
  description: string
  country: string
}

export interface UpdateBusinessTypePayload {
  name: string
  description: string
  country: string
  businessTypeId: string
}

export interface DefaultValues {
  settingsJson: {
    TransactionAmount: string
    MerchantType: string
    CardAcceptorTerminalId: string
    CardAcceptorIdCode: string
    CurrencyCodeTransaction: string
    PosEntMode: string
    SenderName: string
    SenderIBAN: string
    AccountNumberFrom: string
    FromBankIMD: string
    AuthorizationIdentificationResponse: string
    CardAcceptorNameLocation: {
      Location: string
      City: string
      State: string
      ZipCode: string
      AgentName: string
      AgentCity: string
      ADCLiteral: string
      BankName: string
      Country: string
    }
  }
}

export interface ServiceDeliveryFee {
  currency: string
  costOfBorrowingBankRate: number
  costOfServiceDelivery: number
  otherCost: number
  otherCostType: string
}

export interface Banks {
  bankName: string
  country: string
  bankAccountFormat: string
  bankAccountRegex: string
  imd: string
}
export interface UpdateBanks {
  imd: string
  bankId: string
  bankName: string
  country: string
  bankAccountFormat: string
  bankAccountRegex: string
}

export interface BusinessDocumentPayload {
  name: string
  description: string
  country: string
  acceptableFormats: string
  maxFileSize: number
  businessTypeId: string
}

export interface UpdateBusinessDocumentPayload {
  name: string
  description: string
  country: string
  acceptableFormats: string
  maxFileSize: number
  businessTypeId: string
  documentId: string
}

export interface DeliveryFee {
  currency: string
  costOfBorrowingBankRate: string
  costOfServiceDelivery: string
  otherCost: string
  otherCostType: string
}

export interface ITariffModelTierPayload {
  general: {
    name: string
    description: string
    currency: string
    pricingModel: string
    minimumWithdrawAmount: number
  }
  tier: {
    denominator: number
    amount: number
    tierType: string
    fee: number
    employeeContribution: number
  }
  exceptions: TariffException[]
}

type TariffException = {
  id?: string
  exceptionType: string
  fee: number
  monthDay: number
}

export interface IUpdateTariffModelTierPayload {
  tariffId: string
  general: {
    name: string
    description: string
    currency: string
    pricingModel: string
    minimumWithdrawAmount: number
  }
  tier: {
    denominator: number
    amount: number
    tierType: string
    fee: number
    employeeContribution: number
  }
  exceptions: TariffException[]
}

export interface IUpdateTariffModelTippingPayload {
  tariffId: string
  general: {
    name: string
    description: string
    currency: string
    pricingModel: string
    minimumWithdrawAmount: number
  }
  tipping: {
    minBasePrice: number
    maxBasePrice: number
    tipType: string
  }
}

export interface ResponseCode {
  id: string
  description: string
  code: string
}

export interface PaymentPurposes {
  id: string
  description: string
  code: string
  name: string
}

export interface ITariffModelTierExceptionPayload {
  monthDay: number
  fee: number
  exceptionType: string
  tariffId: string
}

export interface IManagePayload {
  email: string
  password: string
}
