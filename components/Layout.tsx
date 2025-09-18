
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, FileText, Target, Briefcase, ListTodo, BotMessageSquare } from 'lucide-react';

interface NavItemProps {
    to: string;
    icon: React.ReactNode;
    label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                isActive
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`
        }
    >
        {icon}
        <span className="ml-3">{label}</span>
    </NavLink>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navItems = [
        { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { to: '/transactions', icon: <ArrowLeftRight size={20} />, label: 'Transactions' },
        { to: '/bills', icon: <FileText size={20} />, label: 'Bills' },
        { to: '/goals', icon: <Target size={20} />, label: 'Goals' },
        { to: '/investments', icon: <Briefcase size={20} />, label: 'Investments' },
        { to: '/todo', icon: <ListTodo size={20} />, label: 'To-Do List' },
        { to: '/chat', icon: <BotMessageSquare size={20} />, label: 'AI Assistant' },
    ];

    return (
        <div className="flex h-screen bg-gray-900 text-gray-200">
            <aside className="w-64 flex-shrink-0 bg-gray-800 p-4 border-r border-gray-700 flex flex-col">
                <div className="flex items-center mb-8">
                    <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.25 15.5v-2.25H6.5v-1.5h4.25V9.5h1.5v2.25H16.5v1.5h-4.25V17.5h-1.5z" />
                    </svg>
                    <h1 className="text-xl font-bold ml-2 text-white">Dhanitra AI</h1>
                </div>
                <nav className="flex-1 space-y-2">
                    {navItems.map(item => <NavItem key={item.to} {...item} />)}
                </nav>
                <div className="mt-auto text-center text-xs text-gray-500">
                    <p>&copy; 2025 Dhanitra AI</p>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;
