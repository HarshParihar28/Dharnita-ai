
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Trash2, Plus } from 'lucide-react';

const TodoPage: React.FC = () => {
    const { todos, addTodo, toggleTodo, deleteTodo } = useAppContext();
    const [newTask, setNewTask] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTask.trim()) {
            addTodo(newTask.trim());
            setNewTask('');
        }
    };

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">To-Do List</h2>
            
            <Card>
                <form onSubmit={handleSubmit} className="flex space-x-4">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new financial task..."
                        className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-primary focus:border-primary"
                    />
                    <Button type="submit">
                        <Plus size={18} className="mr-2"/> Add Task
                    </Button>
                </form>
            </Card>

            <Card>
                <ul className="space-y-3">
                    {todos.map(todo => (
                        <li 
                            key={todo.id} 
                            className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"
                        >
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id)}
                                    className="h-5 w-5 rounded bg-gray-600 border-gray-500 text-primary focus:ring-primary"
                                />
                                <span className={`ml-4 text-white ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                                    {todo.task}
                                </span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => deleteTodo(todo.id)}>
                                <Trash2 size={16} className="text-gray-400 hover:text-danger"/>
                            </Button>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
};

export default TodoPage;
