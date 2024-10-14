import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import axios from 'axios';
import TicketTable from './TicketTable';
import SearchBar from './SearchBar';

const AdminTicketsPage = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 20;
    const [sortBy, setSortBy] = useState('');
    const [orderBy, setOrderBy] = useState('asc');
    const [searchPhone, setSearchPhone] = useState('');

    const fetchTickets = async (offset) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8080/admin/ticket/`, {
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
                setTickets(response.data);
            } else {
                setError('Полученные данные не являются массивом');
            }
        } catch (err) {
            console.error('Ошибка при загрузке тикетов', err);
            setError('Ошибка при загрузке тикетов');
        } finally {
            setLoading(false);
        }
    };

    const fetchTicketCount = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/admin/ticket/count`, {
                headers: {
                    'Accept': 'application/json',
                },
                withCredentials: true,
            });
            setTotalCount(response.data);
        } catch (err) {
            console.error('Ошибка при загрузке общего количества тикетов', err);
        }
    };

    const searchTicketByPhone = async () => {
        if (!searchPhone) return;

        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8080/admin/ticket/${searchPhone}`, {
                headers: {
                    'Accept': 'application/json',
                },
                withCredentials: true,
            });

            if (Array.isArray(response.data)) {
                setTickets(response.data);
                setTotalCount(response.data.length);
            } else {
                setError('Тикеты не найдены');
            }
        } catch (err) {
            console.error('Ошибка при поиске тикетов', err);
            setError('Ошибка при поиске тикетов');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTicketCount();
        fetchTickets(offset);
    }, [offset]);

    const handleSortChange = (newOffset, sortKey, count) => {
        if (count % 2 === 0) {
            setOrderBy('desc');
        } else {
            setOrderBy('asc');
        }

        setSortBy(sortKey);

        fetchTickets(newOffset);
        setOffset(newOffset);
    };

    return (
        <div>
            <AdminHeader />
            <div style={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}>
                <SearchBar
                    searchPhone={searchPhone}
                    setSearchPhone={setSearchPhone}
                    onSearch={searchTicketByPhone}
                />
                <TicketTable
                    tickets={tickets}
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

export default AdminTicketsPage;