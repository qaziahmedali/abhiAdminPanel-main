import { TestResults } from './../Test/Test'

import { Action, Thunk } from 'easy-peasy'

interface TestState {
  TestUser: TestResults[]
}

interface TestActions {
  setTestsUsers: Action<this, TestResults[]>
}

interface TestThunk {
  getTestsUsers: Thunk<this>
}

export interface ITest extends TestState, TestActions, TestThunk {}
