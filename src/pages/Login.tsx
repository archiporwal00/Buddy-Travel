
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm, SignUpForm } from '../components/AuthForms';
import { getCurrentUser } from '../lib/data';
import { MapPin, Compass, Map, Navigation } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    if (getCurrentUser()) {
      navigate('/');
    }
  }, [navigate]);
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-purple-400 to-pink-400 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full backdrop-blur-lg animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full backdrop-blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/10 rounded-full backdrop-blur-lg animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Floating icons */}
      <MapPin className="absolute top-1/4 left-1/4 text-white/20 w-12 h-12 animate-bounce" style={{ animationDuration: '3s' }} />
      <Compass className="absolute bottom-1/4 right-1/3 text-white/20 w-14 h-14 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
      <Map className="absolute top-2/3 left-1/3 text-white/20 w-10 h-10 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
      <Navigation className="absolute top-1/3 right-1/5 text-white/20 w-8 h-8 animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '1.2s' }} />
      
      {/* App branding */}
      <div className="mb-8 text-center z-10">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Travel Buddy</h1>
        <p className="text-white/80 text-lg">Connect, Deliver, Explore</p>
      </div>
      
      {/* Auth form card */}
      <div className="w-full max-w-md animate-fade-in z-10">
        <div className="backdrop-blur-lg bg-white/20 rounded-2xl border border-white/30 shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:bg-white/25">
          {isLogin ? (
            <LoginForm onToggleForm={toggleForm} />
          ) : (
            <SignUpForm onToggleForm={toggleForm} />
          )}
        </div>
      </div>
      
      {/* Feature highlights */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl z-10">
        <div className="glass-card p-4 text-center text-white">
          <MapPin className="mx-auto mb-2" />
          <h3 className="font-medium">Find Travelers</h3>
          <p className="text-sm text-white/80">Connect with people heading your way</p>
        </div>
        <div className="glass-card p-4 text-center text-white">
          <Map className="mx-auto mb-2" />
          <h3 className="font-medium">Easy Deliveries</h3>
          <p className="text-sm text-white/80">Get items delivered to remote areas</p>
        </div>
        <div className="glass-card p-4 text-center text-white">
          <Compass className="mx-auto mb-2" />
          <h3 className="font-medium">Earn Rewards</h3>
          <p className="text-sm text-white/80">Help others and earn points</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
