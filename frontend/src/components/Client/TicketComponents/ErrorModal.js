// src/components/MainPageComponents/TicketComponents/ErrorModal.js
import React from 'react';
import { Modal, Button } from 'antd';

const ErrorModal = ({ visible, onClose }) => {
    return (
        <Modal
            title="Ошибка"
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="ok" type="primary" onClick={onClose}>
                    ОК
                </Button>,
            ]}
        >
            <p>Клиент не найден по указанному номеру телефона.</p>
        </Modal>
    );
};

export default ErrorModal;