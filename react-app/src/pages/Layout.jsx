import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarLoggedIn from "./NavbarLoggedIn";
import NavbarLoggedOut from "./NavbarLoggedOut";

const Layout = () => {
  const userToken = localStorage.getItem("token");

  if (!userToken) {
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