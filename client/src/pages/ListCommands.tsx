import { useState, useEffect, useRef } from "react";
import "../App.css";
import { Command } from "../types/Command";
import Table from "react-bootstrap/Table";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

const GetCommands = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [commands, setCommands] = useState<Command[]>([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCommands = async () => {
      try {
        const response = await axiosPrivate.get("/commands", {
          signal: controller.signal,
        });
        isMounted && setCommands(response?.data?.data?.result);
      } catch (err) {
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getCommands();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="commands-table">
      {commands?.length ? (
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
      ) : (
        <div className="home">No commands to display.</div>
      )}
    </div>
  );
};

export default GetCommands;
