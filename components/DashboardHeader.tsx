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
    <header className="navbar navbar-expand bg-white shadow-sm fixed-top px-3 px-lg-4 header-navbar" style={{ transition: 'padding-left 0.3s' }}>
      <div className="container-fluid p-0">
        <div className="d-flex align-items-center w-100 justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <button onClick={toggleSidebar} className="btn btn-link text-secondary d-lg-none p-0 border-0">
              <Menu size={24} />
            </button>
            <h5 className="mb-0 text-dark fw-bold d-none d-sm-block">
              Tableau de bord - {user.factory || 'Global'}
            </h5>
          </div>
          
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center bg-light px-3 py-1 rounded-pill border">
              <UserIcon size={16} className="text-secondary me-2" />
              <span className="fw-medium small text-dark">{user.name}</span>
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle ms-2">{user.role}</span>
            </div>
            <button 
              onClick={onLogout}
              className="btn btn-outline-danger btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center"
              title="Se déconnecter"
              style={{ width: '36px', height: '36px' }}
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;