export interface FeaturesUi {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  platformServicesId: string
  internalName: string
  updatedById: string
  updatedAt: Date
  version: number
}

export interface PlatformService {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  name: string
  description: string
  updatedById: string
  updatedAt: Date
  version: number
  featuresUi: FeaturesUi[]
}

export interface PlatformServiceData {
  total: number
  results: PlatformService[]
}

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

export interface UsersPlatformServices {
  id: string
  userId: string
  platformServicesId: string
  createdAt: Date
  createdById: string
  deletedDate?: any
  deletedById?: any
  platformServices: PlatformServices
}

export interface UsersPlatformServicesData {
  total: number
  results: UsersPlatformServices[]
}
