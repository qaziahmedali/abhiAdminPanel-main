export interface Organization {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  name: string
  organizationNumber: number
  industry: string
  managementAlias: string
  organizationType: string
  businessTypeId: string
  active: boolean
  tariffId: string
  companyLogoId?: any
  addressId: string
  emailId: string
  phoneId: string
  selectedBankAccountId: string
  updatedById: string
  updatedAt: Date
  version: number
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

export interface Person {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  userId: string
  firstName: string
  lastName: string
  cnic: string
  dob: string
  gender: string
  profileImageId?: any
  updatedById: string
  updatedAt: Date
  version: number
}

export interface OfficialPhone {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  userId: string
  country: string
  phoneNo: string
  contactType: string
  updatedById: string
  updatedAt: Date
  version: number
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
  providentFund: string
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

export interface TransactionResult {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  employeeId: string
  organizationId: string
  toBankAccountId: string
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
  coins?: any
  accountToBank: string
  accountToTitle: string
  accountToNumber: string
}
