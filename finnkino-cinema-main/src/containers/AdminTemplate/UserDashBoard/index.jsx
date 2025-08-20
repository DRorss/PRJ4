import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// Material UI
import { Container } from "@mui/system";

//Components
import SearchBar from "../components/SearchBar";
import { AddItemBtn } from "../components/Buttons";
import MuiEnhancedTable from "../components/MuiEnhancedTable";
import UserTableCells from "./component/TableCellList";
import headCells from "./constants";
import UserModal from "./component/UserModal";

//Others
import actGetUserList from "@/store/actions/userList";
import { actUserDetailsSuccess } from "@/store/actions/userDetails";
import { faLess } from "@fortawesome/free-brands-svg-icons";

function UserDashBoard() {
  const [openModalUser, setOpenModalUser] = useState(false);
  const [fullName, setFullName] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(200);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userList, setUserList] = useState([]);

  // const dispatch = useDispatch();
  // const userList = useSelector((state) => state.userList.data);
  // const updateUser = useSelector((state) => state.userDetails.data);
  const userListLoading = useSelector((state) => state.userList.loading);

  useEffect(() => {
    // dispatch(actGetMovieList(name, page, size));
    var isFetching = false;
    getUser();
    return () => {
      isFetching = true;
    };
  }, []);

  useEffect(() => {
    // dispatch(actGetMovieList(name, page, size));
    getUser();
  }, [fullName]);

  useEffect(() => {
    // dispatch(actGetMovieList(name, page, size));
    getUser();
  }, [openModalUser]);

  const handleSearch = (value) => {
    setFullName(value);
    // dispatch(actGetUserList(value));
    // dispatch(actUserDetailsSuccess(userList));
  };

  async function getUser() {
    let res = await actGetUserList(fullName, page, size);
    if (res && res?.status == 200 && res?.data?.data) {
      setUserList(res?.data?.data?.content);
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
        <AddItemBtn onClick={() => setOpenModalUser(true)}>Thêm người dùng</AddItemBtn>
        <MuiEnhancedTable
          onChangePage={setPage}
          onChangeSizePage={setSize}
          headCells={headCells}
          dataList={userList}
          TableCellList={UserTableCells}
          onChangeRowsPerPage={setRowsPerPage}
          tableType="user"
          loading={userListLoading}
          rowsPerPageProps={rowsPerPage}
          pageProps={page}
          openModalUser={openModalUser}
          setOpenModalUser={setOpenModalUser}
          handleSearch={getUser}
        />
      </Container>
      <UserModal
        openModalUser={openModalUser}
        setOpenModalUser={setOpenModalUser}
        title="Thêm người dùng"
        button="Thêm người dùng"
        modalType="addUser"
      />
    </>
  );
}

export default UserDashBoard;
