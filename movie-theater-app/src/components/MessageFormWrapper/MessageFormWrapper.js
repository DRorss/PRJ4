import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

const MessageFormWrapper = ({ message }) => {
  return message && <Text type="danger">{message}</Text>;
};

export default MessageFormWrapper;
