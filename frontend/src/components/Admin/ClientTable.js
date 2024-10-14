import React from 'react';
import {Table, Pagination, Button, Popconfirm, Modal} from 'antd';
import EditClientForm from './EditClientForm'; // Import the EditClientForm component

let click_count_surname = 0;
let click_count_name = 0;

const ClientTable = ({clients, loading, error, totalCount, offset, limit, onDelete, onChangePage}) => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [editingClientId, setEditingClientId] = React.useState(null);

    const showEditModal = (clientId) => {
        setEditingClientId(clientId);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setEditingClientId(null);
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
                        dataSource={clients}
                        columns={[
                            {
                                title: 'Имя',
                                dataIndex: 'name',
                                key: 'name',
                                onHeaderCell: () => ({
                                    onClick: () => {

                                        click_count_name += 1;
                                        if (click_count_name >= 2) {
                                            click_count_name = 0
                                        }
                                        onChangePage(0, 'name', click_count_name)
                                    },  // Reset to first page and pass sort key.
                                }),
                            },
                            {
                                title: 'Фамилия',
                                dataIndex: 'surname',
                                key: 'surname',
                                onHeaderCell: () => ({
                                    onClick: () => {
                                        click_count_surname += 1;
                                        if (click_count_surname >= 2) {
                                            click_count_surname = 0
                                        }


                                        onChangePage(0, 'surname', click_count_surname)
                                    },  // Reset to first page and pass sort key.
                                }),
                            },
                            {
                                title: 'Телефон',
                                dataIndex: 'phone_number',
                                key: 'phone_number',
                            },
                            {
                                title: 'Действия',
                                key: 'actions',
                                render: (_, record) => (
                                    <span>
                                        <Button
                                            type="link"
                                            onClick={() => showEditModal(record.id)}
                                        >
                                            Изменить
                                        </Button>
                                        <Popconfirm
                                            title="Вы уверены, что хотите удалить этого клиента?"
                                            onConfirm={() => onDelete(record.id)}
                                            okText="Да"
                                            cancelText="Нет"
                                        >
                                            <Button type="link" style={{color: 'red'}}>
                                                Удалить
                                            </Button>
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
                        total={totalCount} // Use the actual total count from the API
                        onChange={(page) => onChangePage((page - 1) * limit)} // Calculate new offset based on page number.
                        style={{marginTop: 20}}
                    />

                    {/* Modal for editing client */}
                    <Modal
                        title="Изменить клиента"
                        visible={isModalVisible}
                        footer={null}
                        onCancel={handleCloseModal}
                    >
                        {editingClientId && (
                            <EditClientForm
                                clientId={editingClientId}
                                onClose={handleCloseModal}
                                onRefresh={() => window.location.reload()} // Refresh page or refetch clients
                            />
                        )}
                    </Modal>
                </>
            )}
        </div>
    );
};

export default ClientTable;