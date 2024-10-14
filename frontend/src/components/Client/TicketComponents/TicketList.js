// src/components/MainPageComponents/TicketList.js
import React, { useState } from 'react';
import { List, Button } from 'antd';
import CloseTicketModal from './CloseTicketModal'; // Import your new modal
import InventoryDetailsModal from './InventoryDetailsModal'; // Import Inventory Details Modal
import axios from "axios";

const TicketList = ({ tickets, onRefresh }) => {
    const [closeModalVisible, setCloseModalVisible] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null); // Track which ticket is being closed
    const [detailsModalVisible, setDetailsModalVisible] = useState(false); // Track visibility of details modal

    const handleCloseClick = (ticketId) => {
        setSelectedTicketId(ticketId);
        setCloseModalVisible(true); // Open close ticket modal
    };

    const handleCloseModal = () => {
        setCloseModalVisible(false);
        setSelectedTicketId(null); // Reset selected ticket ID
    };

    const handleSubmitCloseTicket = async (ticketId, comment) => {
        try {
            await axios.put(`http://localhost:8080/ticket/${ticketId}/`, {
                comment,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            console.log("Ticket closed successfully");

            // Refresh the ticket list after closing the ticket
            await onRefresh();

            handleCloseModal(); // Close the modal after successful submission
        } catch (error) {
            console.error("Error closing ticket:", error);
        }
    };

    const handleDetailsClick = (ticketId) => {
        setSelectedTicketId(ticketId);
        setDetailsModalVisible(true); // Open inventory details modal
    };

    const handleDetailsModalClose = () => {
        setDetailsModalVisible(false);
        setSelectedTicketId(null); // Reset selected ticket ID when closing details modal
    };

    return (
        <>
            <List
                bordered
                dataSource={tickets}
                renderItem={ticket => (
                    <List.Item>
                        <div>
                            <strong>Комментарий:</strong> {ticket.comment || "Нет комментария"} |
                            <strong>Дата выдачи:</strong> {ticket.issue_date || "Не указана"} |
                            <strong>Дата возврата:</strong> {ticket.return_date || "Не указана"}
                        </div>
                        <div>
                            <Button type="link" onClick={() => handleDetailsClick(ticket.id)}>Подробнее</Button>
                            {/* Show "Закрыть" button only if return_date is null */}
                            {!ticket.return_date && (
                                <Button type="link" onClick={() => handleCloseClick(ticket.id)}>Закрыть</Button>
                            )}
                        </div>
                    </List.Item>
                )}
            />

            {/* Close Ticket Modal */}
            <CloseTicketModal
                visible={closeModalVisible}
                onClose={handleCloseModal}
                ticketId={selectedTicketId}
                onSubmit={handleSubmitCloseTicket}
            />

            {/* Inventory Details Modal */}
            <InventoryDetailsModal
                visible={detailsModalVisible}
                onClose={handleDetailsModalClose}
                ticketId={selectedTicketId}
            />
        </>
    );
};

export default TicketList;