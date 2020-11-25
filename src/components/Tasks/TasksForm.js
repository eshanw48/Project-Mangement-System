// package dependencies
import React from "react";
import { Button } from "react-bootstrap";
import taskStyle from "Styles/task.css";

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
            <h1>Team Page</h1>
            <form className={taskStyle.taskList}>
                
            <div className={taskStyle.task}>
            <div className={taskStyle.description}>
                <label style={{margin:'6px',marginRight:'3px'}}>Description: </label>
                <input
                style={{margin:'6px',marginLeft:'3px'}}
                    id="item"
                    name="item"
                    type="text"
                    placeholder="Enter Description"
                    value={value}
                    onChange={e => (setValue(e.target.value))}
                />
            </div>
            <div className={taskStyle.assignee}>
                <label style={{margin:'6px',marginRight:'3px'}} >Assign to: </label>
                <input style={{margin:'6px',marginLeft:'3px'}}
                    id="assign"
                    name="assign"
                    type="assign"
                    placeholder="Enter an assignee"
                    value={value2}
                    onChange={e => (setValue2(e.target.value))}
                />
             </div>
             <div className={taskStyle.buttons}>
                <Button style={{width:'150.34px',height:'38px'}}
                    type="button"
                    
                    onClick={handleSubmit}
                >
                    Add Task
                </Button>
                </div>
                </div>
            </form>
            
        </div>
    )
}

// export for bundle
export default TasksForm;
