import React from 'react';
import { Navbar, Nav, Button, ButtonGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
    return (
        <Navbar collapseOnSelect style={{ background: "rgba(0,0,0,1)" }} variant="dark" >
            <LinkContainer to="/">
                {/* <Image style={imageStyle} src={logo} roundedCircle style={{ width: "90px", height: "90px", marginRight: "10px" }} /> */}
                <Navbar.Brand href="#home" style={{ textDecoration: "none" }}>Michael Kaufman</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" >
                <Nav className="ml-auto">
                    <ButtonGroup className="mb-1">
                        <LinkContainer variant="outline-warning" to="/blog"><Button >Blog</Button></LinkContainer>
                        <LinkContainer variant="outline-warning" to="/about"><Button >About</Button></LinkContainer>
                    </ButtonGroup>


                </Nav>
                {/* <Nav>
                    <Nav.Link ><Link style={{ color: "white" }} to='/blog'>Blog</Link></Nav.Link>
                    <Nav.Link ><Link style={{ color: "white" }} to='/about'>About</Link></Nav.Link>
                </Nav> */}
            </Navbar.Collapse>
        </Navbar >
    )
}

export default Header;