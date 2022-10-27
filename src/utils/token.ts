import { AppConstants } from './appConstants'

const TokenService = {
  getToken() {
    return localStorage.getItem(AppConstants.TOKEN_ID)
  },

  setToken(accessToken: string) {
    localStorage.setItem(AppConstants.TOKEN_ID, accessToken)
  },

  clearStorage() {
    localStorage.removeItem(AppConstants.TOKEN_ID)
    console.log('token cleared')
  },

  isTokenExpired() {
    const expirationTime = localStorage.getItem('expirationTime')
    const adjExpTime = Number(expirationTime)
    if (expirationTime != null) {
      const currentTime = new Date().getTime()
      const remainingTime = adjExpTime - currentTime
      if (remainingTime < 0) {
        TokenService.clearStorage()
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
}

export { TokenService }
