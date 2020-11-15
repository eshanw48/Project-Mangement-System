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
      <div className = {task.task}
          style={{ textDecoration: tasks.isCompleted ? "line-through" : "" }}>
            <p>Description: {tasks.text} , Assigne: {tasks.assigne}</p>
          <Button onClick={() => completeTasks(index)}>Complete</Button>
          <Button onClick={() => removeTasks(index)}>x</Button>
        </div>
      );

}

function TasksForm({addTasks}){

        const [value, setValue] = React.useState("");
        const [value2, setValue2] = React.useState("");

        const handleSubmit = e => {
        e.preventDefault();
        if (!value || !value2) return;
        addTasks(value,value2);
        setValue("");
        setValue2("");
        };

        return(

          <div style = {{textAlign: "center"}}>

            <form>
                <h1>Task Page</h1>

                <br>
                </br>

                <label>Enter a Task to Add:</label>
                <input id="item" name ="item" type="text" placeholder="Enter a task" value={value} onChange={e => (setValue(e.target.value))}  ></input>

                <label>Enter Assigne of Task:</label>
                <input id="assign" name="assign" type="assign" placeholder="Enter an assigne" value={value2} onChange={e => (setValue2(e.target.value))} />
                
                <br>
                </br>

                <Button type="button" style={{ width: "50%" }} onClick={handleSubmit} >Add Task</Button>
            </form>

            <br>
            </br>


            </div>

        )

}

function Tasks(){

    const [tasks, setTasks] = React.useState([
        {
          text: "Hardcoded Tasks",
          isCompleted: false,
          assigne: "Person" ,
          tags: "Tag" 
        }
      ]);

      const addTasks = (text,assigne) => {
        const newTasks = [...tasks, { text,assigne }];
        setTasks(newTasks);
      };

      const completeTasks = index => {
        const newTasks = [...tasks];
        newTasks[index].isCompleted = true;
        setTasks(newTasks);
      };
    
      const removeTasks = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
      };

   

    return(
        <div>
          <TasksForm addTasks={addTasks} />
        {tasks.map((tasks, index) => (
            
          <div>
              <TasksList
                key={index}
                index={index}
                tasks={tasks}
                completeTasks={completeTasks}
                removeTasks={removeTasks}
              />
            </div>

            ))}
        </div>
    );  
    
    
}

// export for bundle
export default Tasks;