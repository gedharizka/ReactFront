import  React from 'react';
import {Link} from 'react-router-dom';
import {
    Container,
    Navbar,
    Nav
} from 'react-bootstrap';

import styled from 'styled-components';

const Styles = styled.div `
    .navbar{
        background-color: black;
    }
    a, .navbar-brand, .navbar-nav .nav-link{
        color: white;
        &:hover {
            color: green;
        }
    }
    `;

class NavbarMenu extends React.Component{


    render(){
        return(
        <Styles>
            <Navbar expand = "lg" >
                <Container>
                    <Navbar.Brand>
                        <Link to="/Home">P.O.S Project</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Item>
                                <Nav.Link>
                                    <Link to="/Category"> Catagori</Link>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link>
                                    <Link to="/Variant"> Variant</Link>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Styles>
        )
    }
}
export default NavbarMenu;