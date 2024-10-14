// src/components/UserTable.js
import React from 'react';
import { Table, Pagination, Button, Popconfirm } from 'antd';

const UserTable = ({ users, loading, error, totalCount, offset, limit, onChangePage, onEdit, onDelete }) => {
    return (
        <div>
            {loading ? (
                <p>Загрузка...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <Table
                        dataSource={users}
                        columns={[
                            { title: 'ID', dataIndex: 'id', key: 'id' },
                            { title: 'Email', dataIndex: 'email', key: 'email' },
                            { title: 'Полное имя', dataIndex: 'fullname', key: 'fullname' },
                            { title: 'Активен', dataIndex: 'is_active', key: 'is_active', render: (text) => text ? "Да" : "Нет" },
                            { title: 'Суперпользователь', dataIndex: 'is_superuser', key: 'is_superuser', render: (text) => text ? "Да" : "Нет" },
                            { title: 'Подтвержден', dataIndex: 'is_verified', key: 'is_verified', render: (text) => text ? "Да" : "Нет" },
                            {
                                title: 'Действия',
                                key: 'actions',
                                render: (_, record) => (
                                    <span>
                                        <Button onClick={() => onEdit(record)}>Изменить</Button>
                                        <Popconfirm
                                            title="Вы уверены, что хотите удалить этого пользователя?"
                                            onConfirm={() => onDelete(record.id)}
                                            okText="Да"
                                            cancelText="Нет"
                                        >
                                            <Button type="link" style={{ color: 'red' }}>Удалить</Button>
                                        </Popconfirm>
                                    </span>
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
                </>
            )}
        </div>
    );
};

export default UserTable;