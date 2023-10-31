import { ReactNode, useState, useCallback } from "react";

import Alert, {
  AlertTypes,
  AlertContentType,
} from "../../components/Alert/Alert";

const useAlert = (
  dark = false
): [
  ReactNode,
  (type: AlertTypes, content: string | TrustedHTML) => void,
  () => void
] => {
  const [type, setType] = useState<null | AlertTypes>(null);
  const [content, setContent] = useState<null | AlertContentType>(null);

  const closeHandler = useCallback(() => {
    setType(null);
    setContent(null);
  }, []);

  const render =
    type && content ? (
      <Alert type={type} dark={dark} closeHandler={closeHandler}>
        {content}
      </Alert>
    ) : null;

  return [
    render,
    (type, content) => {
      setType(type);
      setContent(content);
    },
    closeHandler,
  ];
};

export default useAlert;
