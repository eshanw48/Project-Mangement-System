/**
 * Root component for whole app, containing routes for the
 * main, login, and dashboard pages
 */

// package dependencies
import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

// component dependencies
import About from "Components/About";
import Login from "Components/Login";

// style dependencies
import styles from "Styles/common.css";


/**
 * App router, rendering components according to the route
 */
function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route component={About} />
            </Switch>
        </Router>
    )
}


// export for bundle
export default App;
