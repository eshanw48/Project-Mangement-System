// package dependencies
import React, { useContext } from "react";
import { Button } from "react-bootstrap";

// components
import { UserContext } from "Components/UserSession";

// style dependencies
import taskStyle from "Styles/task.css";

import firebase from "Utilities/Firebase";

function TasksList({ tasks, completeTasks, name }) {
    if(tasks.assigne===name){
    return (
        <div style={{margin:'10px 0px'}}className={taskStyle.task}>
            <div className={taskStyle.description}>
            <p style={{ textDecoration: tasks.isCompleted ? "line-through" : "" }}>
            {tasks.text}
            </p>
            </div>
            
            <div className={taskStyle.buttons}>
            <Button className={taskStyle.complete} onClick={() => completeTasks(tasks.uid)}>{tasks.isCompleted && <p style={{margin:'0px'}}>Completed</p>}{!tasks.isCompleted && <p style={{margin:'0px'}}>In progress</p>}</Button>

            </div>
        </div>
    );}else{
        return(<div></div>);
    }

}

function MyTasks() {
    let { team, tasks,user } = useContext(UserContext);

        // updates a task in the db, renders changes
        const completeTasks = async uid => {
            const changes = { isCompleted: true, inProgress: "Completed" };
            await firebase.updateTask(team.uid, uid, changes);
        };

    return (
        <div style={{padding:'0px'}} className={taskStyle.taskList}>
            {tasks.map((tasks, index) => (
                <TasksList
                    key={index}
                    tasks={tasks}
                    completeTasks={completeTasks}
                    name={user.name}
                />
            ))}
        </div>
    );
}

// export for bundle
export default MyTasks;
