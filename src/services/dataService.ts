import { apiManager } from '@/utils/apiManager/ApiManager'
import { catchTry } from '@/utils/betterTry'

class DataService {
  login = async (payload: any) => {
    // const loginUrl = AppConstants.BASE_URL + AppConstants.LOGIN;
    const loginUrl = await catchTry(
      apiManager.fetch({
        name: 'AuthLogin'
      })
    )
  }
}
export const dataService = new DataService()
