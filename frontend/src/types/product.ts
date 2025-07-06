export interface Product {
  name: string;
  popularityScore: number;
  weight: number;
  price: number;
  popularity: number;
  images: {
    yellow: string;
    rose: string;
    white: string;
  };
}

export interface ProductApiResponse {
  products: Product[];
  goldPrice: number;
  timestamp: string;
}

export type ColorOption = 'yellow' | 'rose' | 'white';

export interface ColorConfig {
  key: ColorOption;
  label: string;
  bgColor: string;
  textColor: string;
}

export interface FilterOptions {
  minPrice?: number;
  maxPrice?: number;
  minPopularity?: number;
  maxPopularity?: number;
} 