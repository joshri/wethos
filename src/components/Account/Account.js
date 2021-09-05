import React from "react";
import Footer from "../Footer";
import Login from "./Login";

export default function Account() {
  return (
    <>
      <header>
        <img
          style={{ height: "100%" }}
          src="https://conflux-storage.s3.amazonaws.com/logos/013c32513f.png"
          alt="Wethos Logo"
        />
      </header>
      <Login />
      <Footer />
    </>
  );
}
