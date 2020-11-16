//============================================================
// The main page of the app, with a simple description of 
// who we are and what we do
//============================================================

// package dependencies
import React from "react";
import {
    Navbar,
    Jumbotron,
    Row,
    Col,
} from "react-bootstrap";

// style dependencies
import common from "Styles/common.css";
import styles from "Styles/about.css";

// asset dependencies
import logo from "Assets/logo.png";


/**
 * The About page containing general information about the platform
 */
function About() {
    return (
        <div>

            <Navbar className={common.Header} expand="lg">
                <Navbar.Brand href="/about">
                    <img className={common.Logo} src={logo} width={42}/>
                    <span className={common.LogoLabel}> Project </span>
                </Navbar.Brand>
            </Navbar>

            <Jumbotron className={styles.Container}>
                <Row>
                    <Col> Loading </Col>
                </Row>
            </Jumbotron>

        </div>
    )
}


// export for bundle
export default About;

