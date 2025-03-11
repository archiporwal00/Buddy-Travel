
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Package, Clock, ArrowRight } from 'lucide-react';
import DeliveryCard from '../components/DeliveryCard';
import Layout from '../components/Layout';
import { getCurrentUser, getDeliveryRequests, DeliveryRequest } from '../lib/data';

const Index = () => {
  const [requests, setRequests] = useState<DeliveryRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<DeliveryRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Fetch delivery requests
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = getDeliveryRequests();
        setRequests(data);
        setFilteredRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRequests();
  }, [navigate]);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRequests(requests);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = requests.filter(
        request =>
          request.itemName.toLowerCase().includes(query) ||
          request.location.toLowerCase().includes(query) ||
          request.description.toLowerCase().includes(query)
      );
      setFilteredRequests(filtered);
    }
  }, [searchQuery, requests]);
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto relative">
        {/* Background decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"></div>
        
        <div className="mb-10 text-center animate-fade-in relative z-10">
          <span className="inline-block text-xs font-medium bg-primary/10 text-primary uppercase tracking-wider mb-2 px-3 py-1 rounded-full">Find Deliveries</span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800 tracking-tight">Delivery Requests</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Help fellow travelers with small deliveries and earn reward points to use for your own requests.
          </p>
        </div>
        
        <div className="relative mb-10 animate-fade-in glass-card p-2 rounded-xl max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-3 bg-transparent border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-gray-400 text-gray-700"
            placeholder="Search by item, location, or description"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        
        {isLoading ? (
          <div className="space-y-6 max-w-4xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-40 rounded-xl bg-gray-100/60 animate-pulse" />
            ))}
          </div>
        ) : filteredRequests.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {filteredRequests.map(request => (
              <DeliveryCard key={request.id} request={request} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in glass-card rounded-xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">No delivery requests found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchQuery ? "Try a different search term" : "Check back later for new requests"}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300"
              >
                Clear search
              </button>
            )}
          </div>
        )}
        
        {!isLoading && filteredRequests.length > 0 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => navigate('/add-request')}
              className="group flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 font-medium"
            >
              Create New Request
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
