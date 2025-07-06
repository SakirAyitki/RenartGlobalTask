import axios from 'axios';
import type { ProductApiResponse } from '../types/product';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const productApi = {
  // Get all products
  getAllProducts: async (): Promise<ProductApiResponse> => {
    const response = await api.get<ProductApiResponse>('/products');
    return response.data;
  },

  // Get filtered products (bonus feature)
  getFilteredProducts: async (filters: {
    minPrice?: number;
    maxPrice?: number;
    minPopularity?: number;
    maxPopularity?: number;
  }): Promise<ProductApiResponse> => {
    const params = new URLSearchParams();
    
    if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice.toString());
    if (filters.minPopularity !== undefined) params.append('minPopularity', filters.minPopularity.toString());
    if (filters.maxPopularity !== undefined) params.append('maxPopularity', filters.maxPopularity.toString());

    const response = await api.get<ProductApiResponse>(`/products/filtered?${params.toString()}`);
    return response.data;
  },
};

export default api; 