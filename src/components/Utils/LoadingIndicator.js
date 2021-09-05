import React from "react";

export default function LoadingIndicator(props) {
  return (
    <div style={{ minHeight: props.minHeight || "5%" }}>
      {props.status === "loading" ? <div className="loading" /> : null}
    </div>
  );
}
