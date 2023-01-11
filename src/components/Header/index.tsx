import { Outlet, Link } from "react-router-dom";


import { Container, Nav, Navbar } from 'react-bootstrap';

const Header = () => {
    return (
        <>

            <Navbar bg="primary" variant="dark" style={{ zIndex: 10, }}>
                <Container>
                    <Navbar.Brand href="/">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                        <Nav.Link href="/">Login</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>


            <Outlet />
        </>
    )
};

export default Header;