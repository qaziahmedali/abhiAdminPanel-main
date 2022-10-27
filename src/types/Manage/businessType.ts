export interface BusinessTypesResult {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  name: string
  description?: any
  country: string
  updatedById: string
  updatedAt: Date
  version: number
}

export interface BusinessTypesData {
  total: number
  results: BusinessTypesResult[]
}
