import { useState, useEffect } from 'react';
import '../main.css'
import { Message } from '../types/Message';

// TODO: add search function / label for messages => filter
export default function GetMessages() {
    const [messages, setMessages] = useState<Message[]>([])

    const getMessages = async () => {
      try {
        let url = import.meta.env.VITE_BASE_URL || "http://localhost:3000"
        const resp = await fetch(url + "/messages")
        const jsonData = await resp.json()
        setMessages(jsonData.data.result)
      } catch (err) {
        console.error(err)
      }
    };
  
    useEffect(() => {
      getMessages();
    }, []);
  
    return (
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th>ID</th>
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
            <tr key="{message_row}">
              <td key="{id}">{message.ID}</td>
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
      </table>
    )
}