import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const EditClientForm = ({ clientId, onClose, onRefresh }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    // Fetch current client data to pre-fill the form
    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/admin/client/${clientId}/`, {
                    headers: { 'Accept': 'application/json' },
                    withCredentials: true,
                });
                form.setFieldsValue(response.data); // Pre-fill the form with fetched data
            } catch (error) {
                console.error('Ошибка при загрузке данных клиента', error);
            }
        };

        fetchClientData();
    }, [clientId, form]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await axios.patch(`http://localhost:8080/admin/client/${clientId}/`, values, {
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            onRefresh(); // Refresh the client list after updating
            onClose(); // Close the form
        } catch (error) {
            console.error('Ошибка при обновлении данных клиента', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Имя" name="name">
                <Input />
            </Form.Item>
            <Form.Item label="Фамилия" name="surname">
                <Input />
            </Form.Item>
            <Form.Item label="Телефон" name="phone_number">
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Сохранить
                </Button>
                <Button type="default" onClick={onClose} style={{ marginLeft: '10px' }}>
                    Отмена
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditClientForm;