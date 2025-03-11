
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Package, User, LogOut, Plus } from 'lucide-react';
import { getCurrentUser, logoutUser } from '../lib/data';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const user = getCurrentUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link 
            to="/" 
            className="flex items-center gap-2 font-medium text-lg"
          >
            <Package className="w-6 h-6 text-primary" />
            <span>Travel Buddy</span>
          </Link>
          
          <nav className="hidden sm:flex items-center gap-1">
            <NavLink to="/" active={location.pathname === '/'}>
              <MapPin className="w-4 h-4 mr-1" />
              Requests
            </NavLink>
            <NavLink to="/add-request" active={location.pathname === '/add-request'}>
              <Plus className="w-4 h-4 mr-1" />
              Add Request
            </NavLink>
            <NavLink to="/profile" active={location.pathname === '/profile'}>
              <User className="w-4 h-4 mr-1" />
              Profile
            </NavLink>
            <button
              onClick={handleLogout}
              className="ml-2 flex items-center rounded-full px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </button>
          </nav>
          
          <div className="sm:hidden flex items-center gap-3">
            <Link 
              to="/profile"
              className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <User className="w-4 h-4 text-primary" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2">
        <div className="flex justify-between items-center">
          <NavButton to="/" active={location.pathname === '/'}>
            <MapPin className="w-5 h-5" />
            <span className="text-xs mt-1">Requests</span>
          </NavButton>
          <NavButton to="/add-request" active={location.pathname === '/add-request'}>
            <Plus className="w-5 h-5" />
            <span className="text-xs mt-1">Add</span>
          </NavButton>
          <NavButton to="/profile" active={location.pathname === '/profile'}>
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </NavButton>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) => (
  <Link
    to={to}
    className={`flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      active 
        ? 'bg-primary text-white' 
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    {children}
  </Link>
);

const NavButton = ({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) => (
  <Link
    to={to}
    className={`flex flex-col items-center py-1 ${
      active ? 'text-primary' : 'text-gray-500'
    }`}
  >
    {children}
  </Link>
);

export default NavBar;
