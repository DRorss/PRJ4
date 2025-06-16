import { React, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, Form, Input, Button, Typography, Select } from 'antd';
import * as yup from 'yup';
// import MessageFormWrapper from './components/MessageFormWrapper/MessageFormWrapper';
import { yupResolver } from '@hookform/resolvers/yup';
import { getInfoUser, updateInfoUser } from '../../services/userServices';
import showNotification from '../../components/Notification/NotificationComponent';
import { useNavigate } from 'react-router-dom';

const { Text, Link } = Typography;
const schema = yup.object().shape({
  // userName: yup.string().required('Tên tài khoản không được để trống'),
  // email: yup.string().required('Email không được để trống'),
  // fullName: yup.string().required('Tên đầy đủ không được để trống'),
  // newPassword: yup
  //   .string()
  //   .required('Mật khẩu không được để trống')
  //   .min(6, 'Mật khẩu cần có ít nhất 6 ký tự'),
  // repeatNewPassword: yup.string()
  //   .required('Nhập lại mật khẩu không được để trống')
  //   .oneOf([yup.ref('newPassword')], 'Mật khẩu nhập lại không khớp'),
  // role: yup.string().required('Quyền tài khoản không được để trống'),
});

const ManagementComponent = () => {
  // const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  // useEffect(() => {
  //   var isFetching = false;

  //   async function getUser() {
  //     if (!isFetching) {
  //       let res = await getInfoUser();
  //       if (res && res?.status == 200 && res?.data?.data) {
  //         let infoUser = res?.data?.data;

  //         setValue("userName", infoUser?.userName);
  //         setValue("email", infoUser?.email);
  //         setValue("fullName", infoUser?.fullName);
  //         setValue("role", infoUser?.role);
  //       }
  //     }
  //   }
  //   getUser();

  //   return () => {
  //     isFetching = true;
  //   };
  // }, []);

  const onSubmit = async (data) => {
    // let res = await updateInfoUser(data);
    // if (res && res?.status == 200 && res?.data?.data) {
    //   let infoUser = res?.data?.data;
    //   let infoSession = JSON.parse(sessionStorage.getItem('infoUser'));

    //   infoSession.fullName = infoUser?.fullName;
    //   sessionStorage.setItem('infoUser', JSON.stringify(infoSession));
    //   showNotification({
    //     type: "info",
    //     description: "Cập nhật thông tin người dùng thành công!"
    //   });
    // } else {
    //   showNotification({
    //     type: "error",
    //     description: "Quá trình cập nhật dữ liệu xảy ra lỗi"
    //   });
    // }
  };

  return (
    <div style={{ width: 400, margin: '100px auto' }}>
      <Card title="Thông tin người dùng" bordered={false}>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Tên đăng nhập"
            validateStatus={errors.userName ? 'error' : ''}
            help={errors.userName?.message}
          >
            <Controller
              name="userName"
              control={control}
              render={({ field }) => <Input disabled={true} {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input disabled={true} type='email' {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Tên đầy đủ"
            validateStatus={errors.fullName ? 'error' : ''}
            help={errors.fullName?.message}
          >
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Quyền"
            validateStatus={errors.role ? 'error' : ''}
            help={errors.role?.message}
          >
            <Controller
              name="role"
              control={control}
              render={({ field }) => <Input disabled={true} {...field} />}
            />
          </Form.Item>

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
              render={({ field }) => <Input.Password {...field} />}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Cập nhật
            </Button>
          </Form.Item>

        </Form>
      </Card>
    </div>
  );
};

export default ManagementComponent;
