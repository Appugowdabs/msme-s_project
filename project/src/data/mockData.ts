import { User, Sector, BusinessOwner, Reward, Fine, Vendor, Reel } from '../context/AppContext';

export const mockUser: User = {
  id: '1',
  name: 'Rajesh Kumar',
  email: 'rajesh@example.com',
  phone: '+91 9876543210',
  businessName: 'Green Textiles',
  sector: 'Textile',
  profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  sustainabilityScore: 78,
};

export const mockSectors: Sector[] = [
  {
    id: '1',
    name: 'Manufacturing',
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg',
    description: 'Small-scale manufacturing units producing goods with sustainable practices.'
  },
  {
    id: '2',
    name: 'F&B',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
    description: 'Food and beverage businesses focusing on local sourcing and minimal waste.'
  },
  {
    id: '3',
    name: 'Textile',
    image: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg',
    description: 'Textile production and garment manufacturing with eco-friendly materials.'
  },
  {
    id: '4',
    name: 'Recycling',
    image: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg',
    description: 'Waste management and recycling businesses turning waste into value.'
  },
  {
    id: '5',
    name: 'Agriculture',
    image: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg',
    description: 'Sustainable farming practices and agricultural innovations.'
  },
  {
    id: '6',
    name: 'Retail',
    image: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg',
    description: 'Small retail businesses adopting green packaging and sustainable products.'
  },
];

export const mockBusinessOwners: BusinessOwner[] = [
  {
    id: '1',
    name: 'Anita Sharma',
    business: 'EcoWeave Textiles',
    sector: 'Textile',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    story: 'Transformed her small textile business by switching to organic cotton and natural dyes, reducing water usage by 60%.'
  },
  {
    id: '2',
    name: 'Vikram Singh',
    business: 'GreenHarvest Farms',
    sector: 'Agriculture',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    story: 'Implemented sustainable farming practices and reduced chemical usage, increasing profits by 35%.'
  },
  {
    id: '3',
    name: 'Priya Patel',
    business: 'RecycleTech',
    sector: 'Recycling',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    story: 'Built a small recycling business that now processes 5 tons of e-waste monthly, creating 15 local jobs.'
  },
  {
    id: '4',
    name: 'Mohammed Khan',
    business: 'Spice Delight',
    sector: 'F&B',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    story: 'Transformed his restaurant to use sustainable packaging and local ingredients, cutting costs by 25%.'
  },
  {
    id: '5',
    name: 'Lakshmi Reddy',
    business: 'GreenMakers',
    sector: 'Manufacturing',
    image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg',
    story: 'Converted her small manufacturing unit to solar power, reducing energy costs by 40% in the first year.'
  },
];

export const mockRewards: Reward[] = [
  {
    id: '1',
    title: 'Green Business Certificate',
    description: 'Official recognition for sustainable business practices',
    points: 500,
    image: 'https://images.pexels.com/photos/8112139/pexels-photo-8112139.jpeg',
    expiryDate: '2025-12-31',
  },
  {
    id: '2',
    title: '20% Off Solar Panels',
    description: 'Discount on solar panel installation from GreenEnergy',
    points: 750,
    image: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg',
    expiryDate: '2025-06-30',
  },
  {
    id: '3',
    title: 'Tax Benefit Voucher',
    description: 'Eligible for additional tax benefits on your next filing',
    points: 1000,
    image: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg',
    expiryDate: '2025-03-31',
  },
  {
    id: '4',
    title: 'Free Business Consultation',
    description: '2-hour session with a sustainability expert',
    points: 350,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
  },
];

export const mockFines: Fine[] = [
  {
    id: '1',
    title: 'Excess Plastic Usage',
    description: 'Exceeded monthly plastic waste limit by 30kg',
    amount: 5000,
    dueDate: '2024-07-15',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Improper Waste Disposal',
    description: 'Chemical waste not properly segregated',
    amount: 7500,
    dueDate: '2024-07-10',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Water Pollution Warning',
    description: 'Detected excess chemicals in wastewater',
    amount: 10000,
    dueDate: '2024-06-30',
    status: 'appealed',
  },
  {
    id: '4',
    title: 'Missing Documentation',
    description: 'Failed to submit monthly compliance report',
    amount: 2500,
    dueDate: '2024-06-15',
    status: 'paid',
  },
];

