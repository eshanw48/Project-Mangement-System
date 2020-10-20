/**
 * Component for Signing in view
 */ 

// package dependencies
import React from "react";
import { Button, Col, Row } from "react-bootstrap";

// style dependencies
import styles from "Styles/login.css";


/**
 * Component for signing a user in, with email and password options.
 * Provides options to move to the sign up and forgot password views.
 * 
 * @param {Object} props - component props
 * @param {function} props.onSubmit - callback called on submit
 * @param {function} props.toSignUp - switch to Sign Up modal
 * @param {function} props.toForgot - switch to Forgot Password modal
 */
function SignIn({ onSubmit, toSignUp, toForgot }) {

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
            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Password"
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

