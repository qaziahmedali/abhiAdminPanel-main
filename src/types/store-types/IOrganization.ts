import { Action, Thunk } from 'easy-peasy'

import { EmployeeMontlyBreakUpData } from "../organizations/EmployeeMonthlyBreakup";
import { IStoreModel } from "@/types/store-types";
import { OrganizationByID, OrganizationConfiguration } from "../organizations/organizationById";
import { OrganizationResults } from "../organizations/organizations";
import { OrganizationVendorResult } from "../organizations/Vendors";
import { AbhiResponse } from "@/utils/apiManager/responces";
import { OrganizationGetFilterEmployeesRes } from "../ApiResponse";
import { Department, Designation, OfficialEmail, OfficialPhone, SelectedBankAccount, Person, User } from "../organizations/Employees";
import { Option } from "chakra-ui-simple-autocomplete";

interface OrganizationState {
  organizations: OrganizationResults[];
  selectedOrganizationId: string;
  allOrganizations: OrganizationResults[];
  employees: IEmployee[];

  vendors: OrganizationVendorResult[]
  settlements: any
  settlementDetails: any
  organizationData: OrganizationByID
  Tariff: TariffData
  Bank: BankData
  BusinessType: BusinessTypeData

  EmployeeMonthlyBreakup: EmployeeMontlyBreakUpData
}

interface OrganizationActions {
  setOrganizations: Action<this, OrganizationResults[]>;
  setSelectedOrganizationId: Action<this, string>;
  setAllOrganizations: Action<this, OrganizationResults[]>;
  setEmployees: Action<this, IEmployee[]>;
  setVendors: Action<this, OrganizationVendorResult[]>;
  setSettlements: Action<this>;
  setSettlementDetails: Action<this>;
  setOrganizationData: Action<this, OrganizationByID>;
  setTariffData: Action<this, TariffData>;
  setBankData: Action<this, BankData>;
  setBusinessTypeData: Action<this, BusinessTypeData>;

  setEmployeeMonthlyBreakup: Action<this, EmployeeMontlyBreakUpData>
}

interface OrganizationThunk {
  getOrganization: Thunk<this>
  getSelectedOrganizationId: Thunk<this, string>
  getOrganizationNames: Thunk<this, { page?: number; limit?: number }>

  getAllVendors: Thunk<this, { offset?: number; limit?: number }>

  filterVendors: Thunk<this>
  getSignedUrl: Thunk<this>
  getSignedUrlForDownload: Thunk<this>
  uploadToS3: Thunk<this>
  filterOrganization: Thunk<this>
  addOrganization: Thunk<this, OrganizationPayload, null, IStoreModel>
  getBank: Thunk<this, BankData, null, IStoreModel>
  getTariff: Thunk<this, { offset?: number; limit?: number }, null, IStoreModel>
  exportEmployeeData: Thunk<this>
  getEmployeeMonthlyBreakup: Thunk<
    this,
    {
      employeeId: string
      initiator: string
    }
  >;
  getBusinessType: Thunk<this, BusinessTypeData, null, IStoreModel>;
  fetchTitle: Thunk<this, FetchTitlePayload, null, IStoreModel, Promise<AbhiResponse<IFetchTitleResponse> | false>>;
  getEmployees: Thunk<this, IEmployeeParams, null, IStoreModel, Promise<false | OrganizationGetFilterEmployeesRes>>;
  filterEmployees: Thunk<this>;
  getOrganizationById: Thunk<this, String, null, IStoreModel>;
  updateOrganization: Thunk<this, UpdateOrganizationPayload>;
  employeeOnboarding: Thunk<this, EmployeeOnboarding>;

  updateUserStatus: Thunk<this, { userId: string; status: boolean }, null, IStoreModel>
  getSettlements: Thunk<this>
  getSettlementDetails: Thunk<this>
  applySettlementRequest: Thunk<this, SettlementPayload>
}

export interface TariffModelTier {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  tariffId: string
  tierType: string
  fee: string
  amount: string
  denominator: number
  employeeContribution: string
  updatedById: string
  updatedAt: Date
  version: number
}

export interface TariffResult {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  name: string
  description: string
  currency: string
  minimumWithdrawAmount: string
  pricingModel: string
  updatedById: string
  updatedAt: Date
  version: number
  tariffModelTipping: any[]
  tariffModelTiers: TariffModelTier[]
}

export interface TariffData {
  total: number
  results: TariffResult[]
}
export interface BusinessTypeResult {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  name: string
  description?: any
  country: string
  updatedById: string
  updatedAt: Date
  version: number
}

