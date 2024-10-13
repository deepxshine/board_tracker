import React from 'react';
import { Button, Typography } from 'antd';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

const { Title } = Typography;

const Header = () => {
    const history = useHistory();

    const handleLogout = () => {
        Cookies.remove('fastapiusersauth');
        history.push('/auth');
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