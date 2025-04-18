import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { TrashIcon } from '@heroicons/react/24/outline';

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold text-gray-800">Your Cart is Empty</h2>
        <p className="text-gray-600 mt-2">Add some products to your cart</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="flex items-center p-4 border-b last:border-b-0"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded"
            />
            
            <div className="ml-4 flex-grow">
              <h3 className="text-lg font-semibold">{item.product.name}</h3>
              <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded">
                <button
                  onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-3 py-1">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={() => handleRemoveItem(item.productId)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex justify-end">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart; 