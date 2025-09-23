import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../ui/Card';
import { Target, Plus } from 'lucide-react';
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
                <Target className="text-primary" />
            </div>
            <div className="mt-4">
                <div className="flex justify-between text-sm font-medium text-gray-300 mb-1">
                    <span>
                        {goal.currentAmount.toLocaleString('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                        })}
                    </span>
                    <span className="text-gray-400">
                        {goal.targetAmount.toLocaleString('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                        })}
                    </span>
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
    const { goals, addGoal } = useAppContext();
    const [newGoal, setNewGoal] = useState({ name: '', targetAmount: 0, deadline: '' });

    const handleAddGoal = () => {
        if (!newGoal.name || newGoal.targetAmount <= 0 || !newGoal.deadline) return;

        addGoal({
            name: newGoal.name,
            targetAmount: newGoal.targetAmount,
            currentAmount: 0,
            deadline: newGoal.deadline,
        });

        setNewGoal({ name: '', targetAmount: 0, deadline: '' });
    };

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Savings Goals</h2>

            {/* Add New Goal Form */}
            <Card>
                <h3 className="text-xl font-semibold text-white mb-4">Add New Goal</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="flex flex-col">
                        <label className="text-gray-400 text-sm mb-1">Goal Name</label>
                        <input
                            className="p-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
                            placeholder="Trip to Kochi"
                            value={newGoal.name}
                            onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-400 text-sm mb-1">Target Amount</label>
                        <input
                            type="number"
                            className="p-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
                            placeholder="50000"
                            value={newGoal.targetAmount}
                            onChange={(e) => setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-400 text-sm mb-1">Deadline</label>
                        <input
                            type="date"
                            className="p-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-green-500"
                            value={newGoal.deadline}
                            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                        />
                    </div>
                    <button
                        onClick={handleAddGoal}
                        className="flex items-center justify-center gap-2 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <Plus size={16} /> Add Goal
                    </button>
                </div>
            </Card>

            {/* Goals List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map((goal) => (
                    <GoalCard key={goal.id} goal={goal} />
                ))}
            </div>
        </div>
    );
};

export default GoalsPage;
