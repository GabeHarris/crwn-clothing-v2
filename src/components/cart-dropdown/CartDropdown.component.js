import CartItem from "../cart-item/CartItem.component";
import Button from "../button/Button.component";
import "./cart-dropdown.scss";

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="empty-message"></div>
      <div className="cart-items"></div>
      <Button>Go To Checkout</Button>
    </div>
  );
};

export default CartDropdown;
