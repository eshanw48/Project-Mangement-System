// package dependencies
import React, { useState } from "react";
import {
    Navbar,
    Jumbotron,
    Nav,
    NavItem,
    Button
} from "react-bootstrap";


// style dependencies
import common from "Styles/common.css";
import styles from "Styles/about.css";
import Welcome from "Components/Welcome";
import task from "Styles/task.css";

// asset dependencies
import logo from "Assets/logo.png";

// helper functions and constants for firebase
import firebase from "Utilities/Firebase";
import { FIREBASE_AUTH_ERR_MESSAGES } from "Utilities/constants";

function TasksList({ tasks, index, completeTasks, removeTasks })
{
    return (
      <div className = {task.task}>
          <p style={{ textDecoration: tasks.isCompleted ? "line-through" : "" }}>Description: {tasks.text}</p>
          <strong>{tasks.inProgress} </strong>
          <Button onClick={() => completeTasks(index)}>Complete</Button>
        </div>
      );

}

function MyTasks(){

    const [tasks, setTasks] = React.useState([
        {
          text: "Hardcoded Tasks",
          isCompleted: false,
          assigne: "Person" ,
          tags: "Tag", 
          inProgress: "In Progress"
        }
      ]);

      const completeTasks = index => {
        const newTasks = [...tasks];
        newTasks[index].isCompleted = true; 
        newTasks[index].inProgress = "Completed";
        setTasks(newTasks);
      };

    return(
        <div style ={{textAlign: "center"}}>
          {tasks.map((tasks, index) => (
              <TasksList
                key={index}
                index={index}
                tasks={tasks}
                completeTasks={completeTasks}
              />
            ))}
        </div>
    );  
    
    
}

// export for bundle
export default MyTasks;