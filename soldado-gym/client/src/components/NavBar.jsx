import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Icon } from "@mui/material";

import "./css/NavBar.css";
export const NavBar = () => {
  return (
    <nav className="NavbarContainer">
      <MenuIcon id="icon"
        sx={{
          width: "40px",
          height: "40px",
          borderRadius : "50px",
          padding : "4px",
          color : "white",
        }}
      />
    </nav>
  );
};
