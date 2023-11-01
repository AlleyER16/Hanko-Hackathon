import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { IonIcon } from "@ionic/react";
import {
  callOutline,
  star,
  starOutline,
  cartOutline,
  removeCircleOutline,
} from "ionicons/icons";

import useData from "../../hooks/useData/useData";

import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import Newsletter from "../../components/Newsletter/Newsletter";
import VerticalBarLoader from "../../loaders/VerticalBarLoader/VerticalBarLoader";
import Product from "../../components/Product/Product";
import RippleLoader from "../../loaders/RippleLoader/RippleLoader";

import { tRootState } from "../../store";
import { tFullMeal } from "../../store/types/app.types";
import { addMealToCart, removeMealFromCart } from "../../store/cartReducer";

import { roundDP } from "../../utils/func";

const Meal = () => {
  const { id: mealId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const mealsCache = useSelector((state: tRootState) => state.cache.mealsCache);

  const { fetchMeal, inCart } = useData();

  const meal: tFullMeal | undefined = mealsCache.find(
    (meal) => meal._id === mealId
  );

  useEffect(() => {
    fetchMeal(mealId!).catch(() => {
      navigate("/404");
    });
  }, [mealId, fetchMeal, navigate]);

  const mealInCart = meal ? inCart(meal._id) : false;

  return (
    <>
      <Navigation />
      <header className="header-3">
        <div className="header-3__menu">
          <div className="header-menu header-menu--shadow">
            <div className="header-menu__icon-block">
              <IonIcon icon={callOutline} />
            </div>
            (+234) 907 319 3054
          </div>
        </div>

        <div className="container single-product__container">
          {!meal ? (
            <div className="single-product-loader">
              <RippleLoader />
            </div>
          ) : (
            <div className="single-product">
              <div className="single-product__product">
                <div className="single-product__product-main">
                  <div className="single-product__product-content">
                    <h1 className="single-product__name">{meal.Name}</h1>
                    <div className="single-product__stars">
                      <IonIcon icon={star} />
                      <IonIcon icon={star} />
                      <IonIcon icon={star} />
                      <IonIcon icon={star} />
                      <IonIcon icon={starOutline} />
                    </div>
                    <div className="single-product__ingredients-heading">
                      Compound
                    </div>
                    <ul className="single-product__ingredients">
                      {meal.Ingredients.map((ingr, i) => (
                        <li key={i}>
                          <span></span> {ingr}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span className="single-product__label">sale</span>
                  <p className="single-product__calories">{meal.Calories} CR</p>
                  <button
                    className="single-product__btn"
                    onClick={() =>
                      mealInCart
                        ? dispatch(removeMealFromCart(meal._id))
                        : dispatch(
                            addMealToCart({
                              _id: meal._id,
                              Name: meal.Name,
                              AvgRatings: meal.AvgRatings,
                              Price: meal.Price,
                              PicturePath: meal.PicturePath,
                              Calories: meal.Calories,
                            })
                          )
                    }
                  >
                    <IonIcon
                      icon={mealInCart ? removeCircleOutline : cartOutline}
                    />{" "}
                    {mealInCart ? "Remove from cart" : "+ Add to Cart"}
                  </button>
                </div>
                <div className="single-product__product-img-block">
                  <img src={meal.PicturePath} alt="" />
                </div>
              </div>
              <div className="single-product__similar">
                {meal.SimilarMeals[0] ? (
                  <div
                    className="similar-product"
                    onClick={() =>
                      navigate(`/meal/${meal.SimilarMeals[0]._id}`)
                    }
                  >
                    <img
                      src={meal.SimilarMeals[0].PicturePath}
                      alt=""
                      className="similar-product__img"
                    />
                    <p className="similar-product__name">
                      {meal.SimilarMeals[0].Name}
                    </p>
                  </div>
                ) : null}
                <div className="similar-product similar-product--active">
                  <img
                    src={meal.PicturePath}
                    alt=""
                    className="similar-product__img"
                  />
                  <p className="similar-product__name">{meal.Name}</p>
                  <div className="similar-product__price">
                    <div className="similar-product__price-icon-block">
                      <IonIcon icon={cartOutline} />
                    </div>
                    &#8358; {roundDP(meal.Price, 2)}
                  </div>
                </div>
                {meal.SimilarMeals[1] ? (
                  <div
                    className="similar-product"
                    onClick={() =>
                      navigate(`/meal/${meal.SimilarMeals[1]._id}`)
                    }
                  >
                    <img
                      src={meal.SimilarMeals[1].PicturePath}
                      alt=""
                      className="similar-product__img"
                    />
                    <p className="similar-product__name">
                      {meal.SimilarMeals[1].Name}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </header>
      <section className="section">
        <div className="container section__container">
          <div className="section__header">
            <h3 className="section__heading">Similar Products</h3>
          </div>
          {!meal ? (
            <VerticalBarLoader align="" />
          ) : (
            <div className="products-grid">
              {meal.SimilarMeals.map((ml) => (
                <Product {...ml} key={ml._id} />
              ))}
            </div>
          )}
        </div>
      </section>
      <Newsletter />
      <Footer />
    </>
  );
};

export default Meal;
