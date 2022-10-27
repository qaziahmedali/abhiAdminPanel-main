import { Referral } from "./../store-types/IDashboard";
export interface ReferralsResult {
	id: string;
	contactPersonFullName: string;
	designation: string;
	contactNo: string;
	companyName: string;
	isProcessed: boolean;
	createdAt: Date;
	deletedDate?: any;
	updatedAt: Date;
	version: number;
}

