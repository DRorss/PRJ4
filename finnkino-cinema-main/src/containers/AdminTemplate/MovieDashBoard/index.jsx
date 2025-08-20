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

function MovieDashBoard() {
  const [openModalMovie, setOpenModalMovie] = useState(false);

  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(200);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [movieList, setMovieList] = useState([]);

  // const dispatch = useDispatch();
  // const movieList = useSelector((state) => state.movieList.data);
  const movieListLoading = useSelector((state) => state.movieList.loading);

  useEffect(() => {
    // dispatch(actGetMovieList(name, page, size));
    var isFetching = false;
    getMovie();
    return () => {
      isFetching = true;
    };
  }, []);

  useEffect(() => {
    getMovie();
  }, [openModalMovie]);

  useEffect(() => {
    // dispatch(actGetMovieList(name, page, size));
    getMovie();
  }, [name]);

  const handleSearch = (value) => {
    setName(value);
  };

  async function getMovie() {
    let res = await actGetMovieList(name, page, size);
    if (res && res?.status == 200 && res?.data?.data) {
      setMovieList(res?.data?.data?.content);
      setPage(res?.data?.data?.number);
      setSize(res?.data?.data?.size);
    }
  }

  return (
    <>
      <Container
        sx={{
          overflow: "hidden",
        }}
      >
        <SearchBar onSubmit={handleSearch} className="movie-dashboard__search" />
        <AddItemBtn onClick={() => setOpenModalMovie(true)}>Thêm phim</AddItemBtn>
        <MuiEnhancedTable
          onChangePage={setPage}
          onChangeSizePage={setSize}
          headCells={headCells}
          dataList={movieList}
          TableCellList={MovieTableCells}
          onChangeRowsPerPage={setRowsPerPage}
          tableType="movie"
          loading={movieListLoading}
          rowsPerPageProps={rowsPerPage}
          pageProps={page}
        />
      </Container>
      <MovieModal
        openModalMovie={openModalMovie}
        setOpenModalMovie={setOpenModalMovie}
        title="Thêm phim mới"
        button="Thêm phim"
        modalType="addMovie"
      />
    </>
  );
}

export default MovieDashBoard;
