import {
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";
import SignUpForm from "../src/views/pages/SignUpForm";
import LoginForm from "../src/views/pages/LoginForm";
import ForgetPassword from "../src/views/pages/ForgetPassword";
import LandingPage from "../src/views/pages/LandingPage";
import { connect, useSelector } from "react-redux";
import { login, rememberMe, setIsDoctor, signOut } from "./core/Authentication/action/authActions";
import { useEffect } from "react";

function App({ setIsDoctor, login, rememberMe }) {

  const token = useSelector(store => store.authReducer.authData.token);
  const is_doctor = useSelector(store => store.authReducer.isdoctor);
  const history = useHistory();

  useEffect(() => {
    setTimeout(async () => {
      let accessToken = null;
      let refreshToken = null;
      let email = null;
      let isdoctor = false;
      let remembered = false;
      try {
        accessToken = await localStorage.getItem("accessToken");
        if (accessToken) {
          refreshToken = await localStorage.getItem("refreshToken");
          email = await localStorage.getItem("email");
          isdoctor = ((await localStorage.getItem("isdoctor") === "true") ? true : false);
          remembered = true;
        }
        else {
          accessToken = await sessionStorage.getItem("accessToken");
          refreshToken = await sessionStorage.getItem("refreshToken");
          email = await sessionStorage.getItem("email");
          isdoctor = ((await sessionStorage.getItem("isdoctor") === "true") ? true : false);
        }
        if (accessToken) {
          login({ accessToken: accessToken, refreshToken: refreshToken, email: email });
          setIsDoctor(isdoctor);
          if (remembered)
            rememberMe();
        }
        else {
          console.log("nothing")
          signOut();
          console.log("signed out")
          history.replace("/")
        }
      } catch (e) {
        console.error('Error while token management!\n' + e);
      }
    }, 1000);
  }, [])

  return (
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
              {is_doctor ? <Redirect to="/doctor/home" /> : <Redirect to="/patient/home" />}
            </Route>
            <Route path="*">
              {is_doctor ? <Redirect to="/doctor/home" /> : <Redirect to="/patient/home" />}
            </Route>
            <Route exact path="/patient/home">
              <h1>Hello PATIENT!</h1>
            </Route>
            <Route exact path="/doctor/home">
              <h1>Hello DOCTOR!</h1>
            </Route>
          </>
        )}
    </Switch>
  );
}

export default connect(
  null,
  dispatch => ({
    login: userData => dispatch(login(userData)),
    rememberMe: () => dispatch(rememberMe()),
    setIsDoctor: av => dispatch(setIsDoctor(av)),
  }))(App);
