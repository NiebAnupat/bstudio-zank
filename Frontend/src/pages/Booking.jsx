import * as React from "react";
import { Box, Typography, Button, Tooltip } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import TimeRangeSlider from "react-time-range-slider";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircleIcon from "@mui/icons-material/Circle";
import MenuIcon from "@mui/icons-material/Menu";
import RoomCard from "../components/RoomCard";
import { Link } from "react-router-dom";

const roomDetail = [
  {
    name: "B01",
    price: "400",
    status: "available",
    description: "ห้องเก็บเสียง",
    drum: "กลอง 1 ชุด",
    guitar: "กีตาร์พร้อมตู้ 2 ชุด",
    base: "เบสพร้อมตู้ 1 ชุด",
    keybord: "คีย์บอร์ดพร้อมตู้ 1 ชุด",
    mice: "ไมค์ร้องพร้อมขา 1 ตัว",
  },
  {
    name: "B02",
    price: "600",
    status: "unavailable",
    description: "ห้องเก็บเสียงขนาดใหญ่กว่า และมีกระจก",
    drum: "กลอง 1 ชุด",
    guitar: "กีตาร์พร้อมตู้ 2 ชุด",
    base: "เบสพร้อมตู้ 1 ชุด",
    keybord: "คีย์บอร์ดพร้อมตู้ 1 ชุด",
    mice: "ไมค์ร้องพร้อมขา 1 ตัว",
  },
];

// change Button to another Button when c

export default function Booking() {
  const [roomType, setRoomType] = React.useState("");

  const [timeRange, setTimeRange] = React.useState({
    start: "00:00",
    end: "23:59",
  });

  const handleChange = (event) => {
    setRoomType(event.target.value);
  };

  return (
    <>
      <Box height={"89vh"} mt={2}>
        <Box
          height={"100%"}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {/* Left */}
          <Box
            width={"40%"}
            height={"100%"}
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            {/* Find empty room */}
            <Box
              height={"60%"}
              width={"90%"}
              sx={{
                backdropFilter: "blur(5px)",
                borderRadius: "10px",
                boxShadow: 4,
                padding: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h2>ค้นหาห้องว่าง</h2>
              {/* Date Picker */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>วันที่ :</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateRangePicker"]}>
                    <DateRangePicker
                      localeText={{ start: "เวลาเข้า", end: "เวลาออก" }}
                      sx={{
                        width: 400,
                        marginLeft: 1,
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              {/* Time Picker */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "90%",
                }}
              >
                <Typography width={"17%"}>เวลา :</Typography>
                <div style={{ width: "100%" }}>
                  <TimeRangeSlider
                    disabled={false}
                    format={24}
                    maxValue={"23:59"}
                    minValue={"00:00"}
                    name={"time_range"}
                    onChange={(time) => setTimeRange(time)}
                    step={15}
                    value={timeRange}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography fontSize={13}>{timeRange.start}</Typography>
                    <Typography fontSize={13}>{timeRange.end}</Typography>
                  </div>
                </div>
              </div>

              {/* Room Type */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>ประเภทห้อง :</Typography>
                <FormControl
                  sx={{
                    width: 300,
                    marginLeft: 1,
                  }}
                >
                  <Select
                    id="selectTime"
                    value={roomType}
                    onChange={handleChange}
                    defaultValue={1}
                  >
                    <MenuItem value={1}>ห้องเล็ก</MenuItem>
                    <MenuItem value={2}>ห้องใหญ่</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <Button variant="contained">ค้นหา</Button>
            </Box>

            {/* Status */}
            <Box
              height={"30%"}
              width={"90%"}
              sx={{
                backdropFilter: "blur(5px)",
                borderRadius: "10px",
                boxShadow: 4,
                padding: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2 style={{ marginLeft: 10 }}>สถานะห้อง</h2>
                <Tooltip title="รายการจองห้อง" placement="top">
                  <Link to="/bookedlist">
                    <MenuIcon sx={{ color: "black" }} />
                  </Link>
                </Tooltip>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <CircleIcon sx={{ color: "#16FF00", marginRight: 1 }} />
                <Typography>ห้องว่าง</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <CircleIcon sx={{ color: "#FF0303", marginRight: 1 }} />
                <Typography>ห้องไม่ว่าง</Typography>
              </div>
            </Box>
          </Box>

          {/* Result */}
          <Box
            width={"55%"}
            height={"100%"}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                height: "90%",
                width: "90%",
                backdropFilter: "blur(5px)",
                borderRadius: "10px",
                boxShadow: 4,
                padding: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2>ผลการค้นหา</h2>
              {roomDetail.map((item) => {
                return <RoomCard item={item} />;
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
