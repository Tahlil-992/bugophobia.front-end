import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import SignUpForm from "../src/views/pages/SignUpForm";
import LoginForm from "../src/views/pages/LoginForm";
import ForgetPassword from "../src/views/pages/ForgetPassword";
import LandingPage from "../src/views/pages/LandingPage";
import { connect } from "react-redux";
import { login, rememberMe, signOut } from "./core/Authentication/action/authActions";
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
        if (accessToken) {
          login({ accessToken: accessToken, refreshToken: refreshToken, email: email });
          if (remembered)
            rememberMe();
        }
        else {
          signOut();
        }
        } catch (e) {
        console.error('Error while token management!');
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
                <SignUpForm />
              </Route>
              <Route exact path="/forget-password">
                <ForgetPassword />
              </Route>
              <Route exact path="/login">
                <LoginForm />
              </Route>
              <Route exact path="/">
                <LandingPage />
              </Route>
            </>
          )}
      </Switch>
    </Router>
  );
}

export default connect(null, { login, rememberMe })(App)
