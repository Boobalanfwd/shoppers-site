// Static data based on Prisma schema

export const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
]

export const products = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    description: 'Comfortable and stylish cotton t-shirt perfect for everyday wear',
    category: 'Clothing',
    brand: 'StyleCo',
    imageUrl: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    discount: 15,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    variants: [
      {
        id: '1',
        sku: 'TCO-001-S-BLU',
        size: 'S',
        color: 'Blue',
        price: 29.99,
        stock: 50,
        attributes: [
          { id: '1', name: 'Material', value: 'Cotton' },
          { id: '2', name: 'Fit', value: 'Regular' },
        ]
      },
      {
        id: '2',
        sku: 'TCO-001-M-BLU',
        size: 'M',
        color: 'Blue',
        price: 29.99,
        stock: 75,
        attributes: [
          { id: '3', name: 'Material', value: 'Cotton' },
          { id: '4', name: 'Fit', value: 'Regular' },
        ]
      },
    ]
  },
  {
    id: '2',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Electronics',
    brand: 'AudioTech',
    imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    discount: 25,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    variants: [
      {
        id: '3',
        sku: 'WBH-002-BLK',
        size: null,
        color: 'Black',
        price: 199.99,
        stock: 30,
        attributes: [
          { id: '5', name: 'Battery Life', value: '30 hours' },
          { id: '6', name: 'Connectivity', value: 'Bluetooth 5.0' },
        ]
      },
    ]
  },
  {
    id: '3',
    name: 'Leather Wallet',
    description: 'Genuine leather wallet with multiple card slots',
    category: 'Accessories',
    brand: 'LeatherCraft',
    imageUrl: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
    discount: null,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    variants: [
      {
        id: '4',
        sku: 'LW-003-BRN',
        size: null,
        color: 'Brown',
        price: 79.99,
        stock: 25,
        attributes: [
          { id: '7', name: 'Material', value: 'Genuine Leather' },
          { id: '8', name: 'Card Slots', value: '8' },
        ]
      },
    ]
  },
]

export const orders = [
  {
    id: '1',
    userId: '1',
    status: 'delivered',
    totalPrice: 109.97,
    paymentMethod: 'card',
    shippingName: 'John Doe',
    shippingPhone: '+1234567890',
    shippingLine1: '123 Main St',
    shippingLine2: 'Apt 4B',
    shippingCity: 'New York',
    shippingState: 'NY',
    shippingPostal: '10001',
    shippingCountry: 'USA',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-18'),
    items: [
      {
        id: '1',
        variantId: '1',
        quantity: 2,
        price: 29.99,
      },
      {
        id: '2',
        variantId: '4',
        quantity: 1,
        price: 79.99,
      },
    ]
  },
  {
    id: '2',
    userId: '2',
    status: 'shipped',
    totalPrice: 199.99,
    paymentMethod: 'cod',
    shippingName: 'Jane Smith',
    shippingPhone: '+1987654321',
    shippingLine1: '456 Oak Ave',
    shippingLine2: null,
    shippingCity: 'Los Angeles',
    shippingState: 'CA',
    shippingPostal: '90210',
    shippingCountry: 'USA',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-21'),
    items: [
      {
        id: '3',
        variantId: '3',
        quantity: 1,
        price: 199.99,
      },
    ]
  },
]

export const shippingAddresses = [
  {
    id: '1',
    userId: '1',
    fullName: 'John Doe',
    phone: '+1234567890',
    addressLine1: '123 Main St',
    addressLine2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'USA',
    isDefault: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
]

export const notifications = [
  {
    id: '1',
    userId: '1',
    type: 'order',
    title: 'Order Delivered',
    message: 'Your order #1 has been delivered successfully',
    isRead: false,
    createdAt: new Date('2024-01-18'),
  },
  {
    id: '2',
    userId: '2',
    type: 'promotion',
    title: 'Special Offer',
    message: '25% off on all electronics this weekend!',
    isRead: true,
    createdAt: new Date('2024-01-19'),
  },
]
