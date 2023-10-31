import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { register, Hanko } from "@teamhanko/hanko-elements";

import { IonIcon } from "@ionic/react";
import { callOutline, logOutOutline } from "ionicons/icons";

import { logout as logoutAction } from "../../store/authReducer";

import withAuth from "../../hoc/withAuth/withAuth";

import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";

import foodBg2 from "../../assets/img/food-bg-2.avif";
import foodBg4 from "../../assets/img/food-bg-4.avif";

const hankoApi = import.meta.env.VITE_HANKO_API_URL;

const Profile = () => {
  const dispatch = useDispatch();

  const hanko = useMemo(() => new Hanko(hankoApi), []);

  const logout = async () => {
    try {
      await hanko?.user.logout();
      dispatch(logoutAction());
    } catch (error) {
      // console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    register(hankoApi).catch(() => {
      // do nothing
    });
  }, []);

  return (
    <>
      <Navigation />
      <header className="header-2 header-2--full">
        <div className="header-2__content auth">
          <div className="text-center mb-medium">
            <button className="button" onClick={logout}>
              <IonIcon icon={logOutOutline} />
              Logout
            </button>
          </div>
          <div className="auth__main">
            <hanko-profile />
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

export default withAuth(Profile);
