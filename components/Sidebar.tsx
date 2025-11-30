import React from 'react';
import { LayoutDashboard, Factory, Package, DollarSign, Users, FileText, Droplets } from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
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
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50 d-lg-none"
          style={{ zIndex: 1035 }}
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        sidebar position-fixed top-0 start-0 h-100 d-flex flex-column
        ${isOpen ? 'show' : ''}
      `}>
        <div className="d-flex align-items-center px-4 py-3 border-bottom border-secondary" style={{ height: '64px' }}>
          <Droplets className="text-primary me-2" size={24} />
          <h5 className="mb-0 fw-bold tracking-wide text-white">EAU LA REINE</h5>
        </div>

        <div className="p-3 flex-grow-1 overflow-auto">
          <div className="text-uppercase text-white-50 small fw-bold mb-3 px-2">Menu Principal</div>
          <nav className="nav flex-column gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 992) onClose();
                }}
                className={`
                  nav-link d-flex align-items-center gap-3 px-3 py-2 rounded border-0 w-100 text-start
                  ${activeTab === item.id ? 'active' : ''}
                `}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-3 border-top border-secondary mt-auto">
          <div className="bg-dark bg-opacity-25 p-3 rounded small text-white-50">
            <p className="fw-bold text-white mb-1">Support Technique</p>
            <p className="mb-0">support@eaulareine.com</p>
            <p className="mb-0">+228 00 00 00 00</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;