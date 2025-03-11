
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDeliveryRequest } from '../lib/data';
import { useToast } from '@/hooks/use-toast';

const RequestForm = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [location, setLocation] = useState('');
  const [rewardPoints, setRewardPoints] = useState(20);
  const [timeFrame, setTimeFrame] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRequest = addDeliveryRequest({
        itemName,
        description,
        pickupAddress,
        dropoffAddress,
        location,
        rewardPoints,
        timeFrame,
      });
      
      toast({
        title: 'Success',
        description: 'Your delivery request has been created.',
      });
      
      navigate(`/request/${newRequest.id}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create delivery request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="itemName" className="block text-sm font-medium mb-1">
            Item Name
          </label>
          <input
            id="itemName"
            type="text"
            value={itemName}
            onChange={e => setItemName(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Groceries, Medicine, etc."
            required
          />
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            General Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Mountain Village, Riverside, etc."
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Brief description of the item(s)"
          rows={3}
          required
        />
      </div>
      
      <div>
        <label htmlFor="pickupAddress" className="block text-sm font-medium mb-1">
          Pickup Address
        </label>
        <input
          id="pickupAddress"
          type="text"
          value={pickupAddress}
          onChange={e => setPickupAddress(e.target.value)}
          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="123 Market St, Alpine Village"
          required
        />
      </div>
      
      <div>
        <label htmlFor="dropoffAddress" className="block text-sm font-medium mb-1">
          Drop-off Address
        </label>
        <input
          id="dropoffAddress"
          type="text"
          value={dropoffAddress}
          onChange={e => setDropoffAddress(e.target.value)}
          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="456 Pine Rd, Mountain View"
          required
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="timeFrame" className="block text-sm font-medium mb-1">
            Delivery Time Frame
          </label>
          <input
            id="timeFrame"
            type="text"
            value={timeFrame}
            onChange={e => setTimeFrame(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Today, 2-5 PM"
            required
          />
        </div>
        
        <div>
          <label htmlFor="rewardPoints" className="block text-sm font-medium mb-1">
            Reward Points (20-50)
          </label>
          <input
            id="rewardPoints"
            type="number"
            min={20}
            max={50}
            value={rewardPoints}
            onChange={e => setRewardPoints(Number(e.target.value))}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
        >
          {isLoading ? 'Creating...' : 'Create Request'}
        </button>
      </div>
    </form>
  );
};

export default RequestForm;
