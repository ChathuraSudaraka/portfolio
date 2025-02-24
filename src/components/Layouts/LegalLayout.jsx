import React, { useEffect } from 'react';
import Footer from '../../components/common/Footer';

const LegalLayout = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LegalLayout;
