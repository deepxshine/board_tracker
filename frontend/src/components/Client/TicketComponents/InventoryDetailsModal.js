// src/components/MainPageComponents/TicketComponents/InventoryDetailsModal.js
import React, { useEffect, useState } from 'react';
import { Modal, List } from 'antd';
import axios from 'axios';

const InventoryDetailsModal = ({ visible, onClose, ticketId }) => {
    const [inventoryItems, setInventoryItems] = useState([]);

    useEffect(() => {
        if (visible && ticketId) {
            fetchInventory();
        }
    }, [visible, ticketId]);

    const fetchInventory = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/ticket/${ticketId}/inventory/`, {
                headers: {
                    'Accept': 'application/json',
                },
                withCredentials: true,
            });
            setInventoryItems(response.data);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        }
    };

    return (
        <Modal
            title="Инвентарь тикета"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <List
                bordered
                dataSource={inventoryItems}
                renderItem={item => (
                    <List.Item>
                        <strong>{item.title}</strong> (ID: {item.id})
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default InventoryDetailsModal;