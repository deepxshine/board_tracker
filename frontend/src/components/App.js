import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Auth from './Auth/Auth';
import MainPage from './Client/MainPage';
import AdminClientsPage from "./Admin/AdminClientsPage";
import AdminTicketsPage from "./Admin/AdminTicketsPage";
import AdminInventoryPage from "./Admin/AdminInventoryPage";
import AdminUserPage from "./Admin/AdminUserPage";

const App = () => {
    return (
        <Routes>
            <Route path="/auth" element={<Auth/>}/>
            <Route path="/main" element={<MainPage/>}/>
            <Route path="/admin/clients" element={<AdminClientsPage/>}/>
            <Route path="/admin/tickets" element={<AdminTicketsPage/>}/>
            <Route path="/admin/inventory" element={<AdminInventoryPage/>}/>
            <Route path="/admin/user" element={<AdminUserPage/>}/>


            <Route path="/" element={<Navigate to="/auth"/>}/>
            <Route path="/admin" element={<Navigate to="/admin/clients"/>}/>
            <Route path="*" element={<Navigate to="/auth"/>}/>

        </Routes>
    );
};

export default App;