import { getZoneColor } from '../data/risks';
import { AlertTriangle, Shield, Activity, TrendingUp, ArrowRight, Users, ShoppingBag, DollarSign, ShieldCheck, Zap } from 'lucide-react';

const StatCard = ({ zone, value, label, icon: Icon, subtitle }) => {
  const color = getZoneColor(zone);

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: `1px solid ${color}30`,
      borderRadius: '16px',
      padding: '1.5rem',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        background: `${color}15`,
        borderRadius: '12px',
        width: '56px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1rem'
      }}>
        <Icon size={28} color={color} />
      </div>
      <div style={{
        fontSize: '2.5rem',
        fontWeight: 800,
        color: color,
        lineHeight: 1
      }}>{value}</div>
      <div style={{
        fontSize: '0.875rem',
        color: 'var(--text-primary)',
        fontWeight: 600,
        marginTop: '0.25rem'
      }}>{label}</div>
      {subtitle && (
        <div style={{
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          marginTop: '0.25rem'
        }}>{subtitle}</div>
      )}
    </div>
  );
};

const Dashboard = ({ setActiveSection, risksWithControl, riskStats }) => {
  const total = risksWithControl.length;

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #6B21A8 0%, #9333EA 50%, #A855F7 100%)',
        padding: '4rem 2rem 6rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Left Content */}
          <div>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.2,
              marginBottom: '1rem'
            }}>
              Gestión de{' '}
              <span style={{ color: '#FBBF24' }}>riesgos</span>
              <br />
              en Promomania
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '2rem',
              maxWidth: '500px'
            }}>
              Sistema integral de identificación, análisis y control de riesgos 
              para la plataforma de promociones verificadas #1 en Colombia.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => setActiveSection('riesgos')}
                style={{
                  background: 'linear-gradient(135deg, #F97316, #FB923C)',
                  color: 'white',
                  border: 'none',
                  padding: '0.875rem 2rem',
                  borderRadius: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '1rem'
                }}
              >
                Ver Riesgos
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => setActiveSection('matriz')}
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid rgba(255,255,255,0.3)',
                  padding: '0.875rem 2rem',
                  borderRadius: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Matriz de Riesgos
              </button>
            </div>
          </div>
          
          {/* Right Content - Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem'
          }}>
            {[
              { icon: ShoppingBag, value: '5.000+', label: 'Promociones', color: '#FBBF24' },
              { icon: Users, value: '25.000+', label: 'Usuarios', color: '#FBBF24' },
              { icon: DollarSign, value: '$2M+', label: 'Ahorros', color: '#FBBF24' }
            ].map((stat, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '1.5rem 1rem',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <stat.icon size={28} color={stat.color} style={{ marginBottom: '0.75rem' }} />
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'white'
                }}>{stat.value}</div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.8)'
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '3rem 2rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <StatCard zone="critical" value={riskStats.critical} label="Riesgos Críticos" icon={AlertTriangle} subtitle="Requieren acción inmediata" />
          <StatCard zone="high" value={riskStats.high} label="Riesgos Altos" icon={Shield} subtitle="Plan de mitigación activo" />
          <StatCard zone="medium" value={riskStats.medium} label="Riesgos Medios" icon={Activity} subtitle="En monitoreo" />
          <StatCard zone="low" value={riskStats.low} label="Riesgos Bajos" icon={TrendingUp} subtitle="Aceptables" />
        </div>

        {/* Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem'
        }}>
          {/* Distribution Chart */}
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            border: '1px solid var(--border-color)'
          }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              color: 'var(--text-primary)'
            }}>Distribución de Riesgos</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { zone: 'critical', value: riskStats.critical, label: 'Crítico' },
                { zone: 'high', value: riskStats.high, label: 'Alto' },
                { zone: 'medium', value: riskStats.medium, label: 'Medio' },
                { zone: 'low', value: riskStats.low, label: 'Bajo' }
              ].map(item => {
                const percentage = (item.value / total) * 100;
                const color = getZoneColor(item.zone);
                return (
                  <div key={item.zone} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{
                      minWidth: '80px',
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      fontWeight: 500
                    }}>
                      {item.label}
                    </span>
                    <div style={{
                      flex: 1,
                      height: '40px',
                      background: 'var(--bg-hover)',
                      borderRadius: '10px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${percentage}%`,
                        height: '100%',
                        background: color,
                        borderRadius: '10px',
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
                    <span style={{
                      minWidth: '45px',
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      textAlign: 'right'
                    }}>
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary Card */}
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <ShieldCheck size={24} color="#6B21A8" />
              Resumen Ejecutivo
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: AlertTriangle, color: '#DC2626', text: `Total de riesgos identificados: ${total}` },
                { icon: Zap, color: '#F97316', text: `Riesgos críticos requieren acción: ${riskStats.critical}` },
                { icon: Shield, color: '#6B21A8', text: `Riesgos altos con plan activo: ${riskStats.high}` },
                { icon: Activity, color: '#22C55E', text: `Riesgos en monitoreo: ${riskStats.medium + riskStats.low}` }
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: 'var(--bg-hover)',
                  borderRadius: '12px',
                  borderLeft: `3px solid ${item.color}`
                }}>
                  <item.icon size={20} color={item.color} />
                  <span style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
