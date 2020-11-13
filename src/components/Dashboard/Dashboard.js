//============================================================
// The Dashboard page of the app, showing relevant user
// and team information
//============================================================

// package dependencies
import React, { useState } from "react";
import {
    Navbar,
    Jumbotron,
    Nav,
    NavItem,
    Button
} from "react-bootstrap";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from "react-router-dom";


// style dependencies
import common from "Styles/common.css";
import styles from "Styles/about.css";
import Welcome from "Components/Welcome";

// asset dependencies
import logo from "Assets/logo.png";

// helper functions and constants for firebase
import firebase from "Utilities/Firebase";
import { FIREBASE_AUTH_ERR_MESSAGES } from "Utilities/constants";

/**
 * The Dashboard page, showing relevant information on sign in.
 */
function Dashboard() {

    async function handleSignOut() {
        await firebase.signOut();
    }



    return (
        <div>

            <Navbar className={common.Header} expand="lg">
                <Navbar.Brand href="/about">
                    <img className={common.Logo} src={logo} width={42}/>
                    <span className={common.LogoLabel}> Project </span>
                </Navbar.Brand>

                <Nav className="ml-auto">
                    <NavItem>
                            <Button variant="light" onClick = {handleSignOut}> SignOut </Button>
                    </NavItem>
                </Nav>

            </Navbar>

            <Jumbotron className={styles.Container}>
                <h1>Welcome User</h1>

                <Link to ="/tasks">Click here for add/edit tasks</Link> 
                
            </Jumbotron>

        </div>
    )
}


// export for bundle
export default Dashboard;

