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
  'Diaria': '2026-08-15',
  'Continua': 'Automático',
  'Semanal': '2026-08-22',
  'Mensual': '2026-09-01',
  'Trimestral': '2026-10-30',
  'Semestral': '2026-12-15'
};

const Monitoreo = () => {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem 3rem' }}>
      <div className="section-header">
        <h1>Plan de <span>Monitoreo</span></h1>
        <p>FASE 5: Tablero de seguimiento y control de riesgos</p>
      </div>

      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '20px',
        padding: '2rem',
        overflowX: 'auto',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        border: '1px solid var(--border-color)'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.9375rem'
        }}>
          <thead>
            <tr>
              {['ID', 'Riesgo', 'Indicador', 'Frecuencia', 'Responsable', 'Próxima Revisión'].map((header) => (
                <th key={header} style={{
                  textAlign: 'left',
                  padding: '1rem',
                  color: 'var(--text-secondary)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                  borderBottom: '2px solid var(--border-color)',
                  background: 'var(--bg-hover)'
                }}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {risks.map(risk => {
              const freq = frequencies[risk.id];
              const nextReview = nextReviews[freq];
              const zoneColor = getZoneColor(risk.zone);

              return (
                <tr key={risk.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{
                    padding: '1rem',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    color: '#6B21A8'
                  }}>{risk.id}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}>{risk.name}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{risk.indicator}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      background: `${zoneColor}15`,
                      color: zoneColor,
                      border: `1px solid ${zoneColor}30`
                    }}>
                      {freq}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{risk.responsible}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      background: nextReview === 'Automático' ? 'rgba(22, 163, 74, 0.15)' : 'rgba(107, 33, 168, 0.15)',
                      borderRadius: '8px',
                      color: nextReview === 'Automático' ? '#16A34A' : '#6B21A8',
                      fontWeight: 600,
                      fontSize: '0.8125rem'
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
        {[
          { icon: Clock, color: '#DC2626', title: 'Revisión Diaria', items: ['Monitoreo de uptime', 'Alertas de seguridad', 'Dashboard de métricas'] },
          { icon: Clock, color: '#F97316', title: 'Revisión Semanal', items: ['Publicaciones moderadas', 'Avance del proyecto', 'Tickets críticos'] },
          { icon: Clock, color: '#6B21A8', title: 'Revisión Mensual', items: ['Métricas de negocio', 'Escasez de talento técnico', 'Nuevos riesgos'] },
          { icon: Clock, color: '#7C3AED', title: 'Revisión Trimestral', items: ['Auditoría de seguridad', 'Cumplimiento normativo', 'Preparación lanzamiento 30 Nov'] },
          { icon: Clock, color: '#16A34A', title: 'Hito: Lanzamiento', items: ['Despliegue producción 30 Nov', 'Monitoreo post-lanzamiento', 'Cierre del proyecto'] }
        ].map((section, i) => (
          <div key={i} style={{
            background: 'var(--bg-card)',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 700,
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: section.color
            }}>
              <section.icon size={20} />
              {section.title}
            </h3>
            <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.8, paddingLeft: '1.5rem', margin: 0 }}>
              {section.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Monitoreo;
