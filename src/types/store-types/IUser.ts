import { Action, Thunk } from 'easy-peasy'
import { AssignedBackendFeature, BackendFeatureGroup } from '../users/BackendFeatureGroup'
import { AssignedFeaturesUi, FeatureUi } from '../users/FeatureUi'
import { PlatformService, UsersPlatformServices } from '../users/Modules'
import { AssignRoles, RoleResults } from '../users/Roles'
import { UserResults } from '../users/Users'

interface UserState {
  name: string | any
  userToken?: string
  loggedIn: boolean
  users: UserResults[]
  roles: RoleResults[]
  usersRoles: AssignRoles[]
  platformService: PlatformService[]
  usersPlatformService: UsersPlatformServices[]
  backendFeaturesGroup: BackendFeatureGroup[]
  rolesBackendFeaturesGroup: AssignedBackendFeature[]
  featuresUi: FeatureUi[]
  rolesToFeaturesUi: AssignedFeaturesUi[]
}

interface UserActions {
  setUserToken: Action<this, string>
  setUserName: Action<this, string>
  setLoginStatus: Action<this, boolean>
  setUsers: Action<this, UserResults[]>

  setRoles: Action<this, RoleResults[]>
  setUsersRoles: Action<this, AssignRoles[]>
  setPlatformService: Action<this, PlatformService[]>
  setUsersPlatformService: Action<this, UsersPlatformServices[]>
  setBackendFeatureGroup: Action<this, BackendFeatureGroup[]>
  setRolesBackendFeatureGroup: Action<this, AssignedBackendFeature[]>
  setFeatureUi: Action<this, FeatureUi[]>
  setRolesToFeatureUi: Action<this, AssignedFeaturesUi[]>
}

interface UserThunk {
  login: Thunk<this, ILoginPayload>
  getUsers: Thunk<this, IQueryParams>
  filterUsers: Thunk<this>
  updateUserRole: Thunk<this, UpdateUserPayload>
  getAllRoles: Thunk<this>
  createRoles: Thunk<this>
  updateRoles: Thunk<
    this,
    {
      name: string
      roleType: string
      rowId: string
    }
  >
  deleteRoles: Thunk<
    this,
    {
      rowId: string
    }
  >
  getAllUsersRoles: Thunk<this>
  assignUsersRoles: Thunk<this, { userId: string; roleId: string }>
  deleteUsersRoles: Thunk<this, { userId: string; roleId: string }>
  getPlatformServices: Thunk<this, { offset?: number; limit?: number }>
  getUserPlatformServices: Thunk<
    this,
    {
      offset: number
      limit: number
      userId: string
    }
  >
  PostUserPlatformServices: Thunk<
    this,
    {
      platformServicesId: string
      userId: string
    }
  >
  DeletePlatformServices: Thunk<
    this,
    {
      platformServicesId: string
      userId: string
    }
  >

  getAllBackendFeatureGroup: Thunk<this, { offset?: number; limit?: number }>
  createBackendFeatureGroup: Thunk<this>
  updateBackendFeatureGroup: Thunk<this>
  deleteBackendFeatureGroup: Thunk<this, { id: string }>
  getAllAssignedBackendFeatureGroup: Thunk<this, { offset?: number; limit?: number; roleId: string }>
  postAssignedBackendFeature: Thunk<this, { roleId: string; featuresBackendId: string }>
  deleteAssignedBackendFeature: Thunk<this, { roleId: string; featuresBackendId: string }>
  getAllFeatureUi: Thunk<this, { offset: number; limit: number }>
  createFeatureUi: Thunk<this>
  updateFeatureUi: Thunk<this>
  deleteFeatureUi: Thunk<this, { id: string }>
  getAllRolesToFeatureUi: Thunk<this, { offset?: number; limit?: number; roleId: string }>
  postAssignRoleToFeatureUi: Thunk<this, { roleId: string; featuresUiId: string }>
  deleteRoleToFeatureUi: Thunk<this, { roleId: string; featuresUiId: string }>
}

export interface IUser extends UserState, UserActions, UserThunk {}

export interface ILoginPayload {
  email: string
  password: string
}

export interface IQueryParams {
  page: number
  limit: number
}

export interface Users {
  id: String
  enabled: boolean
  version: number
}

export interface UpdateUserPayload {
  userId: string
  roleId: string
}
