import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/User.context";
import { signOutUser } from "../../utils/firebase.utils";
import "./navigation.scss";

const NavigationBar = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const signOutClickHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };
  console.log("NavigationBar currentUser: ", currentUser);
  return (
    <Fragment>
      <header>
        <div className="navigation">
          <Link className="logo-container" to="/">
            <CrwnLogo className="logo" />
          </Link>
          <div className="nav-links-container">
            <Link className="nav-link" to="/shop">
              Shop
            </Link>
            {currentUser ? (
              <span className="nav-link" onClick={signOutClickHandler}>
                Sign Out
              </span>
            ) : (
              <Link className="nav-link" to="/auth">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default NavigationBar;
