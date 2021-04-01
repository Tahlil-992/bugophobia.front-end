import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignUpForm from "../src/views/pages/SignUpForm";


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
                <h1>Login</h1>
              </Route>
            </>
          )}
      </Switch>
    </Router>
  );
}

export default App;