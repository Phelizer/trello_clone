import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "./Authorization/AuthPage";
import TaskManager from "./Sections and cards CRUD component/TaskManager";
import { CookieProvider } from "./CookiesContext";
import BoardScreen from "./BoardScreen";
import { CurrentTeamProvider } from "./CurrentTeamContext";
import SignUpPage from "./Authorization/SignUpPage";
import { SocketProvider } from "./SocketContext";

function App() {
  return (
    <CurrentTeamProvider>
      <SocketProvider>
        <CookieProvider>
          <Router>
            <div className="App">
              <Switch>
                <Route path="/" exact component={AuthPage} />
                <Route path="/signup" exact component={SignUpPage} />
                <Route path="/boards" exact component={BoardScreen} />
                <Route path="/:id" component={TaskManager} />
              </Switch>
            </div>
          </Router>
        </CookieProvider>
      </SocketProvider>
    </CurrentTeamProvider>
  );
}

export default App;
