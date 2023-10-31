import { IonIcon } from "@ionic/react";
import { star, starOutline, starHalfOutline } from "ionicons/icons";

import { TESTIMONIALS } from "../../data";

const Testimonials = () => {
  return (
    <section className="section">
      <div className="container section__container">
        <div className="section__header">
          <h3 className="section__heading">Customer Reviews</h3>
        </div>
        <div className="testimonials">
          {TESTIMONIALS.map((testimonial, i) => (
            <div className="testimonial" key={i}>
              <img
                src={testimonial.image}
                alt=""
                className="testimonial__img"
              />
              <p className="testimonial__date">{testimonial.date}</p>
              <div className="testimonial__name">
                <div className="testimonial__quot">
                  <span></span>
                  <span></span>
                </div>
                <p className="testimonial__name">{testimonial.name}</p>
              </div>
              <p className="testimonial__text">{testimonial.message}</p>
              <div className="testimonial__stars">
                {new Array(5).fill(null).map((_, i) => (
                  <IonIcon
                    icon={
                      testimonial.rating >= i + 1
                        ? star
                        : testimonial.rating > i && testimonial.rating < i + 1
                        ? starHalfOutline
                        : starOutline
                    }
                    key={i}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
