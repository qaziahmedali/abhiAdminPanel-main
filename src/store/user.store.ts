import { IUser } from '@/types/store-types'
import { action, thunk } from 'easy-peasy'
import { AppConstants } from '../utils/appConstants'

import { userService } from '../services/userService'
import { apiManager } from '@/utils/apiManager/ApiManager'
import { catchTry } from '@/utils/betterTry'
import { AxiosError } from 'axios'

const user: IUser = {
  userToken: undefined,
  name: undefined,
  loggedIn: false,
  users: new Array(),
  roles: new Array(),
  usersRoles: new Array(),
  platformService: new Array(),
  usersPlatformService: new Array(),
  backendFeaturesGroup: new Array(),
  rolesBackendFeaturesGroup: new Array(),
  featuresUi: new Array(),
  rolesToFeaturesUi: new Array(),

  setUserToken: action((state, payload) => {
    state.userToken = payload
  }),

  setUserName: action((state, payload) => {
    state.name = payload
  }),

  setLoginStatus: action((state, payload) => {
    state.loggedIn = payload
  }),

  setUsers: action((state, payload) => {
    state.users = payload
  }),
  setRoles: action((state, payload) => {
    state.roles = payload
  }),
  setUsersRoles: action((state, payload) => {
    state.usersRoles = payload
  }),
  setPlatformService: action((state, payload) => {
    state.platformService = payload
  }),
  setUsersPlatformService: action((state, payload) => {
    state.usersPlatformService = payload
  }),
  setBackendFeatureGroup: action((state, payload) => {
    state.backendFeaturesGroup = payload
  }),
  setRolesBackendFeatureGroup: action((state, payload) => {
    state.rolesBackendFeaturesGroup = payload
  }),
  setFeatureUi: action((state, payload) => {
    state.featuresUi = payload
  }),
  setRolesToFeatureUi: action((state, payload) => {
    state.rolesToFeaturesUi = payload
  }),

  login: thunk(async (actions, payload) => {
    const res = await catchTry(apiManager.login(payload.email, payload.password))
    if (res instanceof Error) {
      const axiosError = res as AxiosError

      return axiosError
    }

    actions.setUserName('user')
    actions.setLoginStatus(true)
    return res
  }),

  getUsers: thunk(async (actions, payload) => {
    const response = await userService.getUsers(payload)

    if (response === false) {
      return
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setUsers(response.data.results)
      return response.data
    }
  }),

  filterUsers: thunk(async (actions, params) => {
    const response = await userService.filterUsers(params)
    if (response === false) {
      return
    }
    if (response.status === AppConstants.SUCCESS) {
      actions.setUsers(response.data.results)
      return response.data
    }
  }),
  updateUserRole: thunk(async (actions, payload) => {
    let updateUserRole = {
      roleId: payload.roleId
    }
    const response = await userService.updateUserRole(updateUserRole, payload.userId)
    if (response.status === AppConstants.SUCCESS) {
      actions.setUsersRoles(response.data.results)
    }
  }),

  getAllRoles: thunk(async (actions, payload) => {
    const response = await userService.getAllRoles(payload)

    if (response === false) {
      return
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setRoles(response.data.results)
      return response
    }
  }),
  createRoles: thunk(async (actions, payload) => {
    const response = await userService.createRoles(payload)

    if (response === false) {
      return
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setRoles(response.data)
      return response
    }
  }),

  updateRoles: thunk(async (actions, payload) => {
    const response = await userService.updateRoles(payload)

    if (response === false) {
      return
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setRoles(response.data)
      return response
    }
  }),

  deleteRoles: thunk(async (actions, payload) => {
    const response = await userService.deleteRoles(payload)

    if (response === false) {
      return
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setRoles(response.data)
      return response
    }
  }),

  getAllUsersRoles: thunk(async (actions, payload) => {
    const response = await userService.getAllUsersRoles(payload)

    if (response === false) {
      return
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setUsersRoles(response.data?.results)
      return response
    }
  }),

  assignUsersRoles: thunk(async (actions, payload) => {
    const response = await userService.assignUsersRoles(payload)

    if (response instanceof Error) {
      const axiosError = response as AxiosError

      return axiosError.response?.data
    }
    if (response?.status === AppConstants.SUCCESS) {
      return response?.data
    }
  }),

  deleteUsersRoles: thunk(async (actions, payload) => {
    const response = await userService.deleteUsersRoles(payload)

    if (response instanceof Error) {
      const axiosError = response as AxiosError

      return axiosError.response?.data
    }
    if (response?.status === AppConstants.SUCCESS) {
      return response?.data
    }
  }),

  getPlatformServices: thunk(async (actions, params) => {
    const response = await userService.getPlatformServices(params)
    if (response instanceof Error) {
      const axiosResponse = response as AxiosError

      return axiosResponse.response?.data
    } else {
      actions.setPlatformService(response.data.results)
      return response
    }
  }),
  getUserPlatformServices: thunk(async (actions, params) => {
    const response = await userService.getUserPlatformServices(params)
    if (response instanceof Error) {
      const axiosResponse = response as AxiosError

      return axiosResponse.response?.data
    } else {
      actions.setUsersPlatformService(response.data?.results)
      return response
    }
  }),
  PostUserPlatformServices: thunk(async (actions, params) => {
    const response = await userService.PostUserPlatformServices(params)
    if (response instanceof Error) {
      const axiosResponse = response as AxiosError

      return axiosResponse.response?.data
    } else {
      return response
    }
  }),
  DeletePlatformServices: thunk(async (actions, params) => {
    const response = await userService.DeletePlatformServices(params)
    if (response instanceof Error) {
      const axiosResponse = response as AxiosError

      return axiosResponse.response?.data
    } else {
      return response
    }
  }),
  getAllBackendFeatureGroup: thunk(async (actions, params) => {
    const response = await userService.getAllBackendFeatureGroup(params)
    if (response == false) {
      return
    } else {
      actions.setBackendFeatureGroup(response?.data.results)
      return response
    }
  }),
  createBackendFeatureGroup: thunk(async (actions, params) => {
    const response = await userService.createBackendFeatureGroup(params)
    if (response instanceof Error) {
      const axiosResponse = response as AxiosError

      return axiosResponse.response?.data
    } else {
      return response
    }
  }),
  updateBackendFeatureGroup: thunk(async (actions, params) => {
    const response = await userService.updateBackendFeatureGroup(params)
    if (response instanceof Error) {
      const axiosResponse = response as AxiosError

      return axiosResponse.response?.data
    } else {
      return response
    }
  }),
  deleteBackendFeatureGroup: thunk(async (actions, params) => {
    const response = await userService.deleteBackendFeatureGroup(params)
    if (response instanceof Error) {
      const axiosResponse = response as AxiosError

      return axiosResponse.response?.data
    } else {
      return response
    }
  }),

  getAllAssignedBackendFeatureGroup: thunk(async (actions, payload) => {
    const response = await userService.getAllAssignedBackendFeatureGroup(payload)

    if (response === false) {
      return
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setRolesBackendFeatureGroup(response.data?.results)
      return response
    }
  }),

  postAssignedBackendFeature: thunk(async (actions, payload) => {
    const response = await userService.postAssignedBackendFeature(payload)

    if (response instanceof Error) {
      const axiosError = response as AxiosError

      return axiosError.response?.data
    }
    if (response?.status === AppConstants.SUCCESS) {
      return response?.data
    }
  }),

  deleteAssignedBackendFeature: thunk(async (actions, payload) => {
    const response = await userService.deleteAssignedBackendFeature(payload)

    if (response instanceof Error) {
      const axiosError = response as AxiosError

      return axiosError.response?.data
    }
    if (response?.status === AppConstants.SUCCESS) {
      return response?.data
    }
  }),
  getAllFeatureUi: thunk(async (actions, params) => {
    const response = await userService.getAllFeatureUi(params)
    if (response == false) {
      return
    } else {
      actions.setFeatureUi(response?.data?.results)
      return response
    }
  }),
  createFeatureUi: thunk(async (actions, params) => {
    const response = await userService.createFeatureUi(params)
    if (response instanceof Error) {
      const axiosResponse = response as AxiosError

      return axiosResponse.response?.data
    } else {
      return response
    }
  }),
  updateFeatureUi: thunk(async (actions, params) => {
    const response = await userService.updateFeatureUi(params)
    if (response instanceof Error) {
      const axiosResponse = response as AxiosError

      return axiosResponse.response?.data
    } else {
      return response
    }
  }),
  deleteFeatureUi: thunk(async (actions, params) => {
    const response = await userService.deleteFeatureUi(params)
    if (response instanceof Error) {
      const axiosResponse = response as AxiosError

      return axiosResponse.response?.data
    } else {
      return response
    }
  }),

  getAllRolesToFeatureUi: thunk(async (actions, payload) => {
    const response = await userService.getAllRolesToFeatureUi(payload)

    if (response === false) {
      return
    }
    if (response?.status === AppConstants.SUCCESS) {
      actions.setRolesToFeatureUi(response.data?.results)
      return response
    }
  }),

  postAssignRoleToFeatureUi: thunk(async (actions, payload) => {
    const response = await userService.postAssignRoleToFeatureUi(payload)

    if (response instanceof Error) {
      const axiosError = response as AxiosError

      return axiosError.response?.data
    }
    if (response?.status === AppConstants.SUCCESS) {
      return response?.data
    }
  }),

  deleteRoleToFeatureUi: thunk(async (actions, payload) => {
    const response = await userService.deleteRoleToFeatureUi(payload)

    if (response instanceof Error) {
      const axiosError = response as AxiosError

      return axiosError.response?.data
    }
    if (response?.status === AppConstants.SUCCESS) {
      return response?.data
    }
  })
}

export default user
function betterTry(): any {
  throw new Error('Function not implemented.')
}
