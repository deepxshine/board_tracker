// src/components/MainPageComponents/TicketForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, notification, Form } from 'antd';
import TicketCreationForm from './TicketComponents/TicketCreationForm';
import InventorySelection from './TicketComponents/InventorySelection';
import ErrorModal from './TicketComponents/ErrorModal';

const TicketForm = ({ visible, onClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [inventory, setInventory] = useState([]); // State for inventory items
    const [selectedInventory, setSelectedInventory] = useState([]); // State for selected inventory items
    const [isTicketCreated, setIsTicketCreated] = useState(false); // State to track if ticket is created
    const [errorModalVisible, setErrorModalVisible] = useState(false); // State for error modal visibility
    const [createdTicketId, setCreatedTicketId] = useState(null); // State to store the created ticket ID

    useEffect(() => {
        if (visible) {
            fetchInventory(); // Fetch inventory when modal is visible
            resetState(); // Reset state when modal opens
        }
    }, [visible]);

    const fetchInventory = async () => {
        try {
            const response = await axios.get('http://localhost:8080/inventory/', {
                headers: {
                    'Accept': 'application/json',
                },
                withCredentials: true,
            });
            setInventory(response.data);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        }
    };

    const resetState = () => {
        form.resetFields();
        setSelectedInventory([]);
        setIsTicketCreated(false);
        setErrorModalVisible(false);
        setCreatedTicketId(null); // Reset created ticket ID
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const comment = values.comment || " ";

            const clientResponse = await axios.get(`http://localhost:8080/client/`, {
                params: { phone_number: values.phone },
                headers: {
                    'Accept': 'application/json',
                },
                withCredentials: true,
            });

            const clientId = clientResponse.data.id;

            // Create the ticket and get the response
            const ticketResponse = await axios.post('http://localhost:8080/ticket/', {
                comment,
                client_id: clientId,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            console.log("Ticket created:", ticketResponse.data);
            form.resetFields();
            setIsTicketCreated(true);
            setCreatedTicketId(ticketResponse.data.id); // Store the created ticket ID

            notification.success({
                message: 'Успех',
                description: 'Тикет успешно создан!',
                placement: 'bottomRight',
                duration: 2,
            });

        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrorModalVisible(true);
            } else {
                console.error("Error creating ticket:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSelectInventory = (itemId) => {
        if (selectedInventory.includes(itemId)) {
            setSelectedInventory(selectedInventory.filter(id => id !== itemId));
        } else {
            setSelectedInventory([...selectedInventory, itemId]);
        }
    };

    const handleSaveInventory = async () => {
        try {
            for (const inventoryId of selectedInventory) {
                await axios.post(`http://localhost:8080/ticket/${createdTicketId}/inventory`, null, {
                    params: { inventory_id: inventoryId },
                    headers: {
                        'Accept': 'application/json',
                    },
                    withCredentials: true,
                });
            }

            notification.success({
                message: 'Успех',
                description: 'Инвентарь успешно добавлен!',
                placement: 'bottomRight',
                duration: 2,
            });

            resetState(); // Reset state after saving inventory and close modal
            onClose();
        } catch (error) {
            console.error("Error saving inventory:", error);
        }
    };

    return (
        <>
            <Modal
                title={isTicketCreated ? "Добавление инвентаря" : "Создать заявку"}
                visible={visible}
                onCancel={onClose}
                footer={null}
            >
                {!isTicketCreated ? (
                    <TicketCreationForm form={form} loading={loading} onFinish={handleSubmit} />
                ) : (
                    <InventorySelection
                        inventory={inventory}
                        selectedInventory={selectedInventory}
                        onSelectInventory={handleSelectInventory}
                        onSaveInventory={handleSaveInventory}
                    />
                )}
            </Modal>

             {/* Error Modal for Client Not Found */}
             <ErrorModal
                 visible={errorModalVisible}
                 onClose={() => setErrorModalVisible(false)}
             />
        </>
    );
};

export default TicketForm;