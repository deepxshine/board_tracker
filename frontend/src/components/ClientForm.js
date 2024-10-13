import React, { useState } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import axios from 'axios';

const ClientForm = ({ visible, onClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
    setLoading(true);
    try {
        const response = await axios.post('http://localhost:8080/client/', {
            name: values.firstName,
            surname: values.lastName,
            phone_number: values.phone,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            withCredentials: true, // Important for sending cookies
        });

        console.log("Client created:", response.data);
        form.resetFields();
        onClose();
    } catch (error) {
        console.error("Error creating client:", error);
    } finally {
        setLoading(false);
    }
};

    return (
        <Modal
            title="Создать клиента"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Имя" name="firstName" rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}>
                    <Input placeholder="Введите имя" />
                </Form.Item>
                <Form.Item label="Фамилия" name="lastName" rules={[{ required: true, message: 'Пожалуйста, введите фамилию!' }]}>
                    <Input placeholder="Введите фамилию" />
                </Form.Item>
                <Form.Item label="Телефон" name="phone" rules={[{ required: true, message: 'Пожалуйста, введите номер телефона!' }]}>
                    <Input placeholder="Введите телефон" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                        Создать клиента
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ClientForm;