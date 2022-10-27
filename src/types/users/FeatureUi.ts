export interface PlatformServices {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  name: string
  description: string
  updatedById: string
  updatedAt: Date
  version: number
}

export interface FeatureUi {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  platformServicesId: string
  internalName: string
  updatedById: string
  updatedAt: Date
  version: number
  platformServices: PlatformServices
}

export interface FeatureUiData {
  total: number
  results: FeatureUi[]
}

export interface Role {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  organizationId?: any
  name: string
  accessType: string
  roleType: string
  updatedById: string
  updatedAt: Date
  version: number
}

export interface AssignedFeaturesUi {
  id: string
  featuresUiId: string
  roleId: string
  createdAt: Date
  createdById: string
  deletedDate?: any
  deletedById?: any
  featuresUi?: FeatureUi
  role: Role
}

export interface AssignedFeaturesUiData {
  total: number
  results: AssignedFeaturesUi[]
}
