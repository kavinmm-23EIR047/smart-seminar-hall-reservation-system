import React, { useState } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'booking', label: 'Seminar Booking' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-800 to-blue-600 text-white z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <GraduationCap size={32} className="text-yellow-400" />
            <div>
              <h1 className="text-xl font-bold">Kongu Engineering College</h1>
              <p className="text-sm opacity-90">Excellence in Education</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-white/10 hover:transform hover:-translate-y-0.5 ${
                  currentPage === item.id ? 'bg-white/20' : ''
                }`}
                onClick={() => setCurrentPage(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button 
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-white/20 mt-4">
            <div className="flex flex-col space-y-2 pt-4">
              {navItems.map(item => (
                <button
                  key={item.id}
                  className={`text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-white/10 ${
                    currentPage === item.id ? 'bg-white/20' : ''
                  }`}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;