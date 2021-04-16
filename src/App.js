import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import SignUpForm from "../src/views/pages/SignUpForm";
import LoginForm from "../src/views/pages/LoginForm";
import ForgetPassword from "../src/views/pages/ForgetPassword";
import LandingPage from "../src/views/pages/LandingPage";
import Explore from "../src/views/pages/Explore";
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
          signOut();
          history.replace("/"); 
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
              {is_doctor ? <Redirect to="/doctor/explore" /> : <Redirect to="/patient/explore" />}
            </Route>
            <Route path="*">
              {is_doctor ? <Redirect to="/doctor/explore" /> : <Redirect to="/patient/explore" />}
            </Route>
            <Route exact path="/patient/explore">
              <Explore />
            </Route>
            <Route exact path="/doctor/explore">
              <Explore />
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
