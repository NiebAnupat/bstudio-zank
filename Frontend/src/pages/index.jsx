import * as React from "react";
import "../css/home.css";
import { styled } from "@mui/material/styles";
import { Box, TextField, Divider, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export default function Home() {
  return (
    <>
      <Box height={"78vh"} sx={{ margin: 10 }}>
        <Box
          height={"100%"}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <img src="/src/assets/logo.png" width={320} />

          <Box
            width={450}
            height={280}
            sx={{
              padding: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: 4,
              borderRadius: 1,
            }}
          >
            <Root>
              <Divider>
                <h3 style={{ color: "grey" }}>PLEASE LOGIN</h3>
              </Divider>
            </Root>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              sx={{ width: "90%" }}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              sx={{ width: "90%" }}
            />
            <Root>
              <Divider>
                <Link to="/booking">
                  <Button variant="contained">Log In</Button>
                </Link>
              </Divider>
            </Root>
          </Box>
        </Box>
      </Box>
    </>
  );
}
