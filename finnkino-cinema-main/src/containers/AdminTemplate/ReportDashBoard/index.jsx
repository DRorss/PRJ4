import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Material UI
import { Container } from "@mui/system";
import { Button } from "@mui/material";

//Components
import SearchBar from "../components/SearchBar";
import MovieModal from "./components/MovieModal";
import MuiEnhancedTable from "../components/MuiEnhancedTable";
import MovieTableCells from "./components/TableCellList";
import { AddItemBtn } from "../components/Buttons";

//Others
import actGetMovieList from "@/store/actions/movieList";
import { headCells } from "./constants";
import "./style.scss";

import { Bar } from "react-chartjs-2";
import axios from "axios";
import "./chartConfig";
import { ticketBookingApi } from "@/api";

function ReportDashBoard() {
  const [openModalMovie, setOpenModalMovie] = useState(false);
  const [chartData, setChartData] = useState(null);

  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(200);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [movieList, setMovieList] = useState([]);

  // const dispatch = useDispatch();
  // const movieList = useSelector((state) => state.movieList.data);
  const movieListLoading = useSelector((state) => state.movieList.loading);

  useEffect(() => {
    ticketBookingApi.reportBookings()
      .then(res => {
        const labels = res.data.data.map(item => item.movieName);
        const values = res.data.data.map(item => item.price);
        setChartData({
          labels: labels,
          datasets: [
            {
              label: labels,
              data: values,
              backgroundColor: "rgba(59,130,246,0.7)",
            },
          ],
        });
      });
  }, []);

  if (!chartData) return <p>Loading...</p>;

  return (
    <>
      <Container
        sx={{
          overflow: "hidden",
        }}
      >
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function (value) {
                    return value + " nghìn đồng";
                  },
                  precision: 0, // không có số lẻ
                },
              },
            },
          }}
        />
      </Container>

    </>
  );
}

export default ReportDashBoard;
