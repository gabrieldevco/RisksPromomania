import { getZoneColor, getZoneLabel, getMitigationStatus } from '../data/risks';
import { TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';

const MitigationDisplay = ({ risk }) => {
  const originalLevel = risk.level;
  const residualLevel = risk.residualLevel || risk.level;
  const originalZone = risk.zone;
  const residualZone = risk.residualZone || risk.zone;
  
  const mitigation = getMitigationStatus(originalLevel, residualLevel);
  const hasChanged = originalLevel !== residualLevel;
  
  if (!hasChanged) {
    return (
      <div style={{
        background: 'rgba(220, 38, 38, 0.1)',
        borderRadius: '8px',
        padding: '0.75rem',
        marginTop: '0.75rem',
        borderLeft: '3px solid #dc2626',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <AlertCircle size={16} color="#dc2626" />
        <span style={{ fontSize: '0.875rem', color: '#fca5a5' }}>
          Sin controles aplicados - Riesgo sin mitigar
        </span>
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(22, 163, 74, 0.1)',
      borderRadius: '8px',
      padding: '1rem',
      marginTop: '0.75rem',
      borderLeft: `3px solid ${mitigation.color}`
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '0.75rem'
      }}>
        <CheckCircle size={18} color={mitigation.color} />
        <span style={{ 
          fontSize: '0.875rem', 
          fontWeight: 600, 
          color: mitigation.color 
        }}>
          Riesgo mitigado {mitigation.status} ({mitigation.reduction.toFixed(0)}%)
        </span>
      </div>

      {/* Comparación Original vs Residual */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: '0.75rem',
        alignItems: 'center'
      }}>
        {/* Original */}
        <div style={{
          background: 'rgba(71, 85, 105, 0.5)',
          borderRadius: '8px',
          padding: '0.75rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '0.625rem',
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.25rem'
          }}>Original</div>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: getZoneColor(originalZone)
          }}>{originalLevel}</div>
          <div style={{
            fontSize: '0.625rem',
            color: '#64748b'
          }}>{getZoneLabel(originalZone)}</div>
        </div>

        {/* Flecha */}
        <TrendingDown size={24} color={mitigation.color} />

        {/* Residual */}
        <div style={{
          background: 'rgba(99, 102, 241, 0.2)',
          borderRadius: '8px',
          padding: '0.75rem',
          textAlign: 'center',
          border: `2px solid ${getZoneColor(residualZone)}`
        }}>
          <div style={{
            fontSize: '0.625rem',
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.25rem'
          }}>Con Controles</div>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: getZoneColor(residualZone)
          }}>{residualLevel}</div>
          <div style={{
            fontSize: '0.625rem',
            color: '#64748b'
          }}>{getZoneLabel(residualZone)}</div>
        </div>
      </div>

      {/* Detalles del impacto */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.5rem',
        marginTop: '0.75rem',
        paddingTop: '0.75rem',
        borderTop: '1px solid rgba(71, 85, 105, 0.5)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.625rem', color: '#94a3b8' }}>Probabilidad</div>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f8fafc' }}>{risk.probability}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.625rem', color: '#94a3b8' }}>Impacto Original</div>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f87171', textDecoration: 'line-through' }}>{risk.impact}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.625rem', color: '#94a3b8' }}>Impacto Residual</div>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4ade80' }}>{risk.residualImpact}</div>
        </div>
      </div>
    </div>
  );
};

export default MitigationDisplay;
