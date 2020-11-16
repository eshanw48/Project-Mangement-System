// package dependencies
import React from "react";
import { Button } from "react-bootstrap";


function TasksForm({ addTasks }) {
    const [value, setValue] = React.useState("");
    const [value2, setValue2] = React.useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value || !value2) return;
        addTasks(value, value2, "In Progress");
        setValue("");
        setValue2("");
    };

    return (
        <div style={{ textAlign: "center" }}>
            <form>
                <h1>Task Page</h1>
                <br /><br />

                <label>Enter a Task to Add:</label>
                <input
                    id="item"
                    name="item"
                    type="text"
                    placeholder="Enter a task"
                    value={value}
                    onChange={e => (setValue(e.target.value))}
                />

                <label>Enter Assigne of Task:</label>
                <input
                    id="assign"
                    name="assign"
                    type="assign"
                    placeholder="Enter an assigne"
                    value={value2}
                    onChange={e => (setValue2(e.target.value))}
                />
                <br /><br />

                <Button
                    type="button"
                    style={{ width: "50%" }}
                    onClick={handleSubmit}
                >
                    Add Task
                </Button>
            </form>
            <br /><br />
        </div>
    )
}

// export for bundle
export default TasksForm;
