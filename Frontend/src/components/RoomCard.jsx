import * as React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Divider,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

export default function RoomCard({ item }) {
  const [bookButton, setBookButton] = React.useState(true);
  const handleBook = () => {
    setBookButton(false);
  };

  return (
    <>
      <Divider
        sx={{
          width: "100%",
          margin: "10px 0 10px 0",
        }}
      />
      <Card
        sx={{
          width: "650px",
          backgroundColor: "transparent",
        }}
      >
        <CardActionArea>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography gutterBottom variant="h5">
                {item.name} ชั่วโมงละ {item.price} บาท
              </Typography>

              {bookButton ? (
                item.status === "available" ? (
                  <CircleIcon sx={{ color: "#16FF00" }} />
                ) : (
                  <CircleIcon sx={{ color: "#FF0303" }} />
                )
              ) : (
                <CircleIcon sx={{ color: "#FF0303" }} />
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 4,
                width: "45%",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.drum}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.guitar}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.base}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.keybord}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.mice}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              {bookButton ? (
                item.status === "available" ? (
                  <Button variant="contained" onClick={handleBook}>
                    จองเลย
                  </Button>
                ) : (
                  <Button variant="contained" disabled>
                    ไม่ว่าง
                  </Button>
                )
              ) : (
                <Button variant="contained" disabled>
                  ไม่ว่าง
                </Button>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
