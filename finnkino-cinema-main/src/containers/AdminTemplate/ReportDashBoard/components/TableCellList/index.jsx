//Material UI
import { Button, TableCell } from "@mui/material";

// Components
import Image from "@/components/Image";
import { EditMovieBtn, DeleteMovieBtn, CreateScheduleBtn } from "../../../components/Buttons";

//Others
import "./style.scss";
import Tooltip from '@mui/material/Tooltip';

const MovieTableCells = (props) => {
  const { row, labelId, handleDelete, handleEdit, handleSchedule } = props;

  return (
    <>
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        className="movie-table__table-cell table-cell__movie-id"
      >
        {row.name}
      </TableCell>
      {/* <TableCell
        sx={{ width: "200px", height: "100px" }}
        className="movie-table__table-cell table-cell__movie-img"
      >
        <Image src={row.hinhAnh} alt="movie image" />
      </TableCell> */}
      <TableCell
        align="center"
        sx={{ width: "200px", height: "100px" }}
        className="movie-table__table-cell table-cell__movie-name"
      >
        {row.author}
      </TableCell>
      <TableCell
        align="center"
        sx={{ width: "200px", height: "100px" }}
        className="movie-table__table-cell table-cell__movie-name"
      >
        {row.productionTime}
      </TableCell>
      <TableCell
        align="center"
        sx={{ width: "200px", height: "100px" }}
        className="movie-table__table-cell table-cell__movie-name"
      >
        {row.type}
      </TableCell>
      <TableCell
        align="left"
        sx={{ width: "100px", height: "100px" }}
        className="movie-table__table-cell"
      >
        <Tooltip title={row.description}>
          <span className="table-cell__movie-desc">{row.description}</span>
        </Tooltip>
      </TableCell>
      <TableCell
        align="center"
        sx={{ width: "200px", height: "100px" }}
        className="movie-table__table-cell table-cell__movie-name"
      >
        {row.createdAt}
      </TableCell>
      <TableCell
        align="center"
        sx={{ width: "200px", height: "100px" }}
        className="movie-table__table-cell table-cell__movie-name"
      >
        {row.enabled ? 'Hoạt động' : 'Không hoạt động'}
      </TableCell>
      <TableCell
        align="center"
        sx={{ width: "150px" }}
        className="movie-table__table-cell table-cell__movie-actions"
      >
        <DeleteMovieBtn onClick={() => handleDelete(row.id, row.enabled)} tooltipLable={row.enabled ? false : true} />
        <EditMovieBtn onClick={() => handleEdit(row.id)} />
        {/* <CreateScheduleBtn onClick={() => handleSchedule(row.maPhim)} /> */}
      </TableCell>
    </>
  );
};

export default MovieTableCells;
