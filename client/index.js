import React from "react";
import { render } from 'react-dom';


import App from "./App";

import "index.css"
import './components/auth/auth.css'


render(
    <App />,
    document.querySelector("#root")
  )