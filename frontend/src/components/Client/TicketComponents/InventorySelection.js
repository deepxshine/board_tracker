// src/components/MainPageComponents/TicketComponents/InventorySelection.js
import React from 'react';
import { List, Button } from 'antd';

const InventorySelection = ({ inventory, selectedInventory, onSelectInventory, onSaveInventory }) => {
    return (
        <>
            <h3>Выберите инвентарь:</h3>
            <List
                bordered
                dataSource={inventory}
                renderItem={item => (
                    <List.Item>
                        <input
                            type="checkbox"
                            checked={selectedInventory.includes(item.id)}
                            onChange={() => onSelectInventory(item.id)}
                        />
                        {item.title}
                    </List.Item>
                )}
            />

            {/* Save Inventory Button */}
            <Button type="primary" onClick={onSaveInventory} style={{ marginTop: '20px', width: '100%' }}>
                Сохранить инвентарь
            </Button>
        </>
    );
};

export default InventorySelection;