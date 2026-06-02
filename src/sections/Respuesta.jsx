import { risks, getZoneColor } from '../data/risks';
import { User, Target, CheckSquare } from 'lucide-react';

const strategyStyles = {
  'Evitar': { background: 'rgba(220, 38, 38, 0.2)', color: '#fca5a5' },
  'Mitigar': { background: 'rgba(234, 88, 12, 0.2)', color: '#fdba74' },
  'Mitigar + Transferir': { background: 'rgba(234, 88, 12, 0.2)', color: '#fdba74' },
  'Transferir': { background: 'rgba(139, 92, 246, 0.2)', color: '#c4b5fd' },
  'Aceptar': { background: 'rgba(22, 163, 74, 0.2)', color: '#86efac' }
};

const ResponseCard = ({ risk }) => {
  const zoneColor = getZoneColor(risk.zone);
  const strategyStyle = strategyStyles[risk.strategy] || strategyStyles['Mitigar'];

  return (
    <div style={{
      background: '#334155',
      border: '1px solid #475569',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1rem',
      borderLeft: `4px solid ${zoneColor}`
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 700,
            color: '#6366f1',
            fontFamily: 'monospace'
          }}>{risk.id}</span>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#f8fafc',
            marginTop: '0.25rem'
          }}>{risk.name}</h3>
        </div>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontSize: '0.875rem',
          fontWeight: 600,
          ...strategyStyle
        }}>
          Estrategia: {risk.strategy}
        </span>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <div style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: '#94a3b8',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckSquare size={16} />
          Acciones de Control
        </div>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {risk.actions.map((action, idx) => (
            <li key={idx} style={{
              padding: '0.375rem 0',
              paddingLeft: '1.5rem',
              position: 'relative',
              color: '#cbd5e1',
              fontSize: '0.9375rem'
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                color: '#6366f1',
                fontWeight: 700
              }}>→</span>
              {action}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <div style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: '#94a3b8',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <User size={16} />
          Responsable
        </div>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: '#475569',
          borderRadius: '8px',
          fontSize: '0.875rem',
          color: '#f8fafc'
        }}>
          {risk.responsible}
        </span>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <div style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: '#94a3b8',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Target size={16} />
          Indicador de Seguimiento
        </div>
        <p style={{ color: '#cbd5e1', fontSize: '0.9375rem' }}>{risk.indicator}</p>
      </div>
    </div>
  );
};

const Respuesta = () => {
  // Solo mostrar riesgos de nivel Alto y Crítico
  const highAndCriticalRisks = risks.filter(r => r.level >= 10);

  return (
    <div>
      <div className="section-header">
        <h1>Plan de Respuesta a Riesgos</h1>
        <p>FASE 4: Estrategias de respuesta para riesgos de nivel Alto y Crítico</p>
      </div>

      <div style={{
        background: '#334155',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>
          Estrategias de Respuesta
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{
            padding: '1rem',
            background: 'rgba(220, 38, 38, 0.1)',
            borderRadius: '8px',
            borderLeft: '3px solid #dc2626'
          }}>
            <strong style={{ color: '#fca5a5', display: 'block', marginBottom: '0.25rem' }}>Evitar</strong>
            <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Eliminar la amenaza eliminando su causa</span>
          </div>
          <div style={{
            padding: '1rem',
            background: 'rgba(234, 88, 12, 0.1)',
            borderRadius: '8px',
            borderLeft: '3px solid #ea580c'
          }}>
            <strong style={{ color: '#fdba74', display: 'block', marginBottom: '0.25rem' }}>Mitigar</strong>
            <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Reducir la probabilidad e impacto</span>
          </div>
          <div style={{
            padding: '1rem',
            background: 'rgba(139, 92, 246, 0.1)',
            borderRadius: '8px',
            borderLeft: '3px solid #8b5cf6'
          }}>
            <strong style={{ color: '#c4b5fd', display: 'block', marginBottom: '0.25rem' }}>Transferir</strong>
            <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Transferir el impacto a terceros</span>
          </div>
          <div style={{
            padding: '1rem',
            background: 'rgba(22, 163, 74, 0.1)',
            borderRadius: '8px',
            borderLeft: '3px solid #16a34a'
          }}>
            <strong style={{ color: '#86efac', display: 'block', marginBottom: '0.25rem' }}>Aceptar</strong>
            <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Asumir el riesgo activa o pasivamente</span>
          </div>
        </div>
      </div>

      <div>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          color: '#f8fafc'
        }}>
          Plan de Respuesta por Riesgo ({highAndCriticalRisks.length} riesgos)
        </h2>
        {highAndCriticalRisks.map(risk => (
          <ResponseCard key={risk.id} risk={risk} />
        ))}
      </div>
    </div>
  );
};

export default Respuesta;
