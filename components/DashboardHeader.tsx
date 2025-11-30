import React from 'react';
import { LogOut, Menu, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface DashboardHeaderProps {
  user: User;
  onLogout: () => void;
  toggleSidebar: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user, onLogout, toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 fixed w-full z-20 top-0 left-0 lg:pl-64 transition-all duration-300">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-blue-600">
          <Menu size={24} />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 hidden sm:block">
          Tableau de bord - {user.factory || 'Global'}
        </h2>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
          <UserIcon size={16} />
          <span className="font-medium">{user.name}</span>
          <span className="text-xs uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded ml-1">
            {user.role}
          </span>
        </div>
        <button 
          onClick={onLogout}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          title="Se déconnecter"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;