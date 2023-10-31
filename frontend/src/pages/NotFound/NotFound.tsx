import { useNavigate } from "react-router-dom";

import { IonIcon } from "@ionic/react";
import { callOutline, homeOutline } from "ionicons/icons";

import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";

import foodBg2 from "../../assets/img/food-bg-2.avif";
import foodBg4 from "../../assets/img/food-bg-4.avif";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navigation />
      <header className="header-2 header-2--full">
        <div className="header-2__content not-found">
          <div className="not-found__404">
            <p>4</p>
            <p>0</p>
            <p>4</p>
            <div>Page not found</div>
          </div>
          <div className="not-found__text">
            Looking for something interesting on our site? <br />
            Sorry this page does not exist
          </div>
          <button className="not-found__btn" onClick={() => navigate("/")}>
            <IonIcon icon={homeOutline} /> Go to home
          </button>
        </div>

        <div className="header-2__main">
          <div className="header-block header-block--1">
            <img src={foodBg2} alt="" className="header-block__img" />
          </div>
          <div className="header-block header-block--2">
            <img src={foodBg4} alt="" className="header-block__img" />
            <div className="header-2__menu">
              <div className="header-menu header-menu--shadow">
                <div className="header-menu__icon-block">
                  <IonIcon icon={callOutline} />
                </div>
                (+234) 907 319 3054
              </div>
            </div>
          </div>
        </div>
      </header>
      <Footer />
    </>
  );
};

export default NotFound;
