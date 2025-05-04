import React from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

interface BalanceSummaryProps {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  totalPlannedExpenses: number;
  availableBalance: number;
  dailyBudget: number;
}

const BalanceSummary: React.FC<BalanceSummaryProps> = ({
  balance,
  totalIncome,
  totalExpenses,
  totalPlannedExpenses,
  availableBalance,
  dailyBudget
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <TrendingUp size={20} className="mr-2 text-blue-500" />
        Обобщение
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-full mr-2">
              <ArrowUpRight size={18} className="text-green-600" />
            </div>
            <span className="text-sm text-green-800">Общо приходи</span>
          </div>
          <p className="text-xl font-bold text-green-700 mt-1">
            {formatCurrency(totalIncome)}
          </p>
        </div>
        
        <div className="bg-red-50 p-3 rounded-lg border border-red-100">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-full mr-2">
              <ArrowDownRight size={18} className="text-red-600" />
            </div>
            <span className="text-sm text-red-800">Общо разходи</span>
          </div>
          <p className="text-xl font-bold text-red-700 mt-1">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
        
        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-full mr-2">
              <Calendar size={18} className="text-orange-600" />
            </div>
            <span className="text-sm text-orange-800">Планирани разходи</span>
          </div>
          <p className="text-xl font-bold text-orange-700 mt-1">
            {formatCurrency(totalPlannedExpenses)}
          </p>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-full mr-2">
              <TrendingUp size={18} className="text-blue-600" />
            </div>
            <span className="text-sm text-blue-800">Дневен бюджет</span>
          </div>
          <p className="text-xl font-bold text-blue-700 mt-1">
            {formatCurrency(dailyBudget)}
          </p>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">Текущ баланс:</span>
          <span className="font-bold text-blue-600">{formatCurrency(balance)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Наличен баланс:</span>
          <span className="font-bold text-blue-600">{formatCurrency(availableBalance)}</span>
        </div>
      </div>
    </div>
  );
};

export default BalanceSummary;