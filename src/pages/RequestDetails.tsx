
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Clock, Award, ArrowLeft, Package, CheckCircle, Calendar, User } from 'lucide-react';
import Layout from '../components/Layout';
import { getCurrentUser, getDeliveryRequestById, DeliveryRequest } from '../lib/data';
import { useToast } from '@/hooks/use-toast';

const RequestDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [request, setRequest] = useState<DeliveryRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAccepting, setIsAccepting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Fetch request details
    const fetchRequestDetails = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (!id) {
          throw new Error('Request ID not provided');
        }
        
        const data = getDeliveryRequestById(id);
        if (!data) {
          throw new Error('Request not found');
        }
        
        setRequest(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load request details.',
          variant: 'destructive',
        });
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRequestDetails();
  }, [id, navigate, toast]);
  
  const handleAcceptRequest = async () => {
    setIsAccepting(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would update the request status in the backend
      
      toast({
        title: 'Success',
        description: 'You have accepted this delivery request.',
      });
      
      // Redirect to dashboard
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to accept request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsAccepting(false);
    }
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto">
          <div className="h-64 rounded-xl bg-gray-100/60 animate-pulse mb-4" />
          <div className="h-8 rounded bg-gray-100/60 animate-pulse mb-2 w-1/3" />
          <div className="h-4 rounded bg-gray-100/60 animate-pulse mb-4 w-1/2" />
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-6 rounded bg-gray-100/60 animate-pulse w-full" />
            ))}
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!request) {
    return null;
  }
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto relative">
        {/* Background decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"></div>
        
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to requests
        </Link>
        
        <div className="glass-card rounded-xl overflow-hidden mb-8 animate-fade-in relative z-10">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-24 w-full"></div>
          
          <div className="p-6 -mt-10">
            <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mb-2">
                    {request.status === 'open' ? 'Available' : request.status}
                  </span>
                  <h1 className="text-2xl font-bold">{request.itemName}</h1>
                  <p className="text-muted-foreground">{request.description}</p>
                </div>
                <div className="flex items-center bg-secondary/50 px-3 py-1.5 rounded-lg">
                  <Award className="w-4 h-4 text-primary mr-1" />
                  <span className="font-medium">{request.rewardPoints} points</span>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="glass-card p-5 rounded-xl">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Locations
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mt-1 mr-3">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Pickup Location</p>
                      <p className="text-muted-foreground text-sm">{request.pickupAddress}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mt-1 mr-3">
                      <MapPin className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Drop-off Location</p>
                      <p className="text-muted-foreground text-sm">{request.dropoffAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-5 rounded-xl">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Delivery Details
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-3">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Time Frame</p>
                      <p className="text-muted-foreground text-sm">{request.timeFrame}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mt-1 mr-3">
                      <Calendar className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Posted On</p>
                      <p className="text-muted-foreground text-sm">{new Date(request.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mt-1 mr-3">
                      <User className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium">Posted By</p>
                      <p className="text-muted-foreground text-sm">User #{request.id.substring(0, 8)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleAcceptRequest}
              disabled={isAccepting || request.status !== 'open'}
              className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium py-4 rounded-xl hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isAccepting ? (
                "Processing..."
              ) : request.status !== 'open' ? (
                <span className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Already accepted
                </span>
              ) : (
                "Accept Delivery Request"
              )}
            </button>
          </div>
        </div>
        
        <div className="text-center text-sm text-muted-foreground animate-fade-in">
          <p className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
            By accepting this request, you agree to pick up and deliver the item as described above.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default RequestDetails;
