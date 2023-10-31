import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register, Hanko } from "@teamhanko/hanko-elements";

import { IonIcon } from "@ionic/react";
import { callOutline } from "ionicons/icons";

import { login, logout } from "../../store/authReducer";

import { withUnAuth } from "../../hoc/withAuth/withAuth";

import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";

import foodBg2 from "../../assets/img/food-bg-2.avif";
import foodBg4 from "../../assets/img/food-bg-4.avif";

const hankoApi = import.meta.env.VITE_HANKO_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hanko = useMemo(() => new Hanko(hankoApi), []);

  useEffect(() => {
    hanko.onSessionCreated((sessionDetail) => {
      console.log(sessionDetail);

      dispatch(
        login({ userId: sessionDetail.userID, accessToken: sessionDetail.jwt! })
      );
    });

    hanko.onSessionExpired(() => {
      dispatch(logout());
    });
  }, [hanko, dispatch, navigate]);

  useEffect(() => {
    register(hankoApi).catch(() => {
      // handle error
    });
  }, []);

  return (
    <>
      <Navigation />
      <header className="header-2 header-2--full">
        <div className="header-2__content auth auth--sm">
          <div className="auth__main">
            <hanko-auth />
          </div>
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

export default withUnAuth(Login);
