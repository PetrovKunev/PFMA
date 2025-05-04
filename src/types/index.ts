export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

export interface PlannedExpense {
  id: string;
  amount: number;
  description: string;
  category: string;
  dueDate: string;
}

export interface DailyBudgetParams {
  startDate: string;
  endDate: string;
}

export interface CategoryTotals {
  [key: string]: number;
}