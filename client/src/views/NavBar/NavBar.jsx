import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import s from '../NavBar/NavBar.module.css';

function NavBar() {
    return (
        <Navbar expand="lg" data-bs-theme="dark" className="row bg-body-tertiary vw-100 m-0">
            <Container fluid>
                <Navbar.Brand href="/">                    
                    <img className={`${s.imgLogo}`} src="logo.png" alt="logo" />                    
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        
                        <NavDropdown title="Clientes" id="navbarClientes">
                            <NavDropdown.Item href="/postCliente">Crear Nuevo Cliente</NavDropdown.Item>
                            <NavDropdown.Item href="/">Ver clientes</NavDropdown.Item>                            
                        </NavDropdown>
                        <NavDropdown title="Batidoras" id="navbarBatidoras">
                            <NavDropdown.Item href="/postBatidora">Crear Nueva Batidora</NavDropdown.Item>
                            <NavDropdown.Item href="/batidoras">Ver Batidoras</NavDropdown.Item>                           
                        </NavDropdown>
                        <NavDropdown title="Reductores" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/postReductor">Crear Nuevo Reductor</NavDropdown.Item>
                            <NavDropdown.Item href="/reductores">Ver Reductores</NavDropdown.Item>                                                  
                        </NavDropdown>                       
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;