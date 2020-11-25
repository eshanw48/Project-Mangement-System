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
import taskStyle from "Styles/task.css";

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
                    <NavItem style={{marginRight:'10px'}}>
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
                <MyTasks />
                
            </Jumbotron>

        </div>
    )
}


function TasksList({ task, completeTasks, removeTasks }) {
    return (
        <div className={taskStyle.task}>
            <p style={{ textDecoration: task.isCompleted ? "line-through" : "" }}>
                Description: {task.text} , Assigne: {task.assigne}
            </p>
            <strong>{task.inProgress}</strong>
            <Button onClick={() => completeTasks(task.uid)}>Complete</Button>
            <Button onClick={() => removeTasks(task.uid)}>x</Button>
        </div>
    );
}


// export for bundle
export default Dashboard;

