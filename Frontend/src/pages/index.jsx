import * as React from "react";
import "../css/home.css";
import { styled } from "@mui/material/styles";
import { Box, TextField, Divider, Button } from "@mui/material";
import { Link } from "react-router-dom";
import useAxios from "./../lib/useAxios";
import { useNavigate } from "react-router-dom";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export default function Home() {
  const Navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    try {
      const res = await useAxios.post("/login", {
        username,
        password,
      });
      alert("เข้าสู่ระบบสำเร็จ");
      localStorage.setItem("user", JSON.stringify(res.data));
      Navigate("/booking");
    } catch (e) {
      alert("เข้าสู่ระบบไม่สำเร็จ");
    }
  };

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
              id="username"
              label="Username"
              variant="outlined"
              sx={{ width: "90%" }}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              sx={{ width: "90%" }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Root>
              <Divider>
                <Button variant="contained" onClick={handleLogin}>
                  Log In
                </Button>
              </Divider>
            </Root>
          </Box>
        </Box>
      </Box>
    </>
  );
}
