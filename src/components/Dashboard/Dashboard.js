//============================================================
// The Dashboard page of the app, showing relevant user
// and team information
//============================================================

// package dependencies
import React, { useContext } from "react";
import {
    Navbar,
    Jumbotron,
    Nav,
    NavItem,
    Button
} from "react-bootstrap";
import { Link } from "react-router-dom";

// local components
import MyTasks from "./MyTasks.js";
import { UserContext } from 'Components/UserSession';
import MyGraph from "./MyGraph";


// style dependencies
import common from "Styles/common.css";
import styles from "Styles/about.css";

// asset dependencies
import logo from "Assets/logo.png";

// helper functions and constants for firebase
import firebase from "Utilities/Firebase";


/**
 * The Dashboard page, showing relevant information on sign in.
 */
function Dashboard() {
    const { user } = useContext(UserContext);

    /**
     * Logs out the current user through Firebase
     */
    async function handleSignOut() {
        await firebase.signOut();
    }

    return (
        <div>
            <Navbar className={common.Header} expand="lg">
                <Navbar.Brand href="/about">
                    <img className={common.Logo} src={logo} width={42} />
                    <span className={common.LogoLabel}> Project </span>
                </Navbar.Brand>

                <Nav className="ml-auto">
                    <NavItem style={{ marginRight: "10px" }}>
                        <Link to="/tasks">
                            <Button>Team Page</Button>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Button variant="light" onClick={handleSignOut}>
                            Sign out
                        </Button>
                    </NavItem>
                </Nav>
            </Navbar>

            <Jumbotron className={styles.Container}>
                <h1>Welcome {user.name}</h1>
                <br />
                <br />
                <h2>Your Tasks</h2>
                <MyTasks />
            </Jumbotron>

            <MyGraph />

        </div>
    )
}


// export for bundle
export default Dashboard;

