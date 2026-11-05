import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import type { Territorio } from '../data/territorios';

export interface AgregarProductoProps {
  onAddTerritorio: (newTerritorio: Territorio) => void;
  onNavigateBack?: () => void;
}

export const AgregarProducto: React.FC<AgregarProductoProps> = ({
  onAddTerritorio,
  onNavigateBack
}) => {
  const navigate = useNavigate();
  const handleBack = onNavigateBack || (() => navigate('/panel-admin'));
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [superficie, setSuperficie] = useState('');
  const [poblacion, setPoblacion] = useState('');
  const [precio, setPrecio] = useState('');
  const [atributo, setAtributo] = useState('');
  const [imagenUrl, setImagenUrl] = useState<string>('/img/world.png');
  const [esDestacado, setEsDestacado] = useState(false);
  const [esOferta, setEsOferta] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setImagenUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !descripcion.trim() || !superficie || !precio) {
      alert('Por favor completa los campos requeridos.');
      return;
    }

    const supNum = parseFloat(superficie);
    const pobNum = parseInt(poblacion, 10) || 0;
    const precNum = parseFloat(precio);

    const formatPrice = (val: number) =>
      `$${val.toLocaleString('en-US')}`;

    const newTerritory: Territorio = {
      id: Date.now(),
      nombre: nombre.trim(),
      superficie: `${supNum.toLocaleString()} km²`,
      superficieNum: supNum,
      poblacion: pobNum > 1000000 ? `${(pobNum / 1000000).toFixed(1)}M hab.` : `${pobNum.toLocaleString()} hab.`,
      poblacionNum: pobNum,
      precio: formatPrice(precNum),
      precioNum: precNum,
      categoria: atributo || 'Territorio Soberano',
      atributo: atributo || 'Exclusivo',
      imagen: imagenUrl,
      descripcion: descripcion.trim(),
      caracteristicas: [
        `Superficie total: ${supNum.toLocaleString()} km²`,
        `Población estimada: ${pobNum.toLocaleString()} habitantes`,
        `Atributo clave: ${atributo || 'Alta plusvalía internacional'}`
      ],
      destacado: esDestacado,
      oferta: esOferta
    };

    onAddTerritorio(newTerritory);
    alert('¡Territorio agregado exitosamente!');
    handleBack();
  };

  return (
    <main className="py-5">
      <div className="container">
        <div className="add-product-container">
          {/* Titulo del formulario */}
          <h1 className="form-banner">Agregar Territorio</h1>

          <form onSubmit={handleSubmit} noValidate>
            {/* Seccion: Informacion principal */}
            <p className="section-subtitle">Informacion Principal</p>

            {/* Nombre del territorio */}
            <div className="mb-3">
              <label htmlFor="nombreTerritorio" className="form-label-custom">
                Nombre del Territorio *
              </label>
              <input
                type="text"
                id="nombreTerritorio"
                name="nombreTerritorio"
                className="form-control form-control-custom"
                placeholder="Ej: Suiza Alpina"
                maxLength={80}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <p className="char-counter">
                <span>{nombre.length}</span>/80
              </p>
            </div>

            {/* Descripcion */}
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label-custom">
                Descripcion *
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                className="form-control form-control-custom"
                placeholder="Describe las caracteristicas principales del territorio..."
                maxLength={500}
                rows={4}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              ></textarea>
              <p className="char-counter">
                <span>{descripcion.length}</span>/500
              </p>
            </div>

            <hr className="section-divider" />

            {/* Seccion: Datos geograficos */}
            <p className="section-subtitle">Datos Geograficos y Economicos</p>

            <div className="row g-3 mb-3">
              {/* Superficie */}
              <div className="col-md-6">
                <label htmlFor="superficie" className="form-label-custom">
                  Superficie (km²) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="superficie"
                  name="superficie"
                  className="form-control form-control-custom"
                  placeholder="Ej: 41285.5"
                  value={superficie}
                  onChange={(e) => setSuperficie(e.target.value)}
                  required
                  min="0"
                />
              </div>

              {/* Poblacion */}
              <div className="col-md-6">
                <label htmlFor="poblacion" className="form-label-custom">
                  Poblacion *
                </label>
                <input
                  type="number"
                  id="poblacion"
                  name="poblacion"
                  className="form-control form-control-custom"
                  placeholder="Ej: 8720000"
                  value={poblacion}
                  onChange={(e) => setPoblacion(e.target.value)}
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="row g-3 mb-3">
              {/* Precio */}
              <div className="col-md-6">
                <label htmlFor="precio" className="form-label-custom">
                  Precio (USD) *
                </label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  className="form-control form-control-custom"
                  placeholder="Ej: 18500000"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                  min="0"
                />
              </div>

              {/* Atributo destacado */}
              <div className="col-md-6">
                <label htmlFor="atributo" className="form-label-custom">
                  Atributo Principal
                </label>
                <select
                  id="atributo"
                  name="atributo"
                  className="form-select form-select-custom"
                  value={atributo}
                  onChange={(e) => setAtributo(e.target.value)}
                >
                  <option value="">-- Seleccione --</option>
                  <option value="Alta Plusvalia">Alta Plusvalia</option>
                  <option value="Estrategico">Estrategico</option>
                  <option value="Oferta Especial">Oferta Especial</option>
                  <option value="Sustentable">Sustentable</option>
                  <option value="Hub Financiero">Hub Financiero</option>
                </select>
              </div>
            </div>

            <hr className="section-divider" />

            {/* Seccion: Imagen */}
            <p className="section-subtitle">Imagen del Territorio</p>

            <div className="image-upload-zone mb-2">
              <input
                type="file"
                id="imagenTerritorio"
                name="imagenTerritorio"
                accept="image/*"
                onChange={handleImageChange}
              />
              <span style={{ fontSize: '2rem' }}>📷</span>
              <p>
                <span>Haz clic para subir</span> o arrastra una imagen aqui
              </p>
              <p style={{ fontSize: '0.78rem', marginTop: '0.4rem' }}>
                PNG, JPG, WEBP - Max. 5 MB
              </p>
            </div>

            {imagePreview && (
              <img
                id="imagePreview"
                src={imagePreview}
                alt="Vista previa del territorio"
                style={{ display: 'block' }}
              />
            )}

            <hr className="section-divider" />

            {/* Seccion: Opciones adicionales */}
            <p className="section-subtitle">Opciones</p>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div
                  className="d-flex align-items-center gap-3"
                  style={{
                    background: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    padding: '1rem'
                  }}
                >
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    id="esDestacado"
                    checked={esDestacado}
                    onChange={(e) => setEsDestacado(e.target.checked)}
                    style={{ width: '1.2em', height: '1.2em', cursor: 'pointer' }}
                  />
                  <div>
                    <label
                      className="form-label-custom mb-0"
                      htmlFor="esDestacado"
                      style={{ cursor: 'pointer' }}
                    >
                      Territorio Destacado
                    </label>
                    <p style={{ fontSize: '0.77rem', color: 'var(--color-muted)', margin: 0 }}>
                      Aparecera en la seccion principal del sitio
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div
                  className="d-flex align-items-center gap-3"
                  style={{
                    background: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    padding: '1rem'
                  }}
                >
                  <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    id="esOferta"
                    checked={esOferta}
                    onChange={(e) => setEsOferta(e.target.checked)}
                    style={{ width: '1.2em', height: '1.2em', cursor: 'pointer' }}
                  />
                  <div>
                    <label
                      className="form-label-custom mb-0"
                      htmlFor="esOferta"
                      style={{ cursor: 'pointer' }}
                    >
                      Oferta Especial
                    </label>
                    <p style={{ fontSize: '0.77rem', color: 'var(--color-muted)', margin: 0 }}>
                      Mostrara etiqueta de descuento y promocion
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de accion */}
            <div className="d-flex justify-content-end gap-3">
              <Button variant="cancel" onClick={handleBack}>
                Cancelar
              </Button>
              <Button type="submit" variant="register">
                Guardar Territorio
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AgregarProducto;
