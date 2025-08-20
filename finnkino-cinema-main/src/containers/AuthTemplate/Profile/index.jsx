import { useState, useEffect } from "react";
import { useNavigate, Navigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "@/hooks";
import { useForm } from "react-hook-form";

// Material UI
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

// Components
import Input from "../components/Input";
import Button from "../components/Button";

// Yup resolver
import { yupResolver } from "@hookform/resolvers/yup";

// Register schema
import { registerSchema } from "@/validators";

// Api
import { userApi } from "@/api";

// Constants
import { GROUP_ID } from "@/constants";

// Scss
import "./style.scss";

const ProfilePage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { control, handleSubmit } = useForm({
    reValidateMode: "onSubmit",
    defaultValues: {
      fullName: "",
      userName: "",
      email: "",
      password: "",
      role: "",
      confirmedPassword: "",
    },
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    var isFetching = false;

    async function getUser() {
      if (!isFetching) {
        let res = await userApi.getUser();
        if (res && res?.status == 200 && res?.data?.data) {
          let infoUser = res?.data?.data;

          setValue("userName", infoUser?.userName);
          setValue("email", infoUser?.email);
          setValue("fullName", infoUser?.fullName);
          setValue("role", infoUser?.role);
        }
      }
    }
    getUser();

    return () => {
      isFetching = true;
    };
  }, []);

  return (
    <Box
      className="auth-register-form"
      component="form"
      onSubmit={handleSubmit(handleRegister)}
      noValidate
      mt={1}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Input name="userName" disabled="true" control={control} label="Tài khoản" />
      <Input name="email" disabled="true" control={control} label="Email" />
      <Input name="fullName" control={control} label="Tên đầy đủ" />
      <Input name="role" disabled="true" control={control} label="Quyền" />
      <Input
        name="password"
        control={control}
        label="Mật khẩu"
        type={showPassword ? "password" : "text"}
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
      <Input
        name="confirmedPassword"
        control={control}
        label="Xác nhận mật khẩu"
        type={showConfirmedPassword ? "password" : "text"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShowConfirmedPassword}
              >
                {showConfirmedPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button onClick={() => setError("")} disabled={!checked} loading={loading}>
        Đăng ký
      </Button>
    </Box>
  );
};

export default ProfilePage;
