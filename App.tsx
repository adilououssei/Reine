import React, { useState } from 'react';
import { User, UserRole, FactoryLocation } from './types';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import DashboardStats from './components/DashboardStats';
import { Droplets, ArrowRight, ShieldCheck, UserCheck, Factory } from 'lucide-react';

// --- Landing Page Component ---

const LandingPage: React.FC<{ onLoginClick: () => void }> = ({ onLoginClick }) => {
  return (
    <div className="min-vh-100 bg-white">
      {/* Navigation */}
      <nav className="navbar navbar-light bg-white py-3">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center gap-2" href="#">
            <Droplets className="text-primary" size={32} />
            <span className="fw-bold text-dark h4 mb-0">EAU LA REINE</span>
          </a>
          <button 
            onClick={onLoginClick}
            className="btn btn-primary d-flex align-items-center gap-2 fw-medium shadow-sm"
          >
            <UserCheck size={18} />
            Accès Personnel
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="py-5 bg-light text-center">
        <div className="container py-5">
          <h1 className="display-4 fw-bold text-dark mb-4">
            La Pureté de l'Eau,<br/>
            <span className="text-primary">L'Excellence de la Production</span>
          </h1>
          <p className="lead text-secondary mb-5 mx-auto" style={{ maxWidth: '700px' }}>
            Leader dans la production et la distribution d'eau en sachet au Togo.
            Nos usines à Lomé et Bassar assurent une qualité irréprochable au quotidien.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button onClick={onLoginClick} className="btn btn-dark btn-lg px-4 fw-semibold">
              Accéder au Portail de Gestion
            </button>
            <button className="btn btn-outline-secondary btn-lg px-4 fw-semibold">
              En savoir plus
            </button>
          </div>
        </div>
      </header>

      {/* Factories Showcase */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark">Nos Sites de Production</h2>
            <p className="text-muted">Une présence stratégique pour servir nos clients</p>
          </div>

          <div className="row g-4 justify-content-center">
            {/* LOME */}
            <div className="col-md-6 col-lg-5">
              <div className="card h-100 border-0 shadow hover-shadow overflow-hidden rounded-4">
                <div className="card-img-top d-flex align-items-center justify-content-center bg-primary bg-gradient text-white" style={{ height: '200px' }}>
                   <Factory size={64} className="opacity-75" />
                </div>
                <div className="card-body p-4">
                  <h3 className="h4 fw-bold text-dark mb-2">Usine de Lomé</h3>
                  <p className="text-secondary mb-4">
                    Notre siège principal assurant la plus grande capacité de production pour la capitale et ses environs.
                  </p>
                  <div className="vstack gap-2">
                    <div className="d-flex align-items-center small text-muted">
                      <span className="bg-success rounded-circle me-2" style={{ width: '10px', height: '10px' }}></span>
                      Production: Active
                    </div>
                    <div className="d-flex align-items-center small text-muted">
                      <span className="bg-primary rounded-circle me-2" style={{ width: '10px', height: '10px' }}></span>
                      Distribution: Grand Lomé
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BASSAR */}
            <div className="col-md-6 col-lg-5">
              <div className="card h-100 border-0 shadow hover-shadow overflow-hidden rounded-4">
                <div className="card-img-top d-flex align-items-center justify-content-center bg-info bg-gradient text-white" style={{ height: '200px' }}>
                   <Factory size={64} className="opacity-75" />
                </div>
                <div className="card-body p-4">
                  <h3 className="h4 fw-bold text-dark mb-2">Usine de Bassar</h3>
                  <p className="text-secondary mb-4">
                    Site stratégique desservant la région nord, équipé de technologies modernes de filtration.
                  </p>
                  <div className="vstack gap-2">
                    <div className="d-flex align-items-center small text-muted">
                      <span className="bg-success rounded-circle me-2" style={{ width: '10px', height: '10px' }}></span>
                      Production: Active
                    </div>
                    <div className="d-flex align-items-center small text-muted">
                      <span className="bg-info rounded-circle me-2" style={{ width: '10px', height: '10px' }}></span>
                      Distribution: Région Centrale & Nord
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white-50 py-4 text-center">
        <div className="container">
          <p className="mb-0 small">© 2024 Eau La Reine. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

// --- Login Page Component ---

const LoginPage: React.FC<{ onLogin: (role: UserRole, factory?: FactoryLocation) => void, onBack: () => void }> = ({ onLogin, onBack }) => {
  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-3">
      <div className="card border-0 shadow-lg w-100 rounded-4" style={{ maxWidth: '450px' }}>
        <div className="card-body p-5 position-relative">
          <button onClick={onBack} className="btn btn-link text-decoration-none text-secondary position-absolute top-0 start-0 m-3 p-0">
            &larr; Retour
          </button>
          
          <div className="text-center mb-5 mt-2">
            <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle mb-3" style={{ width: '64px', height: '64px' }}>
              <ShieldCheck className="text-primary" size={32} />
            </div>
            <h2 className="h4 fw-bold text-dark">Connexion Sécurisée</h2>
            <p className="text-muted small">Veuillez sélectionner votre profil</p>
          </div>

          <div className="d-grid gap-3">
            <button 
              onClick={() => onLogin(UserRole.ADMIN)}
              className="btn btn-dark py-3 px-4 d-flex align-items-center justify-content-between rounded-3 group-hover"
            >
              <div className="d-flex align-items-center gap-3 text-start">
                <div className="bg-secondary bg-opacity-25 p-2 rounded">
                  <UserCheck size={20} />
                </div>
                <div>
                  <div className="fw-bold">Propriétaire / Admin</div>
                  <div className="small text-white-50" style={{ fontSize: '0.75rem' }}>Accès Global (Lomé & Bassar)</div>
                </div>
              </div>
              <ArrowRight size={20} className="text-secondary" />
            </button>

            <div className="position-relative my-2 text-center">
              <hr className="text-secondary opacity-25" />
              <span className="position-absolute top-50 start-50 translate-middle bg-white px-2 text-muted small">
                Ou Gérants d'Usine
              </span>
            </div>

            <button 
              onClick={() => onLogin(UserRole.GERANT, FactoryLocation.LOME)}
              className="btn btn-outline-primary py-3 px-4 d-flex align-items-center justify-content-between rounded-3 bg-white text-dark border-primary-subtle hover-shadow"
            >
              <div className="d-flex align-items-center gap-3 text-start">
                <div className="bg-primary bg-opacity-10 text-primary p-2 rounded">
                  <Factory size={20} />
                </div>
                <div>
                  <div className="fw-bold">Gérant Lomé</div>
                  <div className="small text-muted" style={{ fontSize: '0.75rem' }}>Gestion Usine Lomé</div>
                </div>
              </div>
              <ArrowRight size={20} className="text-muted" />
            </button>

            <button 
              onClick={() => onLogin(UserRole.GERANT, FactoryLocation.BASSAR)}
              className="btn btn-outline-info py-3 px-4 d-flex align-items-center justify-content-between rounded-3 bg-white text-dark border-info-subtle hover-shadow"
            >
              <div className="d-flex align-items-center gap-3 text-start">
                <div className="bg-info bg-opacity-10 text-info p-2 rounded">
                  <Factory size={20} />
                </div>
                <div>
                  <div className="fw-bold">Gérant Bassar</div>
                  <div className="small text-muted" style={{ fontSize: '0.75rem' }}>Gestion Usine Bassar</div>
                </div>
              </div>
              <ArrowRight size={20} className="text-muted" />
            </button>
          </div>
          
          <div className="mt-4 text-center text-muted small" style={{ fontSize: '0.75rem' }}>
            Système sécurisé v1.0.0
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

enum AppState {
  LANDING,
  LOGIN,
  DASHBOARD
}

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (role: UserRole, factory?: FactoryLocation) => {
    // Mock user creation based on selection
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: role === UserRole.ADMIN ? 'M. Le Propriétaire' : `Gérant ${factory}`,
      role: role,
      factory: factory
    };
    setCurrentUser(user);
    setAppState(AppState.DASHBOARD);
    setActiveTab('dashboard'); // Reset tab on login
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAppState(AppState.LANDING);
    setSidebarOpen(false);
  };

  return (
    <>
      {appState === AppState.LANDING && (
        <LandingPage onLoginClick={() => setAppState(AppState.LOGIN)} />
      )}

      {appState === AppState.LOGIN && (
        <LoginPage 
          onLogin={handleLogin} 
          onBack={() => setAppState(AppState.LANDING)}
        />
      )}

      {appState === AppState.DASHBOARD && currentUser && (
        <div className="min-vh-100 bg-light">
          <Sidebar 
            user={currentUser} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          
          <DashboardHeader 
            user={currentUser} 
            onLogout={handleLogout} 
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />

          <main className="main-content pt-5 mt-3 transition-all">
            <div className="p-4">
              <DashboardStats user={currentUser} activeTab={activeTab} />
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default App;