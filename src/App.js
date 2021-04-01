import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignUpForm from "../src/views/pages/SignUpForm";
import LoginForm from "../src/views/pages/LoginForm";

function App() {
  return (
    <Router>
      <Switch>
        {true &&
          (
            <>
              <Route exact path="/sign-up">
                <SignUpForm/>
              </Route>
              <Route exact path="/forgot-password">
                <h1>Forgot password</h1>
              </Route>
              <Route exact path="/">
                <LoginForm/>
              </Route>
            </>
          )}
      </Switch>
    </Router>
  );
}

export default App;