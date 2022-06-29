import { useContext } from "react";
import { CartContext } from "../../contexts/Cart.context";
import "./cart-item.scss";

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span>
          ${price} &times; {quantity}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
