export interface User {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedDate?: any
  version: number
  enabled: boolean
  username: string
  password: string
  resetToken?: any
  otp?: number
  failAttemptCount: number
  skipFailedAttemptCount: boolean
  lastLoginTime: string
  isPasswordChanged: boolean
  identifier: string
  allowMultilogin: boolean
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
  user: User
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

export interface OfficialPhone {
  phoneNo: string
}

export interface OfficialEmail {
  email: string
}

export interface SalaryBlackoutPeriod {
  from: number
  to: number
}

export interface JsonConfig {
  bronzeLimit: number
  silverLimit: number
  goldLimit: number
  platinumLimit: number
  bronzeLimitAutoApprove: boolean
  silverLimitAutoApprove: boolean
  goldLimitAutoApprove: boolean
  platinumLimitAutoApprove: boolean
  deductServiceFeeFromEmployee: boolean
  payrollStartDay: number
  vendorPaymentDay: number
  ewaAutoApprove: boolean
  allowRepayments: boolean
  vendorAutoApprove: boolean
  paymentGracePeriod: number
  businessHoursStart: string
  businessHoursEnd: string
  timezone: string
  isEmiAllowed?: any
  isPFAllowed: boolean
  isTariffFeeDeduction?: any
  allowPayroll: any
  salaryAccessType: string
  salaryBlackoutPeriod: SalaryBlackoutPeriod
  isEmailNotificationEnabled: boolean
  isSMSNotificationEnabled: boolean
  allowDost: boolean
}

export interface OrganizationEmployeesConfiguration {
  deletedDate?: any
  jsonConfig: JsonConfig
  version: number
}

export interface OrganizationManager {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  organizationId: string
  managerId: string
  operationsAllowed: string
  organizationManagementRole: string
  updatedById: string
  updatedAt: Date
  version: number
}

export interface SalaryBlackoutPeriod2 {
  from: number
  to: number
}

export interface JsonConfig2 {
  bronzeLimit: number
  silverLimit: number
  goldLimit: number
  platinumLimit: number
  bronzeLimitAutoApprove: boolean
  silverLimitAutoApprove: boolean
  goldLimitAutoApprove: boolean
  platinumLimitAutoApprove: boolean
  deductServiceFeeFromEmployee: boolean
  payrollStartDay: number
  vendorPaymentDay: number
  ewaAutoApprove: boolean
  allowRepayments: boolean
  vendorAutoApprove: boolean
  paymentGracePeriod: number
  businessHoursStart: string
  businessHoursEnd: string
  timezone: string
  isEmiAllowed?: any
  isPFAllowed: boolean
  isTariffFeeDeduction?: any
  allowPayroll: any
  salaryAccessType: string
  salaryBlackoutPeriod: SalaryBlackoutPeriod2
  isEmailNotificationEnabled: boolean
  isSMSNotificationEnabled: boolean
  allowDost: boolean
}

export interface OrganizationConfiguration {
  jsonConfig: JsonConfig2
  version: number
}

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
  organizationConfigurations: OrganizationConfiguration[]
}

export interface UserResults {
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
  person: Person
  selectedBankAccount: SelectedBankAccount
  officialPhone: OfficialPhone
  officialEmail: OfficialEmail
  organizationEmployeesConfigurations: OrganizationEmployeesConfiguration[]
  organizationManagers: OrganizationManager[]
  organization: Organization
  limit: number
  workingStatus: string
  systemAccess: string
}
