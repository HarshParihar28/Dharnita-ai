import React, { useEffect, useState } from 'react';
import Card from '../ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Metal {
  id: string;
  name: string;
  pricePerGram: number;
  changePercent: number;
}

// Single Metal card component
const MetalCard: React.FC<{ metal: Metal }> = ({ metal }) => {
  const isPositive = metal.changePercent >= 0;

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-bold text-white">{metal.name}</h4>
          <p className="text-sm text-gray-400">
            ₹{metal.pricePerGram.toLocaleString('en-IN', { maximumFractionDigits: 2 })} / gram
          </p>
        </div>
        {isPositive ? (
          <TrendingUp className="text-green-500" />
        ) : (
          <TrendingDown className="text-red-500" />
        )}
      </div>
      <p className={`mt-3 font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? '+' : ''}{metal.changePercent.toFixed(2)}% today
      </p>
    </Card>
  );
};

// Main Metals page
const MetalsPage: React.FC = () => {
  const [metals, setMetals] = useState<Metal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock metals data
    const mockMetals: Metal[] = [
      { id: 'gold', name: 'Gold', pricePerGram: 5400, changePercent: 0.5 },
      { id: 'silver', name: 'Silver', pricePerGram: 68, changePercent: -0.3 },
      { id: 'platinum', name: 'Platinum', pricePerGram: 2650, changePercent: 1.2 },
      { id: 'palladium', name: 'Palladium', pricePerGram: 3500, changePercent: -0.8 },
    ];

    setMetals(mockMetals);
    setLoading(false);
  }, []);

  if (loading) return <p className="text-white">Loading metal prices...</p>;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">Metal Prices</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metals.map((metal) => (
          <MetalCard key={metal.id} metal={metal} />
        ))}
      </div>
    </div>
  );
};

export default MetalsPage;
