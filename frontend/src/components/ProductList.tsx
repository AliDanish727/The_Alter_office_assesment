import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import {
  setProducts,
  setCategories,
  setLoading,
  setError,
  setFilters,
  setPagination,
} from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { getProducts, getCategories } from '../services/api';
import ProductCard from './ProductCard';
import Filters from './Filters';
import Pagination from './Pagination';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    products,
    categories,
    loading,
    error,
    filters,
    pagination,
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setLoading(true));
        const response = await getProducts({
          page: pagination.currentPage,
          category: filters.category,
          minPrice: filters.minPrice ?? undefined,
          maxPrice: filters.maxPrice ?? undefined,
          sort: filters.sortBy,
        });
        dispatch(setProducts(response.data.products));
        dispatch(setPagination({
          currentPage: response.data.pagination.page,
          totalPages: response.data.pagination.totalPages,
          totalItems: response.data.pagination.total,
        }));
      } catch (err) {
        dispatch(setError('Failed to fetch products'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        dispatch(setCategories(response.data));
      } catch (err) {
        dispatch(setError('Failed to fetch categories'));
      }
    };

    fetchProducts();
    fetchCategories();
  }, [dispatch, filters, pagination.currentPage]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({
      id: product.id,
      productId: product.id,
      quantity: 1,
      product: {
        name: product.name,
        price: product.price,
        image: product.image,
      },
    }));
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/4">
        <Filters
          categories={categories}
          filters={filters}
          onFilterChange={(newFilters) => dispatch(setFilters(newFilters))}
        />
      </div>
      
      <div className="w-full md:w-3/4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
        
        <div className="mt-8">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page) => dispatch(setPagination({ currentPage: page }))}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList; 