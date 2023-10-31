import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { IonIcon } from "@ionic/react";
import { callOutline } from "ionicons/icons";

import { tRootState } from "../../store";

import mastercard from "../../assets/img/mastercard.png";
import visa from "../../assets/img/visa.png";
import verve from "../../assets/img/verve.png";

const Footer = () => {
  const loggedIn = useSelector((state: tRootState) => state.auth.loggedIn);

  return (
    <footer className="footer">
      <div className="footer__info">
        Delivery fee within Ibadan: &#8358; 500.00
      </div>
      <div className="footer__container container">
        <p className="footer__brand">TastyByte</p>
        <div className="footer__main">
          <ul className="footer__menu">
            <li>
              <Link to="/" className="footer__link">
                Home
              </Link>
            </li>
            {/* <li>
              <Link to="/top-dishes" className="footer__link">
                Top Dishes
              </Link>
            </li> */}
            <li>
              <Link to="/catalog" className="footer__link">
                Catalog
              </Link>
            </li>
            <li>
              <Link to="/cart" className="footer__link">
                Cart
              </Link>
            </li>
            {loggedIn ? (
              <>
                <li>
                  <Link to="/orders" className="footer__link">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="footer__link">
                    Profile
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/sign-in" className="footer__link">
                  Sign In
                </Link>
              </li>
            )}
          </ul>
          <div className="footer__payments">
            <img src={mastercard} alt="" />
            <img src={visa} alt="" />
            <img src={verve} alt="" />
          </div>
        </div>
        <div className="footer__contact">
          <div className="footer__contact-icon-block">
            <IonIcon icon={callOutline} />
          </div>
          <p>(+234) 907 319 3054</p>
        </div>
      </div>
      <div className="footer__copyright">All rights reserved @2023</div>
    </footer>
  );
};

export default Footer;
