import React from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import Button from '../components/Button';
import {
  transaccionesIniciales,
  type TransaccionAdmin
} from '../data/adminData';
import type { Territorio } from '../data/territorios';
import { calcularMetricasAdmin } from '../utils/metricas';

export interface PanelAdminProps {
  transacciones?: TransaccionAdmin[];
  territorios?: Territorio[];
  onNavigateAgregarProducto?: () => void;
  onNavigateEditarTerritorios?: () => void;
  onDeleteTransaccion?: (id: string) => void;
  onClearTransacciones?: () => void;
}

export const PanelAdmin: React.FC<PanelAdminProps> = ({
  transacciones = transaccionesIniciales,
  territorios = [],
  onNavigateAgregarProducto,
  onNavigateEditarTerritorios,
  onDeleteTransaccion,
  onClearTransacciones
}) => {
  const {
    territoriosVendidos,
    territoriosActivos,
    usuariosRegistrados,
    ingresosDelMes
  } = calcularMetricasAdmin(transacciones, territorios);

  const handleDelete = (id: string, territorio: string) => {
    if (
      window.confirm(
        `¿Confirmas la eliminación de la transacción ${id} (${territorio})?`
      )
    ) {
      onDeleteTransaccion?.(id);
    }
  };

  const handleClearAll = () => {
    if (
      window.confirm(
        '¿Estás seguro de que deseas eliminar todas las transacciones del historial? Esta acción no se puede deshacer.'
      )
    ) {
      onClearTransacciones?.();
    }
  };

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
            number={usuariosRegistrados}
            label="Usuarios Registrados"
          />
        </div>
        <div className="col-md-3">
          <StatCard number={ingresosDelMes} label="Ingresos del Mes" />
        </div>
      </div>

      {/* Encabezado tabla + acciones */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h2 className="form-banner mb-0">Últimas Transacciones</h2>
        <div className="d-flex gap-2 flex-wrap">
          {transacciones.length > 0 && onClearTransacciones && (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleClearAll}
              title="Eliminar todas las transacciones registradas"
            >
              Vaciar Transacciones
            </Button>
          )}

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
            {transacciones.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-5 text-muted">
                  No hay transacciones registradas en este momento.
                </td>
              </tr>
            ) : (
              transacciones.map((tx) => (
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
                    <div className="d-flex justify-content-center gap-2">
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() =>
                          alert(
                            `Detalles de ${tx.id}:\nTerritorio: ${tx.territorio}\nComprador: ${tx.comprador}\nMonto: ${tx.monto}\nEstado: ${tx.estado}`
                          )
                        }
                      >
                        Detalles
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(tx.id, tx.territorio)}
                        title={`Eliminar transacción ${tx.id}`}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default PanelAdmin;
