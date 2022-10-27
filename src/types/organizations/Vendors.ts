export interface Organization {
  name: string;
}

export interface Bank {
  id: string;
  createdById: string;
  createdAt: Date;
  deletedDate?: any;
  bankName: string;
  country: string;
  bankAccountFormat: string;
  bankAccountRegex: string;
  hrsgBankCode?: number;
  bankIconId: string;
  updatedById: string;
  updatedAt: Date;
  version: number;
}

export interface SelectedBankAccount {
  id: string;
  createdById: string;
  createdAt: Date;
  deletedDate?: any;
  accountTitle: string;
  accountNumber: string;
  currency: string;
  bankId: string;
  isApproved: boolean;
  titleFetchVerified: boolean;
  updatedById: string;
  updatedAt: Date;
  version: number;
  bank: Bank;
}

export interface OrganizationVendorResult {
  id: string;
  createdById: string;
  createdAt: Date;
  deletedDate?: any;
  name: string;
  description?: any;
  ntn: string;
  vendorId: string;
  active: boolean;
  payment: string;
  organizationId: string;
  selectedBankAccountId: string;
  email: string;
  phoneNo: string;
  updatedById: string;
  updatedAt: Date;
  deletedById?: any;
  version: number;
  organization: Organization;
  selectedBankAccount: SelectedBankAccount;
}

export interface OrganizationVendorData {
  total: number;
  results: OrganizationVendorResult[];
}
