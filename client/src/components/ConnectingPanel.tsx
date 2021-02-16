import React from "react";

import { Button, Row, Col, Spinner } from "react-bootstrap";

import { AppContext, AppContextType } from "../context/app";

export default function ConnectingPanel() {
  const { fn, mainUser } = React.useContext(AppContext) as AppContextType;

  const cancel = () => fn.logout();

  const Content = (props: { children: React.ReactNode }) => (
    <div className="h-100 w-100 d-flex align-items-center justify-content-center">
      <div style={{ maxWidth: "300px" }}>{props.children}</div>
    </div>
  );
  const CancelRow = (props: { text: string }) => (
    <Row>
      <Col className="d-flex align-items-center justify-content-center">
        <Button className="mt-3" onClick={cancel}>
          {props.text}
        </Button>
      </Col>
    </Row>
  );
  const TitleRow = (props: { text: string }) => (
    <Row>
      <Col className="d-flex align-items-center justify-content-center">
        {props.text}
      </Col>
    </Row>
  );
  const SpinnerRow = () => (
    <Row>
      <Col className="d-flex align-items-center justify-content-center">
        <Spinner className="mt-2" animation="border" variant="primary" />
      </Col>
    </Row>
  );

  if (mainUser == null)
    return (
      <Content>
        <TitleRow text="User with this name is already logged in." />
        <CancelRow text="back" />
      </Content>
    );

  return (
    <Content>
      <TitleRow text="Connecting..." />
      <SpinnerRow />
      <CancelRow text="cancel" />
    </Content>
  );
}
