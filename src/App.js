import React, { useEffect } from "react";
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
import Explore from "../src/views/pages/Explore";
import Profile from "../src/views/pages/Profile";
import ViewProfile from "../src/views/pages/ViewProfile";
import SavedAccounts from "../src/views/pages/SavedAccounts";
import CalendarPage from "../src/views/pages/Calendar";
import { connect, useSelector } from "react-redux";
import { login, rememberMe, setIsDoctor, signOut } from "./core/Authentication/action/authActions";
import CommentSection from "./views/pages/commentSection";
import DoctorCalendarPage from "./views/pages/doctorCalendar";

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
              {/* <CommentSection/> */}
            </Route>
          </>
        ) :
        (
          <>
            <Route exact path="/">
              {is_doctor ? <Redirect to="/doctor/explore" /> : <Redirect to="/patient/explore" />}
            </Route>
            <Route exact path="/patient/explore">
              <Explore />
            </Route>
            <Route exact path="/doctor/explore">
              <Explore />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/view-profile">
              <ViewProfile />
            </Route>
            <Route exact path="/comment">
              <CommentSection />
            </Route>
            <Route exact path="/SavedAccounts">
              <SavedAccounts />
            </Route>
            <Route exact path="/Calendar">
              <CalendarPage />
            </Route>
            <Route exact path="/DoctorCalendar">
              <DoctorCalendarPage />
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
