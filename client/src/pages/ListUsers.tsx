import { useState, useEffect, useRef } from "react";
import "../app.css";
import Table from "react-bootstrap/Table";
import { User } from "../types/User";

import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const GetUsers = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [users, setUsers] = useState<User[]>([]);

  const axiosPrivate = useAxiosPrivate();

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      let isMounted = true;
      const controller = new AbortController();

      const getUsers = async () => {
        try {
          const response = await axiosPrivate.get("/users", {
            signal: controller.signal,
          });
          isMounted && setUsers(response?.data?.data?.result);
        } catch (err) {
          console.error(err);
          navigate("/login", { state: { from: location }, replace: true });
        }
      };

      getUsers();

      return () => {
        isMounted = false;
        effectRan.current = true;
        controller.abort();
      };
    }
  }, []);

  return (
    <div className="users-table">
      {users?.length ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>TS ID</th>
              <th>First Username</th>
              <th>Latest Username</th>
              <th>First IP</th>
              <th>Latest IP</th>
              <th>First Connection</th>
              <th>Latest Connection</th>
              <th>Latest Disconnect</th>
              <th>Country</th>
              <th>Version</th>
              <th>Platform</th>
              <th>Unique ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.ID}>
                <td key="{ts_id}">{user.TSID}</td>
                <td key="{first_username}">{user.FirstUsername}</td>
                <td key="{latest_username}">{user.LatestUsername}</td>
                <td key="{first_ip}">{user.FirstIP}</td>
                <td key="{latest_ip}">{user.LatestIP}</td>
                <td key="{first_connect}">{user.FirstConnection}</td>
                <td key="{last_connect}">{user.LatestConnection}</td>
                <td key="{last_disconnect}">{user.LatestDisconnect}</td>
                <td key="{country}">{user.Country}</td>
                <td key="{version}">{user.Version}</td>
                <td key="{platform}">{user.Platform}</td>
                <td key="{unique_id}">{user.UniqueID}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="home">No users to display.</div>
      )}
    </div>
  );
};

export default GetUsers;
