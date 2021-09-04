import React, { useState } from "react";
import { useSelector } from "react-redux";
import Input from "../Utils/Input";

export default function Login() {
  const error = useSelector((state) => state.user.error);
  const status = useSelector((state) => state.user.status);
  return (
    <section>
      <h1>Sign In:</h1>
      <div>
        <Input labelName="email" />
        <Input labelName="password" />
        <div>{error}</div>
      </div>
    </section>
  );
}
