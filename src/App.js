import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignUpForm from "../src/views/pages/SignUpForm";
import LoginForm from "../src/views/pages/LoginForm";
import ForgetPassword from "../src/views/pages/ForgetPassword";
import { connect } from "react-redux";
import { login, rememberMe } from "./core/Authentication/action/authActions";
import { useEffect } from "react";

function App({ login, rememberMe }) {

  useEffect(() => {
    setTimeout(async () => {
      let accessToken = null;
      let refreshToken = null;
      let email = null;
      let remembered = false;
      try {
        accessToken = await localStorage.getItem("accessToken");
        if (accessToken) {
          refreshToken = await localStorage.getItem("refreshToken");
          email = await localStorage.getItem("email");
          remembered = true;
        }
        else {
          accessToken = await sessionStorage.getItem("accessToken");
          refreshToken = await sessionStorage.getItem("refreshToken");
          email = await sessionStorage.getItem("email");
        }

        login({ accessToken: accessToken, refreshToken: refreshToken, email: email });
        if (remembered)
          rememberMe();

        } catch (e) {
        console.error('error in save token in async storage');
      }
    }, 1000);
  }, [])

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

export default connect(null, { login, rememberMe })(App)