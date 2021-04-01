import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthPage from "./Authorization/AuthPage";
import BoardManager from "./Board CRUD component/BoardManager";
import TaskManager from "./Sections and cards CRUD component/TaskManager";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={AuthPage} />
          <Route path="/boards" component={BoardManager} />
          <Route path="/:id" component={TaskManager} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
