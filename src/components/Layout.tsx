import React from "react";
import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

const Layout: React.FC = () => {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor:'green'}}>
        <Toolbar sx={{justifyContent: "center"}}>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{ color: "white", textDecoration: "none", justifyContent: "center" }}
          >
            Milos Mirkovic
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt:5}}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
