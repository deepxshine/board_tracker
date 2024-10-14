import React from 'react';
import { Input, Button } from 'antd';

const TicketSearchBar = ({ searchPhone, setSearchPhone, onSearch }) => {
    return (
        <div style={{ marginBottom: '15px' }}>
            <Input
                placeholder="Введите номер телефона"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                style={{ width: '400px', marginRight: '10px' }}
            />
            <Button type="primary" onClick={onSearch}>Поиск</Button>
        </div>
    );
};

export default TicketSearchBar;