export interface DeliveryFee {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  currency: string
  costOfBorrowingBankRate: string
  costOfServiceDelivery: string
  otherCost: string
  otherCostType: string
  updatedById: string
  updatedAt: Date
  version: number
}
export interface DeliveryFeeResult {
  result: DeliveryFee
}

export interface updateDeliveryFeeResult {
  currency: string
  costOfBorrowingBankRate: string
  costOfServiceDelivery: string
  otherCost: string
  otherCostType: string
}
