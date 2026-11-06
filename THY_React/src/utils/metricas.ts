/**
 * utils/metricas.ts - Funciones de cálculo y agregación para métricas administrativas
 */
import {
  metricasAdmin,
  transaccionesIniciales,
  type TransaccionAdmin
} from '../data/adminData';
import type { Territorio } from '../data/territorios';

export interface MetricasCalculadas {
  territoriosVendidos: number;
  territoriosActivos: number;
  usuariosRegistrados: string;
  ingresosDelMes: string;
}

/**
 * Calcula las métricas reactivas del panel de administración a partir de
 * las transacciones y el catálogo de territorios actuales.
 */
export function calcularMetricasAdmin(
  transacciones: TransaccionAdmin[] = transaccionesIniciales,
  territorios: Territorio[] = []
): MetricasCalculadas {
  const baseVendidos = metricasAdmin.territoriosVendidos;
  const nuevasTxCount = Math.max(
    0,
    transacciones.length - transaccionesIniciales.length
  );
  const territoriosVendidos = baseVendidos + nuevasTxCount;

  const territoriosActivos =
    territorios.length > 0
      ? territorios.length
      : metricasAdmin.territoriosActivos;

  const nuevosIngresos = transacciones
    .slice(0, nuevasTxCount)
    .reduce((acc, tx) => {
      const num = Number(tx.monto.replace(/[^0-9]/g, ''));
      return acc + (isNaN(num) ? 0 : num);
    }, 0);

  const baseMillones = 12.5;
  const totalMillones = baseMillones + nuevosIngresos / 1000000;
  const ingresosDelMes = `$${totalMillones.toFixed(1)}M`;

  return {
    territoriosVendidos,
    territoriosActivos,
    usuariosRegistrados: metricasAdmin.usuariosRegistrados,
    ingresosDelMes
  };
}
