// package dependencies
import React, { useContext } from "react";
import {
    Navbar,
    Nav,
    NavItem,
    Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import uuid from "react-uuid";

// components
import Loading from "Components/Loading";
import TasksForm from "./TasksForm";
import { UserContext } from "Components/UserSession";

// style dependencies
import common from "Styles/common.css";
import taskStyle from "Styles/task.css";

// asset dependencies
import logo from "Assets/logo.png";

// helper functions and constants for firebase
import firebase from "Utilities/Firebase";


function Tasks() {
    let { team, tasks } = useContext(UserContext);

    async function handleSignOut() {
        await firebase.signOut();
    }

    // adds a task to the db, renders changes
    const addTasks = async (text, assigne, inProgress) => {
        const task = { text, assigne, inProgress, isCompleted: false };
        await firebase.createTask(team.uid, uuid(), task);
    };

    // updates a task in the db, renders changes
    const completeTasks = async uid => {
        const changes = { isCompleted: true, inProgress: "Completed" };
        await firebase.updateTask(team.uid, uid, changes);
    };

    // removes a task from the db, renders changes
    const removeTasks = async uid => {
        await firebase.deleteTask(team.uid, uid);
    };

    // wait for team uid to come in
    if (!team?.uid) return <Loading />;

    return (
        <div>
            <Navbar className={common.Header} expand="lg">
                <Navbar.Brand href="/about">
                    <img className={common.Logo} src={logo} width={42} />
                    <span className={common.LogoLabel}> Project </span>
                </Navbar.Brand>

                <Nav className="ml-auto">
                    <Link to="/dashboard">
                        <Button> Go back to Dashboard </Button>
                    </Link>
                </Nav>

                <Nav className="ml-auto">
                    <NavItem>
                        <Button variant="light" onClick={handleSignOut}> Sign out </Button>
                    </NavItem>
                </Nav>
            </Navbar>

            <br /><br />
            <TasksForm addTasks={addTasks} />

            {tasks.map(task => (
                <TasksList
                    key={task.uid}
                    task={task}
                    completeTasks={completeTasks}
                    removeTasks={removeTasks}
                />
            ))}
        </div>
    );
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
export default Tasks;
