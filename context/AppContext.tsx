import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { Account, Transaction, Goal, Investment, Todo, Bill } from '../types';
import { MOCK_ACCOUNTS, MOCK_TRANSACTIONS, MOCK_GOALS, MOCK_INVESTMENTS, MOCK_TODOS, MOCK_BILLS } from '../data/mockData';

interface AppContextType {
    accounts: Account[];
    transactions: Transaction[];
    goals: Goal[];
    investments: Investment[];
    todos: Todo[];
    bills: Bill[];
    isAuthenticated: boolean;
    userName: string | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
    addGoal: (goal: Omit<Goal, 'id' | 'currentAmount'>) => void;
    addTodo: (task: string) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    addBill: (bill: Omit<Bill, 'id' | 'uploadDate'>) => void;
    linkBillToTransaction: (transactionId: string, billId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [accounts, setAccounts] = useState<Account[]>(MOCK_ACCOUNTS);
    const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
    const [goals, setGoals] = useState<Goal[]>(MOCK_GOALS);
    const [investments, setInvestments] = useState<Investment[]>(MOCK_INVESTMENTS);
    const [todos, setTodos] = useState<Todo[]>(MOCK_TODOS);
    const [bills, setBills] = useState<Bill[]>(MOCK_BILLS);

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const login = (email: string, password: string): boolean => {
        if (email === 'admin@gmail.com' && password === '1234') {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);

    };

    const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
        const newTransaction: Transaction = {
            ...transaction,
            id: `txn_${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
        };
        setTransactions(prev => [newTransaction, ...prev]);
        setAccounts(prev =>
            prev.map(acc =>
                acc.id === newTransaction.accountId
                    ? { ...acc, balance: acc.balance + newTransaction.amount }
                    : acc
            )
        );
    };

    const addGoal = (goal: Omit<Goal, 'id' | 'currentAmount'>) => {
        const newGoal: Goal = {
            ...goal,
            id: `goal_${Date.now()}`,
            currentAmount: 0,
        };
        setGoals(prev => [...prev, newGoal]);
    };

    const addTodo = (task: string) => {
        const newTodo: Todo = {
            id: `todo_${Date.now()}`,
            task,
            completed: false,
            createdAt: new Date().toISOString(),
        };
        setTodos(prev => [newTodo, ...prev]);
    };

    const toggleTodo = (id: string) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const addBill = (bill: Omit<Bill, 'id' | 'uploadDate'>) => {
        const newBill: Bill = {
            ...bill,
            id: `bill_${Date.now()}`,
            uploadDate: new Date().toISOString().split('T')[0],
        };
        setBills(prev => [newBill, ...prev]);
    };

    const linkBillToTransaction = (transactionId: string, billId: string) => {
        setTransactions(prev =>
            prev.map(t => (t.id === transactionId ? { ...t, billId } : t))
        );
    };

    const value = {
        accounts,
        transactions,
        goals,
        investments,
        todos,
        bills,
        isAuthenticated,
        login,
        logout,
        addTransaction,
        addGoal,
        addTodo,
        toggleTodo,
        deleteTodo,
        addBill,
        linkBillToTransaction,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useAppContext must be used within an AppContextProvider');
    return context;
};