export interface BusinessTypeData {
  total: number
  results: BusinessTypeResult[]
}

export interface OneLinkBankDetails {
  imd: string
}

export interface BankResult {
  id: string
  createdById: string
  createdAt: Date
  deletedDate?: any
  bankName: string
  country: string
  bankAccountFormat: string
  bankAccountRegex: string
  updatedById: string
  updatedAt: Date
  version: number
  oneLinkBankDetails: OneLinkBankDetails
}

export interface BankData {
  total: number
  results: BankResult[]
}
export interface OrganizationPayload {
  name: string
  industry: string
  businessTypeId: string
  address: string
  city: string
  email: string
  phone: string
  tariffId: string
  managementAlias: string
}

export interface IOrganization extends OrganizationState, OrganizationActions, OrganizationThunk {}

export interface UpdateOrganizationPayload {
  id: string;
  tariffId: string;
  billPaymentTariffId:string;
  active: boolean;
}

export interface EmployeeOnboarding {
  organizationId?: string
  employeeIds?: string[]
}

export interface FetchTitlePayload {
  user_id: string
}

export interface SettlementPayload {
  media: {
    name: string
    mediaType: string
    urlPath: string
  }
  settlement: {
    transactionDate: Date
    amount: number
  }
}

export interface IDesignation {
  id: string;
  createdById: string;
  createdAt: Date;
  deletedDate: null;
  designation: string;
  organizationId: string;
  updatedById: string;
  updatedAt: string;
  version: number;
};

export interface IDepartment {
  id: string;
  createdById: string;
  createdAt: string;
  deletedDate: null;
  name: string;
  description: string;
  organizationId: string;
  updatedById: string;
  updatedAt: Date;
  version: number;
};

export interface IOfficialPhone {
  id: string;
  createdById: string;
  createdAt: string;
  deletedDate: null;
  userId: string;
  country: string;
  phoneNo: string;
  contactType: string;
  updatedById: string;
  updatedAt: string;
  version: number;
};

export interface IOfficialEmail {
  id: string;
  createdById: string;
  createdAt: string;
  deletedDate: null;
  userId: string;
  email: string;
  contactType: string;
  updatedById: string;
  updatedAt: string;
  version: number;
};

export interface IPerson {
  id: string;
  createdById: string;
  createdAt: Date;
  deletedDate: null;
  userId: string;
  firstName: string;
  lastName: string;
  cnic: string;
  dob: string;
  gender: string;
  profileImageId: string;
  addressId: string;
  personalEmailId: string;
  personalPhoneId: string;
  updatedById: string;
  updatedAt: string;
  version: number;
  user: User
};

export interface ISelectedBankAccount {
  bank: {
    bankName: string;
  }
}
export interface IEmployee {
  id: string;
  createdById: string;
  createdAt: Date;
  deletedDate: null;
  employeeCode: null;
  employeesBadge: string;
  dateOfJoining: Date;
  designationId: string;
  organizationId: string;
  departmentId: string;
  netSalary: string;
  providentFund: number;
  workingStatus: string;
  systemAccess: string;
  personId: string;
  officialEmailId: string;
  officialPhoneId: string;
  selectedBankAccountId: string;
  updatedById: string;
  updatedAt: string;
  version: 1;
  person: Person;
  officialEmail: OfficialEmail;
  officialPhone: OfficialPhone;
  department: Department;
  designation: Designation;
  selectedBankAccount: SelectedBankAccount;
  organization: {
    name: string;
  }
  organizationEmployeesConfigurations: Partial<OrganizationConfiguration>[];
}
export interface Organization {}

export interface IFetchTitleResponse {
  AccountNumberTo: string;
  AccountTitleTo: string;
  Alias: string;
  Amount: string;
  AuthorizationIdentificationResponse: string;
  BankName: string;
  BranchNameTo: string;
  Date: string;
  DateSettlement: string;
  IBAN_MobileAccountNumber: string;
  PAN: string;
  RRN: string;
  Reserved1: string;
  Reserved2: string;
  Reserved3: string;
  ResponseCode: string;
  ResponseDetail: string;
  STAN: string;
  Time: string;
  ToBankIMD: string;
  TransmissionDateAndTime: string;
}

export interface IFetchTitleRequestPayload {
  user_id: string;
}

export interface IEmployeeFilters {
  firstName?: string;
  lastName?: string;
  email?: string;
  organization?: string;
  phone?: string;
  cnic?: string;
  organizationId?: string[] | Option[] | null;
}

export interface IEmployeeParams extends IEmployeeFilters {
	page?: number;
	limit?: number;
}