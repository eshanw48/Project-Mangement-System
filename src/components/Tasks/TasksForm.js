// package dependencies
import React, {useContext} from "react";
import { Button } from "react-bootstrap";
import style from "Styles/task.css";
import { UserContext } from "Components/UserSession";


/**
 * 
 * @param {Object} props - component props 
 * @param {function} props.addTask - called with task text and assignee
 */
function TasksForm({ addTask }) {
    // keep track of task text and assignee
    const [description, setDescription] = React.useState("");
    const [assignee, setAssignee] = React.useState("");
    const [error, setError] = React.useState("");
    let { team } = useContext(UserContext);
    //console.log(team);

    /**
     * Creates a task with the current text and assignee.
     * Clears inputs on creation.
     * 
     * @param {Object} e - submit event
     */
    function handleSubmit(e) {
        // prevent default submit event
        e.preventDefault();
        // do not create task if input is invalid
        if (!description || !assignee) setError("Please enter both the Description and the Assignee field.");

        else if (team.names.includes(assignee)) {
            addTask(description, assignee, "In Progress");
            // clear inputs
            setDescription("");
            setAssignee("");
            setError("");
        }
        else {
            setError("The user is not a part of the team.");
        }
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Team Page</h1>
            <form className={style.taskList}>
                <div className={style.task}>
                    <div className={style.descriptionContainer}>
                        <label style={{ margin: "6px", marginRight: "3px" }}>
                            Description: 
                        </label>
                        <input
                            style={{ margin: "6px", marginLeft: "3px" }}
                            id="item"
                            name="item"
                            type="text"
                            placeholder="Enter Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className={style.assignee}>
                        <label style={{ margin: "6px", marginRight: "3px" }}>
                            Assign to: 
                        </label>
                        <input style={{ margin: "6px", marginLeft: "3px" }}
                            id="assign"
                            name="assign"
                            type="assign"
                            placeholder="Enter an assignee"
                            value={assignee}
                            onChange={e => setAssignee(e.target.value)}
                        />
                    </div>
                    <div className={style.buttons}>
                        <Button
                            type="button"
                            style={{ width: "210.15px", height: "38px" }}
                            onClick={handleSubmit}
                        >
                            Add Task
                        </Button>
                    </div>
                </div>
            </form>
            {error}
        </div>
    )
}


// export for bundle
export default TasksForm;
