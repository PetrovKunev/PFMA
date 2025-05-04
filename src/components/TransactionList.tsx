import React, { useState } from 'react';
import { Transaction } from '../types';
import { formatCurrency, formatDate } from '../utils/helpers';
import { ArrowUpRight, ArrowDownRight, Trash2 } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction }) => {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });
  
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
  });

  const handleSort = (field: 'date' | 'amount') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };
  
  if (transactions.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Транзакции</h2>
        <p className="text-gray-500 text-center py-4">Няма налични транзакции</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Транзакции</h2>
      
      <div className="flex mb-4">
        <div className="mr-4">
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
            Филтър
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'income' | 'expense')}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Всички</option>
            <option value="income">Приходи</option>
            <option value="expense">Разходи</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
            Сортиране
          </label>
          <div className="flex">
            <button
              className={`px-3 py-2 border ${
                sortBy === 'date'
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-gray-300 text-gray-700'
              } rounded-l-md`}
              onClick={() => handleSort('date')}
            >
              Дата {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              className={`px-3 py-2 border ${
                sortBy === 'amount'
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-gray-300 text-gray-700'
              } rounded-r-md border-l-0`}
              onClick={() => handleSort('amount')}
            >
              Сума {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {sortedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="py-3 flex items-center justify-between transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center">
              <div className={`p-2 rounded-full mr-3 ${
                transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {transaction.type === 'income' ? (
                  <ArrowUpRight size={18} className="text-green-600" />
                ) : (
                  <ArrowDownRight size={18} className="text-red-600" />
                )}
              </div>
              <div>
                <p className="font-medium">{transaction.description}</p>
                <div className="flex text-sm text-gray-500">
                  <span>{transaction.category}</span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(transaction.date)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className={`font-semibold mr-3 ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </span>
              <button
                onClick={() => onDeleteTransaction(transaction.id)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                aria-label="Изтрий транзакция"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;