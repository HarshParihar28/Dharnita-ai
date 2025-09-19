
import type { Account, Transaction, Goal, Investment, Todo, Bill } from '../types';

export const MOCK_ACCOUNTS: Account[] = [
    { id: 'acc_1', name: 'Main Checking', type: 'Checking', balance: 15210.55, currency: 'INR' },
    { id: 'acc_2', name: 'High-Yield Savings', type: 'Savings', balance: 25400.00, currency: 'INR'},
    { id: 'acc_3', name: 'Travel Rewards Card', type: 'Credit Card', balance: -850.21, currency: 'INR' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 'txn_1', date: '2024-07-22', description: 'Salary Deposit', amount: 3500.00, category: 'Income', accountId: 'acc_1' },
    { id: 'txn_2', date: '2024-07-21', description: 'Grocery', amount: -124.50, category: 'Groceries', accountId: 'acc_3', billId: 'bill_1' },
    { id: 'txn_3', date: '2024-07-20', description: 'Electricity', amount: -75.00, category: 'Utilities', accountId: 'acc_1' },
    { id: 'txn_4', date: '2024-07-20', description: 'Petrol', amount: -45.30, category: 'Transport', accountId: 'acc_3' },
    { id: 'txn_5', date: '2024-07-19', description: 'Movie Tickets', amount: -32.00, category: 'Entertainment', accountId: 'acc_3' },
    { id: 'txn_6', date: '2024-07-18', description: 'Transfer to Savings', amount: -500.00, category: 'Other', accountId: 'acc_1' },
    { id: 'txn_7', date: '2024-07-15', description: 'Salary Deposit', amount: 3500.00, category: 'Income', accountId: 'acc_1' },
    { id: 'txn_8', date: '2024-06-28', description: 'Restaurant', amount: -88.75, category: 'Entertainment', accountId: 'acc_3'},
    { id: 'txn_9', date: '2024-06-25', description: 'Rent Payment', amount: -1800.00, category: 'Utilities', accountId: 'acc_1'},
    { id: 'txn_10', date: '2024-06-22', description: 'School fees', amount: -1000.00, category: 'Groceries', accountId: 'acc_3'},
];

export const MOCK_BILLS: Bill[] = [
    { id: 'bill_1', fileName: 'receipt_groceries.pdf', fileType: 'application/pdf', uploadDate: '2024-07-21', fileUrl: '#' }
];


export const MOCK_GOALS: Goal[] = [
    { id: 'goal_1', name: 'Trip to Kochi', targetAmount: 3000, currentAmount: 1000, deadline: '2026-05-01' },
    { id: 'goal_2', name: 'New Laptop', targetAmount: 2500, currentAmount: 2100, deadline: '2025-12-01' },
    { id: 'goal_3', name: 'New Headphones', targetAmount: 10000, currentAmount: 7500, deadline: '2025-10-01' },
    { id: 'goal_4', name: 'New car', targetAmount: 100000, currentAmount: 57000, deadline: '2026-12-01' },
];

export const MOCK_INVESTMENTS: Investment[] = [
    { id: 'inv_1', symbol: 'TCS', name: 'Tata', quantity: 10, avgPrice: 150.75, currentPrice: 3045.50 },
    { id: 'inv_2', symbol: 'infosys', name: 'infosys Inc.', quantity: 5, avgPrice: 200.00, currentPrice: 185.20 },
    { id: 'inv_3', symbol: 'VI', name: 'Vodafone idea', quantity: 20, avgPrice: 450.10, currentPrice: 502.80 },
];

export const MOCK_TODOS: Todo[] = [
    { id: 'todo_1', task: 'Save 2000 this month', completed: false, createdAt: '2025-09-22T10:00:00Z' },
    { id: 'todo_2', task: 'Review monthly budget', completed: false, createdAt: '2025-10-21T11:00:00Z' },
    { id: 'todo_3', task: 'Invest in TCS', completed: true, createdAt: '2024-07-20T12:00:00Z' },
];
