import React, { useState } from 'react';
import { Table, Pagination, Button } from 'antd';
import TicketDetailsModal from './TicketDetailsModal'; // Import the new modal component

const TicketTable = ({ tickets, loading, error, totalCount, offset, limit, onChangePage }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null);

    const handleDetailsClick = (ticketId) => {
        setSelectedTicketId(ticketId);
        setIsModalVisible(true);
    };

    return (
        <div>
            {loading ? (
                <p>Загрузка...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <Table
                        dataSource={tickets}
                        columns={[
                            { title: 'ID', dataIndex: 'id', key: 'id' },
                            { title: 'Комментарий', dataIndex: 'comment', key: 'comment' },
                            { title: 'ID Клиента', dataIndex: 'client_id', key: 'client_id' },
                            { title: 'Дата выдачи', dataIndex: 'issue_date', key: 'issue_date' },
                            { title: 'Дата возврата', dataIndex: 'return_date', key: 'return_date' },
                            {
                                title: 'Детали',
                                key: 'details',
                                render: (_, record) => (
                                    <Button onClick={() => handleDetailsClick(record.id)}>Детали</Button>
                                ),
                            },
                        ]}
                        rowKey="id"
                        pagination={false}
                    />
                    <Pagination
                        current={offset / limit + 1}
                        pageSize={limit}
                        total={totalCount}
                        onChange={(page) => onChangePage((page - 1) * limit)}
                        style={{ marginTop: 20 }}
                    />

                    {/* Ticket Details Modal */}
                    <TicketDetailsModal
                        visible={isModalVisible}
                        onClose={() => setIsModalVisible(false)}
                        ticketId={selectedTicketId}
                    />
                </>
            )}
        </div>
    );
};

export default TicketTable;