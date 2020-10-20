/**
 * Component for the Forgot Password view
 */

// package dependencies
import React from "react";
import { Button, Col, Row } from "react-bootstrap";


/**
 * Component for resetting a user's password, using their email.
 * Provides options to move to the sign in and sign up views.
 * 
 * @param {Object} props - component props
 * @param {function} props.onSubmit - callback called on submit
 * @param {function} props.toSignIn - switch to Sign In modal
 * @param {function} props.toSignUp - switch to Sign Up modal
 */
function ForgotPassword({ onSubmit, toSignIn, toSignUp }) {

    function handleSubmit() {
        onSubmit();
    }

    return (
        <div>
            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Email"
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
        </div>
    );
}


// export this component
export default ForgotPassword;
