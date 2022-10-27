import { Action, Thunk } from 'easy-peasy'
import { GuestResult } from '../referrals/Guest'
import { ReferralsResult } from '../referrals/Referrals'

interface DashboardState {
  referrals: ReferralsResult[]
  guests: GuestResult[]
}

interface DashboardActions {
  setReferral: Action<this, ReferralsResult[]>
  setGuest: Action<this, GuestResult[]>
}

interface DashboardThunk {
  getReferrals: Thunk<this, { offset?: number; limit?: number }>
  filterReferrals: Thunk<this, { offset?: number; limit?: number; startDate?: Date; endDate?: Date }>
  getGuests: Thunk<this, { offset?: number; limit?: number }>
  filterGuests: Thunk<
    this,
    {
      offset?: number
      limit?: number
      name?: string
      email?: string
      phone?: string
      company?: string
    }
  >
  exportRefferalData: Thunk<
    this,
    {
      output?: string
      offset?: number
      limit?: number
      startDate?: Date
      endDate?: Date
      email?: string
    }
  >
  exportGuestData: Thunk<
    this,
    {
      output: string
      offset?: number
      limit?: number
      name?: string
      email?: string
      phone?: string
      company?: string
      recipient?: string
    }
  >
}

export interface IDashboard extends DashboardState, DashboardActions, DashboardThunk {}

export interface Referral {
  id: string
}
