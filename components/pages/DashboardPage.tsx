import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../ui/Card';
import MonthlySpendChart from '../charts/MonthlySpendChart';
import ProfitLossChart from '../charts/ProfitLossChart';
import { DollarSign, TrendingUp, ArrowLeftRight, CreditCard } from 'lucide-react';
import type { Transaction } from '../../types';

const AccountCard: React.FC<{ account: { name: string; type: string; balance: number } }> = ({ account }) => {
    const getIcon = () => {
        switch (account.type) {
            case 'Checking': return <ArrowLeftRight className="text-blue-400" />;
            case 'Savings': return <TrendingUp className="text-green-400" />;
            case 'Credit Card': return <CreditCard className="text-orange-400" />;
            default: return <DollarSign className="text-gray-400" />;
        }
    };

    return (
        <div className="flex items-center p-4 bg-gray-700/50 rounded-lg">
            <div className="p-3 rounded-full bg-gray-800 mr-4">{getIcon()}</div>
            <div>
                <p className="text-sm text-gray-400">{account.name}</p>
                <p className={`text-lg font-bold ${account.balance >= 0 ? 'text-white' : 'text-danger'}`}>
                    {account.balance.toLocaleString('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </p>
            </div>
        </div>
    );
};

const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0">
        <div>
            <p className="font-medium text-white">{transaction.description}</p>
            <p className="text-sm text-gray-400">{transaction.category}</p>
        </div>
        <p className={`font-semibold ${transaction.amount > 0 ? 'text-secondary' : 'text-gray-200'}`}>
            {transaction.amount > 0 ? '+' : ''}
            {transaction.amount.toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}
        </p>
    </div>
);

const DashboardPage: React.FC = () => {
    const { accounts, transactions } = useAppContext();
    const recentTransactions = transactions.slice(0, 5);

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {accounts.map(acc => <AccountCard key={acc.id} account={acc} />)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title="Monthly Spend by Category">
                    <MonthlySpendChart transactions={transactions} />
                </Card>
                <Card title="Income vs Expense (Last 6 Months)">
                    <ProfitLossChart transactions={transactions} />
                </Card>
            </div>

            <div className="grid grid-cols-1">
                <Card title="Recent Transactions">
                    <div className="space-y-2">
                        {recentTransactions.map(tx => <TransactionRow key={tx.id} transaction={tx} />)}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
