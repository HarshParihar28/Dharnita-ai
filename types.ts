
export interface Account {
    id: string;
    name: string;
    type: 'Checking' | 'Savings' | 'Credit Card';
    balance: number;
    currency: 'INR'; 
}

export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    category: 'Groceries' | 'Utilities' | 'Transport' | 'Entertainment' | 'Income' | 'Other';
    accountId: string;
    billId?: string;
    currency?: 'INR'; 
}

export interface Bill {
    id: string;
    fileName: string;
    fileType: string;
    uploadDate: string;
    fileUrl: string;
    currency?:'INR'; 
}

export interface Goal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
    currency?: 'INR'; 
}

export interface Investment {
    id: string;
    symbol: string;
    name: string;
    quantity: number;
    avgPrice: number;
    currentPrice: number;
}

export interface Todo {
    id: string;
    task: string;
    completed: boolean;
    createdAt: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    text: string;
}
