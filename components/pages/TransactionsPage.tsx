import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import type { Transaction } from '../../types';

const TransactionsPage: React.FC = () => {
    const { transactions, accounts, addTransaction } = useAppContext();
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState<Transaction['category']>('Other');
    const [accountId, setAccountId] = useState(accounts[0]?.id || '');

    const suggestions = ["Salary", "Coffee shop", "Groceries", "Rent", "Internet Bill", "Shopping", "Transport", "Electricity bill", "Institution fees", "additioal spent", "Bills", "Cloths", "Stocks", ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !amount || !accountId) return;

        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount)) return;

        addTransaction({
            description,
            amount: parsedAmount,
            category,
            accountId,
        });

        setDescription('');
        setAmount('');
    };

    const getAccountName = (id: string) => accounts.find(a => a.id === id)?.name || 'Unknown Account';

    const filteredSuggestions = suggestions.filter(s =>
        s.toLowerCase().startsWith(description.toLowerCase()) && description.length > 0
    );

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Transactions</h2>
            
            <Card title="Add New Transaction">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div className="md:col-span-2 relative">
                        <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-primary focus:border-primary"
                            placeholder="e.g., Coffee shop"
                        />
                        {filteredSuggestions.length > 0 && (
                            <ul className="absolute left-0 right-0 bg-gray-800 border border-gray-600 rounded-md mt-1 z-10">
                                {filteredSuggestions.map((s, i) => (
                                    <li
                                        key={i}
                                        onClick={() => setDescription(s)}
                                        className="px-3 py-2 cursor-pointer hover:bg-gray-700 text-gray-200"
                                    >
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Amount</label>
                        <input
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-primary focus:border-primary"
                            placeholder="00.00"
                        />
                    </div>

                    <div>
                         <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                         <select 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value as Transaction['category'])} 
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-primary focus:border-primary"
                        >
                            <option>Groceries</option>
                            <option>Utilities</option>
                            <option>Transport</option>
                            <option>Entertainment</option>
                            <option>Income</option>
                            <option>Other</option>
                         </select>
                    </div>

                    <Button type="submit" className="w-full h-10">Add Transaction</Button>
                </form>
            </Card>

            <Card title="Transaction History">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-gray-700">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-gray-400">Date</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Description</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Category</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Account</th>
                                <th className="p-4 text-sm font-semibold text-gray-400 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50">
                                    <td className="p-4 whitespace-nowrap text-gray-300">{tx.date}</td>
                                    <td className="p-4 font-medium text-white">{tx.description}</td>
                                    <td className="p-4 text-gray-300">{tx.category}</td>
                                    <td className="p-4 text-gray-300">{getAccountName(tx.accountId)}</td>
                                    <td className={`p-4 font-semibold text-right ${tx.amount > 0 ? 'text-secondary' : 'text-gray-200'}`}>
                                        {tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default TransactionsPage;
