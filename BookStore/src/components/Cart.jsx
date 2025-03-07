// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, clearCart } from '../redux/cartSlice';

// const Cart = () => {
//   const { items, totalAmount } = useSelector(state => state.cart);
//   const dispatch = useDispatch();

//   const handleRemoveFromCart = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   if (items.length === 0) {
//     return (
//       <div className="text-center py-10">
//         <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
//         <p>Your cart is empty.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="my-8">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold">Your Cart</h2>
//         <button
//           onClick={handleClearCart}
//           className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//         >
//           Clear Cart
//         </button>
//       </div>
      
//       <div className="border rounded-lg overflow-hidden mb-6">
//         {items.map(item => (
//           <div key={item.id} className="flex justify-between items-center border-b p-4 last:border-b-0">
//             <div>
//               <h3 className="text-lg font-semibold">{item.title}</h3>
//               <p className="text-gray-600">Quantity: {item.quantity}</p>
//               <p className="text-gray-600">Price: ${item.price.toFixed(2)} each</p>
//             </div>
//             <div>
//               <p className="text-lg font-bold mb-2">${item.totalPrice.toFixed(2)}</p>
//               <button
//                 onClick={() => handleRemoveFromCart(item.id)}
//                 className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <div className="flex justify-end">
//         <div className="bg-gray-100 p-4 rounded-lg">
//           <p className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</p>
//           <button
//             className="mt-3 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//           >
//             Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;











// File: src/components/Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';

const Cart = () => {
  const { items, totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <h2>Your Cart is Empty</h2>
        <p>Add some books to your cart to get started!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button
          onClick={handleClearCart}
          className="btn btn-danger"
        >
          Clear Cart
        </button>
      </div>
      
      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-info">
              <h3>{item.title}</h3>
              <div className="cart-item-details">
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price.toFixed(2)} each</p>
              </div>
            </div>
            <div className="cart-item-price">
              <p className="cart-item-total">${item.totalPrice.toFixed(2)}</p>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="btn btn-small btn-danger"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-total">
        <div className="cart-summary">
          <p className="cart-summary-total">Total: ${totalAmount.toFixed(2)}</p>
          <button className="btn btn-success btn-large" style={{width: '100%'}}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;