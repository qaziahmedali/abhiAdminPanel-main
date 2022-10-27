import { action, thunk } from 'easy-peasy'
import { ITest } from '@/types/store-types'
export const test: ITest = {
  TestUser: new Array(),
  setTestsUsers: action((state, payload) => {
    state.TestUser = payload
  }),
  getTestsUsers: thunk(async (actions) => {
    const data = await fetch('https://jsonplaceholder.typicode.com/users')
    const res = await data.json()
    if (res) {
      return actions.setTestsUsers(res)
    }
    return false
  })
}
