import { useState, useMemo } from 'react';
import { risks, getZoneLabel, updateRiskControlLevel, controlLevels } from '../data/risks';
import RiskCard from '../components/RiskCard';

const Riesgos = () => {
  const [filter, setFilter] = useState('all');
  
  // Inicializar riesgos con controlLevel = 1
  const [risksWithControl, setRisksWithControl] = useState(() => 
    risks.map(risk => ({ ...risk, controlLevel: 1, residualImpact: risk.impact, residualLevel: risk.level, residualZone: risk.zone }))
  );

  // Manejar cambio de nivel de control
  const handleControlChange = (riskId, newControlLevel) => {
    setRisksWithControl(prevRisks => 
      prevRisks.map(risk => {
        if (risk.id === riskId) {
          return updateRiskControlLevel(risk, newControlLevel);
        }
        return risk;
      })
    );
  };

  // Filtrar riesgos
  const filteredRisks = useMemo(() => {
    if (filter === 'all') return risksWithControl;
    if (filter === 'residual') return risksWithControl.filter(r => r.controlLevel > 1);
    return risksWithControl.filter(r => r.zone === filter);
  }, [filter, risksWithControl]);

  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'critical', label: 'Críticos' },
    { id: 'high', label: 'Altos' },
    { id: 'medium', label: 'Medios' },
    { id: 'low', label: 'Bajos' },
    { id: 'residual', label: 'Con Controles' }
  ];

  // Calcular estadísticas de mitigación
  const mitigatedCount = risksWithControl.filter(r => r.controlLevel > 1).length;
  const improvedCount = risksWithControl.filter(r => 
    r.controlLevel > 1 && r.residualZone !== r.zone && 
    (r.zone === 'critical' || r.zone === 'high') && 
    (r.residualZone === 'medium' || r.residualZone === 'low')
  ).length;

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem 3rem' }}>
      {/* Header */}
      <div className="section-header">
        <h1>Identificación de <span>Riesgos</span></h1>
        <p>FASE 1: 12 riesgos identificados con sistema de controles dinámicos para mitigación</p>
      </div>

      {/* Resumen de mitigación */}
      <div style={{
        background: 'linear-gradient(135deg, #6B21A8 0%, #7C3AED 100%)',
        borderRadius: '20px',
        padding: '2rem',
        marginBottom: '2rem',
        border: '1px solid #7C3AED'
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '4px 12px', borderRadius: '8px', fontSize: '0.875rem' }}>
            1-5
          </span>
          Sistema de Controles Dinámico
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          {Object.entries(controlLevels).map(([level, data]) => (
            <div key={level} style={{
              background: 'rgba(17, 24, 39, 0.6)',
              borderRadius: '12px',
              padding: '1rem',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#A855F7' }}>{level}</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'white', marginTop: '0.25rem' }}>{data.label}</div>
              <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.25rem' }}>
                {((1 - data.effectiveness) * 100).toFixed(0)}% efectivo
              </div>
            </div>
          ))}
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{ textAlign: 'center', background: 'rgba(17, 24, 39, 0.6)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#A855F7' }}>{mitigatedCount}</div>
            <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>Con controles</div>
          </div>
          <div style={{ textAlign: 'center', background: 'rgba(17, 24, 39, 0.6)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#4ADE80' }}>{improvedCount}</div>
            <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>Mejorados</div>
          </div>
          <div style={{ textAlign: 'center', background: 'rgba(17, 24, 39, 0.6)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#F87171' }}>
              {risksWithControl.filter(r => r.residualZone === 'critical').length}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>Críticos residuales</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '2rem'
      }}>
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              padding: '0.625rem 1.25rem',
              border: filter === f.id ? '2px solid #6B21A8' : '1px solid var(--border-color)',
              borderRadius: '10px',
              background: filter === f.id ? '#6B21A8' : 'var(--bg-card)',
              color: filter === f.id ? 'white' : 'var(--text-primary)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: filter === f.id ? '0 4px 12px rgba(107, 33, 168, 0.2)' : '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid de riesgos */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredRisks.map(risk => (
          <RiskCard key={risk.id} risk={risk} onControlChange={handleControlChange} />
        ))}
      </div>

      {/* Leyenda */}
      <div style={{
        background: 'var(--bg-hover)',
        borderRadius: '20px',
        padding: '2rem',
        marginTop: '3rem',
        border: '1px solid var(--border-color)'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          Leyenda de Evaluación
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '0.9375rem', color: '#6B21A8', marginBottom: '0.75rem', fontWeight: 700 }}>Probabilidad (1-5)</h4>
            <ul style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.8, listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>1</span><span style={{ color: 'var(--text-muted)' }}>Muy Baja</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>2</span><span style={{ color: 'var(--text-muted)' }}>Baja</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>3</span><span style={{ color: 'var(--text-muted)' }}>Media</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>4</span><span style={{ color: 'var(--text-muted)' }}>Alta</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>5</span><span style={{ color: 'var(--text-muted)' }}>Muy Alta</span></li>
            </ul>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '0.9375rem', color: '#6B21A8', marginBottom: '0.75rem', fontWeight: 700 }}>Impacto (1-5)</h4>
            <ul style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.8, listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>1</span><span style={{ color: 'var(--text-muted)' }}>Insignificante</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>2</span><span style={{ color: 'var(--text-muted)' }}>Menor</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>3</span><span style={{ color: 'var(--text-muted)' }}>Moderado</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>4</span><span style={{ color: 'var(--text-muted)' }}>Mayor</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>5</span><span style={{ color: 'var(--text-muted)' }}>Catastrófico</span></li>
            </ul>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '0.9375rem', color: '#6B21A8', marginBottom: '0.75rem', fontWeight: 700 }}>Control (1-5)</h4>
            <ul style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.8, listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>1</span><span style={{ color: 'var(--text-muted)' }}>Nunca (0%)</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>2</span><span style={{ color: 'var(--text-muted)' }}>Rara vez (20%)</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>3</span><span style={{ color: 'var(--text-muted)' }}>Ocasional (40%)</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>4</span><span style={{ color: 'var(--text-muted)' }}>Frecuente (60%)</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>5</span><span style={{ color: 'var(--text-muted)' }}>Siempre (80%)</span></li>
            </ul>
          </div>
          <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '0.9375rem', color: '#6B21A8', marginBottom: '0.75rem', fontWeight: 700 }}>Zonas de Riesgo</h4>
            <ul style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.8, listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>{getZoneLabel('low')}</span><span style={{ color: 'var(--text-muted)' }}>1-4</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>{getZoneLabel('medium')}</span><span style={{ color: 'var(--text-muted)' }}>5-9</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>{getZoneLabel('high')}</span><span style={{ color: 'var(--text-muted)' }}>10-16</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>{getZoneLabel('critical')}</span><span style={{ color: 'var(--text-muted)' }}>17-25</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Riesgos;
