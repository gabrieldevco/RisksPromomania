import { risks, getZoneColor } from '../data/risks';
import { User, Target, CheckSquare, ArrowRight } from 'lucide-react';

const strategyStyles = {
  'Evitar': { background: '#FEE2E2', color: '#DC2626', border: '#FECACA' },
  'Mitigar': { background: '#FFEDD5', color: '#F97316', border: '#FED7AA' },
  'Mitigar + Transferir': { background: '#FFEDD5', color: '#F97316', border: '#FED7AA' },
  'Transferir': { background: '#F3E8FF', color: '#7C3AED', border: '#DDD6FE' },
  'Aceptar': { background: '#D1FAE5', color: '#16A34A', border: '#A7F3D0' }
};

const ResponseCard = ({ risk }) => {
  const zoneColor = getZoneColor(risk.zone);
  const strategyStyle = strategyStyles[risk.strategy] || strategyStyles['Mitigar'];

  return (
    <div style={{
      background: 'white',
      border: '1px solid #E5E7EB',
      borderRadius: '16px',
      padding: '1.5rem',
      marginBottom: '1rem',
      borderLeft: `4px solid ${zoneColor}`,
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#6B21A8',
            background: '#F3E8FF',
            padding: '0.25rem 0.5rem',
            borderRadius: '6px',
            fontFamily: 'monospace'
          }}>{risk.id}</span>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            color: '#111827',
            marginTop: '0.5rem'
          }}>{risk.name}</h3>
        </div>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontSize: '0.8125rem',
          fontWeight: 600,
          background: strategyStyle.background,
          color: strategyStyle.color,
          border: `1px solid ${strategyStyle.border}`
        }}>
          {risk.strategy}
        </span>
      </div>

      <div style={{ marginTop: '1.25rem' }}>
        <div style={{
          fontSize: '0.8125rem',
          fontWeight: 700,
          color: '#6B21A8',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.75rem',
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
              padding: '0.75rem',
              marginBottom: '0.5rem',
              background: '#F9FAFB',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              color: '#374151',
              fontSize: '0.9375rem'
            }}>
              <ArrowRight size={16} color="#6B21A8" style={{ marginTop: '2px', flexShrink: 0 }} />
              {action}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginTop: '1.25rem',
        paddingTop: '1.25rem',
        borderTop: '1px solid #E5E7EB'
      }}>
        <div>
          <div style={{
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: '#6B7280',
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
            background: '#F3E8FF',
            borderRadius: '8px',
            fontSize: '0.875rem',
            color: '#6B21A8',
            fontWeight: 600
          }}>
            {risk.responsible}
          </span>
        </div>

        <div>
          <div style={{
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: '#6B7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Target size={16} />
            Indicador
          </div>
          <p style={{ color: '#4B5563', fontSize: '0.9375rem', margin: 0 }}>{risk.indicator}</p>
        </div>
      </div>
    </div>
  );
};

const Respuesta = () => {
  // Solo mostrar riesgos de nivel Alto y Crítico
  const highAndCriticalRisks = risks.filter(r => r.level >= 10);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem 3rem' }}>
      <div className="section-header">
        <h1>Plan de <span>Respuesta</span></h1>
        <p>FASE 4: Estrategias de respuesta para riesgos de nivel Alto y Crítico</p>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        border: '1px solid #E5E7EB'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: '#111827' }}>
          Estrategias de Respuesta
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{
            padding: '1.25rem',
            background: '#FEF2F2',
            borderRadius: '12px',
            border: '1px solid #FECACA'
          }}>
            <strong style={{ color: '#DC2626', display: 'block', marginBottom: '0.5rem', fontSize: '1.125rem' }}>Evitar</strong>
            <span style={{ color: '#6B7280', fontSize: '0.875rem' }}>Eliminar la amenaza eliminando su causa</span>
          </div>
          <div style={{
            padding: '1.25rem',
            background: '#FFEDD5',
            borderRadius: '12px',
            border: '1px solid #FED7AA'
          }}>
            <strong style={{ color: '#F97316', display: 'block', marginBottom: '0.5rem', fontSize: '1.125rem' }}>Mitigar</strong>
            <span style={{ color: '#6B7280', fontSize: '0.875rem' }}>Reducir la probabilidad e impacto</span>
          </div>
          <div style={{
            padding: '1.25rem',
            background: '#F3E8FF',
            borderRadius: '12px',
            border: '1px solid #DDD6FE'
          }}>
            <strong style={{ color: '#7C3AED', display: 'block', marginBottom: '0.5rem', fontSize: '1.125rem' }}>Transferir</strong>
            <span style={{ color: '#6B7280', fontSize: '0.875rem' }}>Transferir el impacto a terceros</span>
          </div>
          <div style={{
            padding: '1.25rem',
            background: '#D1FAE5',
            borderRadius: '12px',
            border: '1px solid #A7F3D0'
          }}>
            <strong style={{ color: '#16A34A', display: 'block', marginBottom: '0.5rem', fontSize: '1.125rem' }}>Aceptar</strong>
            <span style={{ color: '#6B7280', fontSize: '0.875rem' }}>Asumir el riesgo activa o pasivamente</span>
          </div>
        </div>
      </div>

      <div>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          color: '#111827'
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
