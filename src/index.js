/**
 * Entry js file that renders out the entire application,
 * starting at the root component
 */

// package dependencies
import React from "react";
import ReactDOM from "react-dom";

// component dependencies
import App from "Components/App.js";


// render the App root component in the dedicated <div/> tag
const root = document.getElementById("root");
ReactDOM.render(<App />, root);
