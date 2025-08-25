import { TableCell } from "@mui/material";

// Components
import { EditMovieBtn, DeleteMovieBtn } from "../../../components/Buttons";

//Others
import "./style.scss";

const UserTableCells = (props) => {
  const { row, index, labelId, handleDelete, handleEdit } = props;
  return (
    <>
      <TableCell
        component="th"
        id={labelId}
        align="center"
        scope="row"
        className="management-table__table-cell table-cell__user-number"
      >
        {index}
      </TableCell>
      <TableCell
        sx={{ width: "200px", height: "100px" }}
        className="management-table__table-cell table-cell__user-account"
      >
        {row.userName}
      </TableCell>
      <TableCell
        align="left"
        sx={{ width: "200px", height: "100px" }}
        className="management-table__table-cell table-cell__user-password"
      >
        {row.email}
      </TableCell>
      <TableCell align="left" className="management-table__table-cell table-cell__user-email">
        {row.fullName}
      </TableCell>
      <TableCell align="center" className="management-table__table-cell table-cell__user-phoneNo">
        {row.enabled ? "Hoạt động" : "Không hoạt động"}
      </TableCell>
      <TableCell align="center" className="management-table__table-cell table-cell__user-phoneNo">
        {row.role === "ADMIN" ? "Quản trị viên" : "Người dùng"}
      </TableCell>
      <TableCell
        align="right"
        sx={{ width: "150px" }}
        className="management-table__table-cell table-cell__management-actions"
      >
        <DeleteMovieBtn onClick={() => handleDelete(row.id, row.enabled)} tooltipLable={row.enabled ? false : true} />
        <EditMovieBtn onClick={() => handleEdit(row.id)} />
      </TableCell>
    </>
  );
};

export default UserTableCells;
