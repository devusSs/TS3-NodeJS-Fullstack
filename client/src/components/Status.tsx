import { useState, useEffect } from "react";
import '../main.css'

export default function GetStatus() {
    const [status, setStatus] = useState("Bot is currently not active.");

    const getStatus = async () => {
      try {
        let url = import.meta.env.VITE_BASE_URL || "http://localhost:3000"
        const resp = await fetch(url + "/status")
        if (resp.status === 200) {
            setStatus("Bot is up and running.")
        }
      } catch (err) {
        console.error(err)
      }
    }
  
    useEffect(() => {
      getStatus();
    }, []);

    return (
        <div className="home">
            <h1>{status}</h1>
        </div>
    )
}