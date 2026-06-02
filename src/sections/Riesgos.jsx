import { useState } from 'react';
import { risks, getZoneLabel } from '../data/risks';
import RiskCard from '../components/RiskCard';

const Riesgos = () => {
  const [filter, setFilter] = useState('all');

  const filteredRisks = filter === 'all' 
    ? risks 
    : risks.filter(r => r.zone === filter);

  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'critical', label: 'Críticos' },
    { id: 'high', label: 'Altos' },
    { id: 'medium', label: 'Medios' },
    { id: 'low', label: 'Bajos' }
  ];

  return (
    <div>
      <div className="section-header">
        <h1>Identificación de Riesgos</h1>
        <p>FASE 1: 12 riesgos identificados que podrían afectar el proyecto Promomania</p>
      </div>

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

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredRisks.map(risk => (
          <RiskCard key={risk.id} risk={risk} />
        ))}
      </div>

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
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem'
        }}>
          <div>
            <h4 style={{ fontSize: '0.875rem', color: '#6366f1', marginBottom: '0.5rem' }}>Probabilidad (1-5)</h4>
            <ul style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6 }}>
              <li>1 - Muy Baja</li>
              <li>2 - Baja</li>
              <li>3 - Media</li>
              <li>4 - Alta</li>
              <li>5 - Muy Alta</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '0.875rem', color: '#6366f1', marginBottom: '0.5rem' }}>Impacto (1-5)</h4>
            <ul style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6 }}>
              <li>1 - Insignificante</li>
              <li>2 - Menor</li>
              <li>3 - Moderado</li>
              <li>4 - Mayor</li>
              <li>5 - Catastrófico</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '0.875rem', color: '#6366f1', marginBottom: '0.5rem' }}>Nivel de Riesgo</h4>
            <ul style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.6 }}>
              <li>1-4: {getZoneLabel('low')}</li>
              <li>5-9: {getZoneLabel('medium')}</li>
              <li>10-16: {getZoneLabel('high')}</li>
              <li>17-25: {getZoneLabel('critical')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Riesgos;
