// src/components/MainPageComponents/SearchBar.js
import React from 'react';
import { Input, Button } from 'antd';

const SearchBar = ({ onSearch }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
            <Input.Search
                placeholder="Поиск клиента"
                style={{ marginBottom: '20px', width: 400 }}
                onSearch={onSearch}
                enterButton="Поиск"
            />
        </div>
    );
};

export default SearchBar;