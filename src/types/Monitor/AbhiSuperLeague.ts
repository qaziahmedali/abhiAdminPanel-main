export interface Game {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  name: string
  updatedById: string
  updatedAt: Date
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
  billPaymentTariffId?: any
  companyLogoId?: any
  addressId: string
  emailId: string
  phoneId: string
  selectedBankAccountId: string
  updatedById: string
  updatedAt: Date
  version: number
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
  providentFund: string
  personId: string
  officialEmailId: string
  officialPhoneId: string
  selectedBankAccountId: string
  updatedById: string
  updatedAt: Date
  version: number
  organization: Organization
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
  employees: Employee[]
}

export interface Player {
  id: string
  createdAt: Date
  updatedAt: Date
  deletedDate?: any
  version: number
  enabled: boolean
  username: string
  password: string
  resetToken?: any
  otp?: any
  failAttemptCount: number
  skipFailedAttemptCount: boolean
  lastLoginTime: string
  isPasswordChanged: boolean
  identifier: string
  allowMultilogin: boolean
  pinRegex: string
  persons: Person[]
}

export interface ASLResult {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  playerId: string
  prizeId: string
  gameId: string
  coinsUsed: string
  score: string
  won: string
  winningPrize: string
  action: string
  updatedById: string
  updatedAt: Date
  version: number
  game: Game
  player: Player
  prize?: any
}
export interface IGetGameInfoResponsePayload {
  total: number
  results: ASLResult[]
}

export interface IGetGameInfoRequestPayload {
  page: number
  limit: number
}
