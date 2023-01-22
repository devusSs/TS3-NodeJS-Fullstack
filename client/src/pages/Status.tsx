import { useState, useEffect, useRef } from "react";
import "../app.css";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetStatus = () => {
  const [status, setStatus] = useState("Bot is currently not active.");
  const [buttonText, setButtonText] = useState("Refetch Status");
  const [buttonActive, setButtonInactive] = useState(false);

  const effectRan = useRef(false);

  const getStatus = async () => {
    try {
      let url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
      const resp = await fetch(url + "/status");
      const respJson = await resp.json();
      setStatus(respJson.data.status);
    } catch (err) {
      console.error(err);
    }
  };

  const revertButton = () => {
    setButtonText("Refetch Status");
    setButtonInactive(false);
  };

  const refreshStatus = async () => {
    setStatus("Loading...");
    await getStatus();
    toast("Successfully refetched status.", { type: "success" });
    setButtonText("Please wait 3 seconds before retrying");
    setButtonInactive(true);
    setTimeout(revertButton, 3000);
  };

  useEffect((): any => {
    if (effectRan.current === false) {
      getStatus();
    }
    return () => (effectRan.current = true);
  }, []);

  return (
    <div className="status">
      <h1>{status}</h1>
      <Button
        className="fetch-button"
        variant="primary"
        onClick={refreshStatus}
        disabled={buttonActive}
      >
        {buttonText}
      </Button>
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
    </div>
  );
};

export default GetStatus;
