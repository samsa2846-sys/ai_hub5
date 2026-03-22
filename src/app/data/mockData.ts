// Mock data for the B2B marketplace

export interface Factory {
  id: string;
  name: string;
  nameCn?: string;
  level: 'S' | 'G' | 'P';
  rating: number;
  reviewCount: number;
  moq: number;
  image: string;
  description: string;
  legalName?: string;
  registrationNumber?: string;
  address?: string;
  yearEstablished?: number;
  productionCapacity?: string;
  employees?: number;
  certifications?: string[];
  aiScore?: number;
  contactEmail?: string;
  contactPhone?: string;
}

export interface RFQ {
  id: string;
  title: string;
  category: string;
  moq: number;
  targetPrice: string;
  status: 'active' | 'closed' | 'pending';
  createdAt: string;
  responses: number;
}

export interface Chat {
  id: string;
  factoryName: string;
  factoryAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages?: Message[];
}

export interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  textEn?: string;
  time: string;
}

export interface Deal {
  id: string;
  number: string;
  factoryName: string;
  amount: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
}

export const mockFactories: Factory[] = [
  {
    id: '1',
    name: 'Shanghai Textile Manufacturing',
    nameCn: '上海纺织制造有限公司',
    level: 'P',
    rating: 4.8,
    reviewCount: 245,
    moq: 500,
    image: 'https://images.unsplash.com/photo-1567137711203-38cf3487fc3d',
    description: 'Leading textile manufacturer specializing in custom fabrics',
    legalName: 'Shanghai Textile Manufacturing Co., Ltd.',
    registrationNumber: '91310000123456789X',
    address: 'No. 123, Textile Road, Pudong District, Shanghai',
    yearEstablished: 1998,
    productionCapacity: '500,000 meters/month',
    employees: 350,
    certifications: ['ISO 9001', 'OEKO-TEX', 'GOTS'],
    aiScore: 94,
    contactEmail: 'sales@shanghai-textile.cn',
    contactPhone: '+86 21 1234 5678',
  },
  {
    id: '2',
    name: 'Guangzhou Electronics Factory',
    nameCn: '广州电子工厂',
    level: 'G',
    rating: 4.5,
    reviewCount: 182,
    moq: 1000,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837',
    description: 'Professional electronics manufacturing and assembly',
    legalName: 'Guangzhou Electronics Manufacturing Ltd.',
    registrationNumber: '91440000987654321Y',
    address: 'Tech Park, Tianhe District, Guangzhou',
    yearEstablished: 2005,
    productionCapacity: '100,000 units/month',
    employees: 220,
    certifications: ['ISO 9001', 'CE', 'RoHS'],
    aiScore: 87,
  },
  {
    id: '3',
    name: 'Shenzhen Smart Devices',
    nameCn: '深圳智能设备公司',
    level: 'P',
    rating: 4.9,
    reviewCount: 312,
    moq: 300,
    image: 'https://images.unsplash.com/photo-1581092160607-ee67e3e5e5c9',
    description: 'IoT and smart device manufacturing excellence',
    legalName: 'Shenzhen Smart Devices Technology Co., Ltd.',
    registrationNumber: '91440300567891234Z',
    address: 'Innovation Center, Nanshan District, Shenzhen',
    yearEstablished: 2012,
    productionCapacity: '200,000 devices/month',
    employees: 450,
    certifications: ['ISO 9001', 'FCC', 'CE', 'UL'],
    aiScore: 96,
  },
  {
    id: '4',
    name: 'Beijing Furniture Works',
    nameCn: '北京家具厂',
    level: 'S',
    rating: 4.3,
    reviewCount: 98,
    moq: 200,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
    description: 'Quality furniture manufacturing for commercial spaces',
    yearEstablished: 2015,
    employees: 120,
    aiScore: 78,
  },
  {
    id: '5',
    name: 'Hangzhou Packaging Solutions',
    nameCn: '杭州包装解决方案',
    level: 'G',
    rating: 4.6,
    reviewCount: 156,
    moq: 5000,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
    description: 'Custom packaging and printing services',
    yearEstablished: 2008,
    employees: 180,
    aiScore: 82,
  },
  {
    id: '6',
    name: 'Dongguan Plastics Manufacturing',
    nameCn: '东莞塑料制造',
    level: 'S',
    rating: 4.2,
    reviewCount: 67,
    moq: 2000,
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4',
    description: 'Injection molding and plastic parts production',
    yearEstablished: 2010,
    employees: 95,
    aiScore: 75,
  },
  {
    id: '7',
    name: 'Ningbo Hardware Factory',
    nameCn: '宁波五金厂',
    level: 'G',
    rating: 4.7,
    reviewCount: 203,
    moq: 1000,
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1',
    description: 'Metal fabrication and hardware components',
    yearEstablished: 2002,
    employees: 280,
    aiScore: 85,
  },
  {
    id: '8',
    name: 'Xiamen Cosmetics OEM',
    nameCn: '厦门化妆品代工',
    level: 'P',
    rating: 4.8,
    reviewCount: 267,
    moq: 500,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03',
    description: 'Private label cosmetics and skincare manufacturing',
    yearEstablished: 2006,
    employees: 320,
    aiScore: 91,
  },
  {
    id: '9',
    name: 'Suzhou Garment Factory',
    nameCn: '苏州服装厂',
    level: 'G',
    rating: 4.4,
    reviewCount: 134,
    moq: 300,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
    description: 'Fashion apparel and custom clothing production',
    yearEstablished: 2011,
    employees: 200,
    aiScore: 80,
  },
  {
    id: '10',
    name: 'Chengdu Food Processing',
    nameCn: '成都食品加工',
    level: 'S',
    rating: 4.1,
    reviewCount: 89,
    moq: 1000,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d',
    description: 'Food processing and packaging services',
    yearEstablished: 2014,
    employees: 150,
    aiScore: 73,
  },
];

