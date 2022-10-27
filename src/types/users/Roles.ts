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

export interface RoleResults {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  organizationId: string
  name: string
  roleType: string
  updatedById: string
  updatedAt: Date
  version: number
  organization?: Organization
}
export interface RolesData {
  total: number
  results: RoleResults[]
}

export interface Role {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  organizationId: string
  name: string
  roleType: string
  updatedById: string
  updatedAt: Date
  version: number
}

export interface AssignRoles {
  userId: string
  roleId: string
  createdAt: Date
  createdById: string
  deletedDate?: any
  deletedById?: any
  role: Role
}
export interface AssignRolesData {
  total: number
  results: AssignRoles[]
}

export interface DeleteRoleData {
  message: string
}
