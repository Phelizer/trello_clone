import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { CookieContext } from "../CookiesContext";

const SignUpPage = () => {
  const [currUsername, setCurrUsername] = useState(null);
  const [currEmail, setCurrEmail] = useState(null);
  const [currPassword, setCurrPassword] = useState(null);
  const [currConfPassword, setCurrConfPassword] = useState(null);

  const [cookies, setCookie] = useContext(CookieContext);
  const history = useHistory();

  const usernameChangeHandler = (e) => {
    setCurrUsername(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setCurrPassword(e.target.value);
  };
  const confPasswordChangeHandler = (e) => {
    setCurrConfPassword(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setCurrEmail(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const pwsAreEquals = currPassword === currConfPassword;
    if (currUsername && currEmail && currPassword && pwsAreEquals) {
      const url = "http://localhost:3000/auth/signup";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          username: currUsername,
          email: currEmail,
          password: currPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.error) alert(result.message);
          else {
            const JWT = result.access_token;
            setCookie("JWT", JWT, { path: "/" });
            history.push("/boards");
          }
        });
    } else if (!currUsername) alert("Input username");
    else if (!currPassword) alert("Input password");
    else if (!currEmail) alert("Input email");
    else if (!pwsAreEquals) alert("Your passwords are not equal");
  };

  return (
    <div className="SignUpPage">
      <form onSubmit={submitHandler}>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            id="username"
            onChange={usernameChangeHandler}
          />
        </label>

        <label htmlFor="email">
          E-mail:
          <input
            type="text"
            name="email"
            id="email"
            onChange={emailChangeHandler}
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

        <label htmlFor="conf_password">
          Confirm password:
          <input
            type="text"
            name="conf_password"
            id="conf_password"
            onChange={confPasswordChangeHandler}
          />
        </label>
        <input type="submit" value="Sign up" />
      </form>
    </div>
  );
};

export default SignUpPage;
