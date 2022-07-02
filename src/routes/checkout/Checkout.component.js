import { useContext } from "react";
import { CartContext } from "../../contexts/Cart.context";
import CheckoutItem from "../../components/checkout-item/CheckoutItem.component";
import "./checkout.scss";

const Checkout = () => {
  const { cartItems, cartTotalPrice } = useContext(CartContext);
  const checkoutItemsEl =
    cartItems.length > 0 ? (
      cartItems.map((item) => (
        <CheckoutItem key={item.id} checkoutItem={item} />
      ))
    ) : (
      <h3 style={{ margin: 0, padding: "2rem 0 0" }}>
        It's empty, go add some stuff!
      </h3>
    );
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">Product</div>
        <div className="header-block">Description</div>
        <div className="header-block">Quantity</div>
        <div className="header-block">Price</div>
        <div className="header-block">Remove</div>
      </div>
      {checkoutItemsEl}
      <div className="total">${cartTotalPrice}</div>
    </div>
  );
};

export default Checkout;
