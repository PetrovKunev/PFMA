import React from 'react';
import { PlannedExpense } from '../types';
import { formatCurrency, formatDate } from '../utils/helpers';
import { Calendar, Trash2 } from 'lucide-react';

interface PlannedExpenseListProps {
  plannedExpenses: PlannedExpense[];
  onDeletePlannedExpense: (id: string) => void;
}

const PlannedExpenseList: React.FC<PlannedExpenseListProps> = ({
  plannedExpenses,
  onDeletePlannedExpense
}) => {
  if (plannedExpenses.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar size={20} className="mr-2 text-orange-500" />
          Предстоящи разходи
        </h2>
        <p className="text-gray-500 text-center py-4">Няма планирани разходи</p>
      </div>
    );
  }

  // Sort planned expenses by due date (ascending)
  const sortedExpenses = [...plannedExpenses].sort((a, b) => {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Calendar size={20} className="mr-2 text-orange-500" />
        Предстоящи разходи
      </h2>
      
      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {sortedExpenses.map((expense) => (
          <div
            key={expense.id}
            className="py-3 flex items-center justify-between transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center">
              <div className="p-2 rounded-full mr-3 bg-orange-100">
                <Calendar size={18} className="text-orange-600" />
              </div>
              <div>
                <p className="font-medium">{expense.description}</p>
                <div className="flex text-sm text-gray-500">
                  <span>{expense.category}</span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(expense.dueDate)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-orange-600 mr-3">
                {formatCurrency(expense.amount)}
              </span>
              <button
                onClick={() => onDeletePlannedExpense(expense.id)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                aria-label="Изтрий планиран разход"
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

export default PlannedExpenseList;