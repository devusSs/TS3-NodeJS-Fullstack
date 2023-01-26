import { useState, useEffect, useRef } from "react";
import "../App.css";
import { Message } from "../types/Message";
import Table from "react-bootstrap/Table";

import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const GetMessages = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [messages, setMessages] = useState<Message[]>([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getMessages = async () => {
      try {
        const response = await axiosPrivate.get("/messages", {
          signal: controller.signal,
        });
        isMounted && setMessages(response?.data?.data?.result);
      } catch (err) {
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getMessages();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="messages-table">
      {messages?.length ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Invoker Nickname</th>
              <th>Invoker Database ID</th>
              <th>Invoker Unique ID</th>
              <th>Invoker IP</th>
              <th>Message</th>
              <th>Targetmode</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.ID}>
                <td key="{nick}">{message.InvokerNick}</td>
                <td key="{dbid}">{message.InvokerDBID}</td>
                <td key="{uid}">{message.InvokerUID}</td>
                <td key="{ip}">{message.InvokerIP}</td>
                <td key="{message}">{message.Message}</td>
                <td key="{targetmode}">{message.Targetmode}</td>
                <td key="{date}">{message.DateTime}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="home-bold">No messages to display.</div>
      )}
    </div>
  );
};

export default GetMessages;
