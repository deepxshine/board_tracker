import React from 'react';
import { Input, Button } from 'antd';

const InventorySearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
    const handleSearch = () => {
        if (searchTerm) {
            onSearch(searchTerm);
        }
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <Input
                placeholder="Введите название для поиска"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '400px', marginRight: '10px' }}
            />
            <Button type="primary" onClick={handleSearch}>
                Поиск
            </Button>
        </div>
    );
};

export default InventorySearchBar;