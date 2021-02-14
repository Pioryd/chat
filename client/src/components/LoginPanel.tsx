import React from "react";

import { InputGroup, FormControl, Button, Row, Col } from "react-bootstrap";

import { AppContext, AppContextType } from "../context/app";

export default function LoginPanel() {
  const { fn } = React.useContext(AppContext) as AppContextType;

  const [name, setName] = React.useState("");

  const login = () => fn.send("login", { name });

  return (
    <div className="h-100 w-100 d-flex align-items-center justify-content-center">
      <div style={{ maxWidth: "300px" }}>
        <Row>
          <Col>
            <InputGroup className="m-0">
              <FormControl
                placeholder="Enter name"
                aria-label="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-center justify-content-center">
            <Button className="mt-3" onClick={login}>
              login
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
