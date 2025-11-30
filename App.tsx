import React, { useState } from 'react';
import { User, UserRole, FactoryLocation } from './types';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import DashboardStats from './components/DashboardStats';
import { Droplets, ArrowRight, ShieldCheck, UserCheck, Factory } from 'lucide-react';

// --- Components defined locally to avoid too many files for this demo, 
// usually would be in views/LandingPage.tsx and views/LoginPage.tsx ---

const LandingPage: React.FC<{ onLoginClick: () => void }> = ({ onLoginClick }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Droplets className="text-blue-600 h-8 w-8" />
          <span className="text-xl font-bold text-gray-900 tracking-tight">EAU LA REINE</span>
        </div>
        <button 
          onClick={onLoginClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <UserCheck size={18} />
          Accès Personnel
        </button>
      </nav>

      {/* Hero */}
      <header className="container mx-auto px-6 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
          La Pureté de l'Eau,<br/>
          <span className="text-blue-600">L'Excellence de la Production</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Leader dans la production et la distribution d'eau en sachet au Togo.
          Nos usines à Lomé et Bassar assurent une qualité irréprochable au quotidien.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button onClick={onLoginClick} className="bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
            Accéder au Portail de Gestion
          </button>
          <button className="bg-white text-slate-700 border border-slate-200 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            En savoir plus
          </button>
        </div>
      </header>

      {/* Factories Showcase */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Nos Sites de Production</h2>
            <p className="text-gray-600 mt-2">Une présence stratégique pour servir nos clients</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* LOME */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                 <Factory className="text-white opacity-90 w-20 h-20" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Usine de Lomé</h3>
                <p className="text-gray-500 mb-6">
                  Notre siège principal assurant la plus grande capacité de production pour la capitale et ses environs.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                    Production: Active
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                    Distribution: Grand Lomé
                  </div>
                </div>
              </div>
            </div>

            {/* BASSAR */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all">
              <div className="h-48 bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center">
                 <Factory className="text-white opacity-90 w-20 h-20" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Usine de Bassar</h3>
                <p className="text-gray-500 mb-6">
                  Site stratégique desservant la région nord, équipé de technologies modernes de filtration.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                    Production: Active
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="w-4 h-4 bg-teal-500 rounded-full mr-2"></span>
                    Distribution: Région Centrale & Nord
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center">
        <p>© 2024 Eau La Reine. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

const LoginPage: React.FC<{ onLogin: (role: UserRole, factory?: FactoryLocation) => void, onBack: () => void }> = ({ onLogin, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button onClick={onBack} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600">
          &larr; Retour
        </button>
        
        <div className="text-center mb-10 mt-4">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="text-blue-600 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Connexion Sécurisée</h2>
          <p className="text-gray-500 mt-2">Veuillez sélectionner votre profil</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => onLogin(UserRole.ADMIN)}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="bg-slate-700 p-2 rounded-lg group-hover:bg-slate-600">
                <UserCheck size={20} />
              </div>
              <div className="text-left">
                <div className="font-bold">Propriétaire / Admin</div>
                <div className="text-xs text-slate-300">Accès Global (Lomé & Bassar)</div>
              </div>
            </div>
            <ArrowRight size={20} className="text-slate-500 group-hover:text-white transition-colors" />
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou Gérants d'Usine</span>
            </div>
          </div>

          <button 
            onClick={() => onLogin(UserRole.GERANT, FactoryLocation.LOME)}
            className="w-full bg-white border-2 border-blue-100 hover:border-blue-500 hover:bg-blue-50 text-slate-700 p-4 rounded-xl flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                <Factory size={20} />
              </div>
              <div className="text-left">
                <div className="font-bold">Gérant Lomé</div>
                <div className="text-xs text-gray-500">Gestion Usine Lomé</div>
              </div>
            </div>
            <ArrowRight size={20} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
          </button>

          <button 
            onClick={() => onLogin(UserRole.GERANT, FactoryLocation.BASSAR)}
            className="w-full bg-white border-2 border-teal-100 hover:border-teal-500 hover:bg-teal-50 text-slate-700 p-4 rounded-xl flex items-center justify-between group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="bg-teal-100 text-teal-600 p-2 rounded-lg">
                <Factory size={20} />
              </div>
              <div className="text-left">
                <div className="font-bold">Gérant Bassar</div>
                <div className="text-xs text-gray-500">Gestion Usine Bassar</div>
              </div>
            </div>
            <ArrowRight size={20} className="text-gray-300 group-hover:text-teal-500 transition-colors" />
          </button>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-400">
          Système sécurisé v1.0.0
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
        <div className="min-h-screen bg-gray-50">
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

          <main className="pt-20 lg:pl-64 min-h-screen transition-all duration-300">
            <div className="p-6">
              <DashboardStats user={currentUser} activeTab={activeTab} />
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default App;