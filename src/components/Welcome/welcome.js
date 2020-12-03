// dependencies
import React, { useState } from "react";
import { useContext } from "react";
import { RadioGroup, Radio } from "react-radio-group";
import uuid from "react-uuid";
import { Button } from "react-bootstrap";

// local components
import { UserContext } from "../UserSession";

// utility functions and constants
import firebase from "Utilities/Firebase";


/**
 * Onboards the current user, saving any relevant information and 
 * forms accordingly (different for Team Members and Managers).
 */
function Welcome() {
    // load in session data
    const sessionData = useContext(UserContext);

    // keep track of form values
    const [roleType, setroleType] = useState("Project Manager");
    const [name, setName] = useState("");
    const [submitted, setsubmitted] = useState(0); // Front end use only
    const [code, setcode] = useState("");

    /**
     * Saves a new user in the database with the info on submit
     */
    function submission() {
        if (roleType === "Project Manager") {
            const newCode = uuid();
            setcode(newCode);
            setsubmitted(1);
        } else {
            setsubmitted(2);
        }
    }

    /**
     * Sets the role type of this user based on the selected radio
     * 
     * @param {string} value - role type of the user
     */
    function handleRadio(value) {
        setroleType(value);
    }

    /**
     * Sets the name of this user and saves the team code, depending on 
     * which value is given.
     * 
     * @param {Object} event - input change event
     */
    function handleChange(event) {
        const inputName = event.target.name;
        const value = event.target.value;
        if (inputName === "Username" && value !== " ") {
            setName(value);
        } else if (inputName === "code") {
            setcode(value);
        }
    }

    /**
     * Either generates or joins a particular team, depending on the
     * role type chosen by the user in this form.
     */
    async function sendUserInfo() {
        const user = sessionData.user;
        if (roleType === "Team Member") {
            const exists = await firebase.teamExists(code);
            if (exists) {
                await firebase.joinTeam(name, roleType, user.uid, code)
            } else {
                alert("Team not found");
            }
        } else if (roleType === "Project Manager") {
            await firebase.generateTeam(name, roleType, user.uid, code);
        }
    }

    return (
        <div style={{ textAlign: "center" }}>
            <form style={{ display: submitted == 0 ? "block" : "none" }}>
                <h1>Welcome to the Main Page.</h1>
                <h3>
                    Please fill out the form below in order to redirect you to the right page.
                </h3>

                <label>Enter your Name:</label>
                <input
                    id="name"
                    name="Username"
                    type="text"
                    placeholder="Enter name of the user"
                    value={name}
                    onChange={handleChange}
                    required
                />
                <br /><br />
                <label>Select your role:</label>
                <br />

                <RadioGroup
                    name="roleType"
                    selectedValue={roleType}
                    onChange={handleRadio}
                >
                    <Radio value="Project Manager" />Project Manager
                    <Radio value="Team Member" />Team Member
                </RadioGroup>
                <br /><br />
                <Button
                    type="button"
                    style={{ width: "50%" }}
                    onClick={submission}
                >
                    Submit Form
                </Button>
            </form >

            <form style={{ display: submitted == 1 ? "block" : "none" }}>
                <h3>Project Manager</h3>
                <label>Team Code: </label>
                {code}
                <br /><br />
                <Button onClick={sendUserInfo} type="button">
                    Go to Dashboard
                </Button>
            </form>

            <form style={{display: submitted == 2 ? "block" : "none" }} >
                <h3>Team Member</h3>
                <label>Enter Team Code: </label>
                <input
                    type="text"
                    name="code"
                    value={code}
                    onChange={handleChange}
                />
                <br /><br />
                <Button onClick={sendUserInfo} type="button">Join Team</Button>
            </form>
        </div>
    )
}

export default Welcome;
