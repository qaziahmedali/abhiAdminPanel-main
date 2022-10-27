export interface EmailTemplateResult {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  name: string
  description?: any
  enabled: boolean
  emailType: string
  emailSubject: string
  emailBody: string
  language: string
  updatedById: string
  updatedAt: Date
  version: number
}

export interface IUpdateEmailTemplatePayload {
  id?: string
  emailSubject: string
  emailBody: string
}

export interface ISendTestEmailPayload extends IUpdateEmailTemplatePayload {
  recipient: string
}

export interface EmailTemplateData {
  total: number
  results: EmailTemplateResult[]
}

export interface ICreateEmailTemplatePayload {
  name: string
  description: string
  emailSubject: string
  emailBody: string
  emailType: string
  language: string
}
