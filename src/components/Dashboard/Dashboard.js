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
                            <Button variant="light" onClick={handleSignOut}>
                                SignOut
                            </Button>
                    </NavItem>
                </Nav>

            </Navbar>

            <Jumbotron className={styles.Container}>
                <h1>Welcome {user.name}</h1>
              
                <Link to="/tasks">My Team Page</Link> 
                <br />
                <br />
                <MyTasks />
                
            </Jumbotron>

        </div>
    )
}


// export for bundle
export default Dashboard;

