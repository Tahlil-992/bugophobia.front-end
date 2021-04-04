import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignUpForm from "../src/views/pages/SignUpForm";
import LoginForm from "../src/views/pages/LoginForm";
import ForgetPassword from "../src/views/pages/ForgetPassword";

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
              <Route exact path="/forget-password">
                <ForgetPassword/>
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