/**
 * Joins the three primary components for user sign up, 
 * login, and password reset
 */ 

// package dependencies
import React, { useState } from "react";
import {
    Navbar,
    Button,
    Modal,
} from "react-bootstrap";

// local component dependencies
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

// style dependencies
import common from "Styles/common.css";
import styles from "Styles/about.css";

// asset dependencies
import logo from "Assets/logo.png";


// list of auth components used to switch between views
const AUTH_COMPONENTS = [
    ["Sign In", SignIn],
    ["Sign Up", SignUp],
    ["Forgot your Password?", ForgotPassword],
]


/**
 * Controller for login components (signing in, signing up, forgot password).
 * Shows the currently seletected component type.
 */
function Login() {
    let [authType, setAuthType] = useState(0);

    // helper functions to navigate to each auth view type
    const navFuncs = {
        toSignIn: () => setAuthType(0),
        toSignUp: () => setAuthType(1),
        toForgot: () => setAuthType(2),
    }

    // current auth type component to render
    const [title, AuthComponent] = AUTH_COMPONENTS[authType];

    return (
        <div>

            <Navbar className={common.Header} expand="lg">
                <Navbar.Brand href="/about">
                    <img className={common.Logo} src={logo} width={42}/>
                    <span className={common.LogoLabel}> Project </span>
                </Navbar.Brand>
            </Navbar>

            <Modal.Dialog>
                <Modal.Header style={{border: 0}}>
                    <Modal.Title> {title} </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <AuthComponent {...navFuncs} />
                </Modal.Body>
            </Modal.Dialog>

        </div>
    );
}


// export for bundle
export default Login;

