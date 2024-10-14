// src/components/TicketDetailsModal.js
import React, { useEffect, useState } from 'react';
import { Modal, List } from 'antd';
import axios from 'axios';

const TicketDetailsModal = ({ visible, onClose, ticketId }) => {
    const [ticketDetails, setTicketDetails] = useState([]);

    useEffect(() => {
        if (visible && ticketId) {
            fetchTicketDetails();
        }
    }, [visible, ticketId]);

    const fetchTicketDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/admin/ticket/details/${ticketId}`, {
                headers: {
                    'Accept': 'application/json',
                },
                withCredentials: true,
            });
            setTicketDetails(response.data);
        } catch (error) {
            console.error("Error fetching ticket details:", error);
        }
    };

    return (
        <Modal
            title="Детали тикета"
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <List
                bordered
                dataSource={ticketDetails}
                renderItem={item => (
                    <List.Item>
                        <strong>{item.title}</strong> (ID: {item.id})
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default TicketDetailsModal;