export interface GuestResult {
  id: string;
  createdById: string;
  createdAt: Date;
  deletedDate?: any;
  name: string;
  phone: string;
  email: string;
  company: string;
  updatedById: string;
  updatedAt: Date;
  version: number;
}

export interface GuestData {
  total: number;
  results: GuestResult[];
}
