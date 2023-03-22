import React from "react";
import { useNavigate } from "react-router-dom";
// @mui
import { Box} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// @hooks
import "./navbar.css"
import useResponsive from "../../hooks/useResponsive";
// components
import Logo from "../logo/Logo";




export default function NavBar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login', { replace: true });
  };


  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', m: "0.5rem", mx: "5rem" }}>
        < Logo />
        <LoadingButton variant="contained" onClick={handleClick}>Login</LoadingButton>
    </Box>
    );
}


