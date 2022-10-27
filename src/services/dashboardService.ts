import { catchTry } from '@/utils/betterTry'
import { apiManager } from '@/utils/apiManager/ApiManager'
import { ReferralGetReferralRes } from '@/types/ApiResponse'
import { exportRefferalData } from '@/types/referrals/exportRefferalData'
import { ExportGuestData } from '@/types/referrals/exportGuestData'
import { GuestData } from '@/types/referrals/Guest'
import moment from 'moment'
class DashboardService {
  getReferrals = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<ReferralGetReferralRes>({
        name: 'ReferralsGetReferral',
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
  filterReferrals = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<ReferralGetReferralRes>({
        name: 'ReferralsGetReferral',
        queryParams: {
          offset: params.offset,
          limit: params.limit,
          from: params.startDate,
          to: params.endDate
        }
      })
    )

    if (res instanceof Error) {
      return false
    }
    return res.data
  }

  exportRefferalData = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<exportRefferalData>({
        name: 'ReferralsGetReferral',
        queryParams: {
          output: params.output,
          from: params?.startDate
            ? moment(params?.startDate).format('YYYY-MM-DD')
            : moment(new Date('01/01/2021')).format('YYYY-MM-DD'),
          to: params?.endDate ? moment(params?.endDate).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD'),
          offset: params.offset ? params.offset : 1,
          limit: params.limit ? params.limit : 10,
          recipient: params.email
        }
      })
    )

    if (res instanceof Error) {
      return res
    }

    return res.data
  }
  exportGuestData = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<ExportGuestData>({
        name: 'GetGuestUserDetails',
        queryParams: {
          output: params.output,
          name: params.name ? params.name : '',
          company: params.company ? params.company : '',
          email: params.email ? params.email : '',
          phone: params.phone ? params.phone : '',
          from: params?.startDate
            ? moment(params?.startDate).format('YYYY-MM-DD')
            : moment(new Date('01/01/2021')).format('YYYY-MM-DD'),
          to: params?.endDate ? moment(params?.endDate).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD'),
          offset: params.offset ? params.offset : 1,
          limit: params.limit ? params.limit : 10,
          recipient: params.recipient
        }
      })
    )

    if (res instanceof Error) {
      return res
    }

    return res.data
  }

  GetGuestUserDetails = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<GuestData>({
        name: 'GetGuestUserDetails',
        queryParams: {
          offset: params.offset,
          limit: params.limit
        }
      })
    )

    if (res instanceof Error) {
      return res
    }

    return res.data
  }
  filterGuestUserDetails = async (params: any) => {
    const res = await catchTry(
      apiManager.fetch<GuestData>({
        name: 'GetGuestUserDetails',
        queryParams: {
          offset: params.offset,
          limit: params.limit,
          name: params.name,
          company: params.company,
          email: params.email,
          phone: params.phone,
          from: params?.startDate ? moment(params?.startDate).format('YYYY-MM-DD') : '',
          to: params?.endDate ? moment(params?.endDate).format('YYYY-MM-DD') : ''
        }
      })
    )

    if (res instanceof Error) {
      return res
    }

    return res.data
  }
}
export const dashboardService = new DashboardService()
