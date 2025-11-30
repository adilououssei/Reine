import { FactoryLocation, FinancialStat, ProductionStat, StockItem } from "./types";

export const MOCK_PRODUCTION_DATA: ProductionStat[] = [
  { date: '2023-10-25', factory: FactoryLocation.LOME, quantityProduced: 15000, rollsConsumed: 5, waste: 200 },
  { date: '2023-10-25', factory: FactoryLocation.BASSAR, quantityProduced: 8000, rollsConsumed: 3, waste: 50 },
  { date: '2023-10-26', factory: FactoryLocation.LOME, quantityProduced: 14500, rollsConsumed: 5, waste: 150 },
  { date: '2023-10-26', factory: FactoryLocation.BASSAR, quantityProduced: 8200, rollsConsumed: 3, waste: 60 },
  { date: '2023-10-27', factory: FactoryLocation.LOME, quantityProduced: 16000, rollsConsumed: 6, waste: 300 },
  { date: '2023-10-27', factory: FactoryLocation.BASSAR, quantityProduced: 7500, rollsConsumed: 3, waste: 40 },
  { date: '2023-10-28', factory: FactoryLocation.LOME, quantityProduced: 15500, rollsConsumed: 5, waste: 180 },
  { date: '2023-10-28', factory: FactoryLocation.BASSAR, quantityProduced: 8800, rollsConsumed: 3, waste: 70 },
  { date: '2023-10-29', factory: FactoryLocation.LOME, quantityProduced: 13000, rollsConsumed: 4, waste: 100 },
  { date: '2023-10-29', factory: FactoryLocation.BASSAR, quantityProduced: 9000, rollsConsumed: 3, waste: 80 },
];

export const MOCK_FINANCIALS: FinancialStat[] = [
  { month: 'Juin', revenue: 4500000, expenses: 2000000, factory: FactoryLocation.LOME },
  { month: 'Juin', revenue: 2100000, expenses: 900000, factory: FactoryLocation.BASSAR },
  { month: 'Juil', revenue: 4800000, expenses: 2100000, factory: FactoryLocation.LOME },
  { month: 'Juil', revenue: 2300000, expenses: 1000000, factory: FactoryLocation.BASSAR },
  { month: 'Août', revenue: 5100000, expenses: 2200000, factory: FactoryLocation.LOME },
  { month: 'Août', revenue: 2400000, expenses: 1100000, factory: FactoryLocation.BASSAR },
  { month: 'Sept', revenue: 4900000, expenses: 2050000, factory: FactoryLocation.LOME },
  { month: 'Sept', revenue: 2200000, expenses: 950000, factory: FactoryLocation.BASSAR },
];

export const MOCK_STOCK: StockItem[] = [
  { id: '1', name: 'Rouleaux Plastique', quantity: 120, unit: 'Unités', factory: FactoryLocation.LOME, status: 'ok' },
  { id: '2', name: 'Sachets d\'emballage', quantity: 500, unit: 'Paquets', factory: FactoryLocation.LOME, status: 'low' },
  { id: '3', name: 'Rouleaux Plastique', quantity: 45, unit: 'Unités', factory: FactoryLocation.BASSAR, status: 'ok' },
  { id: '4', name: 'Sachets d\'emballage', quantity: 150, unit: 'Paquets', factory: FactoryLocation.BASSAR, status: 'critical' },
];