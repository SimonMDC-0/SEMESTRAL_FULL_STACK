import { useState, useEffect } from 'react';
import { territoriosData, type Territorio } from '../data/territorios';
import { transaccionesIniciales, type TransaccionAdmin } from '../data/adminData';

export function useAppData() {
  const [territorios, setTerritorios] = useState<Territorio[]>(() => {
    try {
      const saved = localStorage.getItem('twy_territorios');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return territoriosData;
  });

  const [transacciones, setTransacciones] = useState<TransaccionAdmin[]>(() => {
    try {
      const saved = localStorage.getItem('twy_transacciones');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return transaccionesIniciales;
  });

  // Guardar modificaciones de territorios en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('twy_territorios', JSON.stringify(territorios));
    } catch {
      // ignore
    }
  }, [territorios]);

  // Guardar transacciones en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('twy_transacciones', JSON.stringify(transacciones));
    } catch {
      // ignore
    }
  }, [transacciones]);

  const handleAddTerritorio = (nuevo: Territorio) => {
    setTerritorios((prev) => [nuevo, ...prev]);
  };

  const handleUpdateTerritorio = (actualizado: Territorio) => {
    setTerritorios((prev) =>
      prev.map((item) => (item.id === actualizado.id ? actualizado : item))
    );
  };

  const handleAddTransaccion = (nuevaTx: TransaccionAdmin) => {
    setTransacciones((prev) => [nuevaTx, ...prev]);
  };

  const handleDeleteTransaccion = (id: string) => {
    setTransacciones((prev) => prev.filter((tx) => tx.id !== id));
  };

  const handleClearTransacciones = () => {
    setTransacciones([]);
  };

  return {
    territorios,
    transacciones,
    handleAddTerritorio,
    handleUpdateTerritorio,
    handleAddTransaccion,
    handleDeleteTransaccion,
    handleClearTransacciones
  };
}

export default useAppData;
