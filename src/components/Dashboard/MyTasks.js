// package dependencies
import React, { useContext } from "react";
import { Button } from "react-bootstrap";

// components and utilities
import { UserContext } from "Components/UserSession";

// style dependencies
import styles from "Styles/task.css";

// utility functions and constants
import firebase from "Utilities/Firebase";


/**
 * Renders out the current user's tasks for their team.
 * Does so by filtering out all the tasks for this team not assigned
 * to this user. Shows an appropriate message if there are no tasks.
 */
function MyTasks() {
    // load in user related data
    let { team, tasks, user } = useContext(UserContext);

    /**
     * Marks a task as "Completed" given the task uid.
     * 
     * @param {string} uid - uid of task
     * @return {Object} - result of task update
     */
    async function markComplete(uid) {
        const changes = { isCompleted: true, inProgress: "Completed" };
        return await firebase.updateTask(team.uid, uid, changes);
    }

    /**
     * Determines if the given task belongs to the current user.
     * 
     * @param {Task} task - task to filter
     * @return {boolean} - true if task belongs to this user, false otherwise
     */
    function isOwnTask(task) {
        return task.assigne === user.name;
    }

    // render out all tasks in this team belonging to this user
    const userTasks = tasks.filter(isOwnTask);
    return (
        <div style={{ padding: "0px" }} className={styles.taskList}>
            {userTasks.length > 0 ? (
                userTasks.map(task => (
                    <Task
                        key={task.uid}
                        markComplete={() => markComplete(task.uid)}
                        {...task}
                    />
                ))
            ) : (
                <div> No more tasks for you for now! </div>
            )}
        </div>
    );
}


/**
 * Renders out a single task with appropriate action buttons.
 * Shows task related info, including text, completion status, etc. along with
 * a button to mark this task as complete using the given handler.
 * 
 * @param {Object} props - component props 
 * @param {string} props.text - text of task
 * @param {boolean} props.isCompleted - completion status of task 
 * @param {function} props.markComplete - handler to mark this task as complete
 */
function Task({ text, isCompleted, markComplete }) {
    return (
        <div style={{ margin: "10px 0px" }} className={styles.task}>
            <div className={styles.descriptionContainer}>
                <p
                    className={styles.description}
                    style={{ textDecoration: isCompleted ? "line-through" : "" }}
                >
                    {text}
                </p>
            </div>
            <div className={styles.buttons}>
                <Button className={styles.complete} onClick={markComplete}>
                    <p style={{ margin: "0px" }}>
                        {isCompleted ? "Completed" : "In progress"}
                    </p>
                </Button>
            </div>
        </div>
    );
}


// export for bundle
export default MyTasks;
