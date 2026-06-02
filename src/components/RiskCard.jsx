import Badge from './Badge';
import ControlSlider from './ControlSlider';
import MitigationDisplay from './MitigationDisplay';
import { getZoneLabel, getZoneColor, getZoneLabel as getZoneLabelFunc } from '../data/risks';

const RiskCard = ({ risk, onControlChange }) => {
  const zoneColor = getZoneColor(risk.zone);
  const hasControl = risk.controlLevel > 1;
  const displayZone = hasControl ? risk.residualZone : risk.zone;
  const displayLevel = hasControl ? risk.residualLevel : risk.level;
  const displayColor = getZoneColor(displayZone);

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
        borderTop: `4px solid ${hasControl ? displayColor : zoneColor}`
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
          <Badge zone={risk.zone}>{getZoneLabel(risk.zone)}</Badge>
          {hasControl && (
            <span style={{
              fontSize: '0.625rem',
              color: displayColor,
              fontWeight: 600,
              background: `${displayColor}20`,
              padding: '0.25rem 0.5rem',
              borderRadius: '4px'
            }}>
              → {getZoneLabelFunc(displayZone)}
            </span>
          )}
        </div>
      </div>

      <p style={{
        color: '#cbd5e1',
        fontSize: '0.9375rem',
        lineHeight: 1.6,
        marginBottom: '1rem'
      }}>{risk.description}</p>

      {/* Métricas originales */}
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
            color: hasControl ? '#f87171' : '#6366f1',
            textDecoration: hasControl ? 'line-through' : 'none'
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
            color: zoneColor,
            textDecoration: hasControl ? 'line-through' : 'none'
          }}>{risk.level}</div>
          <div style={{
            fontSize: '0.75rem',
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>Nivel</div>
        </div>
      </div>

      {/* Slider de Control */}
      <ControlSlider risk={risk} onControlChange={onControlChange} />

      {/* Display de Mitigación */}
      <MitigationDisplay risk={risk} />
    </div>
  );
};

export default RiskCard;
