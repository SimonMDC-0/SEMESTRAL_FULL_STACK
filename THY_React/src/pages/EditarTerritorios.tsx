import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import EditTerritoryModal from '../components/EditTerritoryModal';
import type { Territorio } from '../data/territorios';

export interface EditarTerritoriosProps {
  territorios: Territorio[];
  onUpdateTerritorio: (updated: Territorio) => void;
  onNavigateAgregarProducto?: () => void;
}

export const EditarTerritorios: React.FC<EditarTerritoriosProps> = ({
  territorios,
  onUpdateTerritorio,
  onNavigateAgregarProducto
}) => {
  const [editingTerritorio, setEditingTerritorio] = useState<Territorio | null>(null);

  return (
    <main className="container py-4">
      {/* Encabezado y boton agregar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="form-banner mb-0">Gestión de Territorios</h1>
        {onNavigateAgregarProducto ? (
          <Button variant="register" size="sm" onClick={onNavigateAgregarProducto}>
            + Agregar Territorio
          </Button>
        ) : (
          <Link to="/agregar-producto" className="btn btn-register btn-sm">
            + Agregar Territorio
          </Link>
        )}
      </div>

      {/* Tabla de territorios */}
      <div className="table-responsive rounded-3 admin-table-container">
        <table className="table mb-0 admin-table">
          <thead>
            <tr>
              <th scope="col" className="py-3 px-3">
                ID
              </th>
              <th scope="col" className="py-3 px-3">
                Imagen
              </th>
              <th scope="col" className="py-3 px-3">
                Nombre
              </th>
              <th scope="col" className="py-3 px-3">
                Superficie (km²)
              </th>
              <th scope="col" className="py-3 px-3">
                Población
              </th>
              <th scope="col" className="py-3 px-3">
                Precio (USD)
              </th>
              <th scope="col" className="py-3 px-3 text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {territorios.map((t) => (
              <tr key={t.id}>
                <td className="px-3 fw-bold territory-id">
                  #TER-{String(t.id).padStart(3, '0')}
                </td>
                <td className="px-3">
                  <img
                    src={t.imagen}
                    alt={t.nombre}
                    style={{
                      height: '40px',
                      width: '60px',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/img/world.png';
                    }}
                  />
                </td>
                <td className="px-3 fw-bold">{t.nombre}</td>
                <td className="px-3">{t.superficieNum.toLocaleString()}</td>
                <td className="px-3">{t.poblacionNum.toLocaleString()}</td>
                <td className="px-3 fw-bold price">{t.precio}</td>
                <td className="px-3 text-center">
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => setEditingTerritorio(t)}
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de edición extraído */}
      <EditTerritoryModal
        isOpen={Boolean(editingTerritorio)}
        territorio={editingTerritorio}
        onClose={() => setEditingTerritorio(null)}
        onSave={(updated) => {
          onUpdateTerritorio(updated);
          setEditingTerritorio(null);
        }}
      />
    </main>
  );
};

export default EditarTerritorios;
