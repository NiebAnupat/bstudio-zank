import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Tooltip, Alert } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import useAxios from "../lib/useAxios";
import { useNavigate } from "react-router-dom";

export default function BookedList() {
  const Navigate = useNavigate();

  const [booked, setBooked] = React.useState([]);

  React.useEffect(() => {
    fetchBooked();
  }, []);

  const fetchBooked = async () => {
    try {
      const res = await useAxios.get("/history");
      console.log(res.data.reverse());
      setBooked(res.data);
    } catch (e) {
      console.log(e);
    }
  };   

  const bookedDelete = async (id) => {
    try {
      const res = await useAxios.delete(`/history/${id}`);
      // console.log(res.data);
      alert("ยกเลิกสำเร็จ");
      fetchBooked();
      Navigate(0);
    } catch (e) {
      console.log(e);

      alert("ยกเลิกไม่สำเร็จ");
    }
  };

  const columns = [
    { field: "id", headerName: "ลำดับ", width: 80 },
    {
      field: "r_id", headerName: "ประเภทห้อง", width: 200,
      renderCell: (params) => {
        return (
          <>{params.row.r_id === 1 ? "ห้องเล็ก" : "ห้องใหญ่"}</>
        );
      }
    },
    { field: "date", headerName: "วันจอง", width: 350 },
    { field: "time_in", headerName: "เวลาเข้า", width: 255 },
    { field: "time_out", headerName: "เวลาออก", width: 255 },
    {
      field: "action",
      headerName: "",
      width: 200,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => {
              bookedDelete(params.id);
            }}
          >
            <CloseIcon />
            ยกเลิก
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(15px)",
        }}
      >
        <Box
          sx={{
            height: "85vh",
            width: "90%",
            marginTop: 2,
            padding: 2,
            borderRadius: 3,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              marginTop: 16,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h2>รายการจองห้อง</h2>
          </div>

          <DataGrid
            sx={{ marginTop: 2 }}
            rows={booked}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 8,
                },
              },
            }}
            pageSizeOptions={[8]}
          />
          <div
            style={{
              marginTop: 16,
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Link to="/booking">
              <Tooltip title="กลับ" placement="top">
                <ArrowCircleLeftIcon fontSize="large" sx={{ color: "grey" }} />
              </Tooltip>
            </Link>
          </div>
        </Box>
      </Box>
    </>
  );
}
