
// Types
export type User = {
  id: string;
  name: string;
  email: string;
  password: string; // Note: In a real app, never store plain text passwords
  profileImage?: string;
  completedDeliveries: number;
  rewardPoints: number;
};

export type DeliveryRequest = {
  id: string;
  itemName: string;
  description: string;
  pickupAddress: string;
  dropoffAddress: string;
  location: string;
  rewardPoints: number;
  timeFrame: string;
  status: 'open' | 'assigned' | 'completed';
  requesterId: string;
  assignedUserId?: string;
  createdAt: string;
};

// Mock data
export const users: User[] = [
  {
    id: "user1",
    name: "Alex Johnson",
    email: "alex@example.com",
    password: "password123",
    profileImage: "https://i.pravatar.cc/150?img=1",
    completedDeliveries: 12,
    rewardPoints: 240,
  },
  {
    id: "user2",
    name: "Emma Davis",
    email: "emma@example.com",
    password: "password123",
    profileImage: "https://i.pravatar.cc/150?img=5",
    completedDeliveries: 8,
    rewardPoints: 160,
  },
];

export const deliveryRequests: DeliveryRequest[] = [
  {
    id: "req1",
    itemName: "Groceries",
    description: "A few essential groceries including fresh vegetables and milk",
    pickupAddress: "123 Market St, Alpine Village",
    dropoffAddress: "456 Pine Rd, Mountain View",
    location: "Alpine Village",
    rewardPoints: 30,
    timeFrame: "Today, 2-5 PM",
    status: "open",
    requesterId: "user2",
    createdAt: "2023-10-15T10:30:00Z",
  },
  {
    id: "req2",
    itemName: "Medicine",
    description: "Prescription medications from the pharmacy",
    pickupAddress: "789 Health Ave, Downtown",
    dropoffAddress: "101 Maple St, Riverside",
    location: "Riverside",
    rewardPoints: 40,
    timeFrame: "Tomorrow, 9-11 AM",
    status: "open",
    requesterId: "user1",
    createdAt: "2023-10-14T16:20:00Z",
  },
  {
    id: "req3",
    itemName: "Electronics",
    description: "A laptop charger from the electronics store",
    pickupAddress: "202 Tech Blvd, City Center",
    dropoffAddress: "303 Oak Dr, Highland Park",
    location: "Highland Park",
    rewardPoints: 25,
    timeFrame: "Oct 20, 1-3 PM",
    status: "open",
    requesterId: "user2",
    createdAt: "2023-10-13T09:15:00Z",
  },
  {
    id: "req4",
    itemName: "Books",
    description: "Two textbooks from the university bookstore",
    pickupAddress: "404 College Rd, University District",
    dropoffAddress: "505 Scholar St, Westside",
    location: "Westside",
    rewardPoints: 20,
    timeFrame: "Oct 19, 4-6 PM",
    status: "open",
    requesterId: "user1",
    createdAt: "2023-10-12T14:50:00Z",
  },
  {
    id: "req5",
    itemName: "Package",
    description: "A small package from the post office",
    pickupAddress: "606 Mail St, Downtown",
    dropoffAddress: "707 Delivery Ave, Northside",
    location: "Northside",
    rewardPoints: 35,
    timeFrame: "Oct 21, 10-12 AM",
    status: "open",
    requesterId: "user2",
    createdAt: "2023-10-11T11:40:00Z",
  },
  {
    id: "req6",
    itemName: "Art Supplies",
    description: "Canvas and paints from the art store",
    pickupAddress: "808 Creative Blvd, Arts District",
    dropoffAddress: "909 Painter St, Eastside",
    location: "Eastside",
    rewardPoints: 30,
    timeFrame: "Oct 22, 3-5 PM",
    status: "open",
    requesterId: "user1",
    createdAt: "2023-10-10T13:25:00Z",
  },
];

// Simple authentication functions for demo purposes
let currentUser: User | null = null;

export const getCurrentUser = () => currentUser;

export const loginUser = (email: string, password: string): User | null => {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  return null;
};

export const registerUser = (name: string, email: string, password: string): User | null => {
  // Check if email already exists
  if (users.some(u => u.email === email)) {
    return null;
  }
  
  // Create new user
  const newUser: User = {
    id: `user${users.length + 1}`,
    name,
    email,
    password,
    completedDeliveries: 0,
    rewardPoints: 0,
  };
  
  users.push(newUser);
  currentUser = newUser;
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  return newUser;
};

export const logoutUser = () => {
  currentUser = null;
  localStorage.removeItem('currentUser');
};

export const getDeliveryRequests = () => {
  return deliveryRequests;
};

export const getDeliveryRequestById = (id: string) => {
  return deliveryRequests.find(req => req.id === id);
};

export const addDeliveryRequest = (request: Omit<DeliveryRequest, 'id' | 'status' | 'createdAt' | 'requesterId'>): DeliveryRequest => {
  const newRequest: DeliveryRequest = {
    ...request,
    id: `req${deliveryRequests.length + 1}`,
    status: 'open',
    createdAt: new Date().toISOString(),
    requesterId: currentUser?.id || 'unknown',
  };
  
  deliveryRequests.unshift(newRequest);
  return newRequest;
};
