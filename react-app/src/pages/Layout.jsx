import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarLoggedIn from "./NavbarLoggedIn";
import NavbarLoggedOut from "./NavbarLoggedOut";

const Layout = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    return (
      <>
        <NavbarLoggedOut />
        <Outlet />
      </>
    );
  }

  else {
    return (
      <>
        <NavbarLoggedIn />
        <Outlet />
      </>
    );
  }
}

export default Layout;