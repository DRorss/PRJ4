const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Tên phim",
    sortFunction: true,
  },
  {
    id: "author",
    numeric: false,
    disablePadding: false,
    label: "Tác giả",
    sortFunction: false,
  },
  {
    id: "productionTime",
    numeric: false,
    disablePadding: false,
    label: "Năm sản xuất",
    sortFunction: true,
  },
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Thể loại",
    sortFunction: true,
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Mô tả phim",
    sortFunction: true,
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Ngày tạo",
    sortFunction: true,
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Hành động",
    sortFunction: false,
  },
];

export { headCells };
