import { AppConstants } from './../utils/appConstants'
import { axios } from '../config/axios'
import { UsersRes } from '@/types/ApiResponse'
import { apiManager } from '@/utils/apiManager/ApiManager'
import { catchTry } from '@/utils/betterTry'
import { PlatformServiceData, UsersPlatformServicesData } from '@/types/users/Modules'
import { AssignRolesData, DeleteRoleData, RoleResults, RolesData } from '@/types/users/Roles'

import {
  AssignedBackendFeatureData,
  BackendFeatureGroup,
  BackendFeatureGroupData
} from '@/types/users/BackendFeatureGroup'
import { AssignedFeaturesUiData, FeatureUi, FeatureUiData } from '@/types/users/FeatureUi'

class UserService {
  getUsers = async (params: { page: number; limit: number }) => {
    const res = await catchTry(
      apiManager.fetch<UsersRes>({
        name: 'OrganizationGetAllEmployees',
        queryParams: params
      })
    )
    if (res instanceof Error) {
      return false
    }

    return res.data
  }

  updateUserRole = async (updateUserRole: any, userId: string) => {
    const updateUserRoleUrl = AppConstants.BASE_URL + AppConstants.UPDATE_USERS + userId
    return axios
      .put(updateUserRoleUrl, updateUserRole)
      .then((response: any) => {
        return response.data
      })
      .catch(() => {
        return false
      })
  }

  filterUsers = async (params: any) => {
    const getUsersUrl = await catchTry(
      apiManager.fetch<UsersRes>({
        name: 'OrganizationGetAllEmployees',
        queryParams: params
      })
    )

    if (getUsersUrl instanceof Error) {
      return false
    }
    return getUsersUrl.data
  }

