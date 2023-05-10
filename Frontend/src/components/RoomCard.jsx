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
import useAxios from "../lib/useAxios";

export default function RoomCard({ item, handleBooking }) {
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
              <CircleIcon sx={{ color: "#16FF00" }} />
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
                <div dangerouslySetInnerHTML={{ __html: item.description }} />
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button
                variant="contained"
                onClick={(e) => {
                  handleBooking(item.id);
                }}
              >
                จองเลย
              </Button>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
