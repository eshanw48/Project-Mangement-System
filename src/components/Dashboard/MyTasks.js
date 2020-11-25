// package dependencies
import React, { useContext } from "react";
import { Button } from "react-bootstrap";

// components
import { UserContext } from "Components/UserSession";

// style dependencies
import taskStyle from "Styles/task.css";


function TasksList({ tasks }) {
    return (
        <div style={{margin:'10px 0px'}}className={taskStyle.task}>
            <div className={taskStyle.description}>
            <p style={{ textDecoration: tasks.isCompleted ? "line-through" : "" }}>
                Description: {tasks.text}
            </p>
            </div>
            
            <div className={taskStyle.buttons}>
            <Button className={taskStyle.complete} onClick={() => completeTasks(task.uid)}>{tasks.isCompleted && <p style={{margin:'0px'}}>Completed</p>}{!tasks.isCompleted && <p style={{margin:'0px'}}>In progress</p>}</Button>

            </div>
        </div>
    );

}

function MyTasks() {
    const { tasks } = useContext(UserContext);

    return (
        <div style={{padding:'0px'}} className={taskStyle.taskList}>
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
