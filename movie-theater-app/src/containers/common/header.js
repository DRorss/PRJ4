import { useEffect, useState, useContext } from 'react';
import { Flex, Layout, Button, Dropdown, Space, Menu, SubMenu, Item } from 'antd';
import { Outlet, Link } from "react-router-dom";
import { AuthContext } from "../authen/authProvider";
import { logout } from '../../services/authenServices';
import { SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header, Footer, Content } = Layout;

const HeaderComponent = () => {
    const { isLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const items = [{
        label: 'Trang chủ',
        key: 'dashBoard',
    },
    isLogin && {
        label: 'Thông tin người dùng',
        key: 'infoUser',
    },
    isLogin && {
        label: 'Quản lý',
        key: 'management',
        icon: <SettingOutlined />,
        children: [
            { key: '1', label: 'Quản lý người dùng' },

        ],
    },
    isLogin && {
        label: JSON.parse(sessionStorage.getItem("infoUser"))?.fullName,
        key: 'userName',
    },
    isLogin ? {
        label: "Đăng xuất",
        key: "logout",
    } : {
        label: "Đăng nhập",
        key: "login",
    },
    ].filter(Boolean);

    const handleClickMenu = async (e) => {
        switch (e.key) {
            case "dashBoard":
                navigate('/');
                break;
            case "management":
                navigate('/management');
                break;
            case "infoUser":
                navigate('/infoUser');
                break;
            case "login":
            case "logout":
                if (isLogin) {
                    await logout();
                    sessionStorage.removeItem("infoUser");
                }
                window.location.href = "/login";
                break;
            default:
                break;
        }
    };

    return (
        <Flex gap="middle" wrap>
            <Layout>
                <Header>
                    <Menu onClick={handleClickMenu} mode="horizontal" theme="light" items={items} />
                </Header>
                <Content>
                    <Outlet />
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Flex>
    );
};

export default HeaderComponent;
