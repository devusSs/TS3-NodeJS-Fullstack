import { useState, useEffect } from 'react';
import '../main.css'
import Table from "react-bootstrap/Table";
import { User } from "../types/User"

export default function GetUsers() {
    const [users, setUsers] = useState<User[]>([])

    const getUsers = async () => {
      try {
        let url = import.meta.env.VITE_BASE_URL || "http://localhost:3000"
        const resp = await fetch(url + "/users")
        const jsonData = await resp.json()
        setUsers(jsonData.data.result)
      } catch (err) {
        console.error(err)
      }
    }
  
    useEffect(() => {
      getUsers();
    }, []);
    
    return (
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
    )
}