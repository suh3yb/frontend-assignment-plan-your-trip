import React, { useMemo } from 'react';
import './Layout.css';

const Layout: React.FC = ({ children }) => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <>
      <header className="header">
        <h1 className="header__title">Plan your trip!</h1>
      </header>
      <main className="main appear">{children}</main>
      <footer className="footer">
        <p className="footer__text">
          <span className="footer__text__copyright">&copy;</span> 2014-
          {currentYear} Tiqets Amsterdam
        </p>
      </footer>
    </>
  );
};

export default Layout;
