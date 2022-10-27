export interface Organization {
  name: string
}

export interface Bank {
  bankName: string
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

export interface Person {
  firstName: string
  lastName: string
  cnic: string
}

export interface OfficialPhone {
  phoneNo: string
}

export interface Employee {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  employeeCode: string
  employeesBadge: string
  dateOfJoining: Date
  designationId: string
  organizationId: string
  departmentId: string
  netSalary: string
  personId: string
  officialEmailId: string
  officialPhoneId: string
  selectedBankAccountId: string
  updatedById: string
  updatedAt: Date
  version: number
  selectedBankAccount: SelectedBankAccount
  person: Person
  officialPhone: OfficialPhone
}

export interface exportTransactionResult {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  employeeId: string
  organizationId: string
  amount: string
  comments?: any
  tariffId: string
  paymentPurposeId: string
  tariffFee: string
  initiator: string
  requestStatus: string
  transactionStatus: string
  employeeContribution: string
  originalAmount: string
  transactionType: string
  transactionDate: string
  updatedById: string
  updatedAt: Date
  version: number
  organization: Organization
  employee: Employee
}

export interface exportTransactionData {
  total: number
  results: exportTransactionResult[]
}
