import React from 'react';
import { Button, Typography, notification } from 'antd';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Change to useNavigate
import axios from 'axios';

const { Title } = Typography;

const Header = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = async () => {
        try {
            // Send logout request to the backend
            await axios.post('http://localhost:8080/auth/jwt/logout', {}, {
                headers: {
                    'Accept': 'application/json',
                },
                withCredentials: true, // Important for sending cookies
            });

            // Remove the cookie
            Cookies.remove('fastapiusersauth');

            // Notify user of successful logout
            notification.success({
                message: 'Успех',
                description: 'Вы успешно вышли из системы.',
                placement: 'bottomRight',
                duration: 2,
            });

            // Redirect to login page
            navigate('/auth'); // Use navigate instead of history.push
        } catch (error) {
            console.error("Error logging out:", error);
            notification.error({
                message: 'Ошибка',
                description: 'Ошибка при выходе из системы. Пожалуйста, попробуйте снова.',
                placement: 'bottomRight',
                duration: 2,
            });
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={2}>Главная страница</Title>
            <Button type="primary" onClick={handleLogout}>
                Выход
            </Button>
        </div>
    );
};

export default Header;