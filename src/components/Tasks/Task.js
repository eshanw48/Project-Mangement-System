// package dependencies
import React, { useState } from "react";
import { Button } from "react-bootstrap";

// style dependencies
import styles from "Styles/task.css";


/**
 * Renders out a single Task, containing relevant info and action buttons.
 * Shows task text, assignee, along with buttons to edit and mark the task 
 * as complete.
 * 
 * @param {Object} props - component props
 * @param {Task} props.task - task to render
 * @param {function} props.markComplete - function to mark this task as complete
 * @param {function} props.removeTask - function to remove this task
 * @param {function} props.editTask - function to edit this task
 */
function Task({ task, markComplete, removeTask, editTask }) {
    // keep track of edit, text, and assignee values
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState(task.text);
    const [assigne, setAssigne] = useState(task.assigne);

    /**
     * Saves changes to this to the database and exits the edit menu.
     */
    function handleEditTasks() {
        editTask(text, assigne, task.uid);
        setEdit(false);
    }

    return (
        <>
            <div className={styles.task} style={{ display: edit ? "none" : "flex" }}>
                <div className={styles.descriptionContainer}>
                    <p
                        className={styles.description}
                        style={{ textDecoration: task.isCompleted ? "line-through" : "" }}
                    >
                        {task.text}
                    </p>
                </div>

                <div className={styles.assignee}>
                    <p style={{ margin: "6px" }}>
                        {task.assigne}
                    </p>
                </div>

                <div className={styles.buttons}>
                    <Button className={styles.complete} onClick={markComplete}>
                        {task.isCompleted && (
                            <p style={{ margin: "0px" }}>Completed</p>
                        )}
                        {!task.isCompleted && (
                            <p style={{ margin: "0px" }}>In progress</p>
                        )}
                    </Button>
                    <Button
                        className={styles.edit}
                        onClick={() => setEdit(true)}
                        variant="success"
                    >
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        className={styles.deleteButton}
                        onClick={removeTask}
                    >
                        x
                    </Button>
                </div>
            </div>

            <form
                className={styles.taskList}
                style={{ display: edit ? "block" : "none", padding: "0px" }}
            >
                <div className={styles.task}>
                    <div className={styles.descriptionContainer}>
                        <label style={{ margin: "6px", marginRight: "3px" }}>
                            Edit Task Description: 
                        </label>
                        <input
                            style={{ margin: "6px", marginLeft: "3px" }}
                            id="item"
                            name="item"
                            type="text"
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />
                    </div>
                    <div className={styles.assignee}>
                        <label style={{ margin: "6px", marginRight: "3px" }}>
                            Edit Assignee: 
                        </label>
                        <input style={{ margin: "6px", marginLeft: "3px" }}
                            id="assign"
                            name="assign"
                            type="text"
                            value={assigne}
                            onChange={e => setAssigne(e.target.value)}
                        />
                    </div>
                    <div className={styles.buttons}>
                        <Button
                            style={{ width: "210.15px", height: "38px" }}
                            type="button"
                            onClick={handleEditTasks}
                        >
                            Edit Task
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
}

// export for bundle
export default Task;
