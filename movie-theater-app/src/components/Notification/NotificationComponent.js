import React from 'react';
import { Button, notification, Space } from 'antd';

const showNotification = ({
  type = 'info',
  message = 'Thông báo',
  description,
  placement = 'topRight',
  duration = 2,
}) => {
  notification[type]({
    message,
    description,
    placement,
    duration,
  });
};

export default showNotification;