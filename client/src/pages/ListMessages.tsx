import { useState, useEffect } from "react";
import "../app.css";
import { Message } from "../types/Message";
import Table from "react-bootstrap/Table";
import { useAuthContext } from "../hooks/useAuthContext";

// TODO: add search function / label for messages => filter
const GetMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const { user }: any = useAuthContext();

  const getMessages = async () => {
    try {
      let url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
      const resp = await fetch(url + "/messages", {
        headers: { Authorization: `Bearer ${user.data.token}` },
      });
      const jsonData = await resp.json();
      setMessages(jsonData.data.result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      getMessages();
    }
  }, [user]);

  return (
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
  );
};

export default GetMessages;
