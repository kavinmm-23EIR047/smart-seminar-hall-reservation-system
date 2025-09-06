import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import SeminarBooking from './components/SeminarBooking';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage />;
      case 'booking':
        return <SeminarBooking />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="pt-20">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;