import { risks, riskStats, getZoneColor } from '../data/risks';
import { AlertTriangle, Shield, Activity, TrendingUp } from 'lucide-react';

const StatCard = ({ zone, value, label, icon: Icon }) => {
  const color = getZoneColor(zone);
  
  return (
    <div style={{
      background: '#334155',
      border: `1px solid ${color}`,
      borderRadius: '12px',
      padding: '2rem',
      textAlign: 'center',
      transition: 'all 0.3s ease'
    }}>
      <Icon size={32} color={color} style={{ marginBottom: '1rem' }} />
      <div style={{
        fontSize: '3rem',
        fontWeight: 800,
        color: color,
        lineHeight: 1
      }}>{value}</div>
      <div style={{
        fontSize: '0.875rem',
        color: '#94a3b8',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginTop: '0.5rem'
      }}>{label}</div>
    </div>
  );
};

const Dashboard = () => {
  const total = risks.length;

  return (
    <div>
      <div className="section-header">
        <h1>Dashboard de Riesgos</h1>
        <p>Panel de control del Plan de Gestión de Riesgos de Promomania</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        <StatCard zone="critical" value={riskStats.critical} label="Críticos" icon={AlertTriangle} />
        <StatCard zone="high" value={riskStats.high} label="Altos" icon={Shield} />
        <StatCard zone="medium" value={riskStats.medium} label="Medios" icon={Activity} />
        <StatCard zone="low" value={riskStats.low} label="Bajos" icon={TrendingUp} />
      </div>

      <div style={{
        background: '#334155',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          fontSize: '1.125rem',
          fontWeight: 600,
          marginBottom: '1rem',
          color: '#f8fafc'
        }}>Distribución de Riesgos</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { zone: 'critical', value: riskStats.critical, label: 'Crítico' },
            { zone: 'high', value: riskStats.high, label: 'Alto' },
            { zone: 'medium', value: riskStats.medium, label: 'Medio' },
            { zone: 'low', value: riskStats.low, label: 'Bajo' }
          ].map(item => {
            const percentage = (item.value / total) * 100;
            return (
              <div key={item.zone} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ minWidth: '80px', fontSize: '0.875rem', color: '#94a3b8', fontWeight: 500 }}>
                  {item.label}
                </span>
                <div style={{ flex: 1, height: '32px', background: '#1e293b', borderRadius: '8px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${percentage}%`,
                    height: '100%',
                    background: getZoneColor(item.zone),
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: '1rem',
                    transition: 'width 1s ease'
                  }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'white' }}>
                      {item.value}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{ background: '#334155', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#f8fafc' }}>
            Resumen Ejecutivo
          </h3>
          <ul style={{ color: '#cbd5e1', fontSize: '0.9375rem', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
            <li>Total de riesgos identificados: <strong>{total}</strong></li>
            <li>Riesgos críticos que requieren acción inmediata: <strong>{riskStats.critical}</strong></li>
            <li>Riesgos altos con plan de respuesta definido: <strong>{riskStats.high}</strong></li>
            <li>Riesgos en monitoreo continuo: <strong>{riskStats.medium + riskStats.low}</strong></li>
          </ul>
        </div>

        <div style={{ background: '#334155', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#f8fafc' }}>
            Alertas Activas
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              padding: '0.75rem',
              background: 'rgba(220, 38, 38, 0.1)',
              borderRadius: '8px',
              borderLeft: '3px solid #dc2626'
            }}>
              <AlertTriangle size={20} color="#dc2626" />
              <span style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>
                2 riesgos críticos requieren atención inmediata
              </span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              padding: '0.75rem',
              background: 'rgba(234, 88, 12, 0.1)',
              borderRadius: '8px',
              borderLeft: '3px solid #ea580c'
            }}>
              <Shield size={20} color="#ea580c" />
              <span style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>
                5 riesgos altos con plan de mitigación activo
              </span>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              padding: '0.75rem',
              background: 'rgba(22, 163, 74, 0.1)',
              borderRadius: '8px',
              borderLeft: '3px solid #16a34a'
            }}>
              <Activity size={20} color="#16a34a" />
              <span style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>
                Sistema de monitoreo operativo
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
