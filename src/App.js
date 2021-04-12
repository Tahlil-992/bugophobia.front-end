import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignUpForm from "../src/views/pages/SignUpForm";
import LoginForm from "../src/views/pages/LoginForm";
import ForgetPassword from "../src/views/pages/ForgetPassword";
import { connect, useSelector } from "react-redux";
import { login, rememberMe, signOut } from "./core/Authentication/action/authActions";
import { useEffect } from "react";

function App({ login, rememberMe }) {

  const token = useSelector(store => store.authReducer.authData.token);

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
        {!token.access && !token.refresh ?
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
          ) :
          (
            <>
              <Route exact path="/">
                <Redirect to="/patient/home"/>
              </Route>
              <Route exact path="/patient/home">
                <h1>HELLO!</h1>
              </Route>
            </>
          )}
      </Switch>
    </Router>
  );
}

export default connect(
	null,
	dispatch => ({
		login: userData => dispatch(login(userData)),
		rememberMe: () => dispatch(rememberMe()),
	}))(App);
