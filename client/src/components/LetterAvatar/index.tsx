import React from "react";

import { Tooltip, OverlayTrigger } from "react-bootstrap";

import "./index.scss";

export default function Avatar(props: {
  name: string;
  backgroundColor: string;
  size: "big" | "small";
  popover?: boolean;
}) {
  const [avatarClassName] = React.useState(`letter-avatar-${props.size}`);

  return (
    <div
      className={avatarClassName}
      style={{ backgroundColor: props.backgroundColor }}
      aria-label={props.name}
    >
      <OverlayTrigger
        overlay={
          <Tooltip hidden={!props.popover} id="tooltip-disabled">
            {props.name}
          </Tooltip>
        }
      >
        <span className="d-inline-block">
          <div className="letter-avatar-text">
            {props.name[0].toUpperCase()}
          </div>
        </span>
      </OverlayTrigger>
    </div>
  );
}
