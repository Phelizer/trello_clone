import { Link } from "react-router-dom";

const AuthPage = () => (
  <div return className="AuthPage">
    <form>
      <label htmlFor="login">
        Login:
        <input type="text" name="login" id="login" />
      </label>
      <label htmlFor="password">
        Password:
        <input type="text" name="password" id="password" />
      </label>
      <Link to="/boards">Authorize</Link>
    </form>
  </div>
);

export default AuthPage;
