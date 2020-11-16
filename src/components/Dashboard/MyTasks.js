// package dependencies
import React, { useContext } from "react";
import { Button } from "react-bootstrap";

// components
import { UserContext } from "Components/UserSession";

// style dependencies
import task from "Styles/task.css";


function TasksList({ tasks }) {
    return (
        <div className={task.task}>
            <p style={{ textDecoration: tasks.isCompleted ? "line-through" : "" }}>
                Description: {tasks.text}
            </p>
            <strong>{tasks.inProgress} </strong>
            <Button onClick={() => completeTasks(index)}>Complete</Button>
        </div>
    );

}

function MyTasks() {
    const { tasks } = useContext(UserContext);

    return (
        <div style={{ textAlign: "center" }}>
            {tasks.map((tasks, index) => (
                <TasksList
                    key={index}
                    tasks={tasks}
                />
            ))}
        </div>
    );
}

// export for bundle
export default MyTasks;
