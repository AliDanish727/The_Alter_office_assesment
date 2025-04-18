import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
}

interface ProductState {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  filters: {
    category: string[];
    minPrice: number | null;
    maxPrice: number | null;
    sortBy: string;
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

const initialState: ProductState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
  filters: {
    category: [],
    minPrice: null,
    maxPrice: null,
    sortBy: 'latest',
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<ProductState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action: PayloadAction<Partial<ProductState['pagination']>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
});

export const {
  setProducts,
  setCategories,
  setLoading,
  setError,
  setFilters,
  setPagination,
} = productSlice.actions;

export default productSlice.reducer; 