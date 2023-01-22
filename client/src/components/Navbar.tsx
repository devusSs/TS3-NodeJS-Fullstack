import { Button, Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

export default function TopNav() {
  const { auth }: any = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Navbar className="navbar-top" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <b style={{ color: "white" }}>TS3 Bot</b>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/tos">
            <b style={{ color: "white" }}>Bot Terms of Use</b>
          </Nav.Link>
          <Nav.Link href="/status">
            <b style={{ color: "white" }}>Status</b>
          </Nav.Link>
        </Nav>

        {auth?.token && (
          <Nav className="me-auto">
            <Nav.Link href="/users">
              <b style={{ color: "white" }}>Users</b>
            </Nav.Link>
            <Nav.Link href="/commands">
              <b style={{ color: "white" }}>Commands</b>
            </Nav.Link>
            <Nav.Link href="/messages">
              <b style={{ color: "white" }}>Messages</b>
            </Nav.Link>
          </Nav>
        )}

        {!auth?.token && (
          <Nav>
            <Button className="login-button" href="/login">
              Login
            </Button>
          </Nav>
        )}

        {auth?.token && (
          <Nav>
            <Navbar.Text className="navbar-user">{auth?.user}</Navbar.Text>
            <Button className="logout-button" onClick={signOut}>
              Logout
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}
