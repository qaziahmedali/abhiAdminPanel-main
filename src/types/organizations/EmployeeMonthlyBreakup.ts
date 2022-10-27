export interface MonthlyBreakup {
  date: string;
  day: number;
  withdrawMoney: number;
  totalWithdraw: number;
  balance: number;
}

export interface EmployeeMontlyBreakUpData {
  salary: number;
  availableSalary: number;
  availableBalance: number;
  totalWithdraw: number;
  perDayAvailableSalary: number;
  totalDaysOfMonth: number;
  monthlyBreakup: MonthlyBreakup[];
}
