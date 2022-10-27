export interface OneLinkBankDetails {
  imd: string
}

export interface BankDetailResult {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  bankName: string
  country: string
  bankAccountFormat: string
  bankAccountRegex: string
  hrsgBankCode?: number
  updatedById: string
  updatedAt: Date
  version: number
  oneLinkBankDetails: OneLinkBankDetails
}

export interface BankDetailData {
  total: number
  results: BankDetailResult[]
}