export const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'GreenWaste Solutions',
    service: 'Plastic Recycling',
    address: 'Sector 7, Industrial Area, Gurgaon',
    distance: '3.5 km',
    rating: 4.5,
    contact: '+91 98765 43210',
    image: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg',
  },
  {
    id: '2',
    name: 'EcoDisposal',
    service: 'E-Waste Collection',
    address: 'Plot 45, MIDC, Andheri East, Mumbai',
    distance: '5.2 km',
    rating: 4.3,
    contact: '+91 87654 32109',
    image: 'https://images.pexels.com/photos/159751/book-address-book-learning-read-159751.jpeg',
  },
  {
    id: '3',
    name: 'Textile Recyclers',
    service: 'Fabric Waste Management',
    address: 'Gandhi Nagar, Tirupur',
    distance: '1.8 km',
    rating: 4.7,
    contact: '+91 76543 21098',
    image: 'https://images.pexels.com/photos/1998927/pexels-photo-1998927.jpeg',
  },
  {
    id: '4',
    name: 'BioDegradables',
    service: 'Food Waste Composting',
    address: 'HSR Layout, Bangalore',
    distance: '4.0 km',
    rating: 4.1,
    contact: '+91 65432 10987',
    image: 'https://images.pexels.com/photos/2284170/pexels-photo-2284170.jpeg',
  },
];

export const mockReels: Reel[] = [
  {
    id: '1',
    title: 'Zero Waste Manufacturing',
    description: 'How we reduced our waste by 90% in 6 months',
    videoUrl: 'https://example.com/videos/reel1.mp4', // This would be a real video URL in production
    thumbnailUrl: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg',
    likes: 1245,
    comments: 78,
    author: 'Anita Sharma',
    authorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
  },
  {
    id: '2',
    title: 'Solar Panels Saved Us ₹15000/month',
    description: 'Our small printing business installed solar panels - here are the results',
    videoUrl: 'https://example.com/videos/reel2.mp4',
    thumbnailUrl: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg',
    likes: 832,
    comments: 44,
    author: 'Vikram Singh',
    authorImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
  },
  {
    id: '3',
    title: 'Organic Fertilizers Changed Everything',
    description: 'We switched to organic farming and our yields increased by 20%',
    videoUrl: 'https://example.com/videos/reel3.mp4',
    thumbnailUrl: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg',
    likes: 967,
    comments: 56,
    author: 'Priya Patel',
    authorImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
  },
  {
    id: '4',
    title: 'Eco-Friendly Packaging',
    description: 'How we eliminated plastic from our food packaging',
    videoUrl: 'https://example.com/videos/reel4.mp4',
    thumbnailUrl: 'https://images.pexels.com/photos/5217683/pexels-photo-5217683.jpeg',
    likes: 1534,
    comments: 92,
    author: 'Mohammed Khan',
    authorImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
  },
];

export const mockHealthTips = [
  {
    id: '1',
    title: 'Ventilation in Textile Units',
    description: 'Proper ventilation can reduce respiratory issues caused by fabric dust. Install exhaust fans and ensure air circulation.',
    image: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg',
  },
  {
    id: '2',
    title: 'Protective Equipment for Manufacturing',
    description: 'Always use gloves, masks, and eye protection when handling chemicals or operating machinery.',
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg',
  },
  {
    id: '3',
    title: 'Food Handling Safety',
    description: 'Regular hand washing and proper food storage prevents contamination and illness in F&B businesses.',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
  },
  {
    id: '4',
    title: 'Regular Health Checkups',
    description: 'Schedule bi-annual health checkups for all workers to detect occupational health issues early.',
    image: 'https://images.pexels.com/photos/5214949/pexels-photo-5214949.jpeg',
  },
];

export const mockHealthCamps = [
  {
    id: '1',
    title: 'Free Eye Checkup Camp',
    location: 'Gandhi Nagar Community Hall',
    date: '2024-07-20',
    time: '9:00 AM - 4:00 PM',
    organizer: 'Ministry of Health & Family Welfare',
    contact: '+91 98765 43210',
  },
  {
    id: '2',
    title: 'Respiratory Health Assessment',
    location: 'Industrial Area Medical Center',
    date: '2024-07-25',
    time: '10:00 AM - 5:00 PM',
    organizer: 'Lung Care Foundation',
    contact: '+91 87654 32109',
  },
  {
    id: '3',
    title: "Women's Health Awareness",
    location: 'District Hospital',
    date: '2024-08-05',
    time: '9:00 AM - 3:00 PM',
    organizer: "Women's Health Initiative",
    contact: '+91 76543 21098',
  },
];