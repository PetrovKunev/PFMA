import React, { useState } from 'react';
import { Transaction } from '../types';
import { generateId, expenseCategories, incomeCategories, getTodayISO } from '../utils/helpers';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [date, setDate] = useState<string>(getTodayISO());
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Моля, въведете валидна сума (положително число)';
    }
    
    if (!category) {
      newErrors.category = 'Моля, изберете категория';
    }
    
    if (!date) {
      newErrors.date = 'Моля, изберете дата';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const newTransaction: Transaction = {
      id: generateId(),
      amount: Number(amount),
      description: description.trim() || 'Без описание',
      category,
      date,
      type
    };
    
    onAddTransaction(newTransaction);
    
    // Reset form
    setAmount('');
    setDescription('');
    setCategory('');
    setDate(getTodayISO());
    setErrors({});
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        {type === 'income' ? (
          <ArrowUpRight size={20} className="mr-2 text-green-500" />
        ) : (
          <ArrowDownRight size={20} className="mr-2 text-red-500" />
        )}
        Нова транзакция
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
                type === 'expense'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Разход
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
                type === 'income'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Приход
            </button>
          </div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Сума (лв.)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            min="0"
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.amount ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0.00"
          />
          {errors.amount && <p className="mt-1 text-sm text-red-500">{errors.amount}</p>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Описание (незадължително)
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Въведете описание"
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Категория
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">-- Изберете категория --</option>
            {(type === 'income' ? incomeCategories : expenseCategories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Дата
          </label>
          <input
            type="date"
            id="date"
            value={date}
            max="9999-12-31"
            onChange={(e) => setDate(e.target.value)}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
        </div>
        
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors duration-200 ${
            type === 'income'
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {type === 'income' ? 'Добави приход' : 'Добави разход'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;