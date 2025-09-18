
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../ui/Card';
import { Target } from 'lucide-react';
import type { Goal } from '../../types';

const GoalCard: React.FC<{ goal: Goal }> = ({ goal }) => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;

    return (
        <Card>
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="text-lg font-bold text-white">{goal.name}</h4>
                    <p className="text-sm text-gray-400">Deadline: {goal.deadline}</p>
                </div>
                <Target className="text-primary"/>
            </div>
            <div className="mt-4">
                <div className="flex justify-between text-sm font-medium text-gray-300 mb-1">
                    <span>${goal.currentAmount.toLocaleString()}</span>
                    <span className="text-gray-400">${goal.targetAmount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="text-right text-xs text-gray-400 mt-1">{progress.toFixed(1)}% complete</p>
            </div>
        </Card>
    );
};

const GoalsPage: React.FC = () => {
    const { goals } = useAppContext();

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Savings Goals</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map(goal => <GoalCard key={goal.id} goal={goal} />)}
            </div>
        </div>
    );
};

export default GoalsPage;
