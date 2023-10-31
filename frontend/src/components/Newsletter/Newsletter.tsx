import { useState, useRef, FormEvent, useEffect } from "react";
import cls from "classnames";

import api_client from "../../api/client";

import useAlert from "../../hooks/useAlert/useAlert";

import newsletterBg2 from "../../assets/img/newsletter-bg-2.png";
import newsletterImg from "../../assets/img/newsletter-img-1.jpg";

const Newsletter = ({ custom }: { custom?: boolean }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submitBtnRef = useRef<HTMLButtonElement>({} as HTMLButtonElement);

  const [message, setMessage, clearMessage] = useAlert();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email) return setMessage("warning", "Fill in all fields");

    const target = submitBtnRef.current;

    target.innerHTML = `
      <div class="loaderRipple loaderRipple--btn">
        <div></div>
        <div></div>
      </div>
    `;
    target.setAttribute("disabled", "disabled");

    api_client({
      url: "/newsletter",
      method: "POST",
      data: { Name: name, EmailAddress: email },
    })
      .then((res) => {
        setMessage("success", res.data.message);

        target.innerHTML = "Subscribe";

        const interval = window.setInterval(() => {
          setName("");
          setEmail("");

          target.removeAttribute("disabled");

          window.clearInterval(interval);
        }, 3000);
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          setMessage("warning", err.response.data.message);
        } else {
          setMessage("error", err.message);
        }

        target.removeAttribute("disabled");
        target.innerHTML = "Subscribe";
      });
  };

  useEffect(() => {
    clearMessage();
  }, [name, email, clearMessage]);

  return (
    <section className="newsletter">
      <div className={cls("newsletter__left", custom && "newsletter__left--1")}>
        <img src={newsletterBg2} alt="" className="newsletter__left-img" />
        <div className="newsletter__left-main">
          <h1 className="newsletter__heading">
            Discount <br />
            on all seafood
          </h1>
          <div className="newsletter__promo">
            Promo Code <span>seafood</span>
          </div>
        </div>
      </div>
      <div className={cls("newsletter__main", custom && "newsletter__main--1")}>
        <div className="newsletter__main-img">
          <img src={newsletterImg} alt="" />
        </div>
        <form className="newsletter__form" onSubmit={handleSubmit}>
          <h3 className="newsletter__form-heading">Subscribe to news</h3>
          <div className="form-group">
            <input
              type="text"
              className={cls("form-input", name && "form-input--filled")}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="form-label">Name</label>
          </div>
          <div className="form-group">
            <input
              type="email"
              className={cls("form-input", email && "form-input--filled")}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label">Email</label>
          </div>
          {message}
          <div>
            <button className="button" ref={submitBtnRef}>
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
