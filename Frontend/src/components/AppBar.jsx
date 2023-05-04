import React from "react";
import { Button, Container, Toolbar, Box, AppBar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

export default function Booking() {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          boxShadow: "none",
          backgroundColor: "transparent",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            <Box width={"88%"} marginLeft={5}>
              <Link to="/booking">
                <img width={50} src="/src/assets/logo.png" />
              </Link>
            </Box>

            <Link to="/">
              <Button variant="text" sx={{ color: "black" }}>
                Log out <LogoutIcon sx={{ marginLeft: 2 }} />
              </Button>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
