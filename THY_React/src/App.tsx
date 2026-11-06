import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Nosotros from './pages/Nosotros';
import Blog from './pages/Blog';
import Contacto from './pages/Contacto';
import IniciarSesion from './pages/IniciarSesion';
import RegistrarUsuario from './pages/RegistrarUsuario';
import PanelAdmin from './pages/PanelAdmin';
import AgregarProducto from './pages/AgregarProducto';
import EditarTerritorios from './pages/EditarTerritorios';
import { territoriosData, type Territorio } from './data/territorios';

export function App() {
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

  // Guardar modificaciones de territorios en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('twy_territorios', JSON.stringify(territorios));
    } catch {
      // ignore
    }
  }, [territorios]);

  const handleAddTerritorio = (nuevo: Territorio) => {
    setTerritorios((prev) => [nuevo, ...prev]);
  };

  const handleUpdateTerritorio = (actualizado: Territorio) => {
    setTerritorios((prev) =>
      prev.map((item) => (item.id === actualizado.id ? actualizado : item))
    );
  };

  return (
    <HashRouter>
      <Routes>
        {/* Rutas Públicas (con Header y Footer de cliente) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home territorios={territorios} />} />
          <Route
            path="/productos"
            element={<Productos territorios={territorios} />}
          />
          <Route
            path="/detalle/:id"
            element={<DetalleProducto territorios={territorios} />}
          />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/registrar" element={<RegistrarUsuario />} />
        </Route>

        {/* Rutas Administrativas (con Header y Footer de admin) */}
        <Route element={<AdminLayout />}>
          <Route path="/panel-admin" element={<PanelAdmin />} />
          <Route
            path="/agregar-producto"
            element={<AgregarProducto onAddTerritorio={handleAddTerritorio} />}
          />
          <Route
            path="/editar-territorios"
            element={
              <EditarTerritorios
                territorios={territorios}
                onUpdateTerritorio={handleUpdateTerritorio}
              />
            }
          />
        </Route>

        {/* Redirección para rutas no encontradas (404) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
