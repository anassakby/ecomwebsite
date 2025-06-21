export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  slug: string;
  name: string;
}

export interface FilterState {
  search: string;
  category: string;
  priceRange: [number, number];
  sortBy: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating-desc' | '';
}
