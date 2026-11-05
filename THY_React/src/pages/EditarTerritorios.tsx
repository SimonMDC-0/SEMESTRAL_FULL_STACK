import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
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
  const [editForm, setEditForm] = useState({
    nombre: '',
    superficieNum: 0,
    poblacionNum: 0,
    precioNum: 0
  });

  const handleOpenEdit = (t: Territorio) => {
    setEditingTerritorio(t);
    setEditForm({
      nombre: t.nombre,
      superficieNum: t.superficieNum,
      poblacionNum: t.poblacionNum,
      precioNum: t.precioNum
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTerritorio) return;

    const updated: Territorio = {
      ...editingTerritorio,
      nombre: editForm.nombre,
      superficieNum: editForm.superficieNum,
      superficie: `${editForm.superficieNum.toLocaleString()} km²`,
      poblacionNum: editForm.poblacionNum,
      poblacion:
        editForm.poblacionNum >= 1000000
          ? `${(editForm.poblacionNum / 1000000).toFixed(1)}M hab.`
          : `${editForm.poblacionNum.toLocaleString()} hab.`,
      precioNum: editForm.precioNum,
      precio: `$${editForm.precioNum.toLocaleString('en-US')}`
    };

    onUpdateTerritorio(updated);
    setEditingTerritorio(null);
  };

  return (
    <main className="container py-4">
      {/* Encabezado y boton agregar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="form-banner mb-0">Gestion de Territorios</h1>
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
      <div className="table-responsive rounded-3" style={{ border: '1px solid var(--color-border)', backgroundColor: '#ffffff' }}>
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
                Poblacion
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
                    onClick={() => handleOpenEdit(t)}
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de edicion */}
      {editingTerritorio && (
        <div
          className="modal d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setEditingTerritorio(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content custom-modal">
              <div className="modal-header custom-modal-header">
                <h5 className="modal-title fw-bold">Editar Territorio</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Cerrar"
                  onClick={() => setEditingTerritorio(null)}
                ></button>
              </div>
              <form onSubmit={handleSave}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label-custom">Nombre del Territorio</label>
                    <input
                      type="text"
                      className="form-control form-control-custom"
                      value={editForm.nombre}
                      onChange={(e) =>
                        setEditForm((prev) => ({ ...prev, nombre: e.target.value }))
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label-custom">Superficie (km²)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control form-control-custom"
                      value={editForm.superficieNum}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          superficieNum: parseFloat(e.target.value) || 0
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label-custom">Poblacion</label>
                    <input
                      type="number"
                      className="form-control form-control-custom"
                      value={editForm.poblacionNum}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          poblacionNum: parseInt(e.target.value, 10) || 0
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label-custom">Precio (USD)</label>
                    <input
                      type="number"
                      className="form-control form-control-custom"
                      value={editForm.precioNum}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          precioNum: parseFloat(e.target.value) || 0
                        }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer custom-modal-footer">
                  <Button
                    variant="cancel"
                    size="sm"
                    onClick={() => setEditingTerritorio(null)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" variant="register" size="sm">
                    Guardar Cambios
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default EditarTerritorios;
