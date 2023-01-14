import "../main.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

// TODO: make this prettier
export default function GetTOS() {
  return (
    <div className="tos">
      <h1 style={{ color: "white", fontSize: "30px", marginBottom: "3%" }}>
        <p>
          The TeamSpeak server which sent you this URL is being monitored by
          this bot for security purposes.
        </p>
        <p>The following data may be collected:</p>
      </h1>

      <span>
        <Card
          bg="primary"
          text="dark"
          style={{ width: "18rem", display: "inline-block" }}
        >
          <Card.Title style={{ color: "white" }}>User Data</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>First Username</ListGroup.Item>
            <ListGroup.Item>Latest Username</ListGroup.Item>
            <ListGroup.Item>First IP</ListGroup.Item>
            <ListGroup.Item>Latest IP</ListGroup.Item>
            <ListGroup.Item>First Connection</ListGroup.Item>
            <ListGroup.Item>Latest Connection</ListGroup.Item>
            <ListGroup.Item>Latest Disconnect</ListGroup.Item>
            <ListGroup.Item>Country</ListGroup.Item>
            <ListGroup.Item>Version</ListGroup.Item>
            <ListGroup.Item>Platform</ListGroup.Item>
          </ListGroup>
        </Card>
      </span>

      <span>
        <Card
          bg="primary"
          text="dark"
          style={{ width: "18rem", display: "inline-block" }}
        >
          <Card.Title style={{ color: "white" }}>Command Data</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>Command Name</ListGroup.Item>
            <ListGroup.Item>Command Output</ListGroup.Item>
            <ListGroup.Item>Command Userlevel</ListGroup.Item>
            <ListGroup.Item>Command Added Timestamp</ListGroup.Item>
            <ListGroup.Item>Command Added User</ListGroup.Item>
            <ListGroup.Item>Command Edited Timestamp</ListGroup.Item>
            <ListGroup.Item>Command Edited User</ListGroup.Item>
          </ListGroup>
        </Card>
      </span>

      <span>
        <Card
          bg="primary"
          text="dark"
          style={{ width: "18rem", display: "inline-block" }}
        >
          <Card.Title style={{ color: "white" }}>Message Data</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>Invoker Nickname</ListGroup.Item>
            <ListGroup.Item>Invoker Database ID</ListGroup.Item>
            <ListGroup.Item>Invoker Unique ID</ListGroup.Item>
            <ListGroup.Item>Invoker IP</ListGroup.Item>
            <ListGroup.Item>Message Content</ListGroup.Item>
            <ListGroup.Item>Message Targetmode</ListGroup.Item>
            <ListGroup.Item>Date And Time</ListGroup.Item>
          </ListGroup>
        </Card>
      </span>
    </div>
  );
}
