import Badge from './Badge';
import ControlSlider from './ControlSlider';
import MitigationDisplay from './MitigationDisplay';
import { getZoneLabel, getZoneColor } from '../data/risks';
import { Shield, AlertCircle } from 'lucide-react';

const RiskCard = ({ risk, onControlChange }) => {
  const zoneColor = getZoneColor(risk.zone);
  const hasControl = risk.controlLevel > 1;
  const displayZone = hasControl ? risk.residualZone : risk.zone;
  const displayColor = getZoneColor(displayZone);

  return (
    <div 
      className="risk-card"
      style={{
        background: 'white',
        border: '1px solid #E5E7EB',
        borderRadius: '16px',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        borderLeft: `4px solid ${hasControl ? displayColor : zoneColor}`
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#6B21A8',
              background: '#F3E8FF',
              padding: '0.25rem 0.5rem',
              borderRadius: '6px'
            }}>{risk.id}</span>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.25rem 0.5rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 500,
              background: '#F3F4F6',
              color: '#6B7280'
            }}>
              <Shield size={12} />
              {risk.category}
            </span>
          </div>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            color: '#111827',
            marginBottom: '0.5rem'
          }}>{risk.name}</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
          <Badge zone={risk.zone}>{getZoneLabel(risk.zone)}</Badge>
          {hasControl && (
            <span style={{
              fontSize: '0.625rem',
              color: displayColor,
              fontWeight: 700,
              background: `${displayColor}15`,
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              → {getZoneLabel(displayZone)}
            </span>
          )}
        </div>
      </div>

      <p style={{
        color: '#6B7280',
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
        borderTop: '1px solid #F3F4F6'
      }}>
        <div style={{ 
          textAlign: 'center',
          padding: '0.75rem',
          background: '#F9FAFB',
          borderRadius: '10px'
        }}>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: '#6B21A8'
          }}>{risk.probability}</div>
          <div style={{
            fontSize: '0.6875rem',
            color: '#9CA3AF',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 600,
            marginTop: '0.25rem'
          }}>Probabilidad</div>
        </div>
        <div style={{ 
          textAlign: 'center',
          padding: '0.75rem',
          background: '#F9FAFB',
          borderRadius: '10px'
        }}>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: hasControl ? '#9CA3AF' : '#6B21A8',
            textDecoration: hasControl ? 'line-through' : 'none'
          }}>{risk.impact}</div>
          <div style={{
            fontSize: '0.6875rem',
            color: '#9CA3AF',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 600,
            marginTop: '0.25rem'
          }}>Impacto</div>
        </div>
        <div style={{ 
          textAlign: 'center',
          padding: '0.75rem',
          background: '#F9FAFB',
          borderRadius: '10px'
        }}>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: zoneColor,
            textDecoration: hasControl ? 'line-through' : 'none'
          }}>{risk.level}</div>
          <div style={{
            fontSize: '0.6875rem',
            color: '#9CA3AF',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 600,
            marginTop: '0.25rem'
          }}>Nivel</div>
        </div>
      </div>

      {/* Alerta si no hay controles */}
      {!hasControl && risk.zone === 'critical' && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '1rem',
          padding: '0.75rem 1rem',
          background: '#FEF2F2',
          borderRadius: '8px',
          border: '1px solid #FECACA'
        }}>
          <AlertCircle size={16} color="#DC2626" />
          <span style={{ fontSize: '0.75rem', color: '#DC2626', fontWeight: 600 }}>
            Riesgo crítico - Aplicar controles urgentemente
          </span>
        </div>
      )}

      {/* Slider de Control */}
      <ControlSlider risk={risk} onControlChange={onControlChange} />

      {/* Display de Mitigación */}
      <MitigationDisplay risk={risk} />
    </div>
  );
};

export default RiskCard;
