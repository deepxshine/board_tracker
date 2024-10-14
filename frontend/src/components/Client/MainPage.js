import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Cookies from 'js-cookie'; // Import js-cookie
import Header from './Header';
import SearchBar from './SearchBar';
import ClientForm from './ClientForm';
import TicketForm from './TicketComponents/TicketForm'; // Import TicketForm
import axios from "axios";
import { Button } from 'antd';
import TicketList from "./TicketComponents/TicketList";

const MainPage = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isTicketModalVisible, setIsTicketModalVisible] = useState(false); // State for ticket modal
    const [tickets, setTickets] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [currentTicketId, setCurrentTicketId] = useState(null); // State to store current ticket ID

    const handleSearch = async (value) => {
        setSearchValue(value);
        await fetchTickets(value); // Call fetchTickets with the search value
    };

    const fetchTickets = async (phoneNumber) => {
        try {
            const response = await axios.get(`http://localhost:8080/ticket/`, {
                params: { phone_number: phoneNumber },
                headers: {
                    'Accept': 'application/json',
                },
                withCredentials: true,
            });
            setTickets(response.data);
        } catch (error) {
            console.error("Error fetching tickets:", error);
        }
    };

    const toggleTicketForm = (ticketId = null) => { // Allow passing a ticket ID to edit an existing ticket
        if (ticketId) {
            setCurrentTicketId(ticketId); // Set current ticket ID for editing
        } else {
            setCurrentTicketId(null); // Reset current ticket ID when closing form
        }

        setIsTicketModalVisible(!isTicketModalVisible);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Header />
            <SearchBar onSearch={handleSearch} />

            {/* Centering the button for creating a client */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button type="primary" onClick={() => setIsModalVisible(true)}>
                    Создать клиента
                </Button>
            </div>

            {/* Centering the button for creating a ticket */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button type="primary" onClick={() => toggleTicketForm()}>
                    Создать заявку
                </Button>
            </div>

            {/* Client Form Modal */}
            <ClientForm visible={isModalVisible} onClose={() => setIsModalVisible(false)} />

            {/* Ticket Form Modal */}
           <TicketForm
              visible={isTicketModalVisible}
              onClose={() => toggleTicketForm()}
              ticketId={currentTicketId} // Pass current ticket ID here
           />

           {tickets.length > 0 && (
               <TicketList
                   tickets={tickets}
                   onRefresh={() => fetchTickets(searchValue)} // Pass refresh function with current search value
                   onClose={(ticketId) => toggleTicketForm(ticketId)} // Pass ticket ID to open form for editing
               />
           )}
       </div>
   );
};

export default MainPage;