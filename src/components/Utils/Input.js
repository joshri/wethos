import React from "react";

export default function Input(props) {
  return (
    <div className="input-container ">
      <label htmlFor={props.labelName}>
        {props.displayName || props.labelName}
      </label>
      <input
        className="bordered"
        defaultValue={props.defaultValue || null}
        type={props.type || "text"}
        name={props.labelName}
        onChange={props.onChange}
        maxLength={props.maxLength || 50}
      />
    </div>
  );
}
