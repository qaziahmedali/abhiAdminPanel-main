import { ILoading } from '@/types/store-types'
import { action } from 'easy-peasy'

const loading: ILoading = {
  isLoading: false,

  setIsLoading: action((state, payload) => {
    state.isLoading = payload
  })
}

export default loading
