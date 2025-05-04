import React, { useState } from 'react';
import { PlannedExpense } from '../types';
import { generateId, expenseCategories, getTodayISO } from '../utils/helpers';
import { Calendar } from 'lucide-react';

interface PlannedExpenseFormProps {
  onAddPlannedExpense: (expense: PlannedExpense) => void;
}

const PlannedExpenseForm: React.FC<PlannedExpenseFormProps> = ({ onAddPlannedExpense }) => {
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>(getTodayISO());
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Моля, въведете валидна сума (положително число)';
    }
    
    if (!category) {
      newErrors.category = 'Моля, изберете категория';
    }
    
    if (!dueDate) {
      newErrors.dueDate = 'Моля, изберете дата';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const newExpense: PlannedExpense = {
      id: generateId(),
      amount: Number(amount),
      description: description.trim() || 'Без описание',
      category,
      dueDate
    };
    
    onAddPlannedExpense(newExpense);
    
    // Reset form
    setAmount('');
    setDescription('');
    setCategory('');
    setDueDate(getTodayISO());
    setErrors({});
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Calendar size={20} className="mr-2 text-orange-500" />
        Планирани разходи
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="planned-amount" className="block text-sm font-medium text-gray-700 mb-1">
            Сума (лв.)
          </label>
          <input
            type="number"
            id="planned-amount"
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
          <label htmlFor="planned-description" className="block text-sm font-medium text-gray-700 mb-1">
            Описание (незадължително)
          </label>
          <input
            type="text"
            id="planned-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Въведете описание"
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="planned-category" className="block text-sm font-medium text-gray-700 mb-1">
            Категория
          </label>
          <select
            id="planned-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">-- Изберете категория --</option>
            {expenseCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="planned-dueDate" className="block text-sm font-medium text-gray-700 mb-1">
            Дата
          </label>
          <input
            type="date"
            id="planned-dueDate"
            value={dueDate}
            max="9999-12-31"
            onChange={(e) => setDueDate(e.target.value)}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.dueDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.dueDate && <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>}
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 rounded-md text-white font-medium transition-colors duration-200"
        >
          Добави планиран разход
        </button>
      </form>
    </div>
  );
};

export default PlannedExpenseForm;