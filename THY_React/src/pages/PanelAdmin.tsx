import React from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import Button from '../components/Button';
import {
  transaccionesIniciales,
  metricasAdmin,
  type TransaccionAdmin
} from '../data/adminData';
import type { Territorio } from '../data/territorios';

export interface PanelAdminProps {
  transacciones?: TransaccionAdmin[];
  territorios?: Territorio[];
  onNavigateAgregarProducto?: () => void;
  onNavigateEditarTerritorios?: () => void;
}

export const PanelAdmin: React.FC<PanelAdminProps> = ({
  transacciones = transaccionesIniciales,
  territorios = [],
  onNavigateAgregarProducto,
  onNavigateEditarTerritorios
}) => {
  // Calculo reactivo de metricas generales
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

  // Calculo reactivo de ingresos acumulados del mes
  const nuevosIngresos = transacciones
    .slice(0, nuevasTxCount)
    .reduce((acc, tx) => {
      const num = Number(tx.monto.replace(/[^0-9]/g, ''));
      return acc + (isNaN(num) ? 0 : num);
    }, 0);
  const baseMillones = 12.5;
  const totalMillones = baseMillones + nuevosIngresos / 1000000;
  const ingresosDelMes = `$${totalMillones.toFixed(1)}M`;

  return (
    <main className="container py-4">
      {/* Titulo */}
      <h1 className="form-banner mb-4">Resumen General</h1>

      {/* Tarjetas de metricas */}
      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <StatCard
            number={territoriosVendidos}
            label="Territorios Vendidos"
          />
        </div>
        <div className="col-md-3">
          <StatCard
            number={territoriosActivos}
            label="Territorios Activos"
          />
        </div>
        <div className="col-md-3">
          <StatCard
            number={metricasAdmin.usuariosRegistrados}
            label="Usuarios Registrados"
          />
        </div>
        <div className="col-md-3">
          <StatCard number={ingresosDelMes} label="Ingresos del Mes" />
        </div>
      </div>

      {/* Encabezado tabla + boton nuevo territorio */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="form-banner mb-0">Últimas Transacciones</h2>
        <div className="d-flex gap-2">
          {onNavigateEditarTerritorios ? (
            <Button
              variant="outline-success"
              size="sm"
              onClick={onNavigateEditarTerritorios}
            >
              Gestionar Territorios
            </Button>
          ) : (
            <Link
              to="/editar-territorios"
              className="btn btn-outline-success btn-sm"
            >
              Gestionar Territorios
            </Link>
          )}

          {onNavigateAgregarProducto ? (
            <Button
              variant="register"
              size="sm"
              onClick={onNavigateAgregarProducto}
            >
              + Nuevo Territorio
            </Button>
          ) : (
            <Link to="/agregar-producto" className="btn btn-register btn-sm">
              + Nuevo Territorio
            </Link>
          )}
        </div>
      </div>

      {/* Tabla de administracion */}
      <div className="table-responsive rounded-3 admin-table-container">
        <table className="table mb-0 admin-table">
          <thead>
            <tr>
              <th scope="col" className="py-3 px-3">
                ID Trans.
              </th>
              <th scope="col" className="py-3 px-3">
                Territorio
              </th>
              <th scope="col" className="py-3 px-3">
                Comprador
              </th>
              <th scope="col" className="py-3 px-3">
                Fecha
              </th>
              <th scope="col" className="py-3 px-3">
                Monto
              </th>
              <th scope="col" className="py-3 px-3">
                Estado
              </th>
              <th scope="col" className="py-3 px-3 text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {transacciones.map((tx) => (
              <tr key={tx.id}>
                <td className="px-3 fw-bold territory-id">{tx.id}</td>
                <td className="px-3 fw-semibold">{tx.territorio}</td>
                <td className="px-3">{tx.comprador}</td>
                <td className="px-3">{tx.fecha}</td>
                <td className="px-3 fw-bold price">{tx.monto}</td>
                <td className="px-3">
                  <span
                    className={
                      tx.estado === 'Completado'
                        ? 'badge-custom-success'
                        : 'badge-custom-warning'
                    }
                  >
                    {tx.estado}
                  </span>
                </td>
                <td className="px-3 text-center">
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() =>
                      alert(
                        `Detalles de ${tx.id}:\nTerritorio: ${tx.territorio}\nComprador: ${tx.comprador}\nMonto: ${tx.monto}\nEstado: ${tx.estado}`
                      )
                    }
                  >
                    Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default PanelAdmin;
