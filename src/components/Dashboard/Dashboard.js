//============================================================
// The Dashboard page of the app, showing relevant user
// and team information
//============================================================

// package dependencies
import React from "react";
import {
    Navbar,
    Jumbotron,
} from "react-bootstrap";

// style dependencies
import common from "Styles/common.css";
import styles from "Styles/about.css";

// asset dependencies
import logo from "Assets/logo.png";


/**
 * The Dashboard page, showing relevant information on sign in.
 */
function Dashboard() {
    return (
        <div>

            <Navbar className={common.Header} expand="lg">
                <Navbar.Brand href="/about">
                    <img className={common.Logo} src={logo} width={42}/>
                    <span className={common.LogoLabel}> Project </span>
                </Navbar.Brand>
            </Navbar>

            <Jumbotron className={styles.Container}>
                This is the Dashboard
            </Jumbotron>

        </div>
    )
}


// export for bundle
export default Dashboard;

