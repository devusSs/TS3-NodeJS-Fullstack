import { useState, useEffect } from "react";
import "../main.css";
import { Command } from "../types/Command";
import Table from "react-bootstrap/Table";

export default function GetCommands() {
  const [commands, setCommands] = useState<Command[]>([]);

  const getCommands = async () => {
    try {
      let url = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
      const resp = await fetch(url + "/commands");
      const jsonData = await resp.json();
      setCommands(jsonData.data.result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCommands();
  }, []);

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Name</th>
          <th>Output</th>
          <th>Userlevel</th>
          <th>Added</th>
          <th>User Added</th>
          <th>Edited</th>
          <th>User Edited</th>
        </tr>
      </thead>
      <tbody>
        {commands.map((command) => (
          <tr key={command.ID}>
            <td key="{name}">{command.Name}</td>
            <td key="{output}">{command.Output}</td>
            <td key="{userlevel}">{command.Userlevel}</td>
            <td key="{added}">{command.Added}</td>
            <td key="{user_added}">{command.UserAdded}</td>
            <td key="{edited}">{command.Edited}</td>
            <td key="{user_edited}">{command.UserEdited}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
