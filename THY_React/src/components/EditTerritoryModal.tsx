import React, { useState } from 'react';
import Button from './Button';
import type { Territorio } from '../data/territorios';

export interface EditTerritoryModalProps {
  isOpen: boolean;
  territorio: Territorio | null;
  onClose: () => void;
  onSave: (updated: Territorio) => void;
}

interface EditTerritoryFormProps {
  territorio: Territorio;
  onClose: () => void;
  onSave: (updated: Territorio) => void;
}

const EditTerritoryForm: React.FC<EditTerritoryFormProps> = ({
  territorio,
  onClose,
  onSave
}) => {
  const [editForm, setEditForm] = useState({
    nombre: territorio.nombre,
    superficieNum: territorio.superficieNum,
    poblacionNum: territorio.poblacionNum,
    precioNum: territorio.precioNum
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: Territorio = {
      ...territorio,
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

    onSave(updated);
  };

  return (
    <>
      <div className="modal-header custom-modal-header">
        <h5 className="modal-title fw-bold">Editar Territorio</h5>
        <button
          type="button"
          className="btn-close"
          aria-label="Cerrar"
          onClick={onClose}
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
            <label className="form-label-custom">Población</label>
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
          <Button variant="cancel" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="register" size="sm">
            Guardar Cambios
          </Button>
        </div>
      </form>
    </>
  );
};

export const EditTerritoryModal: React.FC<EditTerritoryModalProps> = ({
  isOpen,
  territorio,
  onClose,
  onSave
}) => {
  if (!isOpen || !territorio) return null;

  return (
    <div
      className="modal d-block"
      tabIndex={-1}
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content custom-modal">
          <EditTerritoryForm
            key={territorio.id}
            territorio={territorio}
            onClose={onClose}
            onSave={onSave}
          />
        </div>
      </div>
    </div>
  );
};

export default EditTerritoryModal;
