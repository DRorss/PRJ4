import { useEffect, useState, useContext } from 'react';
import { Flex, Layout } from 'antd';
import { Outlet, Link } from "react-router-dom";
import { AuthContext } from "../authen/authProvider";
import { logout } from '../../services/authenServices';
const { Header, Footer, Content } = Layout;

const HeaderComponent = () => {
    const { isLogin } = useContext(AuthContext);

    const onHandleLogin = async () => {
        if (isLogin) {
            await logout();
            sessionStorage.removeItem("infoUser");
        }
        window.location.href = "/login";
    };

    return (
        <Flex gap="middle" wrap>
            <Layout>
                <Header>
                    <div>
                        <a className="dropdown-item" onClick={onHandleLogin}>
                            {isLogin ? "Đăng xuất" : "Đăng nhập"}
                        </a>
                        {isLogin && <Link className="dropdown-item" to="/infoUser">
                            Thông tin người dùng
                        </Link>}

                        <Link>{isLogin && JSON.parse(sessionStorage.getItem("infoUser"))?.fullName}</Link>
                    </div>
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
