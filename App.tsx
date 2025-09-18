
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import Layout from './components/Layout';
import DashboardPage from './components/pages/DashboardPage';
import TransactionsPage from './components/pages/TransactionsPage';
import GoalsPage from './components/pages/GoalsPage';
import InvestmentsPage from './components/pages/InvestmentsPage';
import TodoPage from './components/pages/TodoPage';
import ChatPage from './components/pages/ChatPage';
import BillsPage from './components/pages/BillsPage';

const App: React.FC = () => {
    return (
        <AppContextProvider>
            <HashRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/transactions" element={<TransactionsPage />} />
                        <Route path="/bills" element={<BillsPage />} />
                        <Route path="/goals" element={<GoalsPage />} />
                        <Route path="/investments" element={<InvestmentsPage />} />
                        <Route path="/todo" element={<TodoPage />} />
                        <Route path="/chat" element={<ChatPage />} />
                    </Routes>
                </Layout>
            </HashRouter>
        </AppContextProvider>
    );
};

export default App;