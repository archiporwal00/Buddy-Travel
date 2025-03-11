
import { MapPin, Clock, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { DeliveryRequest } from '../lib/data';

interface DeliveryCardProps {
  request: DeliveryRequest;
}

const DeliveryCard = ({ request }: DeliveryCardProps) => {
  return (
    <Link 
      to={`/request/${request.id}`}
      className="block w-full animate-slide-in-bottom"
      style={{ 
        animationDelay: `${Math.random() * 0.3}s`,
        animationFillMode: 'both'
      }}
    >
      <div className="glass-card rounded-xl overflow-hidden hover-scale transition-all duration-300 h-full">
        <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mb-2">
                {request.status === 'open' ? 'Available' : request.status}
              </span>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{request.itemName}</h3>
            </div>
            <div className="flex items-center bg-secondary/70 px-2.5 py-1 rounded-lg">
              <Award className="w-4 h-4 text-primary mr-1" />
              <span className="font-medium text-sm">{request.rewardPoints} pts</span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{request.description}</p>
          
          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                <MapPin className="w-3 h-3 text-blue-600" />
              </div>
              <span className="truncate">{request.location}</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                <Clock className="w-3 h-3 text-green-600" />
              </div>
              <span className="truncate">{request.timeFrame}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-2">
            <span className="text-xs text-gray-500">{new Date(request.createdAt).toLocaleDateString()}</span>
            <span className="text-xs text-primary font-medium flex items-center">
              View Details
              <ArrowRight className="w-3 h-3 ml-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DeliveryCard;
