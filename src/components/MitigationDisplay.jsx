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
        background: '#FEF2F2',
        borderRadius: '12px',
        padding: '1rem',
        marginTop: '1rem',
        border: '1px solid #FECACA',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          background: '#DC2626',
          borderRadius: '8px',
          padding: '6px'
        }}>
          <AlertCircle size={16} color="white" />
        </div>
        <span style={{ fontSize: '0.875rem', color: '#DC2626', fontWeight: 600 }}>
          Sin controles aplicados - Riesgo sin mitigar
        </span>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
      borderRadius: '16px',
      padding: '1.25rem',
      marginTop: '1rem',
      border: '1px solid #A7F3D0'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #A7F3D0'
      }}>
        <div style={{
          background: '#16A34A',
          borderRadius: '8px',
          padding: '6px'
        }}>
          <CheckCircle size={18} color="white" />
        </div>
        <span style={{ 
          fontSize: '0.9375rem', 
          fontWeight: 700, 
          color: '#16A34A' 
        }}>
          Riesgo mitigado {mitigation.status}
        </span>
        <span style={{
          marginLeft: 'auto',
          background: '#16A34A',
          color: 'white',
          padding: '0.25rem 0.75rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 700
        }}>
          -{mitigation.reduction.toFixed(0)}%
        </span>
      </div>

      {/* Comparación Original vs Residual */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: '1rem',
        alignItems: 'center'
      }}>
        {/* Original */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '1rem',
          textAlign: 'center',
          border: '1px solid #E5E7EB'
        }}>
          <div style={{
            fontSize: '0.625rem',
            color: '#9CA3AF',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem',
            fontWeight: 600
          }}>Original</div>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: getZoneColor(originalZone)
          }}>{originalLevel}</div>
          <div style={{
            fontSize: '0.75rem',
            color: '#6B7280',
            fontWeight: 500,
            marginTop: '0.25rem'
          }}>{getZoneLabel(originalZone)}</div>
        </div>

        {/* Flecha */}
        <div style={{
          background: '#16A34A',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <TrendingDown size={20} color="white" />
        </div>

        {/* Residual */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '1rem',
          textAlign: 'center',
          border: `2px solid ${getZoneColor(residualZone)}`,
          boxShadow: `0 4px 12px ${getZoneColor(residualZone)}20`
        }}>
          <div style={{
            fontSize: '0.625rem',
            color: '#9CA3AF',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem',
            fontWeight: 600
          }}>Con Controles</div>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: getZoneColor(residualZone)
          }}>{residualLevel}</div>
          <div style={{
            fontSize: '0.75rem',
            color: '#6B7280',
            fontWeight: 500,
            marginTop: '0.25rem'
          }}>{getZoneLabel(residualZone)}</div>
        </div>
      </div>

      {/* Detalles del impacto */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.75rem',
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px solid #A7F3D0'
      }}>
        <div style={{ 
          textAlign: 'center',
          background: 'white',
          padding: '0.75rem',
          borderRadius: '10px'
        }}>
          <div style={{ fontSize: '0.625rem', color: '#9CA3AF', fontWeight: 600 }}>Probabilidad</div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#6B21A8', marginTop: '0.25rem' }}>{risk.probability}</div>
        </div>
        <div style={{ 
          textAlign: 'center',
          background: 'white',
          padding: '0.75rem',
          borderRadius: '10px'
        }}>
          <div style={{ fontSize: '0.625rem', color: '#9CA3AF', fontWeight: 600 }}>Impacto Original</div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#9CA3AF', textDecoration: 'line-through', marginTop: '0.25rem' }}>{risk.impact}</div>
        </div>
        <div style={{ 
          textAlign: 'center',
          background: 'white',
          padding: '0.75rem',
          borderRadius: '10px'
        }}>
          <div style={{ fontSize: '0.625rem', color: '#9CA3AF', fontWeight: 600 }}>Impacto Residual</div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#16A34A', marginTop: '0.25rem' }}>{risk.residualImpact}</div>
        </div>
      </div>
    </div>
  );
};

export default MitigationDisplay;
