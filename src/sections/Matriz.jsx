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
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem 3rem' }}>
      <div className="section-header">
        <h1>Matriz de <span>Riesgos</span></h1>
        <p>FASE 2 y 3: Análisis cualitativo y matriz de probabilidad vs impacto</p>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        overflowX: 'auto',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        border: '1px solid #E5E7EB'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto repeat(5, 1fr)',
          gap: '8px',
          minWidth: '600px'
        }}>
          {/* Header */}
          <div></div>
          {impLabels.slice(1).map((label, i) => (
            <div key={i} style={{
              fontWeight: 700,
              textAlign: 'center',
              padding: '0.75rem 0.5rem',
              color: '#6B7280',
              fontSize: '0.8125rem',
              background: '#F9FAFB',
              borderRadius: '8px'
            }}>{label}</div>
          ))}

          {/* Rows */}
          {[5, 4, 3, 2, 1].map(p => (
            <>
              <div key={`label-${p}`} style={{
                fontWeight: 700,
                padding: '0.75rem',
                color: '#6B7280',
                fontSize: '0.8125rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                background: '#F9FAFB',
                borderRadius: '8px'
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
                      borderRadius: '12px',
                      fontSize: '0.8125rem',
                      fontWeight: 800,
                      background: `${zoneColor}15`,
                      color: zoneColor,
                      border: `2px solid ${zoneColor}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                      e.target.style.zIndex = 10;
                      e.target.style.boxShadow = `0 4px 20px ${zoneColor}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.zIndex = 1;
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <span style={{ fontSize: '1.25rem' }}>{level}</span>
                    {riskIds && (
                      <span style={{ fontSize: '0.625rem', fontWeight: 600, marginTop: '2px' }}>
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          border: '1px solid #E5E7EB'
        }}>
          <h3 style={{ 
            fontSize: '1.125rem', 
            fontWeight: 700, 
            marginBottom: '1rem',
            color: '#DC2626',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '1.25rem' }}>🔴</span> Riesgos Críticos
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {criticalRisks.map(risk => (
              <li key={risk.id} style={{
                padding: '1rem',
                marginBottom: '0.75rem',
                background: '#FEF2F2',
                borderRadius: '12px',
                border: '1px solid #FECACA'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ 
                    color: '#DC2626', 
                    fontFamily: 'monospace', 
                    fontWeight: 700,
                    background: '#FEE2E2',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem'
                  }}>{risk.id}</span>
                  <span style={{ color: '#111827', fontWeight: 600 }}>{risk.name}</span>
                </div>
                <span style={{ color: '#6B7280', fontSize: '0.8125rem' }}>
                  Nivel: {risk.level} | Prob: {risk.probability} × Imp: {risk.impact}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          border: '1px solid #E5E7EB'
        }}>
          <h3 style={{ 
            fontSize: '1.125rem', 
            fontWeight: 700, 
            marginBottom: '1rem',
            color: '#F97316',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '1.25rem' }}>🟠</span> Riesgos Altos
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {highRisks.map(risk => (
              <li key={risk.id} style={{
                padding: '1rem',
                marginBottom: '0.75rem',
                background: '#FFEDD5',
                borderRadius: '12px',
                border: '1px solid #FED7AA'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ 
                    color: '#F97316', 
                    fontFamily: 'monospace', 
                    fontWeight: 700,
                    background: '#FFF7ED',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem'
                  }}>{risk.id}</span>
                  <span style={{ color: '#111827', fontWeight: 600 }}>{risk.name}</span>
                </div>
                <span style={{ color: '#6B7280', fontSize: '0.8125rem' }}>
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
