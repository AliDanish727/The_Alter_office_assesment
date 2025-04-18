import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async (params: {
  page?: number;
  limit?: number;
  category?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getCart = async () => {
  const response = await api.get('/cart');
  return response.data;
};

export const addToCart = async (productId: string, quantity: number) => {
  const response = await api.post('/cart/add', { productId, quantity });
  return response.data;
};

export const removeFromCart = async (productId: string) => {
  const response = await api.delete(`/cart/remove/${productId}`);
  return response.data;
};

export default api; 