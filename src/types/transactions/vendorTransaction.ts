export interface Organization {
  name: string
}

export interface Bank {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  bankName: string
  country: string
  bankAccountFormat: string
  bankAccountRegex: string
  hrsgBankCode?: number
  bankIconId: string
  updatedById: string
  updatedAt: Date
  version: number
}

export interface SelectedBankAccount {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  accountTitle: string
  accountNumber: string
  currency: string
  bankId: string
  isApproved: boolean
  titleFetchVerified: boolean
  updatedById: string
  updatedAt: Date
  version: number
  bank: Bank
}

export interface Vendor {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  name: string
  description?: any
  ntn: string
  vendorId: string
  active: boolean
  payment: string
  organizationId: string
  selectedBankAccountId: string
  email: string
  phoneNo: string
  updatedById: string
  updatedAt: Date
  deletedById?: any
  version: number
  selectedBankAccount: SelectedBankAccount
}

export interface VendorTranactionResult {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  vendorId: string
  organizationId: string
  requestedAmount: string
  approvedAmount: string
  comments?: any
  referenceId: string
  initiator: string
  requestStatus: string
  transactionStatus: string
  transactionDate: string
  updatedById: string
  updatedAt: Date
  version: number
  organization: Organization
  vendor: Vendor
}

export interface VendorTranactionData {
  total: number
  results: VendorTranactionResult[]
}
