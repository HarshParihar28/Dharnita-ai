import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppContextProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import TransactionsPage from './components/pages/TransactionsPage';
import GoalsPage from './components/pages/GoalsPage';
import InvestmentsPage from './components/pages/InvestmentsPage';
import TodoPage from './components/pages/TodoPage';
import ChatPage from './components/pages/ChatPage';
import BillsPage from './components/pages/BillsPage';
import MetalsPage from './components/pages/MetalsPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAppContext();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => (
    <AppContextProvider>
        <HashRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="transactions" element={<TransactionsPage />} />
                    <Route path="goals" element={<GoalsPage />} />
                    <Route path="investments" element={<InvestmentsPage />} />
                    <Route path="todo" element={<TodoPage />} />
                    <Route path="chat" element={<ChatPage />} />
                    <Route path="bills" element={<BillsPage />} />
                    <Route path="metals" element={<MetalsPage />} />
                    <Route path="" element={<Navigate to="dashboard" replace />} />
                </Route>

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </HashRouter>
    </AppContextProvider>
);

export default App;
