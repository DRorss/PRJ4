import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "@/hooks";
import { useForm } from "react-hook-form";

import {
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  InputAdornment,
  Stack,
  Alert,
  IconButton,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import Input from "../components/Input";
import Button from "../components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailSchema, forgotPasswordSchema } from "@/validators";
import { userApi } from "@/api";
import "./style.scss";
import { useNotification } from '../../../components/Notification/index';

const ForgotPasswordPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { control, handleSubmit } = useForm({
    reValidateMode: "onSubmit",
    defaultValues: { email: "", newPassword: "", reNewPassword: "" },
    resolver: yupResolver(isValid ? forgotPasswordSchema : emailSchema),
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleForgotPassword = (data) => {
    (async () => {
      try {
        setLoading(true);

        if (isValid) {
          let res = await userApi.changePasswordByEmail(data);
          if (res && res?.status == 200 && res?.data?.data) {
            showNotification('Thay đổi mật khẩu thành công!', 'success');
            navigate(-1);
          } else {
            showNotification('Có lỗi xảy ra trong quá trình cập nhật dữ liệu.', 'error');
          }
        } else {
          let res = await userApi.checkValidEmail(data?.email);
          if (res && res?.status == 200 && res?.data?.data?.email) {
            setIsValid(true);
          } else {
            showNotification('Không tìm thấy email.', 'warning');
          }
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <Box
      className="auth-login-form"
      component="form"
      onSubmit={handleSubmit(handleForgotPassword)}
      noValidate
      mt={1}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Input name="email" disabled={isValid} control={control} label="Email" />
      {isValid && <>
        <Input
          name="newPassword"
          control={control}
          label="Mật khẩu"
          type={showPassword ? "password" : "text"}

          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <Input
          name="reNewPassword"
          control={control}
          label="Mật khẩu"
          type={showPassword ? "password" : "text"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
      </>
      }
      <Button onClick={() => setError(false)} loading={loading}>
        {isValid ? "Xác nhận thay đổi" : "Tiếp theo"}
      </Button>
    </Box>
  );
};

export default ForgotPasswordPage;
