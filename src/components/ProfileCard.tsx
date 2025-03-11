
import { User, Package, Award } from 'lucide-react';
import type { User as UserType } from '../lib/data';

interface ProfileCardProps {
  user: UserType;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <div className="glass-card rounded-xl overflow-hidden animate-fade-in">
      <div className="bg-gradient-to-r from-primary/60 to-primary h-32" />
      <div className="px-6 pb-6 pt-0 -mt-16">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
          <div className="w-24 h-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
            {user.profileImage ? (
              <img 
                src={user.profileImage} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <User className="w-10 h-10 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="p-4 rounded-lg bg-secondary/50 border border-secondary/80">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-primary" />
              <h3 className="font-medium">Deliveries</h3>
            </div>
            <p className="text-2xl font-semibold">{user.completedDeliveries}</p>
            <p className="text-xs text-muted-foreground">Completed deliveries</p>
          </div>
          
          <div className="p-4 rounded-lg bg-secondary/50 border border-secondary/80">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-primary" />
              <h3 className="font-medium">Rewards</h3>
            </div>
            <p className="text-2xl font-semibold">{user.rewardPoints}</p>
            <p className="text-xs text-muted-foreground">Total points earned</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
