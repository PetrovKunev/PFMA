import { Transaction, PlannedExpense, CategoryTotals } from '../types';

// Format currency in Bulgarian Leva
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('bg-BG', {
    style: 'currency',
    currency: 'BGN',
    minimumFractionDigits: 2
  }).format(amount);
};

// Calculate days between two dates
export const calculateDaysBetween = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include both start and end days
  return diffDays;
};

// Format date in Bulgarian format
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('bg-BG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Calculate total income
export const calculateTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);
};

// Calculate total expenses
export const calculateTotalExpenses = (transactions: Transaction[]): number => {
  return transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);
};

// Calculate total planned expenses
export const calculateTotalPlannedExpenses = (plannedExpenses: PlannedExpense[]): number => {
  return plannedExpenses.reduce((total, expense) => total + expense.amount, 0);
};

// Calculate daily budget
export const calculateDailyBudget = (
  balance: number,
  plannedExpenses: PlannedExpense[],
  startDate: string,
  endDate: string
): number => {
  const totalPlannedExpenses = calculateTotalPlannedExpenses(plannedExpenses);
  const remainingBalance = balance - totalPlannedExpenses;
  const days = calculateDaysBetween(startDate, endDate);
  
  return remainingBalance > 0 ? remainingBalance / days : 0;
};

// Get category totals for expenses
export const getCategoryTotals = (transactions: Transaction[]): CategoryTotals => {
  return transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((totals: CategoryTotals, transaction) => {
      const { category, amount } = transaction;
      if (!totals[category]) {
        totals[category] = 0;
      }
      totals[category] += amount;
      return totals;
    }, {});
};

// Get today's date in ISO format
export const getTodayISO = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Generate a unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Predefined categories
export const expenseCategories = [
  'Храна',
  'Транспорт',
  'Сметки',
  'Развлечения',
  'Здраве',
  'Образование',
  'Дрехи',
  'Подаръци',
  'Други'
];

export const incomeCategories = [
  'Заплата',
  'Хонорар',
  'Подарък',
  'Дивиденти',
  'Наем',
  'Други'
];