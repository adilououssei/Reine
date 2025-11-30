import React from 'react';
import { LayoutDashboard, Factory, Package, DollarSign, Users, FileText, Droplets } from 'lucide-react';
import { User, UserRole } from '../types';

interface SidebarProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, activeTab, setActiveTab, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Vue d\'ensemble', icon: LayoutDashboard },
    { id: 'production', label: 'Production', icon: Factory },
    { id: 'stock', label: 'Stocks & Matériel', icon: Package },
    { id: 'sales', label: 'Ventes & Distribution', icon: Users },
    { id: 'finance', label: 'Finances', icon: DollarSign },
    { id: 'reports', label: 'Rapports PDF', icon: FileText },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-30 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-slate-700">
          <Droplets className="text-blue-400 mr-2" size={24} />
          <h1 className="text-lg font-bold tracking-wide">EAU LA REINE</h1>
        </div>

        <div className="p-4">
          <div className="text-xs uppercase text-slate-400 font-semibold mb-4 px-2">Menu Principal</div>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-sm font-medium
                  ${activeTab === item.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
                `}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-lg p-3 text-xs text-slate-400">
            <p className="font-semibold text-slate-200">Support Technique</p>
            <p className="mt-1">support@eaulareine.com</p>
            <p>+228 00 00 00 00</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;