  getAllRoles = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<RolesData>({
        name: 'AuthGetAllRole',
        queryParams: {
          page: params.offset,
          limit: params.limit
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    return res.data
  }

  createRoles = async (payload: any) => {
    const res = await catchTry(
      apiManager.fetch<RoleResults[]>({
        name: 'AuthPostCreateRole',
        data: payload
      })
    )

    if (res instanceof Error) {
      return false
    }
    return res.data
  }

  updateRoles = async (payload: any) => {
    const res = await catchTry(
      apiManager.fetch<RoleResults[]>({
        name: 'AuthPatchUpdateRole',
        data: {
          name: payload.name,
          roleType: payload?.roleType
        },
        pathVariables: {
          roleId: payload?.rowId
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    return res.data
  }

  deleteRoles = async (payload: any) => {
    const res = await catchTry(
      apiManager.fetch<RoleResults[]>({
        name: 'AuthDeleteRole',

        pathVariables: {
          id: payload?.rowId
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    return res.data
  }
  getAllUsersRoles = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<AssignRolesData>({
        name: 'AuthGetAllRolesOfUser',
        queryParams: {
          page: params?.offset,
          limit: params?.limit
        },
        pathVariables: {
          getUserId: params?.userId
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    return res.data
  }
  assignUsersRoles = async (payload: any) => {
    const res = await catchTry(
      apiManager.fetch<DeleteRoleData>({
        name: 'AuthPostAssignRole',
        data: payload
      })
    )

    if (res instanceof Error) {
      return res
    }
    return res.data
  }

  deleteUsersRoles = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<DeleteRoleData>({
        name: 'AuthDeleteRoleOfUser',
        pathVariables: {
          roleId: params?.roleId,
          userId: params?.userId
        }
      })
    )

    if (res instanceof Error) {
      return res
    }
    return res.data
  }

  getPlatformServices = async (params: any) => {
    const getModulesUrl = await catchTry(
      apiManager.fetch<PlatformServiceData>({
        name: 'ManageGetAllPlatformServices',
        queryParams: {
          page: params.offset,
          limit: params.limit
        }
      })
    )
    if (getModulesUrl instanceof Error) {
      return getModulesUrl
    }
    return getModulesUrl.data
  }
  getUserPlatformServices = async (params: { offset: number; limit: number; userId: string }) => {
    const res = await catchTry(
      apiManager.fetch<UsersPlatformServicesData>({
        name: 'AuthGetAllPlatformServiceOfUser',
        queryParams: {
          page: params.offset,
          limit: params.limit
        },
        pathVariables: {
          getUserId: params.userId
        }
      })
    )
    if (res instanceof Error) {
      return res
    }
    return res.data
  }
  PostUserPlatformServices = async (payload: { platformServicesId: string; userId: string }) => {
    const res = await catchTry(
      apiManager.fetch({
        name: 'AuthPostAssignPlatformServiceToUser',
        data: payload
      })
    )
    if (res instanceof Error) {
      return res
    }
    return res.data
  }
  DeletePlatformServices = async (params: { platformServicesId: string; userId: string }) => {
    const res = await catchTry(
      apiManager.fetch({
        name: 'AuthDeletePlatformServiceOfUser',
        pathVariables: {
          platformServicesId: params.platformServicesId,
          userId: params.userId
        }
      })
    )
    if (res instanceof Error) {
      return res
    }
    return res.data
  }

  getAllBackendFeatureGroup = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<BackendFeatureGroupData>({
        name: 'AuthGetAllFeatureBackend',
        queryParams: {
          page: params?.offset,
          limit: params?.limit
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    return res.data
  }

  createBackendFeatureGroup = async (payload: any) => {
    const res = await catchTry(
      apiManager.fetch<BackendFeatureGroup>({
        name: 'AuthPostCreateFeatureBackend',
        data: payload
      })
    )

    if (res instanceof Error) {
      return res
    }
    return res.data
  }
  updateBackendFeatureGroup = async (payload: any) => {
    const res = await catchTry(
      apiManager.fetch<BackendFeatureGroup>({
        name: 'AuthPatchUpdateFeatureBackend',
        data: payload.body,
        pathVariables: {
          featureBackendId: payload.id
        }
      })
    )

    if (res instanceof Error) {
      return res
    }
    return res.data
  }

  deleteBackendFeatureGroup = async (params: { id: string }) => {
    const res = await catchTry(
      apiManager.fetch<BackendFeatureGroup>({
        name: 'AuthDeleteFeatureBackend',
        pathVariables: {
          featureBackendId: params?.id
        }
      })
    )
    if (res instanceof Error) {
      return res
    }
    return res.data
  }

  getAllAssignedBackendFeatureGroup = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<AssignedBackendFeatureData>({
        name: 'AuthGetAllRolesToFeatureBackend',
        queryParams: {
          page: params.offset,
          limit: params.limit
        },
        pathVariables: {
          getRoleToBackendId: params?.roleId
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    return res.data
  }

  postAssignedBackendFeature = async (payload: any) => {
    const res = await catchTry(
      apiManager.fetch({
        name: 'AuthPostAssignRoleToFeatureBackend',
        data: payload
      })
    )
    if (res instanceof Error) {
      return res
    }
    return res.data
  }

  deleteAssignedBackendFeature = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch({
        name: 'AuthDeleteRoleToFeatureBackend',
        pathVariables: {
          featuresBackendId: params?.featuresBackendId?.featuresBackendId,
          roleId: params?.roleId
        }
      })
    )
    if (res instanceof Error) {
      return res
    }
    return res.data
  }
  getAllFeatureUi = async (params: { offset: number; limit: number }) => {
    const res = await catchTry(
      apiManager.fetch<FeatureUiData>({
        name: 'AuthGetAllFeatureUi',
        queryParams: {
          offset: params?.offset,
          limit: params?.limit
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    return res.data
  }

  createFeatureUi = async (payload: any) => {
    const res = await catchTry(
      apiManager.fetch<FeatureUi>({
        name: 'AuthPostCreateFeatureUi',
        data: payload
      })
    )

    if (res instanceof Error) {
      return res
    }
    return res.data
  }
  updateFeatureUi = async (payload: any) => {
    const res = await catchTry(
      apiManager.fetch<FeatureUi>({
        name: 'AuthPatchUpdateFeatureUi',
        data: payload.body,
        pathVariables: {
          featureUiId: payload.id
        }
      })
    )

    if (res instanceof Error) {
      return res
    }
    return res.data
  }

  deleteFeatureUi = async (params: { id: string }) => {
    const res = await catchTry(
      apiManager.fetch<FeatureUi>({
        name: 'AuthDeleteFeatureUi',
        pathVariables: {
          featureUiId: params?.id
        }
      })
    )
    if (res instanceof Error) {
      return res
    }
    return res.data
  }

  getAllRolesToFeatureUi = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<AssignedFeaturesUiData>({
        name: 'AuthGetAllRolesToFeatureUi',
        queryParams: {
          offset: params.offset,
          limit: params.limit
        },
        pathVariables: {
          getRoleToFeatureUiId: params?.roleId
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    return res.data
  }

  postAssignRoleToFeatureUi = async (payload: any) => {
    const res = await catchTry(
      apiManager.fetch({
        name: 'AuthPostAssignRoleToFeatureUi',
        data: payload
      })
    )
    if (res instanceof Error) {
      return res
    }
    return res.data
  }

  deleteRoleToFeatureUi = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch({
        name: 'AuthDeleteRoleToFeatureUi',
        pathVariables: {
          featuresUiId: params?.featuresUiId,
          roleId: params?.roleId
        }
      })
    )
    if (res instanceof Error) {
      return res
    }
    return res.data
  }
}

export const userService = new UserService()
