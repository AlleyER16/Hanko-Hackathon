import cls from "classnames";

import { IonIcon } from "@ionic/react";
import { alertCircle, checkmarkCircle, close } from "ionicons/icons";

export type AlertTypes = "success" | "error" | "warning";
export type AlertContentType = string | TrustedHTML;

type tAlert = {
  type: AlertTypes;
  dark?: boolean;
  children: AlertContentType;
  closeHandler: () => void;
};

const Alert = ({ type, children, closeHandler }: tAlert) => {
  return (
    <div className={cls("alert", `alert--${type}`)}>
      <div className="alert__icon-box">
        <IonIcon
          icon={
            type === "success"
              ? checkmarkCircle
              : type === "warning"
              ? alertCircle
              : close
          }
        />
      </div>
      <div
        className="alert__message"
        dangerouslySetInnerHTML={{ __html: children }}
      />
      <div className="alert__close-block">
        <span className="alert__close" onClick={closeHandler}>
          <IonIcon icon={close} />
        </span>
      </div>
    </div>
  );
};

export default Alert;
