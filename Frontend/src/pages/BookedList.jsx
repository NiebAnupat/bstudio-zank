import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Tooltip, Alert } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const columns = [
  { field: "no", headerName: "ลำดับ", width: 200 },
  { field: "date", headerName: "วันจอง", width: 500 },
  { field: "time", headerName: "เวลาจอง", width: 440 },
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
            console.log(params);
          }}
        >
          <CloseIcon />
          ยกเลิก
        </Button>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    no: 1,
    date: "21/10/2021 - 21/10/2021",
    time: "12.00 - 13.00",
  },
  {
    id: 2,
    no: 2,
    date: "21/10/2021 - 21/10/2021",
    time: "12.00 - 13.00",
  },
  {
    id: 3,
    no: 3,
    date: "21/10/2021 - 21/10/2021",
    time: "12.00 - 13.00",
  },
  {
    id: 4,
    no: 4,
    date: "21/10/2021 - 21/10/2021",
    time: "12.00 - 13.00",
  },
  {
    id: 5,
    no: 5,
    date: "21/10/2021 - 21/10/2021",
    time: "12.00 - 13.00",
  },
  {
    id: 6,
    no: 6,
    date: "21/10/2021 - 21/10/2021",
    time: "12.00 - 13.00",
  },
  {
    id: 7,
    no: 7,
    date: "21/10/2021 - 21/10/2021",
    time: "12.00 - 13.00",
  },
  {
    id: 8,
    no: 8,
    date: "21/10/2021 - 21/10/2021",
    time: "12.00 - 13.00",
  },
];

export default function BookedList() {
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
            rows={rows}
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
