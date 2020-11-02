/**
 * Component for Signing in view
 */ 

// package dependencies
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

// helper functions and constants
import firebase from "Utilities/Firebase";
import { FIREBASE_AUTH_ERR_MESSAGES } from "Utilities/constants";


/**
 * Component for signing a user in, with email and password options.
 * Provides options to move to the sign up and forgot password views.
 * 
 * @param {Object} props - component props
 * @param {function} props.setError - set an error message on the page
 * @param {function} props.toSignUp - switch to Sign Up modal
 * @param {function} props.toForgot - switch to Forgot Password modal
 */
function SignIn({ setError, toSignUp, toForgot }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /**
     * Uses Firebase to sign in with the credentials, displaying errors 
     * appropriately.
     */
    async function handleSubmit() {
        try {
            await firebase.signIn(email, password);
            setError("Sent reset email");
        } catch (error) {
            // display user friendly error message if set
            if (Object.keys(FIREBASE_AUTH_ERR_MESSAGES).includes(error.code)) {
                setError(FIREBASE_AUTH_ERR_MESSAGES[error.code]);
                return;
            }
            setError(error.message);
        }
    }

    return (
        <div>
            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={e => setEmail(e.target.value.trim())}
            />
            <br/>
            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={e => setPassword(e.target.value.trim())}
            />
            <br />
            <Button onClick={handleSubmit} style={{ width: "100%" }}>
                Sign In
            </Button>
            <br/>
            <Row style={{ marginTop: 40 }}>
                <Col align="center">
                    <a className="alert-link" onClick={toSignUp}>
                        Sign up
                    </a>
                </Col>
                <Col align="center">
                    <a className="alert-link" onClick={toForgot}>
                        Forgot your password?
                    </a>
                </Col>
            </Row>
        </div>
    );
}


// export this component
export default SignIn;

