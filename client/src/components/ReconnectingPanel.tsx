import React from "react";

import { Button, Row, Col, Spinner } from "react-bootstrap";

import { AppContext, AppContextType } from "../context/app";

export default function ReconnectingPanel() {
  const { fn } = React.useContext(AppContext) as AppContextType;

  const cancel = () => fn.logout();

  return (
    <div className="h-100 w-100 d-flex align-items-center justify-content-center">
      <div style={{ maxWidth: "300px" }}>
        <Row>
          <Col className="d-flex align-items-center justify-content-center">
            Connecting...
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center justify-content-center">
            <Spinner className="mt-2" animation="border" variant="primary" />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center justify-content-center">
            <Button className="mt-3" onClick={cancel}>
              cancel
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
