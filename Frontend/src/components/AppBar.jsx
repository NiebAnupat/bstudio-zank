import React from "react";
import { Button, Container, Toolbar, Box, AppBar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Booking() {
  const Navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    Navigate("/");
  };

  return (
    <>
      {user ? (
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
                <Button
                  variant="text"
                  sx={{ color: "black" }}
                  onClick={handleLogout}
                >
                  Log out <LogoutIcon sx={{ marginLeft: 2 }} />
                </Button>
              </Link>
            </Toolbar>
          </Container>
        </AppBar>
      ) : (
        <></>
      )}
    </>
  );
}
