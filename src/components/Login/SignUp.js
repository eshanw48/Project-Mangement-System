/**
 * Component for Signing Up view
 */

// package dependencies
import React from "react";
import { Button, Col, Row } from "react-bootstrap";


/**
 * Component for signing up a user, with email and password options.
 * Provides options to move to the sign in and forgot password views.
 * 
 * @param {Object} props - component props 
 * @param {function} props.onSubmit - callback called on submit
 * @param {function} props.toSignIn - switch to Sign In modal
 * @param {function} props.toForgot - switch to Forgot Password modal
 */
function SignUp({ onSubmit, toSignIn, toForgot }) {

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
            <br/>
            <Button onClick={handleSubmit} style={{ width: "100%" }}>
                Sign up
            </Button>
            <br/>
            <Row style={{ marginTop: 40 }}>
                <Col align="center">
                    <a className="alert-link" onClick={toSignIn}>
                        Sign in
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
export default SignUp;
