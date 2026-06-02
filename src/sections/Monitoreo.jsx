import { risks, getZoneColor } from '../data/risks';
import { Clock, Activity } from 'lucide-react';

const frequencies = {
  'R02': 'Diaria',
  'R09': 'Trimestral',
  'R05': 'Diaria',
  'R06': 'Continua',
  'R01': 'Semanal',
  'R03': 'Mensual',
  'R12': 'Mensual',
  'R04': 'Trimestral',
  'R07': 'Semestral',
  'R08': 'Semanal',
  'R10': 'Continua',
  'R11': 'Mensual'
};

const nextReviews = {
  'Diaria': '2024-01-15',
  'Continua': 'Automático',
  'Semanal': '2024-01-22',
  'Mensual': '2024-02-01',
  'Trimestral': '2024-03-31',
  'Semestral': '2024-06-30'
};

const Monitoreo = () => {
  return (
    <div>
      <div className="section-header">
        <h1>Plan de Monitoreo</h1>
        <p>FASE 5: Tablero de seguimiento y control de riesgos</p>
      </div>

      <div style={{
        background: '#334155',
        borderRadius: '12px',
        padding: '1.5rem',
        overflowX: 'auto',
        marginBottom: '2rem'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.9375rem'
        }}>
          <thead>
            <tr>
              <th style={{
                textAlign: 'left',
                padding: '0.75rem 1rem',
                color: '#94a3b8',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                borderBottom: '2px solid #475569'
              }}>ID</th>
              <th style={{
                textAlign: 'left',
                padding: '0.75rem 1rem',
                color: '#94a3b8',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                borderBottom: '2px solid #475569'
              }}>Riesgo</th>
              <th style={{
                textAlign: 'left',
                padding: '0.75rem 1rem',
                color: '#94a3b8',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                borderBottom: '2px solid #475569'
              }}>Indicador</th>
              <th style={{
                textAlign: 'left',
                padding: '0.75rem 1rem',
                color: '#94a3b8',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                borderBottom: '2px solid #475569'
              }}>Frecuencia</th>
              <th style={{
                textAlign: 'left',
                padding: '0.75rem 1rem',
                color: '#94a3b8',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                borderBottom: '2px solid #475569'
              }}>Responsable</th>
              <th style={{
                textAlign: 'left',
                padding: '0.75rem 1rem',
                color: '#94a3b8',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                borderBottom: '2px solid #475569'
              }}>Próxima Revisión</th>
            </tr>
          </thead>
          <tbody>
            {risks.map(risk => {
              const freq = frequencies[risk.id];
              const nextReview = nextReviews[freq];
              const zoneColor = getZoneColor(risk.zone);

              return (
                <tr key={risk.id} style={{ borderBottom: '1px solid #475569' }}>
                  <td style={{
                    padding: '1rem',
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    color: '#6366f1'
                  }}>{risk.id}</td>
                  <td style={{ padding: '1rem', color: '#f8fafc' }}>{risk.name}</td>
                  <td style={{ padding: '1rem', color: '#cbd5e1', fontSize: '0.875rem' }}>{risk.indicator}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      background: `${zoneColor}30`,
                      color: zoneColor,
                      border: `1px solid ${zoneColor}`
                    }}>
                      {freq}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: '#cbd5e1' }}>{risk.responsible}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: nextReview === 'Automático' ? '#86efac' : '#cbd5e1'
                    }}>
                      <Activity size={14} />
                      {nextReview}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{ background: '#334155', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Clock size={20} color="#6366f1" />
            Revisión Diaria
          </h3>
          <ul style={{ color: '#cbd5e1', fontSize: '0.9375rem', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
            <li>Monitoreo de uptime y performance</li>
            <li>Alertas de seguridad</li>
            <li>Dashboard de métricas clave</li>
          </ul>
        </div>

        <div style={{ background: '#334155', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Clock size={20} color="#ca8a04" />
            Revisión Semanal
          </h3>
          <ul style={{ color: '#cbd5e1', fontSize: '0.9375rem', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
            <li>Publicaciones reportadas/moderadas</li>
            <li>Avance del proyecto</li>
            <li>Tickets de soporte críticos</li>
          </ul>
        </div>

        <div style={{ background: '#334155', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Clock size={20} color="#0ea5e9" />
            Revisión Mensual
          </h3>
          <ul style={{ color: '#cbd5e1', fontSize: '0.9375rem', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
            <li>Métricas de negocio</li>
            <li>Retención de talento</li>
            <li>Nuevos riesgos identificados</li>
          </ul>
        </div>

        <div style={{ background: '#334155', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Clock size={20} color="#8b5cf6" />
            Revisión Trimestral
          </h3>
          <ul style={{ color: '#cbd5e1', fontSize: '0.9375rem', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
            <li>Auditoría de seguridad</li>
            <li>Cumplimiento normativo</li>
            <li>Análisis de competencia</li>
            <li>Actualización del plan</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Monitoreo;
