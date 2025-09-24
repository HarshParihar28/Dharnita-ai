import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
    LayoutDashboard, 
    ArrowLeftRight, 
    FileText, 
    Target, 
    Briefcase, 
    ListTodo, 
    BotMessageSquare,
    Diamond
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

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
                isActive ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`
        }
    >
        {icon}
        <span className="ml-3">{label}</span>
    </NavLink>
);

const Layout: React.FC = () => {
    const { logout } = useAppContext();

    const navItems: NavItemProps[] = [
        { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { to: '/loan', icon: <Diamond size={20} />, label: 'Loan' },
        { to: '/transactions', icon: <ArrowLeftRight size={20} />, label: 'Transactions' },
        { to: '/bills', icon: <FileText size={20} />, label: 'Bills' },
        { to: '/goals', icon: <Target size={20} />, label: 'Goals' },
        { to: '/investments', icon: <Briefcase size={20} />, label: 'Investments' },
        { to: '/todo', icon: <ListTodo size={20} />, label: 'To-Do List' },
        { to: '/chat', icon: <BotMessageSquare size={20} />, label: 'AI Assistant' },
        { to: '/metals', icon: <Diamond size={20} />, label: 'Jewel' },
        
    ];

    return (
        <div className="flex h-screen bg-gray-900 text-gray-200">
            <aside className="w-64 flex-shrink-0 bg-gray-800 p-4 border-r border-gray-700 flex flex-col">
                <div className="flex items-center mb-8">
                    <h1 className="text-xl font-bold ml-2 text-white">Dhanitra AI</h1>
                </div>
                <nav className="flex-1 space-y-2">
                    {navItems.map(item => (
                        <NavItem key={item.to} to={item.to} icon={item.icon} label={item.label} />
                    ))}
                </nav>
                <div className="mt-auto text-center text-xs text-white-500">
                    <p>Welcome to Dhanitra @2025</p>
                    <button
                        onClick={logout}
                        className="mt-2 px-3 py-1 bg-blue-500 rounded hover:bg-blue-700"
                    >
                        Logout
                    </button>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
