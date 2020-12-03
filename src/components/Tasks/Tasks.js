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
import Task from "./Task";
import TasksForm from "./TasksForm";
import TeamGraph from "./TeamGraph";
import { UserContext } from "Components/UserSession";

// style dependencies
import common from "Styles/common.css";
import taskStyle from "Styles/task.css";

// asset dependencies
import logo from "Assets/logo.png";

// helper functions and constants for firebase
import firebase from "Utilities/Firebase";


/**
 * Renders main Tasks page, showing all tasks for the current team
 * and a visual graph of productivity.
 */
function Tasks() {
    // load in team and tasks data
    let { team, tasks } = useContext(UserContext);

    /**
     * Logs out the current user through Firebase
     */
    async function handleSignOut() {
        await firebase.signOut();
    }

    /**
     * Creates a task with the given data and stores it in the database.
     * 
     * @param {string} text - text of task
     * @param {string} assigne - person this task is for
     * @param {boolean} inProgress - status of task
     * @return {Object} - status of task creation
     */
    async function addTask(text, assigne, inProgress) {
        const task = { text, assigne, inProgress, isCompleted: false };
        return await firebase.createTask(team.uid, uuid(), task);
    }

    /**
     * Marks the given task as complete and updates the database accordingly.
     * 
     * @param {string} uid - uid of task
     * @return {Object} - status of task update
     */
    async function markComplete(uid) {
        // mark as complete with current time
        const changes = {
            isCompleted: true,
            inProgress: "Completed",
            date: (new Date()).toString(),
        };
        return await firebase.updateTask(team.uid, uid, changes);
    };

    /**
     * Updates the given task with the given text and assignee values.
     * 
     * @param {string} text - new text of task
     * @param {string} assigne - new assignee of task
     * @param {string} uid - uid of task
     * @return {Object} - status of task update
     */
    async function editTask(text, assigne, uid) {
        const editchanges = { text, assigne };
        return await firebase.updateTask(team.uid, uid, editchanges);
    }

    /**
     * Deletes this task from the database.
     * 
     * @param {string} uid - uid of task
     * @return {Object} - status of task delete
     */
    async function removeTask(uid) {
        await firebase.deleteTask(team.uid, uid);
    }

    // return the Loading screen while the team data loads in
    if (!team?.uid) return <Loading />;

    return (
        <div>
            <Navbar className={common.Header} expand="lg">
                <Navbar.Brand href="/about">
                    <img className={common.Logo} src={logo} width={42} />
                    <span className={common.LogoLabel}> Project </span>
                </Navbar.Brand>

                <Nav className="ml-auto"></Nav>

                <Nav className="ml-auto">
                    <NavItem style={{ marginRight: "10px" }}>
                        <Link to="/dashboard">
                            <Button>Dashboard</Button>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Button variant="light" onClick={handleSignOut}>
                            Sign out
                        </Button>
                    </NavItem>
                </Nav>
            </Navbar>

            <br /><br />

            <TasksForm addTask={addTask} />
            <div className={taskStyle.taskList}>
                {tasks.map(task => (
                    <Task
                        key={task.uid}
                        task={task}
                        markComplete={() => markComplete(task.uid)}
                        removeTask={() => removeTask(task.uid)}
                        editTask={editTask}
                    />
                ))}
            </div>
            <TeamGraph />
        </div>
    );
}


// export for bundle
export default Tasks;
