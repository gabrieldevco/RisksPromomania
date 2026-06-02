import { risks, getRiskZone, getZoneColor } from '../data/risks';

const Matriz = () => {
  // Crear matriz de probabilidad vs impacto
  const matrix = {};
  for (let p = 1; p <= 5; p++) {
    matrix[p] = {};
    for (let i = 1; i <= 5; i++) {
      matrix[p][i] = [];
    }
  }

  risks.forEach(risk => {
    matrix[risk.probability][risk.impact].push(risk);
  });

  const probLabels = ['', '1-Muy Baja', '2-Baja', '3-Media', '4-Alta', '5-Muy Alta'];
  const impLabels = ['', '1-Insig.', '2-Menor', '3-Moderado', '4-Mayor', '5-Catastrófico'];

  // Análisis de prioridades
  const criticalRisks = risks.filter(r => r.zone === 'critical');
  const highRisks = risks.filter(r => r.zone === 'high');

  return (
    <div>
      <div className="section-header">
        <h1>Matriz de Riesgos</h1>
        <p>FASE 2 y 3: Análisis cualitativo y matriz de probabilidad vs impacto</p>
      </div>

      <div style={{
        background: '#334155',
        borderRadius: '12px',
        padding: '1.5rem',
        overflowX: 'auto',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto repeat(5, 1fr)',
          gap: '4px',
          minWidth: '600px'
        }}>
          {/* Header */}
          <div></div>
          {impLabels.slice(1).map((label, i) => (
            <div key={i} style={{
              fontWeight: 600,
              textAlign: 'center',
              padding: '0.5rem',
              color: '#94a3b8',
              fontSize: '0.875rem'
            }}>{label}</div>
          ))}

          {/* Rows */}
          {[5, 4, 3, 2, 1].map(p => (
            <>
              <div key={`label-${p}`} style={{
                fontWeight: 600,
                padding: '0.5rem',
                color: '#94a3b8',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}>{probLabels[p]}</div>
              {[1, 2, 3, 4, 5].map(i => {
                const cellRisks = matrix[p][i];
                const level = p * i;
                const zone = getRiskZone(level);
                const zoneColor = getZoneColor(zone);
                const riskIds = cellRisks.map(r => r.id).join(', ');

                return (
                  <div
                    key={`cell-${p}-${i}`}
                    style={{
                      aspectRatio: '1',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: `${zoneColor}30`,
                      color: zoneColor,
                      border: `1px solid ${zoneColor}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                      e.target.style.zIndex = 10;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.zIndex = 1;
                    }}
                  >
                    <span>{level}</span>
                    {riskIds && (
                      <span style={{ fontSize: '0.625rem', fontWeight: 500, marginTop: '2px' }}>
                        {riskIds}
                      </span>
                    )}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{ background: '#334155', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ 
            fontSize: '1.125rem', 
            fontWeight: 600, 
            marginBottom: '1rem',
            color: '#dc2626'
          }}>
            🔴 Riesgos Críticos (Atención Inmediata)
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {criticalRisks.map(risk => (
              <li key={risk.id} style={{
                padding: '0.75rem',
                marginBottom: '0.5rem',
                background: 'rgba(220, 38, 38, 0.1)',
                borderRadius: '8px',
                borderLeft: '3px solid #dc2626'
              }}>
                <strong style={{ color: '#fca5a5', fontFamily: 'monospace' }}>{risk.id}</strong>
                <span style={{ color: '#cbd5e1', marginLeft: '0.5rem' }}>{risk.name}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'block', marginTop: '0.25rem' }}>
                  Nivel: {risk.level} | Prob: {risk.probability} × Imp: {risk.impact}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ background: '#334155', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ 
            fontSize: '1.125rem', 
            fontWeight: 600, 
            marginBottom: '1rem',
            color: '#ea580c'
          }}>
            🟠 Riesgos Altos (Plan de Respuesta)
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {highRisks.map(risk => (
              <li key={risk.id} style={{
                padding: '0.75rem',
                marginBottom: '0.5rem',
                background: 'rgba(234, 88, 12, 0.1)',
                borderRadius: '8px',
                borderLeft: '3px solid #ea580c'
              }}>
                <strong style={{ color: '#fdba74', fontFamily: 'monospace' }}>{risk.id}</strong>
                <span style={{ color: '#cbd5e1', marginLeft: '0.5rem' }}>{risk.name}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.875rem', display: 'block', marginTop: '0.25rem' }}>
                  Nivel: {risk.level} | Prob: {risk.probability} × Imp: {risk.impact}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Matriz;
