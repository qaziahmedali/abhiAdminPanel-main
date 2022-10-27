import { Action } from 'easy-peasy'

export interface ILoading {
  isLoading: boolean | false
  setIsLoading: Action<this, boolean>
}
