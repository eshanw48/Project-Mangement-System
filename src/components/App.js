/**
 * Root component for whole app, containing routes for the
 * main, login, and dashboard pages
 */

// package dependencies
import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

// component dependencies
import About from "Components/About";
import Login from "Components/Login";
import Dashboard from "Components/Dashboard";
import UserSession from "Components/UserSession";
import Welcome from "Components/Welcome";
import Tasks from "Components/Tasks";
import Loading from "Components/Loading";


/**
 * App router, rendering components according to the route.
 * Keeps track of user auth state to make sure routes are not
 * accessed without auth first.
 */
function App() {
    const [authed, setAuthed] = useState(undefined);
    const [onboard, setOnboard] = useState(undefined);

    /**
     * Wraps given component with auth condition, rerouting to the
     * login page if the user is not yet auth'd in. Returns the given
     * component if user is logged in, reroutes otherwise.
     * 
     * @param {Component} component - component to render
     * @return {Component} - component to render after considering auth
     */
    function withAuth(component) {
        if (authed === false) {
            // prevent routing loop and return Login if not authed
            if (component === Login) return Login;
            return () => <Redirect to="/login" />;
        }

        //reroute to welcome if not onboarded
        if (onboard === false) {
            // prevent routing loop and return welcome if not onboarded
            if (component === Welcome) return Welcome;
            return () => <Redirect to="/welcome"/>;
        }
        
        // reroute /welcome to /dashboard if onboarded
        if (onboard === true && component === Welcome) {
          return () => <Redirect to="/dashboard" />;
        }

        // reroute /login to /dashboard if already logged in
        if (authed === true && component === Login) {
          return () => <Redirect to="/dashboard" />;
        }
        // return original component if already auth'd and onboarded
        return component;
    }

    // wrap app tree with user session context, so user auth data
    // can be used throughout the DOM tree
    return (
        <UserSession setAuthed={setAuthed} setOnboard={setOnboard}>
            {authed === undefined ? (
                <Loading/>
            ) : (
                <Router>
                    <Switch>
                        <Route exact path="/login" component={withAuth(Login)} />
                        <Route exact path="/dashboard" component={withAuth(Dashboard)} />
                        <Route exact path="/welcome" component={withAuth(Welcome)} />
                        <Route exact path="/tasks" component={withAuth(Tasks)} />
                        <Route component={About} />
                    </Switch>
                </Router>
            )}
        </UserSession>
    )
}


// export for bundle
export default App;
