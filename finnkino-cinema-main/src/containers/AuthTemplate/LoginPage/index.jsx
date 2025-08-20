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
import { loginSchema } from "@/validators";
import { userApi } from "@/api";
import "./style.scss";
import { useNotification } from '../../../components/Notification/index';
import { ROLE } from "@/constants";

const LoginPage = () => {
  const { showNotification } = useNotification();

  const auth = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    reValidateMode: "onSubmit",
    defaultValues: { userName: "", password: "" },
    resolver: yupResolver(loginSchema),
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async (user) => {
    (async () => {
      try {
        setLoading(true);

        let res = await userApi.login(user);
        if (res && res?.status == 200 && res?.data?.data) {
          let userInfo = res.data.data;
          auth.login(userInfo);
          navigate(userInfo?.role === ROLE.ADMIN ? "/admin/user-management" : -1);
        }
      } catch (error) {
        showNotification('Tài khoản hoặc mật khẩu không đúng.', 'error');
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <Box
      className="auth-login-form"
      component="form"
      onSubmit={handleSubmit(handleLogin)}
      noValidate
      mt={1}
    >
      <Input name="userName" control={control} label="Tài khoản" />
      <Input
        name="password"
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
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Ghi nhớ đăng nhập"
        className="remember-login"
      />
      <Button loading={loading}>
        Đăng nhập
      </Button>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Link variant="body2" href="/auth/forgot-password" sx={{ fontSize: "13px" }}>
          Quên mật khẩu?
        </Link>
        <Typography className="auth-link-to-register">
          Không có tài khoản? <RouterLink to="/auth/register">Đăng ký</RouterLink>
        </Typography>
      </Stack>
    </Box>
  );
};

export default LoginPage;
