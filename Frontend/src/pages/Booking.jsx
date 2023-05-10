import * as React from "react";
import { Box, Typography, Button, Tooltip } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TimeRangeSlider from "react-time-range-slider";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircleIcon from "@mui/icons-material/Circle";
import MenuIcon from "@mui/icons-material/Menu";
import RoomCard from "../components/RoomCard";
import { Link } from "react-router-dom";
import useAxios from "../lib/useAxios";
import moment from "moment-timezone";

// change Button to another Button when c

export default function Booking() {
  const [theDate, setTheDate] = React.useState(new Date());
  const [roomType, setRoomType] = React.useState("");
  const [timeRange, setTimeRange] = React.useState({
    start: "00:00",
    end: "23:59",
  });

  const [roomDetail, setRoomDetail] = React.useState([]);



  const handleChange = (event) => {
    setRoomType(event.target.value);
  };

    const handleBooking = async (id) => {
      try {
         let formatDate = moment(theDate.$d)
           .tz("Asia/Bangkok")
           .format("YYYY/MM/DD");
        const res = await useAxios.post("/booking", {
          r_id: id,
          date : formatDate,
          time_in : timeRange.start,
          time_out : timeRange.end,
        });
        console.log(res.data);
        alert("จองสำเร็จ");
        handleSearch();
      } catch (e) {
        console.log(e);
        alert("จองไม่สำเร็จ");
      }
    };


  React.useEffect(() => {
    console.log(theDate);
    console.log(theDate.$d);
  }, [theDate]);

  const handleSearch = async () => {
    try {
      let formatDate = moment(theDate.$d)
        .tz("Asia/Bangkok")
        .format("YYYY-MM-DD");
      const res = await useAxios.get(
        `/rooms/available?date=${formatDate}&time_in=${timeRange.start}&time_out=${timeRange.end}&type=${roomType}`
      );
      console.log(res);
      setRoomDetail(res.data);
    } catch (e) {
      console.log(e);
    }
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
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      id="theDate"
                      sx={{
                        width: 345,
                        marginLeft: 1,
                      }}
                      
                      onChange={(newValue) => {
                        setTheDate(newValue);
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
                    format={24}
                    maxValue={"23:59"}
                    minValue={"00:00"}
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

              <Button variant="contained" onClick={handleSearch}>
                ค้นหา
              </Button>
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
              {roomDetail?.map((item) => {
                return (
                  <RoomCard
                    item={item}
                    handleBooking={handleBooking}
                  />
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
