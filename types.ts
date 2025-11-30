export enum UserRole {
  ADMIN = 'ADMIN', // Propriétaire
  GERANT = 'GERANT', // Gérant d'usine
  VISITEUR = 'VISITEUR'
}

export enum FactoryLocation {
  LOME = 'Lomé',
  BASSAR = 'Bassar',
  ALL = 'Global'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  factory?: FactoryLocation; // Admin has access to all, Gerant specific to one
}

export interface ProductionStat {
  date: string;
  factory: FactoryLocation;
  quantityProduced: number; // En sachets
  rollsConsumed: number; // Nombre de rouleaux
  waste: number; // Dégâts/Pertes
}

export interface FinancialStat {
  month: string;
  revenue: number;
  expenses: number;
  factory: FactoryLocation;
}

export interface StockItem {
  id: string;
  name: string; // ex: Rouleaux, Sachets, Cartons
  quantity: number;
  unit: string;
  factory: FactoryLocation;
  status: 'ok' | 'low' | 'critical';
}