import { AppConstants } from './../utils/appConstants'
import { axios as newAxios } from '../config/axios'
import axios, { AxiosError } from 'axios'
import { apiManager } from '@/utils/apiManager/ApiManager'
import { catchTry } from '@/utils/betterTry'
import {
	OrganizationGetAllOrganizationsRes,
	OrganizationGetFilterEmployeesRes,
	OrganizationGetFilterOrganizationRes,
} from "@/types/ApiResponse";
import {
	BankData,
	BusinessTypeData,
	OrganizationPayload,
	TariffData,
  IFetchTitleResponse,
  IFetchTitleRequestPayload,
  IEmployeeParams,
} from "@/types/store-types/IOrganization";
import { OrganizationByIDRes } from "@/types/organizations/organizationById";
import { updateUserStatus } from "@/types/organizations/Employees";
import { ExportEmployeeData } from "@/types/organizations/ExportEmployeeData";
import { EmployeeMontlyBreakUpData } from "@/types/organizations/EmployeeMonthlyBreakup";
import { OrganizationVendorData } from "@/types/organizations/Vendors";

class OrganizationService {
  getOrganization = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<OrganizationGetAllOrganizationsRes>({
        name: 'OrganizationGetAllOrganizations',
        queryParams: params
      })
    )

    if (res instanceof Error) {
      return false
    }

    return res.data
  }

  getOrganizationById = async (payload: any) => {
    const getOrganizationUrl = await catchTry(
      apiManager.fetch<OrganizationByIDRes>({
        name: 'OrganizationGetOrganization',
        pathVariables: {
          id: payload,
          initiator: 'admin_web'
        }
      })
    )

    if (getOrganizationUrl instanceof Error) {
      return false
    }
    return getOrganizationUrl.data
    // const getOrganizationUrl =
    // 	AppConstants.BASE_URL + AppConstants.GET_ORGANIZATION + payload;
    // return newAxios
    // 	.get(getOrganizationUrl)
    // 	.then((response: any) => {
    // 		return response.data;
    // 	})
    // 	.catch(() => {
    // 		return false;
    // 	});
  }

  async updateEmployeeSkipLoginAttemptFlag(employeeId: string, skipFailedAttemptCount: boolean) {
    try {
      await apiManager.fetch({
        name: 'OrganizationEditEmployees',
        data: {
          employees: [{ id: employeeId, skipFailedAttemptCount }]
        }
      })
      return true
    } catch (error) {
      return false
    }
  }

  updateOrganization = async (payload: any, organizationId: string) => {
    const updateOrganizationUrl = await catchTry(
      apiManager.fetch<OrganizationByIDRes>({
        name: 'OrganizationUpdateOrganizations',
        pathVariables: {
          id: organizationId
        },
        data: {
          tariffId: payload.tariffId,
          billPaymentTariffId: payload.billPaymentTariffId,
          active: payload.active
        }
      })
    )

    if (updateOrganizationUrl instanceof Error) {
      return false
    }
    return updateOrganizationUrl.data
  }

  // FIXME: It should be removed, all filters are applied on getOrganization method
  filterOrganization = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<OrganizationGetFilterOrganizationRes>({
        name: 'OrganizationGetAllOrganizations',
        queryParams: {
          page: params.page ? encodeURIComponent(params.page) : 1,
          limit: params.limit ? encodeURIComponent(params.limit) : 10,

          name: params.name ? encodeURIComponent(params.name) : '',
          industry: params.industry ? encodeURIComponent(params.industry) : '',
          businessNature: params.businessNature ? encodeURIComponent(params.businessNature) : '',
          // representative: params.representative
          //   ? encodeURIComponent(params.representative)
          //   : "",
          country: params.country ? encodeURIComponent(params.country) : '',
          city: params.city ? encodeURIComponent(params.city) : '',
          showInactive: params.status === 'active' ? false : true,
          from: params.startDate ? encodeURIComponent(params.startDate) : '',
          to: params.endDate ? encodeURIComponent(params.endDate) : ''
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    return res.data

    // const getOrganizationsUrl =
    // 	AppConstants.BASE_URL +
    // 	AppConstants.ORGANIZATIONS +
    // 	`?organization=${params.organization ? params.organization : ""}` +
    // 	`&industry=${params.industry ? params.industry : ""}` +
    // 	`&businessNature=${params.businessNature ? params.businessNature : ""}` +
    // 	`&representative=${params.representative ? params.representative : ""}` +
    // 	`&country=${params.country ? params.country : ""}` +
    // 	`&city=${params.city ? params.city : ""}` +
    // 	//   `&active=${params.active ? params.active : ""}` +
    // 	`&from=${params.startDate ? params.startDate : ""}` +
    // 	`&to=${params.endDate ? params.endDate : ""}`;

    // return newAxios
    // 	.get(getOrganizationsUrl)
    // 	.then((response: any) => {
    // 		console.log(response);
    // 		return response.data;
    // 	})
    // 	.catch(() => {
    // 		return false;
    // 	});
  }

  addOrganization = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<OrganizationPayload>({
        name: 'OrganizationsCreateOrganization',
        data: params
      })
    )

    if (res instanceof Error) {
      const axiosError = res as AxiosError

      return axiosError.response?.data
    }

    return res.data
  }

  exportEmployeeData = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<ExportEmployeeData>({
        name: 'OrganizationGetAllEmployees',
        queryParams: params
      })
    )
    if (res instanceof Error) {
      return res
    }

    return res.data
  }

  getEmployeeMonthlyBreakup = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<EmployeeMontlyBreakUpData>({
        name: 'EmployeeGetEmployeeMonthlyBreakup',
        pathVariables: {
          employeeId: params?.employeeId,
          initiator: params?.initiator
        }
      })
    )

    if (res instanceof Error) {
      return res
    }

    return res.data
  }

  getTariff = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<TariffData>({
        name: 'ManageGetAllTariffs',
        queryParams: {
          offset: params.offset,
          limit: params.limit
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    // console.log("DATA", res.data);
    return res.data
  }
  getBusinessType = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<BusinessTypeData>({
        name: 'ManageGetAllBusinessTypes',
        queryParams: {
          offset: params.offset,
          limit: params.limit
        }
      })
    )

    if (res instanceof Error) {
      return false
    }

    return res.data
  }

  getBank = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<BankData>({
        name: 'ManageGetAllBanks',
        queryParams: {
          offset: params.offset,
          limit: params.limit
        }
      })
    )

    if (res instanceof Error) {
      return false
    }

    return res.data
  }

  getEmployees = async (params: IEmployeeParams) => {
    const res = await catchTry(
      apiManager.fetch<OrganizationGetFilterEmployeesRes>({
        name: 'OrganizationGetAllEmployees',
        queryParams: params
      })
    )

    if (res instanceof Error) {
      return false
    }

    return res.data

    // const getEmployeesUrl =
    // 	AppConstants.BASE_URL +
    // 	AppConstants.ORGANIZATIONS_EMPLOYEES +
    // 	`?offset=${params.offset}&limit=${params.limit}`;

    // return newAxios
    // 	.get(getEmployeesUrl)
    // 	.then((response: any) => {
    // 		return response.data;
    // 	})
    // 	.catch(() => {
    // 		return false;
    // 	});
  }

  getSettlements = async (params: any) => {
    const url = await catchTry(
      apiManager.fetch({
        name: 'OrganizationGetAllSettlements',
        queryParams: {
          params
        }
      })
    )

    if (url instanceof Error) {
      return false
    }
    return url.data

    // const url = AppConstants.BASE_URL + AppConstants.ORGANIZATIONS_SETTLEMENTS;
    // return newAxios
    // 	.get(url, { params })
    // 	.then((response: any) => {
    // 		return response.data;
    // 	})
    // 	.catch(() => {
    // 		return false;
    // 	});
  }

  updateUserStatus = async (params: any) => {
    console.log('Payload', params)
    const res = await catchTry(
      apiManager.fetch<updateUserStatus>({
        name: 'UsersUpdateUserData',
        data: {
          enabled: params?.status
        },
        pathVariables: {
          userId: params.userId
        }
      })
    )

    if (res instanceof Error) {
      const axiosError = res as AxiosError
      return axiosError.response?.data
    }
    return res.data
  }

  getSettlementDetails = async (params: any) => {
    const url = await catchTry(
      apiManager.fetch({
        name: 'OrganizationGetAllMonthsSettlements',
        queryParams: {
          params
        }
      })
    )

    if (url instanceof Error) {
      return false
    }
    return url.data
    // const url =
    // 	AppConstants.BASE_URL + AppConstants.ORGANIZATIONS_SETTLEMENTS_DETAILS;
    // return newAxios
    // 	.get(url, { params })
    // 	.then((response: any) => {
    // 		return response.data;
    // 	})
    // 	.catch(() => {
    // 		return false;
    // 	});
  }

  applySettlementRequest = async (payload: any) => {
    const res = await catchTry(
      apiManager.fetch({
        name: 'OrganizationCreateSettlement',
        queryParams: {
          payload
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    return res.data

    // const url = AppConstants.BASE_URL + AppConstants.ORGANIZATIONS_SETTLEMENTS;
    // return newAxios
    // 	.post(url, payload)
    // 	.then((response: any) => {
    // 		return response.data;
    // 	})
    // 	.catch(() => {
    // 		return false;
    // 	});
  }

  filterEmployees = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<OrganizationGetFilterEmployeesRes>({
        name: 'OrganizationGetAllEmployees',
        queryParams: {
          offset: params.offset ? params.offset : '',
          limit: params.limit ? params.limit : '',
          initiator: 'admin_web',
          name: params.name ? params.name : '',
          organizationId: params.organizationId ? params.organizationId : '',
          // gender: params.gender ? params.gender : "",
          email: params.email ? params.email : '',
          phone: params.phone ? params.phone : ''
        }
      })
    )

    if (res instanceof Error) {
      return res
    }
    return res.data
  }

  fetchTitle = async (payload: IFetchTitleRequestPayload) => {
    const fetchTitleUrl = await catchTry(
      apiManager.fetch<IFetchTitleResponse>({
        name: "FetchTitle",
        data: payload,
      })
    )

    if (fetchTitleUrl instanceof Error) {
      return false
    }
    return fetchTitleUrl.data
  }

  getOrganizationVendors = async (params: any) => {
    const getAllVendors = await catchTry(
      apiManager.fetch<OrganizationVendorData>({
        name: 'GetAllVendorForAdmin',
        queryParams: {
          page: params.offset,
          limit: params.limit
        }
      })
    )

    if (getAllVendors instanceof Error) {
      return false
    }
    return getAllVendors.data
  }

  filterOrganizationVendors = async (params: any) => {
    const filterVendors = await catchTry(
      apiManager.fetch<OrganizationVendorData>({
        name: 'GetAllVendorForAdmin',
        queryParams: {
          page: params?.offset,
          limit: params?.limit,
          organizationName: params?.organizationName,
          vendorId: params?.vendorId,
          vendorName: params?.vendorName,
          ntn: params?.ntn,
          bankName: params?.bankName,
          accountNumber: params?.accountNumber,
          email: params?.email,
          phone: params?.phone
        }
      })
    )

    if (filterVendors instanceof Error) {
      return filterVendors
    }
    return filterVendors.data
  }

  employeesOnboarding = async (payload: any) => {
    const employeesOnboardingUrl = await catchTry(
      apiManager.fetch({
        name: 'OrganizationEmployeesOnBoarding',
        data: payload
      })
    )

    if (employeesOnboardingUrl instanceof Error) {
      return false
    }
    return employeesOnboardingUrl.data
  }

  getSignedUrl = (payload: any) => {
    const getSignedUrl =
      AppConstants.BASE_URL +
      `pre-signed-url-upload?fileName=${payload.fileName}&fileType=${payload.type}&organizationId=${payload.organizationId}`

    return newAxios
      .get(getSignedUrl)
      .then((response: any) => {
        return response.data
      })
      .catch(() => {
        return false
      })
  }

  uploadFileToS3 = (payload: any) => {
    let formData = new FormData()
    formData = payload.fileEvent[0]
    const uploadUrl = payload.signedUrl
    // formData['Content-Type']= payload.fileEvent[0].type;
    return axios
      .put(uploadUrl, payload.fileEvent[0], {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response: any) => {
        return response.data
      })
      .catch(() => {
        return false
      })
  }
  getSignedUrlForDownload = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch({
        name: 'GetDownloadPreSignedUrl',
        queryParams: {
          params
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    return res.data
  }
}
export const organizationService = new OrganizationService()
