import React from "react";

import {
  Row,
  ListGroup,
  InputGroup,
  FormControl,
  Button
} from "react-bootstrap";

import { AppContext, AppContextType } from "../../context/app";

import Message from "./Message";

import "./index.scss";

export default function MessagesList() {
  const { fn, targetUser, messages, users } = React.useContext(
    AppContext
  ) as AppContextType;

  const bottomListRef = React.useRef<HTMLDivElement>(null);

  const [text, setText] = React.useState("");

  const send = () => {
    if (text === "" || targetUser === "") return;

    fn.send("message", { to: targetUser, text });

    setText("");
  };

  React.useEffect(() => {
    // On new message scroll to bottom
    if (bottomListRef.current) {
      bottomListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    }
  }, [messages]);

  if (targetUser === "")
    return (
      <div className="d-flex h-100">
        <h6 className="mx-auto text-center justify-content-center align-self-center">
          Select user to chat with.
        </h6>
      </div>
    );

  return (
    <div className="messages-content overflow-none">
      <Row
        className="border messages-topbar"
        style={{ backgroundColor: users[targetUser] }}
      >
        <h6
          className="mx-auto"
          style={{ color: "white", mixBlendMode: "difference" }}
        >
          {targetUser}
        </h6>
      </Row>
      <Row className="messages-list">
        <ListGroup className="w-100 d-flex justify-content-end">
          {messages[targetUser] &&
            messages[targetUser].map((data, index) => (
              <ListGroup.Item
                key={index}
                className="w-100  pb-1 pt-1 border-0 bg-transparent"
              >
                <Message
                  name={targetUser}
                  avatarBackgroundColor={users[targetUser]}
                  message={data.message}
                  type={data.type}
                />
              </ListGroup.Item>
            ))}
          <div ref={bottomListRef} />
        </ListGroup>
        <div ref={bottomListRef} />
      </Row>
      <Row className="border messages-input">
        <InputGroup className="m-0">
          <FormControl
            className="h-100"
            placeholder="Enter message"
            aria-label="Enter message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <InputGroup.Append>
            <Button className="h-100" variant="primary" onClick={send}>
              send
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Row>
    </div>
  );
}