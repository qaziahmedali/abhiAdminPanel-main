import axios from 'axios'
import { TokenService } from '@/utils/token'
import { useHistory } from 'react-router-dom'

// import store from '../store';

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
}

let instance = axios.create(defaultOptions)

instance.interceptors.request.use((config) => {
  const token = TokenService.getToken()
  if (config.headers == null) {
    return config
  }
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    // Do something with response error
    const history = useHistory()
    if (error.response.status === 401) {
      console.log('unauthorized, logging out ...')
      history.push('/')
      //   await store.dispatch('Logout');
    }

    const isTokenExpired = TokenService.isTokenExpired()

    if (isTokenExpired) {
      history.push('/')
    }

    return Promise.reject(error.response)
  }
)

export { instance as axios }
