import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState,useEffect } from "react";

function Navbar1() {
    const handleScroll = event => {
        console.log('scrollTop: ', event.currentTarget.scrollTop);
        console.log('offsetHeight: ', event.currentTarget.offsetHeight);
      };

  return (
    <>
      <div className="side-bar">
        <nav className="navigation">
          <a href="#">Home</a>
          <a href="#about">About</a>
          <a href="#resume">Resume</a>
          <a href="#contact">Contact</a>
          <a href="#project">Project</a>
        </nav>
      </div>
      <div className="hey"></div>
      <div className="main-content">
        <section id="about">
          <h1>About</h1>
        </section>
        <section id="contact">
          <h1>Contact</h1>
        </section>
        <section id="project">
          <h1>Project</h1>
        </section>
      </div>
     
    </>
  );
}

export default Navbar1;
