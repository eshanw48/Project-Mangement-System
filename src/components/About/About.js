//============================================================
// The main page of the app, with a simple description of 
// who we are and what we do
//============================================================

// package dependencies
import React from "react";
import {
    Navbar,
    Nav,
    NavItem,
    Jumbotron,
    Button,
    Row,
    Col,
    Image
} from "react-bootstrap";
import { Link } from "react-router-dom";

// style dependencies
import common from "Styles/common.css";
import styles from "Styles/about.css";

// asset dependencies
import logo from "Assets/logo.png";
import productivity from "Assets/productivity.png";


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
                
                <Nav className="ml-auto">
                    <NavItem>
                        <Link to="/login">
                            <Button variant="light"> Login </Button>
                        </Link>
                    </NavItem>
                </Nav>
            </Navbar>

            <Jumbotron className={styles.Container}>
                <Row>
                    <Col>
                        <h1> The easiest way to manage Team </h1>
                        <h1> Projects and Tasks </h1>
                        <h5 style={{ marginTop: 20 }}>
                            Simple, easy, and efficient.
                        </h5>
                        <div style={{ marginTop: 40 }}>
                            <Link to="/login">
                                <Button variant="success">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </Col>
                    <Col>
                        <Image src={productivity} fluid />
                    </Col>
                </Row>
            </Jumbotron>

        </div>
    )
}


// export for bundle
export default About;

