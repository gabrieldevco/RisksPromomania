import { useState } from 'react';
import { risks, getRiskZone, getZoneColor, getZoneLabel } from '../data/risks';

const Matriz = ({ isDarkMode }) => {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  // Crear matriz de probabilidad vs impacto
  const matrix = {};
  for (let p = 1; p <= 5; p++) {
    matrix[p] = {};
    for (let i = 1; i <= 5; i++) {
      matrix[p][i] = [];
    }
  }

  risks.forEach(risk => {
    matrix[risk.probability][risk.impact].push(risk);
  });

  const probLabels = ['', '1-Muy Baja', '2-Baja', '3-Media', '4-Alta', '5-Muy Alta'];
  const impLabels = ['', '1-Insig.', '2-Menor', '3-Moderado', '4-Mayor', '5-Catastrófico'];

  // Análisis de prioridades
  const criticalRisks = risks.filter(r => r.zone === 'critical');
  const highRisks = risks.filter(r => r.zone === 'high');

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem 3rem' }}>
      <div className="section-header">
        <h1>Matriz de <span>Riesgos</span></h1>
        <p>FASE 2 y 3: Análisis cualitativo y matriz de probabilidad vs impacto</p>
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto repeat(5, 1fr)',
          gap: '8px',
          minWidth: '600px'
        }}>
          {/* Header */}
          <div></div>
          {impLabels.slice(1).map((label, i) => (
            <div key={i} style={{
              fontWeight: 700,
              textAlign: 'center',
              padding: '0.75rem 0.5rem',
              color: 'var(--text-secondary)',
              fontSize: '0.8125rem',
              background: 'var(--bg-hover)',
              borderRadius: '8px'
            }}>{label}</div>
          ))}

          {/* Rows */}
          {[5, 4, 3, 2, 1].map(p => (
            <>
              <div key={`label-${p}`} style={{
                fontWeight: 700,
                padding: '0.75rem',
                color: 'var(--text-secondary)',
                fontSize: '0.8125rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                background: 'var(--bg-hover)',
                borderRadius: '8px'
              }}>{probLabels[p]}</div>
              {[1, 2, 3, 4, 5].map(i => {
                const cellRisks = matrix[p][i];
                const level = p * i;
                const zone = getRiskZone(level);
                const zoneColor = getZoneColor(zone);
                const riskIds = cellRisks.map(r => r.id).join(', ');
                const isHovered = hoveredCell && hoveredCell.p === p && hoveredCell.i === i;

                return (
                  <div
                    key={`cell-${p}-${i}`}
                    style={{
                      aspectRatio: '1',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '12px',
                      fontSize: '0.8125rem',
                      fontWeight: 800,
                      background: isHovered ? `${zoneColor}30` : `${zoneColor}15`,
                      color: zoneColor,
                      border: `2px solid ${zoneColor}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      zIndex: isHovered ? 10 : 1,
                      boxShadow: isHovered ? `0 4px 20px ${zoneColor}40` : 'none',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      setHoveredCell({ p, i, risks: cellRisks, level, zone });
                      const rect = e.target.getBoundingClientRect();
                      setTooltipPosition({ 
                        x: rect.left + rect.width / 2, 
                        y: rect.top 
                      });
                    }}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    <span style={{ fontSize: '1.25rem' }}>{level}</span>
                    {riskIds && (
                      <span style={{ fontSize: '0.625rem', fontWeight: 600, marginTop: '2px' }}>
                        {riskIds}
                      </span>
                    )}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {hoveredCell && (
        <div style={{
          position: 'fixed',
          left: tooltipPosition.x,
          top: tooltipPosition.y - 10,
          transform: 'translate(-50%, -100%)',
          background: isDarkMode ? '#1F2937' : 'white',
          border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`,
          borderRadius: '12px',
          padding: '1rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          zIndex: 1000,
          minWidth: '280px',
          maxWidth: '320px',
          pointerEvents: 'none'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem',
            paddingBottom: '0.75rem',
            borderBottom: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`
          }}>
            <span style={{
              background: getZoneColor(hoveredCell.zone),
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              Nivel {hoveredCell.level}
            </span>
            <span style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: isDarkMode ? '#F9FAFB' : '#111827'
            }}>
              {getZoneLabel(hoveredCell.zone)}
            </span>
          </div>
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '0.75rem',
            fontSize: '0.75rem',
            color: isDarkMode ? '#D1D5DB' : '#6B7280'
          }}>
            <span>Probabilidad: {hoveredCell.p}</span>
            <span>•</span>
            <span>Impacto: {hoveredCell.i}</span>
          </div>
          {hoveredCell.risks.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {hoveredCell.risks.map(risk => (
                <div key={risk.id} style={{
                  padding: '0.5rem',
                  background: isDarkMode ? '#111827' : '#F9FAFB',
                  borderRadius: '8px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.25rem'
                  }}>
                    <span style={{
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: '#6B21A8',
                      background: isDarkMode ? '#374151' : '#F3E8FF',
                      padding: '0.125rem 0.375rem',
                      borderRadius: '4px'
                    }}>
                      {risk.id}
                    </span>
                    <span style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: isDarkMode ? '#F9FAFB' : '#111827'
                    }}>
                      {risk.name}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '0.75rem',
                    color: isDarkMode ? '#9CA3AF' : '#6B7280',
                    margin: 0,
                    lineHeight: 1.4
                  }}>
                    {risk.description.substring(0, 80)}...
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginTop: '0.5rem',
                    fontSize: '0.6875rem',
                    color: isDarkMode ? '#D1D5DB' : '#6B7280'
                  }}>
                    <span>Prob: {risk.probability}</span>
                    <span>•</span>
                    <span>Imp: {risk.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              padding: '0.75rem',
              background: isDarkMode ? '#111827' : '#F9FAFB',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <span style={{
                fontSize: '0.8125rem',
                color: isDarkMode ? '#9CA3AF' : '#6B7280'
              }}>
                No hay riesgos asignados a esta celda
              </span>
            </div>
          )}
          {/* Arrow */}
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: `6px solid ${isDarkMode ? '#1F2937' : 'white'}`
          }} />
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            marginBottom: '1rem',
            color: '#DC2626',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '1.25rem' }}>🔴</span> Riesgos Críticos
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {criticalRisks.map(risk => (
              <li key={risk.id} style={{
                padding: '1rem',
                marginBottom: '0.75rem',
                background: 'rgba(220, 38, 38, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(220, 38, 38, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{
                    color: '#DC2626',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    background: 'rgba(220, 38, 38, 0.15)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem'
                  }}>{risk.id}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{risk.name}</span>
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                  Nivel: {risk.level} | Prob: {risk.probability} × Imp: {risk.impact}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          border: '1px solid var(--border-color)'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            marginBottom: '1rem',
            color: '#F97316',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '1.25rem' }}>🟠</span> Riesgos Altos
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {highRisks.map(risk => (
              <li key={risk.id} style={{
                padding: '1rem',
                marginBottom: '0.75rem',
                background: 'rgba(249, 115, 22, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(249, 115, 22, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{
                    color: '#F97316',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    background: 'rgba(249, 115, 22, 0.15)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem'
                  }}>{risk.id}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{risk.name}</span>
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                  Nivel: {risk.level} | Prob: {risk.probability} × Imp: {risk.impact}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Matriz;
