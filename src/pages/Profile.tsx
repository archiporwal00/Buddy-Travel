
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ProfileCard from '../components/ProfileCard';
import { MapPin, User, Calendar, Phone, Mail, Edit } from 'lucide-react';
import { getCurrentUser } from '../lib/data';

const Profile = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  
  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  if (!user) {
    return null;
  }
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto relative">
        {/* Background decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"></div>
        
        <div className="mb-8 text-center animate-fade-in relative z-10">
          <span className="inline-block text-xs font-medium bg-primary/10 text-primary uppercase tracking-wider mb-2 px-3 py-1 rounded-full">My Profile</span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800 tracking-tight">Account Details</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            View your profile and delivery history
          </p>
        </div>
        
        <ProfileCard user={user} />
        
        <div className="mt-10 glass-card rounded-xl animate-fade-in relative z-10">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <button className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors">
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email Address</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 p-6">
            <h3 className="font-medium mb-4">Recent Activity</h3>
            
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Delivered a package to Mountain View</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                  <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">+25 pts</span>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 text-center text-sm text-primary hover:text-primary/80 transition-colors">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
