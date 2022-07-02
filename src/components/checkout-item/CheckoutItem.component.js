import { useContext } from "react";
import { CartContext } from "../../contexts/Cart.context";
import "./checkout-item.scss";

const CheckoutItem = ({ checkoutItem }) => {
  const { imageUrl, name, quantity, price } = checkoutItem;

  const { editCheckoutItem } = useContext(CartContext);

  const handleChangeQuantity = (newQuantity) => {
    const updatedItem = { ...checkoutItem, quantity: newQuantity };
    editCheckoutItem(updatedItem);
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="name">{name}</div>
      <div className="quantity">
        <span
          className="arrow"
          onClick={() => {
            handleChangeQuantity(quantity - 1);
          }}
        >
          &#94;
        </span>
        <span className="value">{quantity}</span>
        <span
          className="arrow"
          onClick={() => {
            handleChangeQuantity(quantity + 1);
          }}
        >
          &#94;
        </span>
      </div>
      <div className="price">${price}</div>
      <div
        className="remove-button"
        onClick={() => {
          handleChangeQuantity(0);
        }}
      >
        &times;
      </div>
    </div>
  );
};

export default CheckoutItem;
