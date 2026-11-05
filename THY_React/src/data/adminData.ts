/**
 * data/adminData.ts - Datos del panel de administracion de TWY
 */

export interface TransaccionAdmin {
  id: string;
  territorio: string;
  comprador: string;
  fecha: string;
  monto: string;
  estado: 'Completado' | 'Pendiente' | 'Cancelado';
}

export const transaccionesIniciales: TransaccionAdmin[] = [
  {
    id: "#TR-1024",
    territorio: "Suiza Alpina",
    comprador: "john.doe@example.com",
    fecha: "18/09/2026",
    monto: "$18,500,000",
    estado: "Completado"
  },
  {
    id: "#TR-1025",
    territorio: "Principado de Monaco",
    comprador: "maria.s@example.com",
    fecha: "19/09/2026",
    monto: "$28,000,000",
    estado: "Pendiente"
  },
  {
    id: "#TR-1026",
    territorio: "Atolon de Seychelles",
    comprador: "invest.corp@global.com",
    fecha: "20/09/2026",
    monto: "$11,800,000",
    estado: "Completado"
  },
  {
    id: "#TR-1027",
    territorio: "Islandia Boreal",
    comprador: "viking.holdings@nordic.com",
    fecha: "20/09/2026",
    monto: "$14,200,000",
    estado: "Completado"
  }
];

export const metricasAdmin = {
  territoriosVendidos: 152,
  territoriosActivos: 48,
  usuariosRegistrados: "2,450",
  ingresosDelMes: "$12.5M"
};
