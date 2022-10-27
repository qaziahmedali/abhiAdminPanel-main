export interface ISalaryBlackOutPeriod {
  from: number;
  to: number;
}

export interface JsonConfig {
  bronzeLimit: number;
  silverLimit: number;
  goldLimit: number;
  platinumLimit: number;
  bronzeLimitAutoApprove: boolean;
  silverLimitAutoApprove: boolean;
  goldLimitAutoApprove: boolean;
  platinumLimitAutoApprove: boolean;
  deductUnpaidLeaves: boolean;
  deductAnnualPaidLeaves: boolean;
  paymentProcessor: string;
  deductServiceFeeFromEmployee: boolean;
  payrollStartDay: number;
  payrollPreprocessingNotificationDay: number;
  payrollProcessingBeforeWeekend: boolean;
  weekendFirstDay: string;
  weekendSecondDay: string;
  totalLeaves: number;
  autoApprove: boolean;
  creditLimit: number;
  instantReminderPolicyEnabled: boolean;
  weeklyReminderPolicyEnabled: boolean;
  biWeeklyReminderPolicyEnabled: boolean;
  monthlyReminderPolicyEnabled: boolean;
  dayOfWeek: string;
  flag: string;
  noOfDayBeforeMonthEnd: number;
  fiscalYearStartMonth: number;
  businessHoursStart: string;
  businessHoursEnd: string;
  timezone: string;
  isEmiAllowed: Date | null;
  isTariffFeeDeduction: Date | null;
  salaryBlackoutPeriod: ISalaryBlackOutPeriod[];
  pointsOfContact: string[];
  manualApprovalEmailToPOC: boolean;

  additionPOCEmail: string[];
  manualApprovalEmailToAdditionPOC: boolean;

  POCPhoneNo: string[];
  manualApprovalSmsToPOC: boolean;

  additionPOCPhoneNo: string[];
  manualApprovalSmsToAdditionPOC: boolean;

  vendorTransactionOrganizationApproval: boolean;
}

export type JsonConfigPrivate = Pick<
  JsonConfig,
  | "deductUnpaidLeaves"
  | "deductAnnualPaidLeaves"
  | "paymentProcessor"
  | "payrollPreprocessingNotificationDay"
  | "payrollProcessingBeforeWeekend"
  | "weekendFirstDay"
  | "weekendSecondDay"
  | "totalLeaves"
  | "creditLimit"
  | "instantReminderPolicyEnabled"
  | "weeklyReminderPolicyEnabled"
  | "biWeeklyReminderPolicyEnabled"
  | "monthlyReminderPolicyEnabled"
  | "dayOfWeek"
  | "flag"
  | "noOfDayBeforeMonthEnd"
  | "fiscalYearStartMonth"
  | "pointsOfContact"
  | "manualApprovalEmailToPOC"
  | "additionPOCEmail"
  | "manualApprovalEmailToAdditionPOC"
  | "POCPhoneNo"
  | "additionPOCPhoneNo"
  | "manualApprovalSmsToPOC"
  | "manualApprovalSmsToAdditionPOC"
  | "vendorTransactionOrganizationApproval"
>;

export type JsonConfigPublic = Omit<JsonConfig, keyof JsonConfigPrivate>;

export interface OrganizationConfiguration {
  id: string;
  createdById: string;
  createdAt: Date;
  deletedDate?: any;
  organizationId: string;
  jsonConfig: JsonConfigPublic;
  jsonConfigPrivate: JsonConfigPrivate;
  updatedById: string;
  updatedAt: Date;
  version: number;
}

export interface Email {
  id: string;
  createdById: string;
  createdAt: Date;
  deletedDate?: any;
  userId: string;
  email: string;
  contactType: string;
  updatedById: string;
  updatedAt: Date;
  version: number;
}

export interface Phone {
  id: string;
  createdById: string;
  createdAt: Date;
  deletedDate?: any;
  userId: string;
  country: string;
  phoneNo: string;
  contactType: string;
  updatedById: string;
  updatedAt: Date;
  version: number;
}

export interface Person {
  firstName: string;
  lastName: string;
}

export interface Manager {
  id: string;
  createdById: string;
  createdAt: Date;
  deletedDate?: any;
  employeeCode?: any;
  employeesBadge: string;
  dateOfJoining: Date;
  designationId: string;
  organizationId: string;
  departmentId: string;
  netSalary: string;
  personId: string;
  officialEmailId: string;
  officialPhoneId: string;
  selectedBankAccountId: string;
  updatedById: string;
  updatedAt: Date;
  version: number;
  person: Person;
}

export interface OrganizationManager {
  organizationManagementRole: string;
  manager: Manager;
}

export interface BusinessType {
  id: string;
  createdById: string;
  createdAt: Date;
  deletedDate?: any;
  name: string;
  description?: any;
  country: string;
  updatedById: string;
  updatedAt: Date;
  version: number;
}

export interface Address {
  id: string;
  createdById: string;
  createdAt: Date;
  deletedDate?: any;
  address: string;
  coordinates?: any;
  city: string;
  country: string;
  updatedById: string;
  updatedAt: Date;
  version: number;
}

export interface OrganizationByID {
  id: string;
  createdById: string;
  createdAt: Date;
  deletedDate?: any;
  name: string;
  organizationNumber: number;
  industry: string;
  businessTypeId: string;
  active: boolean;
  tariffId: string;
  billPaymentTariffId: string;
  companyLogoId?: any;
  addressId: string;
  emailId: string;
  phoneId: string;
  selectedBankAccountId: string;
  updatedById: string;
  updatedAt: Date;
  version: number;
  organizationConfigurations: OrganizationConfiguration[];
  documents: any[];
  email: Email;
  phone: Phone;
  organizationManagers: OrganizationManager[];
  businessType: BusinessType;
  companyLogo?: any;
  address: Address;
}

export interface OrganizationByIDRes {
  result: OrganizationByID;
  message: string;
  status: string;
}
