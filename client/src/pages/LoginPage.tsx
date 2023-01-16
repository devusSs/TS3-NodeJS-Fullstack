import "../app.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Log In");
  const { login, error, isLoading } = useLogin();

  const submitHandler = async (e: any) => {
    e.preventDefault();

    await login(username, password);
  };

  useEffect(() => {
    if (isLoading) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
    if (error !== "") {
      toast(error, { type: "error" });
      setButtonText("Please wait 5 seconds before retrying");
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonText("Log In");
        setButtonDisabled(false);
      }, 5000);
    }
  }, [isLoading, error]);

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

      <Form className="login-form" onSubmit={submitHandler}>
        <Form.Group controlId="formGridUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Enter your username"
            style={{
              width: "300px",
              justifyContent: "center",
              textAlign: "center",
            }}
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
            style={{
              width: "300px",
              justifyContent: "center",
              textAlign: "center",
            }}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={buttonDisabled}>
          {buttonText}
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
