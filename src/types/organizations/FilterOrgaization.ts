export interface Address {
  city: string;
}

export interface Person {
  firstName: string;
  lastName: string;
}

export interface Manager {
  employeesBadge: string;
  person: Person;
}

export interface OrganizationManager {
  organizationManagementRole: string;
  manager: Manager;
}

export interface BusinessType {
  name: string;
  country: string;
}

export interface FilterOrganization {
  id: string;
  createdById: string;
  createdAt: Date;
  deletedDate?: any;
  name: string;
  organizationNumber: number;
  industry: string;
  managementAlias: string;
  organizationType: string;
  businessTypeId: string;
  active: boolean;
  tariffId: string;
  companyLogoId?: any;
  addressId: string;
  emailId: string;
  phoneId: string;
  selectedBankAccountId: string;
  updatedById: string;
  updatedAt: Date;
  version: number;
  address: Address;
  organizationManagers: OrganizationManager[];
  businessType: BusinessType;
}
