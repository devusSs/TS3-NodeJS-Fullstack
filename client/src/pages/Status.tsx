import { useState, useEffect } from "react";
import "../App.css";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../api/axios";

const GetStatus = () => {
  const [status, setStatus] = useState("No current status");
  const [error, setError] = useState("");
  const [buttonText, setButtonText] = useState("Refetch Status");
  const [buttonActive, setButtonInactive] = useState(false);

  const getStatus = async () => {
    setError("");
    try {
      const resp = await axios.get("/status");
      if (resp.status !== 200) {
        setStatus("API might be down, retry later");
        setError("API might be down, retry later");
      } else {
        toast("Successfully refetched status.", { type: "success" });
        setStatus(resp?.data?.data?.status);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError("API might be down, retry later");
        setStatus("Fetch error");
      }
    }
  };

  const revertButton = () => {
    setButtonText("Refetch Status");
    setButtonInactive(false);
  };

  const refreshStatus = async () => {
    setStatus("Loading...");
    await getStatus();
    setButtonText("Please wait 3 seconds before retrying");
    setButtonInactive(true);
    setTimeout(revertButton, 3000);
  };

  useEffect(() => {
    refreshStatus();
  }, []);

  useEffect(() => {
    if (error !== "") {
      toast(error, { type: "error" });
    }
  }, [error]);

  return (
    <div className="status">
      <ToastContainer
        className="toast-container"
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
      />
      <h1>{status}</h1>
      <Button
        className="fetch-button"
        variant="primary"
        onClick={refreshStatus}
        disabled={buttonActive}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default GetStatus;
