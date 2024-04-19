import React from "react";
import styles from "./Header.module.css";
import { useLocation, Link } from "react-router-dom";
// import logo from "../assets/logo.png";

const Header = () => {
  let location = useLocation();

  return <header>{location.pathname === "/" ? "Home" : "Header"}</header>;
};

export default Header;
