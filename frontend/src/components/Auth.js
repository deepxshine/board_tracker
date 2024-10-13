import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { useHistory } from 'react-router-dom'; // Import useHistory
import 'antd/dist/reset.css'; // Import Ant Design styles

const { Title } = Typography;

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory(); // Initialize history

    const handleSubmit = async (values) => {
        setLoading(true);
        setError('');

        const data = new URLSearchParams();
        data.append('grant_type', 'password');
        data.append('username', values.username);
        data.append('password', values.password);
        data.append('scope', '');
        data.append('client_id', 'string');
        data.append('client_secret', 'string');

        try {
            const response = await axios.post('http://localhost:8080/auth/jwt/login', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                },
                withCredentials: true,
            });

            console.log("Response:", response);
            // Save token in cookies or local storage if needed
            Cookies.set('fastapiusersauth', response.data.access_token); // Adjust cookie name if necessary

            // Redirect to the main page after successful login
            history.push('/main');

        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error("Axios Error:", err.message);
                setError('Неверное имя пользователя или пароль.');
            } else {
                console.error("Unexpected Error:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '0 auto', padding: '50px' }}>
            <Title level={2} style={{ textAlign: 'center', color: '#001529' }}>Вход</Title>
            <Form
                layout="vertical"
                onFinish={handleSubmit}
                style={{ backgroundColor: '#f0f2f5', padding: '20px', borderRadius: '8px' }}
            >
                <Form.Item label="Email" name="username" rules={[{ required: true, message: 'Пожалуйста, введите ваш email!' }]}>
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Введите ваш email"
                    />
                </Form.Item>
                <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}>
                    <Input.Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введите ваш пароль"
                    />
                </Form.Item>
                {error && <Alert message={error} type="error" showIcon />}
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%', backgroundColor: '#176db3', borderColor: '#176db3', marginTop: '5px' }}>
                        {loading ? 'Загрузка...' : 'Войти'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Auth;