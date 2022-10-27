export interface IBaseSMSTemplatePayload {
  page?: number
  limit?: number
}

export interface ISMSTemplate {
  id: string
  name: string
  description: string | null
  enabled: boolean
  smsBody: string
  language: string
}

export interface ISMSTemplateEditFormData {
  id: string
  smsBody: string
}

export interface ISMSTemplateCreateFormData {
  name: string
  smsBody: string
  description: string
  language: string
}

export interface ISMSTemplateCreateServicePayload extends ISMSTemplateCreateFormData {}

export interface ISMSTemplateCreateThunkPayload extends ISMSTemplateCreateFormData {}

export interface ISMSTemplateUpdateServicePayload {
  smsBody: string
}

export interface ISMSTemplateUpdateThunkPayload extends ISMSTemplateUpdateServicePayload {
  id: string
}

export interface ISMSTemplateResult {
  total: number
  results: ISMSTemplate[]
}

export interface ISMSTemplateUpdateResult {
  data: {}
  message: string
  status: string
}

export interface ISMSTemplateCreateResult extends ISMSTemplateUpdateResult {}
