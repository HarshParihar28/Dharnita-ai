import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../ui/Card';
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown } from 'lucide-react';

const InvestmentsPage: React.FC = () => {
    const { investments } = useAppContext();

    const totalValue = investments.reduce((acc, inv) => acc + (inv.quantity * inv.currentPrice), 0);
    const totalCost = investments.reduce((acc, inv) => acc + (inv.quantity * inv.avgPrice), 0);
    const totalGainLoss = totalValue - totalCost;
    const totalGainLossPercent = (totalGainLoss / totalCost) * 100;
    const isGain = totalGainLoss >= 0;

    // helper to format as INR
    const formatINR = (value: number) =>
        value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 });

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Investment Portfolio</h2>

            <Card>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-sm text-gray-400">Total Value</p>
                        <p className="text-2xl font-bold text-white">{formatINR(totalValue)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Total Cost</p>
                        <p className="text-2xl font-bold text-white">{formatINR(totalCost)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Total Gain/Loss</p>
                        <p className={`text-2xl font-bold flex items-center justify-center ${isGain ? 'text-secondary' : 'text-danger'}`}>
                            {isGain ? <TrendingUp size={24} className="mr-2"/> : <TrendingDown size={24} className="mr-2"/>}
                            {formatINR(totalGainLoss)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Total Return %</p>
                        <p className={`text-2xl font-bold ${isGain ? 'text-secondary' : 'text-danger'}`}>
                            {totalGainLossPercent.toFixed(2)}%
                        </p>
                    </div>
                </div>
            </Card>

            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-gray-700">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-gray-400">Symbol</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Quantity</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Avg Price</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Current Price</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Market Value</th>
                                <th className="p-4 text-sm font-semibold text-gray-400 text-right">Gain/Loss</th>
                            </tr>
                        </thead>
                        <tbody>
                            {investments.map((inv) => {
                                const marketValue = inv.quantity * inv.currentPrice;
                                const gainLoss = marketValue - (inv.quantity * inv.avgPrice);
                                const isInvGain = gainLoss >= 0;
                                return (
                                    <tr key={inv.id} className="border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50">
                                        <td className="p-4">
                                            <div className="font-bold text-white">{inv.symbol}</div>
                                            <div className="text-xs text-gray-400">{inv.name}</div>
                                        </td>
                                        <td className="p-4 text-gray-300">{inv.quantity}</td>
                                        <td className="p-4 text-gray-300">{formatINR(inv.avgPrice)}</td>
                                        <td className="p-4 text-gray-300">{formatINR(inv.currentPrice)}</td>
                                        <td className="p-4 font-semibold text-white">{formatINR(marketValue)}</td>
                                        <td className={`p-4 font-semibold text-right ${isInvGain ? 'text-secondary' : 'text-danger'}`}>
                                            <div className="flex items-center justify-end">
                                                {isInvGain ? <ArrowUp size={16} className="mr-1"/> : <ArrowDown size={16} className="mr-1"/>}
                                                {formatINR(gainLoss)}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default InvestmentsPage;
