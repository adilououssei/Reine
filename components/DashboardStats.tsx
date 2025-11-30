import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line
} from 'recharts';
import { User, UserRole, FactoryLocation } from '../types';
import { MOCK_PRODUCTION_DATA, MOCK_FINANCIALS, MOCK_STOCK } from '../constants';
import { TrendingUp, AlertTriangle, Package, DollarSign, FileText } from 'lucide-react';

interface DashboardStatsProps {
  user: User;
  activeTab: string;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ user, activeTab }) => {
  
  // Filter data based on user role
  const filteredProduction = useMemo(() => {
    return user.role === UserRole.ADMIN 
      ? MOCK_PRODUCTION_DATA 
      : MOCK_PRODUCTION_DATA.filter(d => d.factory === user.factory);
  }, [user]);

  const filteredFinancials = useMemo(() => {
    return user.role === UserRole.ADMIN
      ? MOCK_FINANCIALS
      : MOCK_FINANCIALS.filter(d => d.factory === user.factory);
  }, [user]);

  const filteredStock = useMemo(() => {
    return user.role === UserRole.ADMIN
      ? MOCK_STOCK
      : MOCK_STOCK.filter(d => d.factory === user.factory);
  }, [user]);

  // Prepare comparison data for Admin view
  const comparisonData = useMemo(() => {
    if (user.role !== UserRole.ADMIN) return [];
    
    const dataMap = new Map<string, { month: string, lome: number, bassar: number }>();
    
    MOCK_FINANCIALS.forEach(item => {
      if (!dataMap.has(item.month)) {
        dataMap.set(item.month, { month: item.month, lome: 0, bassar: 0 });
      }
      const entry = dataMap.get(item.month)!;
      if (item.factory === FactoryLocation.LOME) {
        entry.lome = item.revenue;
      } else if (item.factory === FactoryLocation.BASSAR) {
        entry.bassar = item.revenue;
      }
    });
    
    return Array.from(dataMap.values());
  }, [user]);

  // Aggregate stats
  const totalProduction = filteredProduction.reduce((acc, curr) => acc + curr.quantityProduced, 0);
  const totalWaste = filteredProduction.reduce((acc, curr) => acc + curr.waste, 0);
  const totalRevenue = filteredFinancials.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalExpenses = filteredFinancials.reduce((acc, curr) => acc + curr.expenses, 0);

  // Render helpers
  const renderOverview = () => (
    <div className="container-fluid p-0">
      {/* Key Metrics Cards */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-secondary small fw-bold mb-1">Production Totale</p>
                  <h3 className="fw-bold text-dark mb-1">{totalProduction.toLocaleString()}</h3>
                  <p className="small text-success mb-0 d-flex align-items-center">
                    <TrendingUp size={12} className="me-1" /> +12% ce mois
                  </p>
                </div>
                <div className="p-3 bg-primary bg-opacity-10 rounded text-primary">
                  <Package size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-secondary small fw-bold mb-1">Chiffre d'Affaires</p>
                  <h3 className="fw-bold text-dark mb-1">{totalRevenue.toLocaleString()} FCFA</h3>
                  <p className="small text-success mb-0 d-flex align-items-center">
                    <TrendingUp size={12} className="me-1" /> +8% vs N-1
                  </p>
                </div>
                <div className="p-3 bg-success bg-opacity-10 rounded text-success">
                  <DollarSign size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-secondary small fw-bold mb-1">Pertes / Dégâts</p>
                  <h3 className="fw-bold text-dark mb-1">{totalWaste.toLocaleString()}</h3>
                  <p className="small text-danger mb-0">
                     Attention requise
                  </p>
                </div>
                <div className="p-3 bg-danger bg-opacity-10 rounded text-danger">
                  <AlertTriangle size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-secondary small fw-bold mb-1">Bénéfice Net</p>
                  <h3 className="fw-bold text-dark mb-1">{(totalRevenue - totalExpenses).toLocaleString()} FCFA</h3>
                  <p className="small text-muted mb-0">
                    Marge calculée
                  </p>
                </div>
                <div className="p-3 bg-warning bg-opacity-10 rounded text-warning">
                  <DollarSign size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold text-dark mb-4">Production Récente</h5>
              <div style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredProduction.slice(-7)}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tickFormatter={(val) => val.split('-')[2]} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="quantityProduced" name="Sachets Produits" fill="#0d6efd" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-bold text-dark mb-4">Finances (Revenus vs Dépenses)</h5>
              <div style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredFinancials}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" name="Revenus" stroke="#198754" strokeWidth={2} />
                    <Line type="monotone" dataKey="expenses" name="Dépenses" stroke="#dc3545" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison for Admin */}
      {user.role === UserRole.ADMIN && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <h5 className="card-title fw-bold text-dark mb-4">Comparatif Lomé vs Bassar (Revenus)</h5>
            <div style={{ height: '320px' }}>
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="lome" name="Lomé" fill="#0d6efd" />
                <Bar dataKey="bassar" name="Bassar" fill="#ffc107" />
              </BarChart>
            </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderStock = () => (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white border-bottom border-light py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold text-dark">État des Stocks & Matériel</h5>
        <button className="btn btn-primary btn-sm">
          + Nouvelle Entrée
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light text-secondary">
            <tr>
              <th className="py-3 ps-4">Article</th>
              <th className="py-3">Usine</th>
              <th className="py-3">Quantité</th>
              <th className="py-3">Unité</th>
              <th className="py-3 pe-4">Statut</th>
            </tr>
          </thead>
          <tbody>
            {filteredStock.map((item) => (
              <tr key={item.id}>
                <td className="ps-4 fw-medium text-dark">{item.name}</td>
                <td className="text-muted">{item.factory}</td>
                <td className="fw-bold">{item.quantity}</td>
                <td className="text-muted">{item.unit}</td>
                <td className="pe-4">
                  <span className={`badge rounded-pill
                    ${item.status === 'ok' ? 'bg-success bg-opacity-10 text-success' : 
                      item.status === 'low' ? 'bg-warning bg-opacity-10 text-warning' : 
                      'bg-danger bg-opacity-10 text-danger'}`}>
                    {item.status === 'ok' ? 'Normal' : item.status === 'low' ? 'Bas' : 'Critique'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="container-fluid p-0">
       <div className="alert alert-primary d-flex align-items-center border-0 bg-primary bg-opacity-10 text-primary p-4 rounded-3 mb-4">
         <div className="flex-grow-1">
           <h4 className="alert-heading fw-bold">Génération de Rapports</h4>
           <p className="mb-0">Téléchargez les rapports mensuels et les analyses de production en format PDF.</p>
         </div>
         <FileText size={48} className="text-primary opacity-50 ms-3" />
       </div>

       <div className="row g-4">
          {['Rapport de Production', 'Rapport Financier', 'Rapport des Ventes'].map((report, idx) => (
            <div key={idx} className="col-12 col-md-4">
              <div className="card border-0 shadow-sm hover-shadow h-100">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center justify-content-center bg-danger bg-opacity-10 text-danger rounded-3" style={{ width: '48px', height: '48px' }}>
                    <FileText size={24} />
                  </div>
                  <h5 className="fw-bold mt-3 mb-2 text-dark">{report}</h5>
                  <p className="text-muted small mb-4">Dernière mise à jour: Hier</p>
                  <button className="btn btn-link text-decoration-none p-0 fw-bold">Télécharger PDF &rarr;</button>
                </div>
              </div>
            </div>
          ))}
       </div>
    </div>
  );

  const renderPlaceholder = (title: string) => (
    <div className="card border-0 shadow-sm py-5">
      <div className="card-body text-center">
        <div className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle mb-3" style={{ width: '80px', height: '80px' }}>
          <Package size={32} className="text-secondary opacity-50" />
        </div>
        <h3 className="fw-bold text-dark mb-2">{title}</h3>
        <p className="text-muted mx-auto" style={{ maxWidth: '400px' }}>
          Cette section permettrait la gestion détaillée de {title.toLowerCase()}. 
          Fonctionnalité complète à implémenter selon le cahier des charges.
        </p>
      </div>
    </div>
  );

  switch (activeTab) {
    case 'dashboard': return renderOverview();
    case 'stock': return renderStock();
    case 'production': return renderPlaceholder('Gestion de la Production');
    case 'sales': return renderPlaceholder('Ventes et Distribution');
    case 'finance': return renderPlaceholder('Gestion Financière');
    case 'reports': return renderReports();
    default: return renderOverview();
  }
};

export default DashboardStats;