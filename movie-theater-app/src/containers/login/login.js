import { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, Form, Input, Button, Typography } from 'antd';
import * as yup from 'yup';
// import MessageFormWrapper from './components/MessageFormWrapper/MessageFormWrapper';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginApi } from '../../services/authenServices';
import showNotification from '../../components/Notification/NotificationComponent';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../containers/authen/authProvider";

const { Link } = Typography;
const schema = yup.object().shape({
  userName: yup.string().required('Tên tài khoản không được để trống'),
  password: yup
    .string()
    .required('Mật khẩu không được để trống')
    .min(6, 'Mật khẩu cần có ít nhất 6 ký tự'),
});

const LoginComponent = () => {
  const { setIsLogin } = useContext(AuthContext);

  const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors }, } = useForm({
    defaultValues: {
      userName: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    let res = await loginApi(data);
    if (res && res?.status === 200 && res?.data?.data) {
      let infoUser = res?.data?.data;
      sessionStorage.setItem('infoUser', JSON.stringify(infoUser));
      setIsLogin(true);
      navigate('/');
    } else {
      showNotification({
        type: "error",
        description: "Tài khoản hoặc mật khẩu không đúng."
      });
    }
  };

  return (
    <div style={{ width: 400, margin: '100px auto' }}>
      <Card title="Đăng nhập" bordered={false}>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Username"
            validateStatus={errors.userName ? 'error' : ''}
            help={errors.userName?.message}
          >
            <Controller
              name="userName"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
            {/* <MessageFormWrapper message={errors.username?.message} /> */}
          </Form.Item>

          <Form.Item
            label="Password"
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input.Password {...field} />}
            />
            {/* <MessageFormWrapper message={errors.password?.message} /> */}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>
          <Form.Item>
            <Link href="/forgotPassword" >
              Quên mật khẩu ?
            </Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginComponent;
