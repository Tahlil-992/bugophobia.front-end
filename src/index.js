import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from "react-redux";
import store from "../src/core/store/index";
import App from "./App";
//import reportWebVitals from './reportWebVitals';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
//reportWebVitals();