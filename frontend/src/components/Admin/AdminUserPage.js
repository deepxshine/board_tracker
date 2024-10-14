import React, {useState, useEffect} from 'react';
import axios from 'axios';
import UserTable from './UserTable';
import SearchBar from './SearchBar';
import CreateUserForm from './CreateUserForm';
import EditUserForm from './EditUserForm';
import {Button} from 'antd';
import AdminHeader from "./AdminHeader";

const AdminUserPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 20;
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async (offset, query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8080/admin/user/${query || ''}`, {
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
                setUsers(response.data);
            } else {
                setError('Полученные данные не являются массивом');
            }
        } catch (err) {
            console.error('Ошибка при загрузке пользователей', err);
            setError('Ошибка при загрузке пользователей');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserCount = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/admin/user/count`, {
                headers: {
                    'Accept': 'application/json',
                },
                withCredentials: true,
            });
            setTotalCount(response.data);
        } catch (err) {
            console.error('Ошибка при загрузке общего количества пользователей', err);
        }
    };

    useEffect(() => {
        fetchUserCount();
        fetchUsers(offset, searchTerm);
    }, [offset, searchTerm]);

    const handleChangePage = (newOffset) => {
        setOffset(newOffset);
        fetchUsers(newOffset, searchTerm);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/admin/user/${id}/`, {
                headers: {
                    'Accept': 'application/json',
                },
                withCredentials: true,
            });
            fetchUsers(offset, searchTerm); // Refresh users after deletion
        } catch (error) {
            console.error("Ошибка при удалении пользователя:", error);
        }
    };

    const handleEdit = (item) => {
        setCurrentItem(item); // Set the current item to be edited
        setIsEditModalVisible(true); // Show edit modal
    };

    return (
        <div>
            <AdminHeader/>
            <div style={{marginTop: '20px', marginLeft: '20px', marginRight: '20px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>

                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onSearch={(term) => {
                            setSearchTerm(term);
                            fetchUsers(offset, term);
                        }}
                    />
                    <Button
                        type="primary"
                        onClick={() => setIsCreateModalVisible(true)}
                        style={{marginBottom: '20px'}}
                    >
                        Создать пользователя
                    </Button>
                </div>
                <UserTable
                    users={users}
                    loading={loading}
                    error={error}
                    totalCount={totalCount}
                    offset={offset}
                    limit={limit}
                    onChangePage={handleChangePage}
                    onEdit={handleEdit} // Pass edit handler
                    onDelete={handleDelete} // Pass delete handler
                />

                {/* Modal for creating new user */}
                <CreateUserForm
                    visible={isCreateModalVisible}
                    onClose={() => setIsCreateModalVisible(false)}
                    onUserCreated={() => fetchUsers(offset, searchTerm)} // Refresh users after creation
                />

                {/* Modal for editing user */}
                <EditUserForm
                    visible={isEditModalVisible}
                    item={currentItem} // Pass current item to edit
                    onClose={() => setIsEditModalVisible(false)}
                    onRefresh={() => fetchUsers(offset, searchTerm)} // Refresh after edit
                />
            </div>
        </div>
    );
};

export default AdminUserPage;