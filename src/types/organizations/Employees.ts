import { OrganizationConfiguration } from "./organizationById";

export interface User {
  skipFailedAttemptCount: boolean;
}

export interface Person {
  id: string;
  createdById: string;
  createdAt: Date;
  deletedDate?: any;
  userId: string;
  firstName: string;
  lastName: string;
  cnic: string;
  dob: string;
  gender: string;
  profileImageId?: any;
  updatedById: string;
  updatedAt: Date;
  version: number;
  user: User;
}

export interface OfficialEmail {
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

export interface OfficialPhone {
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

export interface Department {
  id: string;
  createdById: string;
  createdAt: Date;
  deletedDate?: any;
  name: string;
  description?: any;
  organizationId: string;
  updatedById: string;
  updatedAt: Date;
  version: number;
}

export interface Designation {
  id: string;
  createdById: string;
  createdAt: Date;
  deletedDate?: any;
  designation: string;
  organizationId: string;
  updatedById: string;
  updatedAt: Date;
  version: number;
}

export interface Organization {
  name: string;
}

export interface OneLinkBankDetails {
  imd: string;
}

export interface Bank {
  bankName: string;
  oneLinkBankDetails: OneLinkBankDetails;
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
  updatedById: string;
  updatedAt: Date;
  version: number;
  bank: Bank;
  oneLinkEmployeeBankDetails: any[];
}

export interface updateUserStatus {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedDate?: any;
  version: number;
  enabled: boolean;
  username: string;
  password: string;
  resetToken?: any;
  otp: number;
  failAttemptCount: number;
  skipFailedAttemptCount: boolean;
  lastLoginTime?: any;
  isPasswordChanged: boolean;
  identifier: string;
  allowMultilogin: boolean;
}
