import React from "react";

export default function Alert(props) {
  return (
    <>
      <div className={`alert alert-${props.alert.colour} `} role="alert">
        <strong>{props.alert.message}</strong>
      </div>
    </>
  );
}
