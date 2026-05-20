import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { WebsiteProvider } from "./Context/WebsiteContext";


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <WebsiteProvider>
    <App />
  </WebsiteProvider>

);