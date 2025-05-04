import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {currentYear} Финансов Мениджър. Всички права запазени.</p>
        <p className="text-xs text-gray-400 mt-1">Създадено с React и Tailwind CSS</p>
      </div>
    </footer>
  );
};

export default Footer;