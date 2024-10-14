// src/components/MainPageComponents/TicketComponents/CloseTicketModal.js
import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const CloseTicketModal = ({ visible, onClose, ticketId, onSubmit }) => {
    const [form] = Form.useForm();

    const handleFinish = async (values) => {
        await onSubmit(ticketId, values.comment);
        form.resetFields();
        onClose(); // Close the modal after submission
    };

    return (
        <Modal
            title="Закрыть Тикет"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item label="Комментарий" name="comment" rules={[{ required: true, message: 'Пожалуйста, введите комментарий!' }]}>
                    <Input.TextArea placeholder="Введите комментарий" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Закрыть
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CloseTicketModal;