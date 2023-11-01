import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { IonIcon } from "@ionic/react";
import { callOutline } from "ionicons/icons";

import { tRootState } from "../../store";

import useData from "../../hooks/useData/useData";

import Navigation from "../../components/Navigation/Navigation";
import Newsletter from "../../components/Newsletter/Newsletter";
import Testimonials from "../../components/Testimonials/Testimonials";
import Footer from "../../components/Footer/Footer";
import Product from "../../components/Product/Product";
import VerticalBarLoader from "../../loaders/VerticalBarLoader/VerticalBarLoader";

import foodBg6 from "../../assets/img/food-bg-6.avif";
import foodBg2 from "../../assets/img/food-bg-2.avif";
import foodBg3 from "../../assets/img/food-bg-3.avif";

import shrimp from "../../assets/img/shrimp.png";

const Home = () => {
  const navigate = useNavigate();

  const newestMeals = useSelector(
    (state: tRootState) => state.cache.newestMeals
  );

  const { fetchNewestMeals } = useData();

  const [error, setError] = useState(false);

  useEffect(() => {
    fetchNewestMeals().catch(() => {
      setError(true);
    });
  }, [fetchNewestMeals]);

  return (
    <>
      <Navigation />
      <header className="header">
        <div className="header__menu">
          <div className="header-menu header-menu--shadow">
            <div className="header-menu__icon-block">
              <IonIcon icon={callOutline} />
            </div>
            (+234) 907 319 3054
          </div>
        </div>

        <div className="header__content">
          <div className="header__main">
            <h1 className="header__heading">
              TastyByte <br />
              <span>sushi</span>, seafood <br />& salads
            </h1>
            <p>
              Welcome to the home page of Broadway <br />
              Limousines, the preferred providers of <br />
              wedding cars in Sydney.
            </p>
          </div>
        </div>

        <div className="header-block header-block--1">
          <img src={foodBg6} alt="" className="header-block__img" />
          <div className="header-footer">
            <div
              className="header-footer__block"
              onClick={() => navigate("/catalog")}
            >
              <p>catalog</p>
              <span> &rarr; </span>
            </div>
          </div>
        </div>

        <div className="header-block header-block--2">
          <img src={foodBg2} alt="" className="header-block__img" />
          <div
            className="header-footer pr-small"
            onClick={() => navigate("/top-dishes")}
          >
            <img src={shrimp} alt="" />
            <p>Our special top dishes</p>
            <span>&rarr;</span>
          </div>
        </div>
        <div className="header-block header-block--3">
          <img src={foodBg3} alt="" className="header-block__img" />
        </div>
      </header>
      <section className="section">
        <div className="container section__container">
          <div className="section__header">
            <h3 className="section__heading">Newest Dishes</h3>
            <Link to="/catalog" className="section__link">
              VIEW ALL
            </Link>
          </div>
          {!error && !newestMeals ? <VerticalBarLoader /> : null}
          {error ? (
            <div className="text-center">Error fetching data. Reload Page</div>
          ) : null}
          <div className="products-grid">
            {newestMeals?.map((meal) => (
              <Product {...meal} key={meal._id} />
            ))}
          </div>
        </div>
      </section>
      <Newsletter custom />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
