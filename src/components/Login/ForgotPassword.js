/**
 * Component for the Forgot Password view
 */

// package dependencies
import React, { useState } from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";

// helper functions and constants
import firebase from "Utilities/Firebase";
import { FIREBASE_AUTH_ERR_MESSAGES } from "Utilities/constants";


/**
 * Component for resetting a user's password, using their email.
 * Provides options to move to the sign in and sign up views.
 * 
 * @param {Object} props - component props
 * @param {function} props.setError - set an error message on the page
 * @param {function} props.toSignIn - switch to Sign In modal
 * @param {function} props.toSignUp - switch to Sign Up modal
 */
function ForgotPassword({ setError, onSubmit, toSignIn, toSignUp }) {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState('');

    /**
     * Uses Firebase to send password reset email, displaying errors 
     * appropriately.
     */
    async function handleSubmit() {
        try {
            await firebase.resetPassword(email);
            setSuccess("Sent Password Email");
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
            <Button onClick={handleSubmit} style={{ width: "100%" }}>
                Reset Password
            </Button>
            <br/>
            <Row style={{ marginTop: 40 }}>
                <Col align="center">
                    <a className="alert-link" onClick={toSignIn}>
                        Sign in
                    </a>
                </Col>
                <Col align="center">
                    <a className="alert-link" onClick={toSignUp}>
                        Sign up
                    </a>
                </Col>
            </Row>
            {!!success && (
                <Alert variant="success">{success}</Alert>
            )}
        </div>
    );
}


// export this component
export default ForgotPassword;
