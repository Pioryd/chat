import React from "react";

import { Row, Col, ListGroup, Badge } from "react-bootstrap";

import { AppContext, AppContextType } from "../../context/app";

import LetterAvatar from "../LetterAvatar";

import "./index.scss";

export default function UsersList() {
  const { fn, users } = React.useContext(AppContext) as AppContextType;

  if (Object.keys(users).length === 0)
    return (
      <div className="d-flex h-100">
        <h6 className="mx-auto text-center justify-content-center align-self-center">
          No users on chat.
        </h6>
      </div>
    );

  return (
    <ListGroup variant="flush" className="users-list">
      {Object.keys(users).map((name) => (
        <ListGroup.Item
          key={name}
          className="user"
          onClick={() => fn.setTargetUser(name)}
        >
          <Row>
            <Col style={{ maxWidth: "60px" }}>
              <LetterAvatar
                name={name}
                backgroundColor={users[name].color}
                size="big"
              />
            </Col>
            <Col className="text-truncate text-wrap overflow-hidden">
              {name}
            </Col>
            <Col style={{ maxWidth: "60px" }}>
              <Badge
                hidden={!users[name].unreadMessages}
                pill
                variant="primary"
              >
                new
              </Badge>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
