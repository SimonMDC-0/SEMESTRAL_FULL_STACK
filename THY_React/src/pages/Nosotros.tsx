import React from 'react';

export const Nosotros: React.FC = () => {
  return (
    <main className="py-5">
      <div className="container">
        {/* Titulo de la pagina */}
        <h1 className="products-section-title text-center mb-5">Quienes Somos</h1>

        {/* Seccion: Nuestra mision */}
        <div className="row align-items-center mb-5 g-4">
          <div className="col-md-6">
            <div className="form-banner">Nuestra Mision</div>
            <p className="text-muted" style={{ fontSize: '1rem', lineHeight: 1.8 }}>
              En <strong>The World Is Yours</strong> creemos que la soberania territorial no
              deberia estar limitada a los Estados tradicionales. Nuestra plataforma conecta a
              inversores visionarios con los territorios mas estrategicos y prestigiosos del planeta,
              facilitando transferencias legales seguras, transparentes y confidenciales.
            </p>
            <p className="text-muted" style={{ fontSize: '1rem', lineHeight: 1.8 }}>
              Pioneros en la integracion de tratados internacionales y transacciones de alta
              plusvalia, transformamos la geografia global en oportunidades directas de soberania.
            </p>
          </div>
          <div className="col-md-6">
            {/* Imagen representativa del mundo */}
            <div
              className="border rounded-3 overflow-hidden shadow-sm"
              style={{ minHeight: '260px' }}
            >
              <img
                src="/img/world.png"
                alt="Mapa del mundo"
                className="w-100 h-100 object-fit-cover"
                style={{ minHeight: '260px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* Seccion: Valores */}
        <div className="row g-4 mb-5">
          <div className="col-12">
            <div className="form-banner">Nuestros Valores</div>
          </div>

          {/* Valor 1 */}
          <div className="col-md-4">
            <div className="product-card p-4 h-100">
              <h3 style={{ color: 'var(--color-primary)', fontSize: '1.1rem', fontWeight: 700 }}>
                Transparencia
              </h3>
              <p className="text-muted" style={{ fontSize: '0.93rem', lineHeight: 1.7 }}>
                Cada transaccion es auditada y respaldada bajo los mas rigurosos estandares
                fiduciarios y de derecho internacional.
              </p>
            </div>
          </div>

          {/* Valor 2 */}
          <div className="col-md-4">
            <div className="product-card p-4 h-100">
              <h3 style={{ color: 'var(--color-primary)', fontSize: '1.1rem', fontWeight: 700 }}>
                Exclusividad
              </h3>
              <p className="text-muted" style={{ fontSize: '0.93rem', lineHeight: 1.7 }}>
                Solo gestionamos territorios verificados, con plusvalia comprobada, recursos
                estrategicos e infraestructura de vanguardia.
              </p>
            </div>
          </div>

          {/* Valor 3 */}
          <div className="col-md-4">
            <div className="product-card p-4 h-100">
              <h3 style={{ color: 'var(--color-primary)', fontSize: '1.1rem', fontWeight: 700 }}>
                Confianza
              </h3>
              <p className="text-muted" style={{ fontSize: '0.93rem', lineHeight: 1.7 }}>
                Nuestros clientes confian en nuestro comite asesor para las decisiones de adquisicion
                patrimonial y geopolitica mas trascendentales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Nosotros;
