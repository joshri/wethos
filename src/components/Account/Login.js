import React, { useState } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
import { login, setUserError } from "../../redux/userSlice";
//components
import Input from "../Utils/Input";
import LoadingIndicator from "../Utils/LoadingIndicator";

export default function Login() {
  const error = useSelector((state) => state.user.error);
  const status = useSelector((state) => state.user.status);
  const dispatch = useDispatch();

  let [inputs, setInputs] = useState({ email: "", password: "" });

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password)
      return dispatch(setUserError("Both email and password are required!"));
    else dispatch(login(inputs));
  };

  return (
    <section style={{ height: "90%" }}>
      <div className="login-container">
        <h1 style={{ width: "100%" }}>Sign In:</h1>
        <form style={{ height: "90%", width: "100%" }} onSubmit={onSubmit}>
          <Input displayName="EMAIL" labelName="email" onChange={onChange} />
          <Input
            displayName="PASSWORD"
            labelName="password"
            type="password"
            onChange={onChange}
          />
          <button type="submit">submit</button>
          {error ? (
            <p className="error-text">{error}</p>
          ) : (
            <LoadingIndicator status={status} />
          )}
        </form>
      </div>
    </section>
  );
}
