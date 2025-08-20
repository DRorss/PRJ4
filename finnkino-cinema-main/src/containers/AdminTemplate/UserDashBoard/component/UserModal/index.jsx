import { useDispatch, useSelector } from "react-redux";

//Formik
import { Formik, useFormik } from "formik";

//Material UI
import Modal from "@mui/material/Modal";
import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Alert,
  InputAdornment,
  IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Switch
} from "@mui/material";

//Components
import { SubmitButton } from "@/containers/AdminTemplate/components/Buttons";
import Loader from "@/components/Loader";

//Others
import "./style.scss";
import { userSchema } from "@/validators";
import { GROUP_ID } from "@/constants";
import { userApi } from "@/api";
import actGetUserDetails from "@/store/actions/userDetails";
import { useRef, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNotification } from '../../../../../components/Notification/index';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function UserModal(props) {
  const { openModalUser, setOpenModalUser, title, button, data, loading, userAccount, modalType } =
    props;
  const { showNotification } = useNotification();

  const [submitError, setSubmitError] = useState("");
  const form = useRef();

  const dispatch = useDispatch();
  const handleClose = () => setOpenModalUser(false);
  const [showPassword, setShowPassword] = useState(true);
  const handleShowPassword = () => setShowPassword(!showPassword);

  let userEdit;
  if (data) {
    userEdit = data.data.data;
  }

  const initialValuesAddUser = {
    id: "",
    userName: "",
    email: "",
    fullName: "",
    enabled: true,
    password: "",
    role: "",
  };

  const initialValuesEditUser = {
    userName: userEdit?.userName,
    email: userEdit?.email,
    fullName: userEdit?.fullName,
    enabled: userEdit?.enabled,
    password: "",
    role: userEdit?.role,
  };

  const initialValues = modalType === "addUser" ? initialValuesAddUser : initialValuesEditUser;

  const {
    errors,
    values,
    touched,
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (modalType === "addUser") {
        const fetchData = async () => {
          try {
            await userApi.register(values);
            // dispatch(actGetUserDetails(values.taiKhoan));
            setOpenModalUser(false);
            showNotification('Tạo tài khoản thành công!', 'success');
            resetForm();
            setSubmitError("");
          } catch (error) {
            showNotification('Có lỗi trong quá trình tạo tài khoản', 'error');
            setSubmitError(error);
          }
        };
        fetchData();
      } else {
        const fetchData = async () => {
          try {
            await userApi.update(values);
            // dispatch(actGetUserDetails(values.taiKhoan));
            showNotification('Cập nhật tài khoản thành công!', 'success');
            setOpenModalUser(false);
            resetForm();
            setSubmitError("");
          } catch (error) {
            showNotification('Có lỗi trong quá trình cập nhật tài khoản', 'error');
            setSubmitError(error);
          }
        };
        fetchData();
      }
    },
  });

  const handleChangeSelect = (e) => {
    setFieldValue("role", e.target.value);
  };

  return (
    <Dialog open={openModalUser} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      {loading ? (
        <Loader />
      ) : (
        <Formik>
          <DialogContent sx={{ paddingBottom: 0 }}>
            <Box sx={{ mt: 2 }} component="form" onSubmit={handleSubmit}>
              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel htmlFor="full-name">Họ và tên</FormLabel>
                <TextField
                  name="fullName"
                  id="full-name"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                  error={errors.fullName && touched.fullName ? true : false}
                />
                {errors.fullName && touched.fullName && (
                  <FormHelperText error>{errors.fullName}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel htmlFor="user-name">Tài khoản</FormLabel>
                <TextField
                  name="userName"
                  id="user-name"
                  variant="outlined"
                  fullWidth
                  disabled={modalType === "addUser" ? false : true}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.userName}
                  error={errors.userName && touched.userName ? true : false}
                />
                {errors.userName && touched.userName && (
                  <FormHelperText error>{errors.userName}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel htmlFor="password">Mật khẩu</FormLabel>
                <TextField
                  name="password"
                  id="password"
                  variant="outlined"
                  fullWidth
                  type={showPassword ? "password" : "text"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={errors.password && touched.password ? true : false}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleShowPassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.password && touched.password && (
                  <FormHelperText error>{errors.password}</FormHelperText>
                )}
              </FormControl>


              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  name="email"
                  id="email"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={errors.email && touched.email ? true : false}
                />
                {errors.email && touched.email && (
                  <FormHelperText error>{errors.email}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel id="role">Loại người dùng</FormLabel>
                <Select
                  htmlFor="role"
                  onChange={handleChangeSelect}
                  value={values.role || ""}
                  error={errors.role && touched.role ? true : false}
                >
                  <MenuItem value="USER">Người dùng</MenuItem>
                  <MenuItem value="ADMIN">Quản trị</MenuItem>
                </Select>
                {errors.role && touched.role && (
                  <FormHelperText error>{errors.role}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel className="movie-form__input-label" htmlFor="enabled">
                  Hoạt động
                </FormLabel>
                <Switch name="enabled"
                  checked={values.enabled}
                  onChange={(e) => setFieldValue("enabled", e.target.checked)}
                />
                {errors.enabled && touched.enabled && (
                  <FormHelperText error>{errors.enabled}</FormHelperText>
                )}
              </FormControl>
              <Box sx={{ paddingBottom: 2 }}>
                <SubmitButton>{button}</SubmitButton>
              </Box>
            </Box>
          </DialogContent>
        </Formik>
      )}
    </Dialog>
  );
}

export default UserModal;