export const mockRFQs: RFQ[] = [
  {
    id: 'rfq1',
    title: 'Custom Cotton T-Shirts',
    category: 'Textiles',
    moq: 1000,
    targetPrice: '$3-5',
    status: 'active',
    createdAt: '2026-03-18',
    responses: 12,
  },
  {
    id: 'rfq2',
    title: 'Bluetooth Headphones OEM',
    category: 'Electronics',
    moq: 500,
    targetPrice: '$15-20',
    status: 'active',
    createdAt: '2026-03-15',
    responses: 8,
  },
  {
    id: 'rfq3',
    title: 'Cardboard Packaging Boxes',
    category: 'Packaging',
    moq: 5000,
    targetPrice: '$0.5-0.8',
    status: 'pending',
    createdAt: '2026-03-10',
    responses: 5,
  },
  {
    id: 'rfq4',
    title: 'Office Chairs',
    category: 'Furniture',
    moq: 200,
    targetPrice: '$80-120',
    status: 'closed',
    createdAt: '2026-02-28',
    responses: 15,
  },
];

export const mockChats: Chat[] = [
  {
    id: 'chat1',
    factoryName: 'Shanghai Textile Manufacturing',
    factoryAvatar: 'https://images.unsplash.com/photo-1567137711203-38cf3487fc3d',
    lastMessage: '我们可以提供这个价格',
    lastMessageTime: '10:35',
    unreadCount: 2,
  },
  {
    id: 'chat2',
    factoryName: 'Shenzhen Smart Devices',
    factoryAvatar: 'https://images.unsplash.com/photo-1581092160607-ee67e3e5e5c9',
    lastMessage: 'Sample is ready for shipping',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: 'chat3',
    factoryName: 'Guangzhou Electronics Factory',
    factoryAvatar: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837',
    lastMessage: '请查收报价单',
    lastMessageTime: 'Mar 19',
    unreadCount: 1,
  },
];

export const mockMessages: Message[] = [
  {
    id: 'msg1',
    sender: 'them',
    text: '你好，我们可以生产你需要的产品',
    textEn: 'Hello, we can manufacture the products you need',
    time: '10:30',
  },
  {
    id: 'msg2',
    sender: 'me',
    text: 'What is your MOQ and lead time?',
    time: '10:32',
  },
  {
    id: 'msg3',
    sender: 'them',
    text: '最小起订量是500件，交货期30天',
    textEn: 'MOQ is 500 pieces, lead time is 30 days',
    time: '10:35',
  },
];

export const mockDeals: Deal[] = [
  {
    id: 'deal1',
    number: 'DL-2026-0318-001',
    factoryName: 'Shanghai Textile Manufacturing',
    amount: 15000,
    status: 'pending',
    createdAt: '2026-03-18',
  },
  {
    id: 'deal2',
    number: 'DL-2026-0315-002',
    factoryName: 'Shenzhen Smart Devices',
    amount: 28500,
    status: 'active',
    createdAt: '2026-03-15',
  },
  {
    id: 'deal3',
    number: 'DL-2026-0310-003',
    factoryName: 'Guangzhou Electronics Factory',
    amount: 12000,
    status: 'completed',
    createdAt: '2026-03-10',
  },
  {
    id: 'deal4',
    number: 'DL-2026-0305-004',
    factoryName: 'Hangzhou Packaging Solutions',
    amount: 8500,
    status: 'completed',
    createdAt: '2026-03-05',
  },
];

export const userProfile = {
  name: 'Alex Johnson',
  email: 'alex@company.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  stars: 125,
  points: 450,
  level: 3,
  levelProgress: 65, // percentage to next level
};
