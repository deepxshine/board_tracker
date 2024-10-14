import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Input, Button } from 'antd';

const CreateInventoryForm = ({ visible, onClose }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/admin/inventory/`,
                { title },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            console.log('Созданный элемент:', response.data);
            onClose(); // Закрыть модал после успешного создания

            // Обновление страницы
            window.location.reload(); // Перезагрузка страницы
        } catch (error) {
            console.error("Ошибка при создании нового элемента:", error);
        }
    };

    return (
        <Modal
            title="Создать новый элемент инвентаря"
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

export default CreateInventoryForm;