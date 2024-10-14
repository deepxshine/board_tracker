import React from 'react';
import { Table, Pagination, Button, Popconfirm } from 'antd';

const InventoryTable = ({ inventory, loading, error, totalCount, offset, limit, onChangePage, onEdit, onDelete }) => {
    return (
        <div>
            {loading ? (
                <p>Загрузка...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <Table
                        dataSource={inventory}
                        columns={[
                            { title: 'ID', dataIndex: 'id', key: 'id' },
                            { title: 'Название', dataIndex: 'title', key: 'title' },
                            {
                                title: 'Действия',
                                key: 'actions',
                                render: (_, record) => (
                                    <span>
                                        <Button onClick={() => onEdit(record)}>Изменить</Button>
                                        <Popconfirm
                                            title="Вы уверены, что хотите удалить этот элемент?"
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

export default InventoryTable;