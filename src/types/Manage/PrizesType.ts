export interface IPrizesPayload {
  page?: number
  limit?: number
}
export interface Image {
  name: string
  mediaType: string
  description: string
  urlPath: string
}

export interface RunsProbability {
  run: number
  reward: any
  probabilityPercentage: number
}

export interface IPrizesPostPayload {
  image: Image
  name: string
  description: string
  coins: number
  runsProbability: RunsProbability[]
}

export interface IPrizesCreatePayload {
  data: IPrizesPostPayload
  message: string
  status: string
}

export interface RunsProbability {
  run: number
  reward: any
  probabilityPercentage: number
}

export interface Image {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  name: string
  description: string
  urlPath: string
  mediaType: string
  updatedById: string
  updatedAt: Date
  version: number
}

export interface PrizesResult {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  imageId: string
  gameId: string
  name: string
  description: string
  coins: string
  runsProbability: RunsProbability[]
  updatedById: string
  updatedAt: Date
  version: number
  image: Image
}

export interface PrizesData {
  total: number
  results: PrizesResult[]
}
