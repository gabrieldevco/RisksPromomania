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
    <div>
      <div className="section-header">
        <h1>Identificación de Riesgos</h1>
        <p>FASE 1: 12 riesgos identificados con controles dinámicos para mitigación</p>
      </div>

      {/* Resumen de mitigación */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(14, 165, 233, 0.1))',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem',
        border: '1px solid rgba(99, 102, 241, 0.3)'
      }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: '#f8fafc' }}>
          Sistema de Controles Dinámico (1-5)
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          {Object.entries(controlLevels).map(([level, data]) => (
            <div key={level} style={{
              background: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '8px',
              padding: '0.75rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#6366f1' }}>{level}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#f8fafc' }}>{data.label}</div>
              <div style={{ fontSize: '0.625rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                Efectividad: {((1 - data.effectiveness) * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(71, 85, 105, 0.5)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#6366f1' }}>{mitigatedCount}</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Riesgos con controles</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#16a34a' }}>{improvedCount}</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Riesgos mejorados</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ca8a04' }}>
              {risksWithControl.filter(r => r.residualZone === 'critical').length}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Críticos residuales</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem',
        padding: '1.5rem',
        background: '#334155',
        borderRadius: '12px'
      }}>
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              padding: '0.625rem 1.25rem',
              border: '1px solid #475569',
              borderRadius: '8px',
              background: filter === f.id ? '#6366f1' : '#1e293b',
              color: filter === f.id ? 'white' : '#94a3b8',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
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
        background: '#334155',
        borderRadius: '12px',
        padding: '1.5rem',
        marginTop: '2rem'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
          Leyenda de Evaluación
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div>
            <h4 style={{ fontSize: '0.875rem', color: '#6366f1', marginBottom: '0.5rem' }}>Probabilidad (1-5)</h4>
            <ul style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6, listStyle: 'none', padding: 0 }}>
              <li>1 - Muy Baja</li>
              <li>2 - Baja</li>
              <li>3 - Media</li>
              <li>4 - Alta</li>
              <li>5 - Muy Alta</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '0.875rem', color: '#6366f1', marginBottom: '0.5rem' }}>Impacto Original (1-5)</h4>
            <ul style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6, listStyle: 'none', padding: 0 }}>
              <li>1 - Insignificante</li>
              <li>2 - Menor</li>
              <li>3 - Moderado</li>
              <li>4 - Mayor</li>
              <li>5 - Catastrófico</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '0.875rem', color: '#6366f1', marginBottom: '0.5rem' }}>Nivel de Control (1-5)</h4>
            <ul style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6, listStyle: 'none', padding: 0 }}>
              <li>1 - Nunca (0% efectivo)</li>
              <li>2 - Rara vez (20%)</li>
              <li>3 - Ocasionalmente (40%)</li>
              <li>4 - Frecuentemente (60%)</li>
              <li>5 - Siempre (80%)</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '0.875rem', color: '#6366f1', marginBottom: '0.5rem' }}>Zonas de Riesgo</h4>
            <ul style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6, listStyle: 'none', padding: 0 }}>
              <li>{getZoneLabel('low')} (1-4)</li>
              <li>{getZoneLabel('medium')} (5-9)</li>
              <li>{getZoneLabel('high')} (10-16)</li>
              <li>{getZoneLabel('critical')} (17-25)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Riesgos;
