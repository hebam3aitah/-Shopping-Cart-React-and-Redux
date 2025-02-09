import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} className="flex justify-between items-center border-b py-2">
            <h3>{item.name}</h3>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))}
              className="border p-1 w-12"
            />
            <p>${item.price * item.quantity}</p>
            <button
              className="bg-red-500 text-white px-2 py-1"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
