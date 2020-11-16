import React, { useState } from "react";
import { useContext } from "react";
import { RadioGroup, Radio } from "react-radio-group";
import uuid from "react-uuid";

import { Button } from "react-bootstrap";
import firebase from "Utilities/Firebase";
import { UserContext } from "../UserSession";


function Welcome() {
    const [roleType, setroleType] = useState("Project Manager");
    const [name, setName] = useState("");
    const [submitted, setsubmitted] = useState(0); // Front end use only
    const [code, setcode] = useState("");

    const sessionData = useContext(UserContext);

    function submission() {
        if (roleType === "Project Manager") {
            const newCode = uuid();
            setcode(newCode);
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
        if (inputName === "Username" && value !== " ") {
            setName(value);
        } else if (inputName === "code") {
            setcode(value);
        }
    }

    async function sendUserInfo() {
        const user = sessionData.user;
        if (roleType === "Team Member") {
            const exists = await firebase.teamExists(code);
            if (exists) {
                await firebase.joinTeam(name, roleType, user.uid, code)
                // window.location.reload();
            } else {
                alert("Team not found");
            }
        } else if (roleType === "Project Manager") {
            await firebase.generateTeam(name, roleType, user.uid, code);
            // window.location.reload();
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
