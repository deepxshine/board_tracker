import React, { useState, useEffect } from 'react';
import { Menu, Layout, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation for navigation
import Cookies from 'js-cookie'; // Import js-cookie for cookie management

const { Header } = Layout;

const AdminHeader = () => {
    const navigate = useNavigate(); // Define navigate here
    const location = useLocation(); // Get current location
    const [current, setCurrent] = useState('clients'); // Default active item

    useEffect(() => {
        // Set current based on the pathname
        const path = location.pathname.split('/').pop(); // Get last part of the path
        setCurrent(path); // Update current menu item
    }, [location]);

    const handleLogout = () => {
        Cookies.remove('fastapiusersauth'); // Remove token cookie
        navigate('/auth'); // Redirect to auth page
    };

    const handleClick = (e) => {
        setCurrent(e.key);
        navigate(`/admin/${e.key}`); // Navigate to the corresponding path
    };

    return (
        <Header style={{ backgroundColor: '#f5faff', padding: '0 20px' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '64px',
            }}>
                <Menu
                    theme="light"
                    mode="horizontal"
                    selectedKeys={[current]}
                    style={{
                        lineHeight: '64px',
                        fontSize: '16px',
                        flexGrow: 1,
                        marginBottom: 0,
                        backgroundColor: '#f5faff'
                    }}
                >
                    <Menu.Item key="clients" onClick={handleClick}>
                        Клиенты
                    </Menu.Item>
                    <Menu.Item key="tickets" onClick={handleClick}>
                        Тикеты
                    </Menu.Item>
                    <Menu.Item key="inventory" onClick={handleClick}>
                        Инвентарь
                    </Menu.Item>
                    <Menu.Item key="user" onClick={handleClick}>
                        Пользователи
                    </Menu.Item>
                </Menu>
                <Button
                    type="link"
                    style={{ color: '#176DB3', marginLeft: '20px', lineHeight: '64px' }}
                    onClick={handleLogout}
                >
                    Выход
                </Button>
            </div>
        </Header>
    );
};

export default AdminHeader;