import { useContext } from "react";
import { CartContext } from "../../contexts/Cart.context";
import "./checkout-item.scss";

const CheckoutItem = ({ checkoutItem }) => {
  const { imageUrl, name, quantity, price } = checkoutItem;

  const { editCartItems } = useContext(CartContext);

  const handleChangeQuantity = (delta) => {
    console.log("change it this much: ", delta);
    const updatedItem = { ...checkoutItem, quantity: delta };
    editCartItems(updatedItem);
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <div className="name">{name}</div>
      <div className="quantity">
        <span
          className="arrow"
          onClick={() => {
            handleChangeQuantity(-1);
          }}
        >
          &#10094;
        </span>
        <span className="value">{quantity}</span>
        <span
          className="arrow"
          onClick={() => {
            handleChangeQuantity(1);
          }}
        >
          &#10095;
        </span>
      </div>
      <div className="price">${price}</div>
      <div
        className="remove-button"
        onClick={() => {
          handleChangeQuantity(quantity * -1);
        }}
      >
        &#10006;
      </div>
    </div>
  );
};

export default CheckoutItem;
