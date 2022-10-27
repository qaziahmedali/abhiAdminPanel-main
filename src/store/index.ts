import { createStore, persist } from 'easy-peasy'

import { IStoreModel } from '@/types/store-types'
import user from './user.store'
import manage from './manage.store'
import { monitor } from './monitor.store'
import { dashboard } from './dashboard.store'
import { organization } from './organization.store'
import { test } from './test.store'

import loading from './loading.store'

export const store = createStore<IStoreModel>(
  {
    user: persist(user),
    manage: persist(manage),
    monitor: persist(monitor),
    dashboard: persist(dashboard),
    organization: persist(organization),
    test: persist(test),
    loading: loading
  },
  {
    version: 1
  }
)
// resetStore: thunk(async () => {
//   await store.persist.clear();
// }),

export const resetStore = async () => {
  store.persist.flush()
  await store.persist.clear()
}
