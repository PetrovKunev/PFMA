import React from 'react';
import { Wallet } from 'lucide-react';

interface HeaderProps {
  balance: number;
  availableBalance: number;
}

const Header: React.FC<HeaderProps> = ({ balance, availableBalance }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('bg-BG', {
      style: 'currency',
      currency: 'BGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wallet size={28} />
            <h1 className="text-xl font-bold">Финансов Мениджър</h1>
          </div>
          <div className="hidden md:flex space-x-6">
            <div className="text-center">
              <p className="text-sm text-blue-100">Текущ баланс</p>
              <p className="text-xl font-bold">{formatCurrency(balance)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-blue-100">Наличен баланс</p>
              <p className="text-xl font-bold">{formatCurrency(availableBalance)}</p>
            </div>
          </div>
        </div>
        
        {/* Mobile view for balances */}
        <div className="md:hidden mt-4 flex justify-between">
          <div className="text-center bg-blue-700 rounded-lg p-2 flex-1 mr-2">
            <p className="text-xs text-blue-100">Текущ баланс</p>
            <p className="text-lg font-bold">{formatCurrency(balance)}</p>
          </div>
          <div className="text-center bg-blue-700 rounded-lg p-2 flex-1 ml-2">
            <p className="text-xs text-blue-100">Наличен баланс</p>
            <p className="text-lg font-bold">{formatCurrency(availableBalance)}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;