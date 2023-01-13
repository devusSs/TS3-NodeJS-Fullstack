import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function TopNav() {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/"><b style={{"color": "white"}}>TS3 Bot</b></Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="/status"><b style={{"color": "white"}}>Status</b></Nav.Link>
                <Nav.Link href="/users"><b style={{"color": "white"}}>Users</b></Nav.Link>
                <Nav.Link href="/messages"><b style={{"color": "white"}}>Messages</b></Nav.Link>
                <Nav.Link href="/commands"><b style={{"color": "white"}}>Commands</b></Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    )
}