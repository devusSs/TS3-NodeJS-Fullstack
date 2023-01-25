import "../App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useRef, useState } from "react";
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
    setError("");
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
      }
    }
  };

  useEffect(() => {
    if (auth?.token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (error !== "") {
      if (error.includes("401") || error.includes("400")) {
        toast("Invalid username or password", { type: "error" });
        setButtonText("Please wait 5 seconds before retrying");
        setButtonDisabled(true);
        setTimeout(() => {
          setButtonText("Log In");
          setButtonDisabled(false);
        }, 5000);
      } else {
        toast(error, { type: "error" });
        setButtonText("Please wait 5 seconds before retrying");
        setButtonDisabled(true);
        setTimeout(() => {
          setButtonText("Log In");
          setButtonDisabled(false);
        }, 5000);
      }
    }
  }, [error]);

  return (
    <div className="login-page">
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

      <div className="login-page-container">
        <Form
          onSubmit={submitHandler}
          style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Form.Group
            controlId="formGridUsername"
            className="mb-5"
            style={{ width: "400px" }}
          >
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Enter your username"
              style={{ textAlign: "center" }}
            />
          </Form.Group>

          <Form.Group
            controlId="formGridPassword"
            className="mb-5"
            style={{ width: "400px" }}
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your password"
              style={{ textAlign: "center" }}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={buttonDisabled}
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {buttonText}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
