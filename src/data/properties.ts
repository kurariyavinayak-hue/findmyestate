export interface Property {
  id: string;
  title: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  type: 'house' | 'apartment' | 'condo' | 'land' | 'commercial';
  bedrooms: number;
  bathrooms: number;
  area: number; // square feet
  description: string;
  images: string[];
  featured: boolean;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  sellerPhone: string;
  listedDate: string;
  status: 'available' | 'pending' | 'sold';
}

export const dummyProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa with Ocean View',
    price: 1250000,
    location: {
      address: '123 Coastal Drive',
      city: 'Miami Beach',
      state: 'FL',
      zipCode: '33139',
    },
    type: 'house',
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    description: 'Stunning modern villa featuring panoramic ocean views, open-concept living spaces, chef\'s kitchen with top-of-the-line appliances, infinity pool, and private beach access. Perfect for luxury coastal living.',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    ],
    featured: true,
    sellerId: 'seller1',
    sellerName: 'John Martinez',
    sellerEmail: 'john.martinez@realestate.com',
    sellerPhone: '(305) 555-0123',
    listedDate: '2024-10-15',
    status: 'available',
  },
  {
    id: '2',
    title: 'Downtown Penthouse Apartment',
    price: 875000,
    location: {
      address: '456 Metropolitan Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    },
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 2200,
    description: 'Luxury penthouse in the heart of Manhattan with floor-to-ceiling windows, modern finishes, rooftop terrace, and breathtaking city skyline views. Walking distance to Central Park.',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
    featured: true,
    sellerId: 'seller2',
    sellerName: 'Sarah Johnson',
    sellerEmail: 'sarah.j@properties.com',
    sellerPhone: '(212) 555-0456',
    listedDate: '2024-10-20',
    status: 'available',
  },
  {
    id: '3',
    title: 'Charming Suburban Family Home',
    price: 425000,
    location: {
      address: '789 Maple Street',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
    },
    type: 'house',
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    description: 'Beautiful family home in quiet neighborhood with spacious backyard, updated kitchen, hardwood floors, and attached two-car garage. Close to top-rated schools and parks.',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800',
    ],
    featured: true,
    sellerId: 'seller3',
    sellerName: 'Michael Chen',
    sellerEmail: 'mchen@homes.com',
    sellerPhone: '(512) 555-0789',
    listedDate: '2024-10-18',
    status: 'available',
  },
  {
    id: '4',
    title: 'Cozy Downtown Condo',
    price: 325000,
    location: {
      address: '321 Urban Plaza',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
    },
    type: 'condo',
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    description: 'Modern condo in vibrant downtown location with granite countertops, stainless steel appliances, in-unit laundry, and building amenities including gym and rooftop lounge.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800',
    ],
    featured: false,
    sellerId: 'seller4',
    sellerName: 'Emily Rodriguez',
    sellerEmail: 'emily.r@condos.com',
    sellerPhone: '(206) 555-0234',
    listedDate: '2024-10-22',
    status: 'available',
  },
  {
    id: '5',
    title: 'Spacious Ranch Estate',
    price: 950000,
    location: {
      address: '555 Country Lane',
      city: 'Denver',
      state: 'CO',
      zipCode: '80202',
    },
    type: 'house',
    bedrooms: 6,
    bathrooms: 5,
    area: 5800,
    description: 'Magnificent ranch-style estate on 5 acres with mountain views, gourmet kitchen, wine cellar, home theater, and guest house. Perfect for entertaining and rural living.',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    ],
    featured: false,
    sellerId: 'seller5',
    sellerName: 'David Thompson',
    sellerEmail: 'dthompson@estates.com',
    sellerPhone: '(303) 555-0567',
    listedDate: '2024-10-12',
    status: 'available',
  },
  {
    id: '6',
    title: 'Modern Loft in Arts District',
    price: 575000,
    location: {
      address: '890 Gallery Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90012',
    },
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1800,
    description: 'Industrial-chic loft with exposed brick, high ceilings, concrete floors, and oversized windows. Located in the heart of the Arts District with galleries and restaurants nearby.',
    images: [
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
    ],
    featured: false,
    sellerId: 'seller2',
    sellerName: 'Sarah Johnson',
    sellerEmail: 'sarah.j@properties.com',
    sellerPhone: '(213) 555-0890',
    listedDate: '2024-10-25',
    status: 'available',
  },
];
