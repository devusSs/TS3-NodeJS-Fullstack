import "../app.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { Container } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const LoginPage = () => {
  const { auth }: any = useAuth();
  const { setAuth }: any = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Log In");
  const [error, setError] = useState("");

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/clients/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      if (response.status !== 200) {
        setError(response?.data?.error?.message);
      }
      if (response.status === 200) {
        setAuth({
          user: response?.data?.data?.username,
          token: response?.data?.data?.token,
          expiry: response?.data?.data?.expires_at,
        });
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (auth?.token) {
      navigate("/");
    }
  });

  useEffect(() => {
    if (error !== "") {
      toast(error, { type: "error" });
      setButtonText("Please wait 5 seconds before retrying");
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonText("Log In");
        setButtonDisabled(false);
      }, 5000);
    }
  }, [error]);

  // TODO: give this proper styling
  return (
    <Container className="login-page">
      <ToastContainer
        className="toast-container"
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme={"dark"}
      />

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formGridUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Enter your username"
          />
        </Form.Group>

        <Form.Group controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter your password"
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={buttonDisabled}>
          {buttonText}
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
