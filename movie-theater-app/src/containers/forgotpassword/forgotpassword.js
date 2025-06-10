import { React, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, Form, Input, Button, Typography } from 'antd';
import * as yup from 'yup';
// import MessageFormWrapper from './components/MessageFormWrapper/MessageFormWrapper';
import { yupResolver } from '@hookform/resolvers/yup';
import { getValidEmail, changePasswordByEmail } from '../../services/authenServices';
import showNotification from '../../components/Notification/NotificationComponent';

const { Text, Link } = Typography;

const schemaEmail = yup.object().shape({
  email: yup.string().email("Email không hợp lệ")
    .required('Email không được để trống'),
});

const fullSchema = yup.object().shape({
  email: yup.string().required('Email không được để trống'),
  newPassword: yup.string()
    .required('Mật khẩu không được để trống')
    .min(6, 'Mật khẩu cần có ít nhất 6 ký tự'),
  repeatNewPassword: yup.string()
    .required('Nhập lại mật khẩu không được để trống')
    .oneOf([yup.ref('newPassword')], 'Mật khẩu nhập lại không khớp'),
});

const ForgotPasswordComponent = () => {
  const [isValid, setIsValid] = useState(false);

  const { handleSubmit, control, formState: { errors }, } = useForm({
    defaultValues: {
      email: '',
      newPassword: '',
      repeatNewPassword: '',
    },
    resolver: yupResolver(isValid ? fullSchema : schemaEmail),
  });


  const onSubmit = async (data) => {
    if (isValid) {
      let res = await changePasswordByEmail(data);
      if (res && res?.status == 200 && res?.data?.data) {
        showNotification({
          type: "info",
          message: "Thông báo",
          description: "Thay đổi mật khẩu thành công!"
        });
      } else {
        showNotification({
          type: "error",
          message: "Thông báo",
          description: "Có lỗi xảy ra trong quá trình cập nhật dữ liệu."
        });
      }
    } else {
      let res = await getValidEmail(data?.email);
      if (res && res?.status == 200 && res?.data?.data?.email) {
        setIsValid(true);
      } else {
        showNotification({
          type: "error",
          message: "Thông báo",
          description: "Không tìm thấy email."
        });
      }
    }
  };

  return (
    <div style={{ width: 400, margin: '100px auto' }}>
      <Card title="Quên mật khẩu" bordered={false}>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Email"
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input disabled={isValid} type="email" {...field} />}
            />
          </Form.Item>
          {!isValid &&
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Kiểm tra email
              </Button>
            </Form.Item>
          }
          {isValid &&
            <>
              <Form.Item
                label="Mật khẩu mới"
                validateStatus={errors.newPassword ? 'error' : ''}
                help={errors.newPassword?.message}
              >
                <Controller
                  name="newPassword"
                  control={control}
                  render={({ field }) => <Input.Password  {...field} />}
                />
              </Form.Item>

              <Form.Item
                label="Nhập lại mật khẩu mới"
                validateStatus={errors.repeatNewPassword ? 'error' : ''}
                help={errors.repeatNewPassword?.message}
              >
                <Controller
                  name="repeatNewPassword"
                  control={control}
                  render={({ field }) => isValid && <Input.Password {...field} />}
                />
              </Form.Item>
            </>
          }
          {isValid &&
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Thay đổi lại mật khẩu
              </Button>
            </Form.Item>
          }
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPasswordComponent;
