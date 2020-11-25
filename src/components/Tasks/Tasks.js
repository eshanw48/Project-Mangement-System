// package dependencies
import React, { useContext } from "react";
import {
    Navbar,
    Nav,
    NavItem,
    Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import uuid from "react-uuid";

// components
import Loading from "Components/Loading";
import TasksForm from "./TasksForm";
import { UserContext } from "Components/UserSession";

// style dependencies
import common from "Styles/common.css";
import taskStyle from "Styles/task.css";

// asset dependencies
import logo from "Assets/logo.png";

// helper functions and constants for firebase
import firebase from "Utilities/Firebase";


function Tasks() {
    let { team, tasks } = useContext(UserContext);

    async function handleSignOut() {
        await firebase.signOut();
    }

    // adds a task to the db, renders changes
    const addTasks = async (text, assigne, inProgress) => {
        const task = { text, assigne, inProgress, isCompleted: false };
        await firebase.createTask(team.uid, uuid(), task);
    };

    // updates a task in the db, renders changes
    const completeTasks = async uid => {
        const changes = { isCompleted: true, inProgress: "Completed" };
        await firebase.updateTask(team.uid, uid, changes);
    };

    const editTasks = async (text, assigne, uid) => {
        const editchanges = { text, assigne };
        await firebase.updateTask(team.uid, uid, editchanges);
    }

    // removes a task from the db, renders changes
    const removeTasks = async uid => {
        await firebase.deleteTask(team.uid, uid);
    };

    // wait for team uid to come in
    if (!team?.uid) return <Loading />;

    return (
        <div>
            <Navbar className={common.Header} expand="lg">
                <Navbar.Brand href="/about">
                    <img className={common.Logo} src={logo} width={42} />
                    <span className={common.LogoLabel}> Project </span>
                </Navbar.Brand>

                <Nav className="ml-auto">
 
                </Nav>

                <Nav className="ml-auto">
                    <NavItem style={{marginRight:'10px'}}>
                    <Link to="/dashboard">
                        <Button>Dashboard</Button>
                    </Link>
                    </NavItem>
                    <NavItem>
                        <Button variant="light" onClick={handleSignOut}> Sign out </Button>
                    </NavItem>
                </Nav>
            </Navbar>

            <br /><br />
            <TasksForm addTasks={addTasks} />
            <div className={taskStyle.taskList}>
            {tasks.map(task => (
                <TasksList
                    key={task.uid}
                    task={task}
                    completeTasks={completeTasks}
                    removeTasks={removeTasks}
                    editTasks = {editTasks}
                />
            ))}
            </div>

        </div>
    );
}


function TasksList({ task, completeTasks, removeTasks, editTasks }) {

    const [edit, setEdit] = React.useState(false);
    const [text, setText] = React.useState(task.text);
    const [assigne, setAssigne] = React.useState(task.assigne);


    function handleEditTasks(){
        editTasks(text, assigne, task.uid);
        setEdit(false);
    };

    return (

        <>
        <div className={taskStyle.task} style={{ display: edit ? "none" : "flex"}}>
            <div className={taskStyle.description}>
                <p style={{ textDecoration: task.isCompleted ? "line-through" : "",margin:'6px' }}>
                    {task.text}
                </p>
            </div>

            <div className={taskStyle.assignee}>
            <p style={{margin:'6px'}}>
                {task.assigne} 
            </p>
            </div>
 
            
            <div className={taskStyle.buttons}> 
                <Button className={taskStyle.complete} onClick={() => completeTasks(task.uid)}>{task.isCompleted && <p style={{ margin: '0px' }}>Completed</p>}{!task.isCompleted && <p style={{ margin: '0px' }}>In progress</p>}</Button>
                <Button className={taskStyle.edit} onClick={() => setEdit(true)} variant = "success">Edit</Button>
                <Button variant ="danger" className={taskStyle.deleteButton} onClick={() => removeTasks(task.uid)}>x</Button>
            </div>
        </div>
        
        <form className={taskStyle.taskList} style={{ display: edit ? "block" : "none",padding:'0px'}} >
                
            <div className={taskStyle.task}>
            <div className={taskStyle.description}>
                <label style={{margin:'6px',marginRight:'3px'}}>Edit Task Description: </label>
                <input
                style={{margin:'6px',marginLeft:'3px'}}
                    id="item"
                    name="item"
                    type="text"
                    value={text}
                    onChange={e => (setText(e.target.value))}        
                />
            </div>
            <div className={taskStyle.assignee}>
                <label style={{margin:'6px',marginRight:'3px'}} >Edit Assignee: </label>
                <input style={{margin:'6px',marginLeft:'3px'}}
                    id="assign"
                    name="assign"
                    type="assign"
                    value={assigne}
                    onChange={e => (setAssigne(e.target.value))}
                />
             </div>
             <div className={taskStyle.buttons}>
                <Button style={{width:'210.15px',height:'38px'}}type="button" onClick = {handleEditTasks} > Edit Task </Button>
                </div>
                </div>
            </form>    

        </>

    );
}

// export for bundle
export default Tasks;
