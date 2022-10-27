export interface TariffModelTier {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  tariffId: string
  tierType: string
  fee: string
  amount: string
  denominator: number
  employeeContribution: string
  updatedById: string
  updatedAt: Date
  version: number
}

export interface TariffResult {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  name: string
  description: string
  currency: string
  minimumWithdrawAmount: string
  pricingModel: string
  updatedById: string
  updatedAt: Date
  version: number
  tariffModelTipping: any[]
  tariffModelTiers: TariffModelTier[]
}

export interface TariffResults {
  total: number
  results: TariffResult[]
}

export interface TariffGetAllTariff {
  data: TariffResults
  message: string
  status: string
}
