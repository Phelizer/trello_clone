import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "./Authorization/AuthPage";
import BoardManager from "./Board CRUD component/BoardManager";
import TaskManager from "./Sections and cards CRUD component/TaskManager";
import { CookieProvider } from "./CookiesContext";

function App() {
  return (
    <CookieProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={AuthPage} />
            <Route path="/boards" exact component={BoardManager} />
            <Route path="/:id" component={TaskManager} />
          </Switch>
        </div>
      </Router>
    </CookieProvider>
  );
}

export default App;
