import Badge from './Badge';
import { getZoneLabel, getZoneColor } from '../data/risks';

const RiskCard = ({ risk }) => {
  const zoneColor = getZoneColor(risk.zone);

  return (
    <div 
      className="risk-card"
      style={{
        background: '#334155',
        border: '1px solid #475569',
        borderRadius: '12px',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        borderTop: `4px solid ${zoneColor}`
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem'
      }}>
        <div>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 700,
            color: '#6366f1',
            fontFamily: 'monospace'
          }}>{risk.id}</span>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#f8fafc',
            margin: '0.5rem 0'
          }}>{risk.name}</h3>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.25rem 0.75rem',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 500,
            background: '#475569',
            color: '#94a3b8'
          }}>{risk.category}</span>
        </div>
        <Badge zone={risk.zone}>{getZoneLabel(risk.zone)}</Badge>
      </div>

      <p style={{
        color: '#cbd5e1',
        fontSize: '0.9375rem',
        lineHeight: 1.6,
        marginBottom: '1rem'
      }}>{risk.description}</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid #475569'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#6366f1'
          }}>{risk.probability}</div>
          <div style={{
            fontSize: '0.75rem',
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>Probabilidad</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#6366f1'
          }}>{risk.impact}</div>
          <div style={{
            fontSize: '0.75rem',
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>Impacto</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: zoneColor
          }}>{risk.level}</div>
          <div style={{
            fontSize: '0.75rem',
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>Nivel</div>
        </div>
      </div>
    </div>
  );
};

export default RiskCard;
