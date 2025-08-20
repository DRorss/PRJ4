const headCells = [
  {
    id: "STT",
    numeric: false,
    disablePadding: true,
    label: "Số thứ tự",
    sortFunction: true,
  },
  {
    id: "userName",
    numeric: false,
    disablePadding: false,
    label: "Tài khoản",
    sortFunction: false,
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
    sortFunction: true,
  },
  {
    id: "fullName",
    numeric: false,
    disablePadding: false,
    label: "Tên đầy đủ",
    sortFunction: true,
  },
  {
    id: "enabled",
    numeric: false,
    disablePadding: false,
    label: "Hoạt động",
    sortFunction: true,
  },
  {
    id: "role",
    numeric: false,
    disablePadding: false,
    label: "Quyền",
    sortFunction: true,
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Hành động",
    sortFunction: false,
  },
];

export default headCells;
