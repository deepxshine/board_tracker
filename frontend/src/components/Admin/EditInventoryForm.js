import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Input, Button } from 'antd';

const EditInventoryForm = ({ visible, item, onClose, onRefresh }) => {
    const [title, setTitle] = useState(item?.title || '');

    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:8080/admin/inventory/${item.id}/`,
                { title },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            console.log('Измененный элемент:', item.id);
            onRefresh(); // Refresh inventory items after successful edit
            onClose(); // Close modal after successful edit
        } catch (error) {
            console.error("Ошибка при изменении элемента:", error);
        }
    };

    return (
        <Modal
            title="Изменить элемент инвентаря"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form onFinish={handleSubmit}>
                <Form.Item
                    label="Название"
                    name="title"
                    rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}
                >
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
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

export default EditInventoryForm;