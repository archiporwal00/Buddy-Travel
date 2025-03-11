
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import RequestForm from '../components/RequestForm';
import { MapPin, Package, Clock, Award } from 'lucide-react';
import { getCurrentUser } from '../lib/data';

const AddRequest = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto relative">
        {/* Background decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"></div>
        
        <div className="mb-8 text-center animate-fade-in relative z-10">
          <span className="inline-block text-xs font-medium bg-primary/10 text-primary uppercase tracking-wider mb-2 px-3 py-1 rounded-full">New Request</span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800 tracking-tight">Add Delivery Request</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Fill out the form below to create a new delivery request
          </p>
        </div>
        
        <div className="glass-card rounded-xl overflow-hidden animate-fade-in relative z-10">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8">
            <div className="grid grid-cols-3 gap-4 text-white">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <Package className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-center">Describe your item</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-center">Set locations</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-center">Offer rewards</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <RequestForm />
          </div>
        </div>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in relative z-10">
          <div className="glass-card p-5 rounded-xl text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium mb-1">Fast Deliveries</h3>
            <p className="text-sm text-muted-foreground">Most items are delivered within 24-48 hours</p>
          </div>
          <div className="glass-card p-5 rounded-xl text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium mb-1">Any Location</h3>
            <p className="text-sm text-muted-foreground">We deliver to remote areas other services don't reach</p>
          </div>
          <div className="glass-card p-5 rounded-xl text-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-medium mb-1">Earn & Spend Points</h3>
            <p className="text-sm text-muted-foreground">Use our reward system to save on future deliveries</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddRequest;
