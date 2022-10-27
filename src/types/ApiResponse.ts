import { OrganizationResults } from "./organizations/organizations";
import { TransactionResult } from "./transactions/transactions";
import { UserResults } from "./users/Users";
import { FilterOrganization } from "./organizations/FilterOrgaization";
import { ReferralsResult } from "./referrals/Referrals";
import { FilterTransactions } from "./transactions/filterTransactions";
import { IEmployee } from "./store-types";

export interface OrganizationGetAllOrganizationsRes {
  results: OrganizationResults[]
  total: number
}

export interface OrganizationGetFilterEmployeesRes {
  results: IEmployee[];
  total: number;
}

export interface UsersRes {
  results: UserResults[]
  total: number
}

export interface TransactionRes {
  results: TransactionResult[]
  total: number
}
export interface FilterTransactionRes {
  results: FilterTransactions[]
  total: number
}

export interface OrganizationGetFilterOrganizationRes {
  results: FilterOrganization[]
  total: number
}

export interface ReferralGetReferralRes {
  results: ReferralsResult[]
  total: number
}
