
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {!isAuthPage && <NavBar />}
      <main className={`animate-fade-in p-4 sm:p-6 ${isAuthPage ? '' : 'pt-24'}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
