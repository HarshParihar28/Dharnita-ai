import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { Transaction } from '../../types';

interface ProfitLossChartProps {
    transactions: Transaction[];
}

const ProfitLossChart: React.FC<ProfitLossChartProps> = ({ transactions }) => {
    const processData = () => {
        const dataByMonth: { [key: string]: { income: number; expense: number } } = {};
        const today = new Date();
        
        for (let i = 5; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const monthKey = date.toLocaleString('default', { month: 'short', year: '2-digit' });
            dataByMonth[monthKey] = { income: 0, expense: 0 };
        }

        transactions.forEach(t => {
            const date = new Date(t.date);
            const monthKey = date.toLocaleString('default', { month: 'short', year: '2-digit' });
            if (dataByMonth[monthKey]) {
                if (t.amount > 0) {
                    dataByMonth[monthKey].income += t.amount;
                } else {
                    dataByMonth[monthKey].expense += Math.abs(t.amount);
                }
            }
        });

        return Object.keys(dataByMonth).map(key => ({
            name: key,
            income: dataByMonth[key].income,
            expense: dataByMonth[key].expense,
        }));
    };

    const chartData = processData();

    const formatCurrency = (value: number) =>
        value.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    ticks={[500, 1000, 1500, 2000, 3000, 5000]} // ✅ Fixed ticks
                    tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                        backgroundColor: '#1f2937',
                        borderColor: '#374151',
                    }}
                />
                <Area type="monotone" dataKey="income" stroke="#10b981" fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expense" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpense)" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default ProfitLossChart;
