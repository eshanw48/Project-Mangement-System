import React, { useState } from "react";
import { RadioGroup, Radio } from 'react-radio-group';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link
} from "react-router-dom";

import { Button, Col, Row } from "react-bootstrap";
import firebase from "Utilities/Firebase";
import { FIREBASE_AUTH_ERR_MESSAGES } from "Utilities/constants";


function welcome() {

    const [roleType, setroleType] = useState('Project Manager');
    const [name, setName] = useState('');
    const [submitted, setsubmitted] = useState(0); //Front end use only
    const [code, setcode] = useState('');

    function submission() {
        if (roleType === 'Project Manager') {
            setsubmitted(1);
        } else {
            setsubmitted(2);
        }
    }

    function handleRadio(value) {
        setroleType(value);
    }

    function handleChange(event) {
        const inputName = event.target.name;
        const value = event.target.value;
        if (inputName === 'Username') {
            setName(value);
        } else if (inputName === 'code') {
            setcode(value);
        }

    }

    return (
        <div style ={{textAlign: "center"}}>
            <form style={submitted == 0 ? {display: "block"}: {display: "none"}}>
                <h1>Welcome to the Main Page.</h1>
                <h3>Please fill out the form below in order to redirect you to the right page.</h3>


                <label>Enter your Name:</label>
                <input id="name" name = "Username" type="text" placeholder="Enter name of the user" value={name} onChange={handleChange}/>
                <br/>
                <br />
                <label>Select your role:</label>
                <br />

                <RadioGroup name="roleType" selectedValue = {roleType} onChange = {handleRadio}>
                    <Radio value="Project Manager" />Project Manager
                    <Radio value="Team Member" />Team Member
                </RadioGroup>


                <br/>
                <br />
                {/*<Link to="/dashboard">*/}
                <Button type="button" style={{ width: "50%" }} onClick={submission} >Submit Form</Button>
                {/*</Link>*/}
                
            </form >
            

            <form style={submitted == 1 ? {display: "block"}: {display: "none"}}>
                <h3>Project Manager</h3>


                <label>Team Code: </label>
                {Math.random()}
                <br />
                <br />
                <Link to = "/dashboard">
                    <Button type = "button">Go to Dashboard</Button>
                </Link>

            </form>

            
            <form style={submitted == 2 ? {display: "block"}: {display: "none"}} >
                <h3>Team Member</h3>

                <label>Enter Team Code: </label>
                <input type="text" name="code" value={code} onChange={handleChange} />
                <br/>
                <br />
                

                <Link to = "/dashboard">
                    <Button type = "button">Join Team</Button>
                </Link>

            </form>


        </div>

        
        
    )

}

export default welcome;