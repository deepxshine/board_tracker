import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader'; // Import the AdminHeader
import axios from 'axios'; // Import axios for making HTTP requests
import ClientTable from './ClientTable'; // Import the ClientTable component
import SearchBar from './SearchBar'; // Import the SearchBar component
import { Input, Button } from 'antd'; // Import Input and Button from Ant Design

const AdminClientsPage = () => {
    const [clients, setClients] = useState([]); // State for clients data
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const [offset, setOffset] = useState(0); // State for pagination offset
    const [totalCount, setTotalCount] = useState(0); // Total count of clients
    const limit = 20; // Fixed limit for pagination
    const [sortBy, setSortBy] = useState(''); // State for sorting field
    const [orderBy, setOrderBy] = useState('asc'); // State for sorting order
    const [searchPhone, setSearchPhone] = useState(''); // State for search input

    const fetchClients = async (offset) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8080/admin/client/`, {
                params: {
                    offset,
                    limit,
                    sort_by: sortBy || undefined,
                    order_by: orderBy || undefined,
                },
                headers: {
                    'Accept': 'application/json',
                },
                withCredentials: true,
            });

            if (Array.isArray(response.data)) {
                setClients(response.data);
            } else {
                setError('Полученные данные не являются массивом');
            }
        } catch (err) {
            console.error('Ошибка при загрузке клиентов', err);
            setError('Ошибка при загрузке клиентов');
        } finally {
            setLoading(false);
        }
    };

    const fetchClientCount = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/admin/client/count`, {
                headers: {
                    'Accept': 'application/json',
                },
                withCredentials: true,
            });
            setTotalCount(response.data);
        } catch (err) {
            console.error('Ошибка при загрузке общего количества клиентов', err);
        }
    };

    const searchClientByPhone = async () => {
        if (!searchPhone) return;

        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8080/admin/client/${searchPhone}/`, {
                headers: {
                    'Accept': 'application/json',
                },
                withCredentials: true,
            });

            if (Array.isArray(response.data)) {
                setClients(response.data);
                setTotalCount(response.data.length);
            } else {
                setError('Клиент не найден');
            }
        } catch (err) {
            console.error('Ошибка при поиске клиента', err);
            setError('Ошибка при поиске клиента');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClientCount();
        fetchClients(offset);
    }, [offset]);

    const handleSortChange = (newOffset, sortKey, count) => {
        if (count % 2 === 0) {
            setOrderBy('desc');
        } else {
            setOrderBy('asc');
        }

        setSortBy(sortKey);
        fetchClients(newOffset);
        setOffset(newOffset);
    };

    return (
        <div>
            <AdminHeader />
            <div style={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}>
                <SearchBar
                    searchPhone={searchPhone}
                    setSearchPhone={setSearchPhone}
                    onSearch={searchClientByPhone}
                />
                <ClientTable
                    clients={clients}
                    loading={loading}
                    error={error}
                    totalCount={totalCount}
                    offset={offset}
                    limit={limit}
                    onChangePage={(newOffset, sortKey, count) => handleSortChange(newOffset, sortKey, count)}
                />
            </div>
        </div>
    );
};

export default AdminClientsPage;