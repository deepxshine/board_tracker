
import React, {useState, useEffect} from 'react';
import AdminHeader from './AdminHeader';
import axios from 'axios';
import InventoryTable from './InventoryTable';

import CreateInventoryForm from './CreateInventoryForm';
import EditInventoryForm from './EditInventoryForm';
import {Button} from 'antd';
import InventorySearchBar from "./InventorySearchBar";

const AdminInventoryPage = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 20;
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchInventoryItems = async (offset, query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8080/admin/inventory/${query || ''}`, {
                params: {
                    offset,
                    limit,
                },
                headers: {
                    'Accept': 'application/json',
                },
                withCredentials: true,
            });

            if (Array.isArray(response.data)) {
                setInventory(response.data);
            } else {
                setError('Полученные данные не являются массивом');
            }
        } catch (err) {
            console.error('Ошибка при загрузке инвентаря', err);
            setError('Ошибка при загрузке инвентаря');
        } finally {
            setLoading(false);
        }
    };

    const fetchInventoryCount = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/admin/inventory/count`, {
                headers: {
                    'Accept': 'application/json',
                },
                withCredentials: true,
            });
            setTotalCount(response.data);
        } catch (err) {
            console.error('Ошибка при загрузке общего количества инвентаря', err);
        }
    };

    useEffect(() => {
        fetchInventoryCount();
        fetchInventoryItems(offset, searchTerm); // Pass search term to fetch function
    }, [offset, searchTerm]); // Add searchTerm as a dependency

    const handleChangePage = (newOffset) => {
        setOffset(newOffset);
        fetchInventoryItems(newOffset, searchTerm);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/admin/inventory/${id}/`, {
                headers: {
                    'Accept': 'application/json',
                },
                withCredentials: true,
            });
            fetchInventoryItems(offset, searchTerm);
        } catch (error) {
            console.error("Ошибка при удалении элемента:", error);
        }
    };

    const handleEdit = (item) => {
        setCurrentItem(item);
        setIsEditModalVisible(true);
    };

    return (
        <div>
            <AdminHeader/>
            <div style={{marginTop: '20px', marginLeft: '20px', marginRight: '20px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>


                    <InventorySearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onSearch={(term) => {
                            setSearchTerm(term);
                            fetchInventoryItems(offset, term);
                        }}
                    />
                    <Button
                        type="primary"
                        onClick={() => setIsCreateModalVisible(true)}
                        style={{marginBottom: '20px'}}
                    >
                        Создать инвентарь
                    </Button>
                </div>
                <InventoryTable
                    inventory={inventory}
                    loading={loading}
                    error={error}
                    totalCount={totalCount}
                    offset={offset}
                    limit={limit}
                    onChangePage={handleChangePage}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                <CreateInventoryForm
                    visible={isCreateModalVisible}
                    onClose={() => setIsCreateModalVisible(false)}
                />

                <EditInventoryForm
                    visible={isEditModalVisible}
                    item={currentItem}
                    onClose={() => setIsEditModalVisible(false)}
                    onRefresh={() => fetchInventoryItems(offset, searchTerm)}
                />
            </div>
        </div>
    );
};

export default AdminInventoryPage;