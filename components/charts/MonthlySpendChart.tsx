
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import type { Transaction } from '../../types';

interface MonthlySpendChartProps {
    transactions: Transaction[];
}

const MonthlySpendChart: React.FC<MonthlySpendChartProps> = ({ transactions }) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlySpending = transactions
        .filter(t => {
            const date = new Date(t.date);
            return t.amount < 0 && date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        })
        .reduce((acc, t) => {
            const category = t.category;
            if (!acc[category]) {
                acc[category] = 0;
            }
            acc[category] += Math.abs(t.amount);
            return acc;
        }, {} as { [key: string]: number });

    const chartData = Object.entries(monthlySpending).map(([name, value]) => ({
        name,
        spend: value,
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#1f2937',
                        borderColor: '#374151',
                        color: '#e5e7eb',
                    }}
                    cursor={{ fill: '#374151' }}
                />
                <Legend wrapperStyle={{fontSize: "14px"}}/>
                <Bar dataKey="spend" fill="#3b82f6" name="Spend" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MonthlySpendChart;
