export interface exportRefferalResult {
  id: string;
  contactPersonFullName: string;
  email: string;
  contactNo: string;
  companyName: string;
  designation: string;
  isProcessed: boolean;
  createdAt: Date;
  deletedDate?: any;
  updatedAt: Date;
  version: number;
}

export interface exportRefferalData {
  total: number;
  results: exportRefferalResult[];
}
