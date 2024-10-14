import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Input, Button, Checkbox } from 'antd';

const EditUserForm = ({ visible, item, onClose, onRefresh }) => {
    const [email, setEmail] = useState(item?.email || '');
    const [password, setPassword] = useState(''); // Password can be empty if not changing
    const [fullname, setFullname] = useState(item?.fullname || '');
    const [isActive, setIsActive] = useState(item?.is_active || true);
    const [isSuperuser, setIsSuperuser] = useState(item?.is_superuser || false);
    const [isVerified, setIsVerified] = useState(item?.is_verified || false);

    const handleSubmit = async () => {
        try {
            await axios.patch(`http://localhost:8080/admin/user/${item.id}/`,
                {
                    password: password ? password : true, // Send true if password is not changed
                    email,
                    is_active: isActive,
                    is_superuser: isSuperuser,
                    is_verified: isVerified,
                    fullname,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            console.log('Измененный пользователь:', item.id);
            onRefresh(); // Refresh users after successful edit
            onClose(); // Close modal after successful edit
        } catch (error) {
            console.error("Ошибка при изменении пользователя:", error);
        }
    };

    return (
        <Modal
            title="Изменить пользователя"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form onFinish={handleSubmit}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{  message: 'Пожалуйста, введите email!' }]}
                >
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="password"
                >
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Полное имя"
                    name="fullname"
                    rules={[{message: 'Пожалуйста, введите полное имя!' }]}
                >
                    <Input value={fullname} onChange={(e) => setFullname(e.target.value)} />
                </Form.Item>


                <Form.Item label="Суперпользователь">
                    <Checkbox
                        checked={isSuperuser}
                        onChange={(e) => setIsSuperuser(e.target.checked)}
                    >
                        Да
                    </Checkbox>
                </Form.Item>



                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                    <Button type="default" onClick={onClose} style={{ marginLeft: '10px' }}>
                        Отмена
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditUserForm;