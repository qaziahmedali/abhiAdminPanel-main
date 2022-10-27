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
  updatedById: string
  updatedAt: Date
  version: number
  bank: Bank
}

export interface Person {
  firstName: string
  lastName: string
}

export interface Employee {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  employeeCode?: any
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
}

export interface Result {
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
  updatedById: string
  updatedAt: Date
  version: number
  organization: Organization
  employee: Employee
}

export interface FilterTransactions {
  total: number
  results: Result[]
}
