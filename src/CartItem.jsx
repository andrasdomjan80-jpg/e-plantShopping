import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // ✅ Calculate total amount for all products in the cart
  const calculateTotalAmount = (cart) => {
    let total = 0;
    cart.forEach((item) => {
      const cost = parseFloat(item.cost.substring(1)); // remove "$" and convert to number
      total += cost * item.quantity;
    });
    return total;
  };

  // ✅ Continue Shopping
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // ✅ Checkout placeholder
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // ✅ Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // ✅ Decrement item quantity or remove if quantity hits 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // ✅ Remove item from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // ✅ Add item to cart (if needed elsewhere)
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  // ✅ Calculate total cost per item
  const calculateTotalCost = (item) => {
    const unitPrice = parseFloat(item.cost.substring(1)); // e.g. "$10.00" → 10.00
    return unitPrice * item.quantity;
  };

  return (
    <div className="cart-container">
      {/* 🛠️ Updated: Added cart dependency to calculateTotalAmount */}
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount(cart).toFixed(2)}</h2>

      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>

              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              {/* 🛠️ Updated: Item subtotal calculation */}
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item).toFixed(2)}
              </div>

              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{ marginTop: '20px', color: 'black' }}
        className="total_cart_amount"
      ></div>

      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        {/* ✅ Hooked up Checkout alert */}
        <button
          className="get-started-button1"
          onClick={(e) => handleCheckoutShopping(e)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
