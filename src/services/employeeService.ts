import { apiManager } from '@/utils/apiManager/ApiManager'

class EmployeeService {
  updateOrganizationEmployeeConfigs(employeeId: string, jsonConfig?: any) {
    return apiManager.fetch({
      name: 'OrganizationUpdateEmployeeConfiguration',
      data: { jsonConfig },
      pathVariables: { employeeId }
    })
  }

  deleteOrganizationEmployeeConfigs(employeeId: string) {
    return apiManager.fetch({
      name: 'OrganizationDeleteEmployeeConfiguration',
      pathVariables: { employeeId }
    })
  }
}

export const employeeService = new EmployeeService()
