import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { CookieContext } from "../CookiesContext";

const AuthPage = () => {
  const [currLogin, setCurrLogin] = useState(null);
  const [currPassword, setCurrPassword] = useState(null);

  const [cookies, setCookie] = useContext(CookieContext);
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/auth/login";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username: currLogin,
        password: currPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const JWT = result.access_token;
        setCookie("JWT", JWT, { path: "/" });
        history.push("/boards");
      });
  };
  const loginChangeHandler = (e) => {
    setCurrLogin(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setCurrPassword(e.target.value);
  };
  return (
    <div className="AuthPage">
      <form onSubmit={submitHandler}>
        <label htmlFor="login">
          Login:
          <input
            type="text"
            name="login"
            id="login"
            onChange={loginChangeHandler}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="text"
            name="password"
            id="password"
            onChange={passwordChangeHandler}
          />
        </label>
        <input type="submit" value="Sign in" />
      </form>
    </div>
  );
};

export default AuthPage;
