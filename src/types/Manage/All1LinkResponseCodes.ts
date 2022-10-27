export interface All1LinkResponseCodesResult {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  code: string
  description: string
  message: string
  sysopsReporting: boolean
  updatedById: string
  updatedAt: Date
  version: number
}

export interface All1LinkResponseCodesData {
  total: number
  results: All1LinkResponseCodesResult[]
}
