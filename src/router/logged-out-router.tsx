import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/login";
import { CreateAccount } from "../pages/create-account";
import { NotFound } from "../pages/404";

export const LoggedOutRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="/create-account"
          element={<CreateAccount></CreateAccount>}
        ></Route>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </>
  );
};
