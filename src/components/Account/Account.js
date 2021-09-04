import React from "react";
import Login from "./Login";

export default function Account() {
  return (
    <>
      <section className="flex-start">
        <img
          style={{ width: "10%" }}
          src="https://conflux-storage.s3.amazonaws.com/logos/013c32513f.png"
          alt="Wethos Logo"
        />
      </section>
      <Login />
    </>
  );
}
