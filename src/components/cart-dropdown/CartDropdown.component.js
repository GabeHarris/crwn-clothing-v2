import { Fragment } from "react";
import CartItem from "../cart-item/CartItem.component";
import Button from "../button/Button.component";
import "./cart-dropdown.scss";

const CartDropdown = ({ cartItems }) => {
  return (
    <div className="cart-dropdown-container">
      {cartItems && cartItems.length > 0 ? (
        <Fragment>
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item.id} cartItem={item} />
            ))}
          </div>
          <Button>Go To Checkout</Button>
        </Fragment>
      ) : (
        <div className="empty-message">Your cart is empty</div>
      )}
    </div>
  );
};

export default CartDropdown;
