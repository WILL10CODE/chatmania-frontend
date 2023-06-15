import React from 'react';
import { Row, Col, Button } from "react-bootstrap";
import { FcGlobe } from "react-icons/fc";
import { AiOutlineMessage } from "react-icons/ai";
import { LinkContainer } from 'react-router-bootstrap';
import "./Home.css"

export default function Home() {
  return (
    <Row>
        <Col md={6} className = "home_pg">
            <div>
                <h1>Chat with people all over the <FcGlobe className = "world_icon" /> !!! </h1>
                <p>Connect with Chatmania<AiOutlineMessage className = "message_icon" /></p>
                <LinkContainer to = "/chat">
                    <Button variant ="success">Get Started
                    <i className ="fas fa-comments home-message-icon"></i>
                    </Button>
                </LinkContainer>
            </div>
        </Col>
        <Col md={6} className="home_bg">
        </Col>
    </Row>
  )
}
