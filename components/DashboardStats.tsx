import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { User, UserRole, FactoryLocation } from '../types';
import { MOCK_PRODUCTION_DATA, MOCK_FINANCIALS, MOCK_STOCK } from '../constants';
import { TrendingUp, AlertTriangle, Package, DollarSign, FileText } from 'lucide-react';

interface DashboardStatsProps {
  user: User;
  activeTab: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DashboardStats: React.FC<DashboardStatsProps> = ({ user, activeTab }) => {
  
  // Filter data based on user role (Admin sees all, Gerant sees their factory)
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

  // Aggregate stats for "Vue d'ensemble"
  const totalProduction = filteredProduction.reduce((acc, curr) => acc + curr.quantityProduced, 0);
  const totalWaste = filteredProduction.reduce((acc, curr) => acc + curr.waste, 0);
  const totalRevenue = filteredFinancials.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalExpenses = filteredFinancials.reduce((acc, curr) => acc + curr.expenses, 0);

  // Render helpers
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Production Totale</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-2">{totalProduction.toLocaleString()}</h3>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <TrendingUp size={12} className="mr-1" /> +12% ce mois
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <Package size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Chiffre d'Affaires</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-2">{totalRevenue.toLocaleString()} FCFA</h3>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <TrendingUp size={12} className="mr-1" /> +8% vs N-1
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-green-600">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Pertes / Dégâts</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-2">{totalWaste.toLocaleString()}</h3>
              <p className="text-xs text-red-500 mt-1">
                 Attention requise
              </p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg text-red-600">
              <AlertTriangle size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Bénéfice Net</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-2">{(totalRevenue - totalExpenses).toLocaleString()} FCFA</h3>
              <p className="text-xs text-gray-400 mt-1">
                Marge calculée
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
              <DollarSign size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Production Récente</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredProduction.slice(-7)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickFormatter={(val) => val.split('-')[2]} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantityProduced" name="Sachets Produits" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Finances (Revenus vs Dépenses)</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredFinancials}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" name="Revenus" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="expenses" name="Dépenses" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Comparison for Admin */}
      {user.role === UserRole.ADMIN && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Comparatif Lomé vs Bassar (Revenue)</h4>
          <div className="h-80">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_FINANCIALS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" data={MOCK_FINANCIALS.filter(d => d.factory === FactoryLocation.LOME)} name="Lomé" fill="#3b82f6" />
                <Bar dataKey="revenue" data={MOCK_FINANCIALS.filter(d => d.factory === FactoryLocation.BASSAR)} name="Bassar" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );

  const renderStock = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">État des Stocks & Matériel</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          + Nouvelle Entrée
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4 font-medium">Article</th>
              <th className="p-4 font-medium">Usine</th>
              <th className="p-4 font-medium">Quantité</th>
              <th className="p-4 font-medium">Unité</th>
              <th className="p-4 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredStock.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-4 text-gray-800 font-medium">{item.name}</td>
                <td className="p-4 text-gray-600">{item.factory}</td>
                <td className="p-4 text-gray-800 font-bold">{item.quantity}</td>
                <td className="p-4 text-gray-500">{item.unit}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${item.status === 'ok' ? 'bg-green-100 text-green-700' : 
                      item.status === 'low' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'}`}>
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
    <div className="space-y-6">
       <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl flex items-center justify-between">
         <div>
           <h3 className="text-lg font-semibold text-blue-900">Génération de Rapports</h3>
           <p className="text-blue-700 mt-1">Téléchargez les rapports mensuels et les analyses de production en format PDF.</p>
         </div>
         <FileText size={48} className="text-blue-300" />
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Rapport de Production', 'Rapport Financier', 'Rapport des Ventes'].map((report, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="h-12 w-12 bg-red-50 rounded-lg flex items-center justify-center text-red-500 mb-4 group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                <FileText size={24} />
              </div>
              <h4 className="font-semibold text-gray-800">{report}</h4>
              <p className="text-sm text-gray-500 mt-2">Dernière mise à jour: Hier</p>
              <button className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800">Télécharger PDF &rarr;</button>
            </div>
          ))}
       </div>
    </div>
  );

  // Simple placeholder for other tabs
  const renderPlaceholder = (title: string) => (
    <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center">
      <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
        <Package size={32} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md mx-auto">
        Cette section permettrait la gestion détaillée de {title.toLowerCase()}. 
        Fonctionnalité complète à implémenter selon le cahier des charges.
      </p>
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