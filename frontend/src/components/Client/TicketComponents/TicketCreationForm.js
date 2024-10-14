// src/components/MainPageComponents/TicketComponents/TicketCreationForm.js
import React from 'react';
import { Form, Input, Button } from 'antd';

const TicketCreationForm = ({ form, loading, onFinish }) => {
    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Номер телефона" name="phone" rules={[{ required: true, message: 'Пожалуйста, введите номер телефона!' }]}>
                <Input placeholder="Введите номер телефона" />
            </Form.Item>
            <Form.Item label="Комментарий" name="comment">
                <Input.TextArea placeholder="Введите комментарий (опционально)" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                    Создать
                </Button>
            </Form.Item>
        </Form>
    );
};

export default TicketCreationForm;