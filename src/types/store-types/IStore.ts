import { IUser } from '.'
import { ILoading } from '.'
import { IManage } from '.'
import { IMonitor } from '.'
import { IDashboard } from '.'
import { IOrganization } from '.'
import { ITest } from '.'

import { Thunk } from 'easy-peasy'

export interface IStoreModel {
  user: IUser
  loading: ILoading
  manage: IManage
  monitor: IMonitor
  dashboard: IDashboard
  organization: IOrganization
  test: ITest
  // resetStore: Thunk<this>;
}
