import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BalanceSummary from './components/BalanceSummary';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import PlannedExpenseForm from './components/PlannedExpenseForm';
import PlannedExpenseList from './components/PlannedExpenseList';
import DailyBudgetCalculator from './components/DailyBudgetCalculator';
import useLocalStorage from './hooks/useLocalStorage';
import { Transaction, PlannedExpense, DailyBudgetParams } from './types';
import { calculateTotalIncome, calculateTotalExpenses, calculateTotalPlannedExpenses, calculateDailyBudget } from './utils/helpers';

function App() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [plannedExpenses, setPlannedExpenses] = useLocalStorage<PlannedExpense[]>('plannedExpenses', []);
  const [dailyBudgetParams, setDailyBudgetParams] = useLocalStorage<DailyBudgetParams>('dailyBudgetParams', {
    startDate: '',
    endDate: ''
  });

  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const balance = totalIncome - totalExpenses;
  const totalPlannedExpenses = calculateTotalPlannedExpenses(plannedExpenses);
  const availableBalance = balance - totalPlannedExpenses;
  
  const dailyBudget = dailyBudgetParams.startDate && dailyBudgetParams.endDate
    ? calculateDailyBudget(balance, plannedExpenses, dailyBudgetParams.startDate, dailyBudgetParams.endDate)
    : 0;

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleAddPlannedExpense = (expense: PlannedExpense) => {
    setPlannedExpenses(prev => [...prev, expense]);
  };

  const handleDeletePlannedExpense = (id: string) => {
    setPlannedExpenses(prev => prev.filter(e => e.id !== id));
  };

  const handleCalculateDailyBudget = (params: DailyBudgetParams) => {
    setDailyBudgetParams(params);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header balance={balance} availableBalance={availableBalance} />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <BalanceSummary
              balance={balance}
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              totalPlannedExpenses={totalPlannedExpenses}
              availableBalance={availableBalance}
              dailyBudget={dailyBudget}
            />
            <TransactionForm onAddTransaction={handleAddTransaction} />
            <TransactionList
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
            />
          </div>
          
          <div className="space-y-6">
            <DailyBudgetCalculator
              availableBalance={availableBalance}
              onCalculate={handleCalculateDailyBudget}
              dailyBudget={dailyBudget}
            />
            <PlannedExpenseForm onAddPlannedExpense={handleAddPlannedExpense} />
            <PlannedExpenseList
              plannedExpenses={plannedExpenses}
              onDeletePlannedExpense={handleDeletePlannedExpense}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;