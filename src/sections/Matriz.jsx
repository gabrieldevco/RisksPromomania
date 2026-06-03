import React, { useState } from 'react';
import { getRiskZone, getZoneColor, getZoneLabel } from '../data/risks';
import { AlertTriangle, Target, Shield, Eye, Info } from 'lucide-react';

const Matriz = ({ isDarkMode, risksWithControl }) => {
  // Usar riesgos con controles aplicados
  const risks = risksWithControl || [];
  const [hoveredCell, setHoveredCell] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedZone, setSelectedZone] = useState(null);
  
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
  const impLabels = ['', '1-Insignificante', '2-Menor', '3-Moderado', '4-Mayor', '5-Catastrófico'];

  // Análisis de prioridades
  const criticalRisks = risks.filter(r => r.zone === 'critical');
  const highRisks = risks.filter(r => r.zone === 'high');
  const mediumRisks = risks.filter(r => r.zone === 'medium');
  const lowRisks = risks.filter(r => r.zone === 'low');

  // Zone backgrounds with gradient effect
  const getZoneBackground = (zone, isHovered) => {
    const opacity = isHovered ? '35' : '20';
    const colors = {
      critical: `linear-gradient(135deg, rgba(220, 38, 38, 0.${opacity}) 0%, rgba(220, 38, 38, 0.${parseInt(opacity)-5}) 100%)`,
      high: `linear-gradient(135deg, rgba(249, 115, 22, 0.${opacity}) 0%, rgba(249, 115, 22, 0.${parseInt(opacity)-5}) 100%)`,
      medium: `linear-gradient(135deg, rgba(234, 179, 8, 0.${opacity}) 0%, rgba(234, 179, 8, 0.${parseInt(opacity)-5}) 100%)`,
      low: `linear-gradient(135deg, rgba(34, 197, 94, 0.${opacity}) 0%, rgba(34, 197, 94, 0.${parseInt(opacity)-5}) 100%)`
    };
    return colors[zone] || colors.low;
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem 3rem' }}>
      {/* Header con Timeline de Fases */}
      <div className="section-header">
        <h1>Matriz de <span>Riesgos</span></h1>
        <p>FASE 2 y 3: Análisis cualitativo y matriz de probabilidad vs impacto</p>
      </div>

      {/* Timeline Visual de las 5 Fases */}
      <div className="phase-timeline" style={{ marginBottom: '3rem', padding: '0 2rem' }}>
        {[
          { num: '1', label: 'Identificación', active: true },
          { num: '2', label: 'Análisis', active: true },
          { num: '3', label: 'Matriz', active: true },
          { num: '4', label: 'Respuesta', active: false },
          { num: '5', label: 'Monitoreo', active: false }
        ].map((phase, idx) => (
          <div key={idx} className="phase-item">
            <div className={`phase-dot ${phase.active ? 'active' : ''}`}>
              {phase.num}
            </div>
            <span className="phase-label">{phase.label}</span>
          </div>
        ))}
      </div>

      {/* Alerta Informativa */}
      <div className="alert alert-info" style={{ marginBottom: '2rem' }}>
        <Info size={20} />
        <div>
          <strong>Análisis de Riesgos:</strong> La matriz muestra la distribución de riesgos según Probabilidad (eje Y) e Impacto (eje X). 
          Los riesgos en zonas rojas requieren atención inmediata.
        </div>
      </div>

      {/* Grid de Estadísticas Rápidas */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card" style={{ borderTop: '4px solid #DC2626' }}>
          <div className="stat-value" style={{ color: '#DC2626' }}>{criticalRisks.length}</div>
          <div className="stat-label">Críticos 🔴</div>
        </div>
        <div className="stat-card" style={{ borderTop: '4px solid #F97316' }}>
          <div className="stat-value" style={{ color: '#F97316' }}>{highRisks.length}</div>
          <div className="stat-label">Altos 🟠</div>
        </div>
        <div className="stat-card" style={{ borderTop: '4px solid #EAB308' }}>
          <div className="stat-value" style={{ color: '#EAB308' }}>{mediumRisks.length}</div>
          <div className="stat-label">Medios 🟡</div>
        </div>
        <div className="stat-card" style={{ borderTop: '4px solid #22C55E' }}>
          <div className="stat-value" style={{ color: '#22C55E' }}>{lowRisks.length}</div>
          <div className="stat-label">Bajos 🟢</div>
        </div>
      </div>

      {/* Matriz Principal Mejorada */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '24px',
        padding: '2.5rem',
        overflowX: 'auto',
        marginBottom: '2.5rem',
        boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
        border: '1px solid var(--border-color)'
      }}>
        {/* Título de la Matriz */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>Matriz de Probabilidad × Impacto</h3>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)'
          }}>Probabilidad (Eje Vertical) vs Impacto (Eje Horizontal)</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '100px repeat(5, 1fr)',
          gap: '10px',
          minWidth: '700px'
        }}>
          {/* Header - Impacto */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: '1rem'
          }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#6B21A8',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)'
            }}>
              Probabilidad →
            </span>
          </div>
          {impLabels.slice(1).map((label, i) => (
            <div key={i} style={{
              fontWeight: 700,
              textAlign: 'center',
              padding: '0.875rem 0.5rem',
              color: 'white',
              fontSize: '0.75rem',
              background: 'linear-gradient(135deg, #6B21A8 0%, #A855F7 100%)',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(107, 33, 168, 0.3)'
            }}>
              {label}
            </div>
          ))}

          {/* Rows */}
          {[5, 4, 3, 2, 1].map(p => (
            <React.Fragment key={`row-${p}`}>
              <div style={{
                fontWeight: 700,
                padding: '0.875rem 0.75rem',
                color: 'white',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #6B21A8 0%, #A855F7 100%)',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(107, 33, 168, 0.3)'
              }}>
                {probLabels[p]}
              </div>
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
                      borderRadius: '14px',
                      fontSize: '0.875rem',
                      fontWeight: 800,
                      background: getZoneBackground(zone, isHovered),
                      color: zoneColor,
                      border: `3px solid ${zoneColor}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                      zIndex: isHovered ? 10 : 1,
                      boxShadow: isHovered 
                        ? `0 8px 30px ${zoneColor}50, 0 0 0 4px ${zoneColor}20` 
                        : `0 2px 8px ${zoneColor}30`,
                      position: 'relative',
                      minHeight: '90px'
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
                    onClick={() => setSelectedZone(selectedZone === zone ? null : zone)}
                  >
                    <span style={{ 
                      fontSize: '1.5rem',
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}>{level}</span>
                    {cellRisks.length > 0 && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        marginTop: '4px',
                        padding: '2px 8px',
                        background: 'rgba(255,255,255,0.9)',
                        borderRadius: '12px',
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        color: zoneColor,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                      }}>
                        <AlertTriangle size={10} />
                        {cellRisks.length} riesgo{cellRisks.length > 1 ? 's' : ''}
                      </div>
                    )}
                    {riskIds && !cellRisks.length && (
                      <span style={{ fontSize: '0.625rem', fontWeight: 600, marginTop: '2px' }}>
                        {riskIds}
                      </span>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Label Eje X */}
        <div style={{
          textAlign: 'center',
          marginTop: '1rem',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: '#6B21A8',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          ← Impacto →
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

      {/* Leyenda de la Matriz */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '20px',
        padding: '1.5rem 2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        border: '1px solid var(--border-color)'
      }}>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Target size={18} />
          Leyenda de Zonas de Riesgo
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {[
            { zone: 'critical', label: 'Crítico', range: '17-25', icon: '🔴', desc: 'Atención inmediata requerida', color: '#DC2626' },
            { zone: 'high', label: 'Alto', range: '10-16', icon: '🟠', desc: 'Plan de respuesta necesario', color: '#F97316' },
            { zone: 'medium', label: 'Medio', range: '5-9', icon: '🟡', desc: 'Monitoreo regular', color: '#EAB308' },
            { zone: 'low', label: 'Bajo', range: '1-4', icon: '🟢', desc: 'Monitoreo ocasional', color: '#22C55E' }
          ].map(item => (
            <div key={item.zone} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.875rem',
              background: `linear-gradient(135deg, ${item.color}15, ${item.color}08)`,
              borderRadius: '12px',
              border: `1px solid ${item.color}30`,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <div>
                <div style={{
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: item.color
                }}>
                  {item.label} ({item.range})
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)'
                }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Respuestas a las Preguntas del Análisis */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)',
          borderRadius: '20px',
          padding: '1.5rem',
          border: '2px solid rgba(220, 38, 38, 0.3)',
          boxShadow: '0 4px 20px rgba(220, 38, 38, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertTriangle size={24} color="white" />
            </div>
            <div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                color: '#DC2626'
              }}>¿Riesgos Críticos?</h3>
              <p style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)'
              }}>Requieren atención inmediata</p>
            </div>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {criticalRisks.map(risk => (
              <li key={risk.id} style={{
                padding: '0.875rem 1rem',
                marginBottom: '0.5rem',
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '10px',
                border: '1px solid rgba(220, 38, 38, 0.2)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{
                    color: '#DC2626',
                    fontFamily: 'monospace',
                    fontWeight: 800,
                    background: 'rgba(220, 38, 38, 0.15)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem'
                  }}>{risk.id}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9375rem' }}>{risk.name}</span>
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                  Nivel: {risk.level} | Prob: {risk.probability} × Imp: {risk.impact} | {risk.category}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(249, 115, 22, 0.05) 100%)',
          borderRadius: '20px',
          padding: '1.5rem',
          border: '2px solid rgba(249, 115, 22, 0.3)',
          boxShadow: '0 4px 20px rgba(249, 115, 22, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#F97316',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Eye size={24} color="white" />
            </div>
            <div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                color: '#F97316'
              }}>¿Atención Inmediata?</h3>
              <p style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)'
              }}>Riesgos altos y críticos ({criticalRisks.length + highRisks.length} total)</p>
            </div>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[...criticalRisks, ...highRisks].slice(0, 5).map(risk => (
              <li key={risk.id} style={{
                padding: '0.875rem 1rem',
                marginBottom: '0.5rem',
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '10px',
                border: '1px solid rgba(249, 115, 22, 0.2)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{
                    color: risk.zone === 'critical' ? '#DC2626' : '#F97316',
                    fontFamily: 'monospace',
                    fontWeight: 800,
                    background: risk.zone === 'critical' ? 'rgba(220, 38, 38, 0.15)' : 'rgba(249, 115, 22, 0.15)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem'
                  }}>{risk.id}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9375rem' }}>{risk.name}</span>
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                  Nivel: {risk.level} | Estrategia: {risk.strategy}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
          borderRadius: '20px',
          padding: '1.5rem',
          border: '2px solid rgba(234, 179, 8, 0.3)',
          boxShadow: '0 4px 20px rgba(234, 179, 8, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #EAB308, #22C55E)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Shield size={24} color="white" />
            </div>
            <div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                color: '#B45309'
              }}>¿Monitoreo?</h3>
              <p style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)'
              }}>Riesgos medios y bajos ({mediumRisks.length + lowRisks.length} total)</p>
            </div>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[...mediumRisks, ...lowRisks].map(risk => (
              <li key={risk.id} style={{
                padding: '0.75rem 1rem',
                marginBottom: '0.5rem',
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '10px',
                border: '1px solid rgba(234, 179, 8, 0.2)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    color: risk.zone === 'medium' ? '#B45309' : '#15803D',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    background: risk.zone === 'medium' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem'
                  }}>{risk.id}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.875rem' }}>{risk.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Matriz;
