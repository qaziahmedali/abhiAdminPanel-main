export interface BackendFeatureGroup {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  groupName: string
  internalName: string
  endPoint: string
  httpMethod: string
  updatedById: string
  updatedAt: Date
  version: number
}

export interface BackendFeatureGroupData {
  total: number
  results: BackendFeatureGroup[]
}

export interface FeaturesBackend {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  groupName: string
  internalName: string
  endPoint: string
  httpMethod: string
  updatedById: string
  updatedAt: Date
  version: number
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

export interface AssignedBackendFeature {
  id: string
  featuresBackendId: string
  roleId: string
  createdAt: Date
  createdById: string
  deletedDate?: any
  deletedById?: any
  featuresBackend: FeaturesBackend
  role: Role
}

export interface AssignedBackendFeatureData {
  total: number
  results: AssignedBackendFeature[]
}
