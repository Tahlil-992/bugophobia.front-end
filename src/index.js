import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from "react-redux";
import store from "../src/core/store/index";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
//import reportWebVitals from './reportWebVitals';
import './index.css';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const defaultMaterialTheme = createMuiTheme({
  typography: {
      fontFamily: `'Josefin Sans', sans-serif`,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={defaultMaterialTheme}>
          <App/>
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
//reportWebVitals();