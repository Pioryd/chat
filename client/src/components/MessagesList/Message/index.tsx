import React from "react";

import { Row, Col } from "react-bootstrap";

import LetterAvatar from "../../LetterAvatar";

import "./index.scss";

export default function Message(props: {
  name: string;
  avatarBackgroundColor: string;
  message: string;
  type: "received" | "sent";
}) {
  if (props.type === "sent") {
    return (
      <Row className="justify-content-end">
        <div className=" sent-message-text-area text-break">
          {props.message}
        </div>
      </Row>
    );
  }

  return (
    <Row>
      <div className="received-message-avatar">
        <LetterAvatar
          name={props.name}
          backgroundColor={props.avatarBackgroundColor}
          size="small"
          popover={true}
        />
      </div>
      <Col className="justify-content-begin m-0 p-0">
        <div className="received-message-text-area  text-break">
          {props.message}
        </div>
      </Col>
    </Row>
  );
}
