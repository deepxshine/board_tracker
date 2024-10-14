import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Input, Button } from 'antd';

const CreateUserForm = ({ visible, onClose, onUserCreated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/auth/jwt/register`,
                {
                    email,
                    password,
                    is_active: true,
                    is_superuser: false,
                    is_verified: false,
                    fullname,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                }
            );
            console.log('Созданный пользователь:', response.data);
            onUserCreated(); // Call the function to refresh the user list
            onClose(); // Close the modal after successful creation
        } catch (error) {
            console.error("Ошибка при создании пользователя:", error);
        }
    };

    return (
        <Modal
            title="Создать пользователя"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form onFinish={handleSubmit}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Пожалуйста, введите email!' }]}
                >
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
                >
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Полное имя"
                    name="fullname"
                    rules={[{ required: true, message: 'Пожалуйста, введите полное имя!' }]}
                >
                    <Input value={fullname} onChange={(e) => setFullname(e.target.value)} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Создать
                    </Button>
                    <Button type="default" onClick={onClose} style={{ marginLeft: '10px' }}>
                        Отмена
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateUserForm;