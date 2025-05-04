import React, { useState, useEffect } from 'react';
import { DailyBudgetParams } from '../types';
import { getTodayISO, calculateDaysBetween, formatCurrency } from '../utils/helpers';
import { Calculator } from 'lucide-react';

interface DailyBudgetCalculatorProps {
  availableBalance: number;
  onCalculate: (params: DailyBudgetParams) => void;
  dailyBudget: number;
}

const DailyBudgetCalculator: React.FC<DailyBudgetCalculatorProps> = ({
  availableBalance,
  onCalculate,
  dailyBudget
}) => {
  const [startDate, setStartDate] = useState<string>(getTodayISO());
  const [endDate, setEndDate] = useState<string>('');
  const [days, setDays] = useState<number>(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Set default end date to 30 days from today
  useEffect(() => {
    const defaultEndDate = new Date();
    defaultEndDate.setDate(defaultEndDate.getDate() + 30);
    setEndDate(defaultEndDate.toISOString().split('T')[0]);
  }, []);

  // Calculate days whenever dates change
  useEffect(() => {
    if (startDate && endDate) {
      try {
        const daysCount = calculateDaysBetween(startDate, endDate);
        setDays(daysCount);
      } catch (error) {
        setDays(0);
      }
    }
  }, [startDate, endDate]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!startDate) {
      newErrors.startDate = 'Моля, изберете начална дата';
    }
    
    if (!endDate) {
      newErrors.endDate = 'Моля, изберете крайна дата';
    }
    
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      newErrors.endDate = 'Крайната дата трябва да е след началната дата';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onCalculate({ startDate, endDate });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Calculator size={20} className="mr-2 text-blue-500" />
        Дневен бюджет
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Начална дата
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              max="9999-12-31"
              onChange={(e) => setStartDate(e.target.value)}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.startDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.startDate && <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>}
          </div>
          
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              Крайна дата
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              max="9999-12-31"
              onChange={(e) => setEndDate(e.target.value)}
              className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.endDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.endDate && <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>}
          </div>
        </div>
        
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Общо дни:</span>
            <span className="font-semibold">{days}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Наличен баланс:</span>
            <span className="font-semibold">{formatCurrency(availableBalance)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-200">
            <span className="text-sm font-medium">Дневен бюджет:</span>
            <span className="font-bold text-blue-600">{formatCurrency(dailyBudget)}</span>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium transition-colors duration-200"
        >
          Изчисли дневен бюджет
        </button>
      </form>
    </div>
  );
};

export default DailyBudgetCalculator;