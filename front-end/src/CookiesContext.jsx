/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useCookies } from "react-cookie";

export const CookieContext = createContext();

export const CookieProvider = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["JWT"]);

  return (
    <CookieContext.Provider value={[cookies, setCookie, removeCookie]}>
      {props.children}
    </CookieContext.Provider>
  );
};
