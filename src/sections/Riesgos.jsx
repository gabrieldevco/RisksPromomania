import { useState, useMemo } from 'react';
import { risks, getZoneLabel, updateRiskControlLevel, controlLevels, getRiskZone } from '../data/risks';
import RiskCard from '../components/RiskCard';
import { Plus, X, Check } from 'lucide-react';

const Riesgos = () => {
  const [filter, setFilter] = useState('all');
  const [showAddRiskModal, setShowAddRiskModal] = useState(false);
  
  // Inicializar riesgos con controlLevel = 1
  const [risksWithControl, setRisksWithControl] = useState(() => 
    risks.map(risk => ({ ...risk, controlLevel: 1, residualImpact: risk.impact, residualLevel: risk.level, residualZone: risk.zone }))
  );

  // Manejar cambio de nivel de control (ahora soporta objeto con datos completos o número)
  const handleControlChange = (riskId, controlData) => {
    setRisksWithControl(prevRisks =>
      prevRisks.map(risk => {
        if (risk.id === riskId) {
          // Si es un número (formato antiguo), usar updateRiskControlLevel
          if (typeof controlData === 'number') {
            return updateRiskControlLevel(risk, controlData);
          }
          // Si es un objeto (nuevo formato), fusionar directamente
          return {
            ...risk,
            ...controlData
          };
        }
        return risk;
      })
    );
  };

  // Estado para formulario de nuevo riesgo
  const [newRisk, setNewRisk] = useState({
    name: '',
    category: 'Seguridad',
    description: '',
    probability: 3,
    impact: 3,
    strategy: 'Mitigar',
    responsible: ''
  });

  // Generar ID único para nuevo riesgo
  const generateRiskId = () => {
    const existingIds = risksWithControl.map(r => parseInt(r.id.replace('R', '')));
    const maxId = Math.max(...existingIds, 0);
    return `R${String(maxId + 1).padStart(2, '0')}`;
  };

  // Agregar nuevo riesgo
  const handleAddRisk = () => {
    if (!newRisk.name.trim() || !newRisk.description.trim()) return;

    const level = newRisk.probability * newRisk.impact;
    const zone = getRiskZone(level);

    const risk = {
      id: generateRiskId(),
      ...newRisk,
      frequency: 'Regular',
      level,
      zone,
      controlLevel: 1,
      residualImpact: newRisk.impact,
      residualLevel: level,
      residualZone: zone,
      appliedControls: [],
      actions: []
    };

    setRisksWithControl(prev => [...prev, risk]);
    setNewRisk({
      name: '',
      category: 'Seguridad',
      description: '',
      probability: 3,
      impact: 3,
      strategy: 'Mitigar',
      responsible: ''
    });
    setShowAddRiskModal(false);
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
            🛡️
          </span>
          Sistema de Controles Detallados
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          {[
            { level: 1, label: 'Preventivo', icon: '🛡️', desc: 'Evita que el riesgo ocurra' },
            { level: 2, label: 'Detectivo', icon: '🔍', desc: 'Identifica el riesgo ocurriendo' },
            { level: 3, label: 'Correctivo', icon: '🔧', desc: 'Corrige el efecto del riesgo' },
            { level: 4, label: 'Transferencia', icon: '🔄', desc: 'Transfiere el riesgo a terceros' },
            { level: 5, label: 'Aceptación', icon: '✓', desc: 'Acepta el impacto del riesgo' }
          ].map((type) => (
            <div key={type.level} style={{
              background: 'var(--bg-card)',
              borderRadius: '12px',
              padding: '1rem',
              textAlign: 'center',
              border: '1px solid var(--border-color)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '1.5rem' }}>{type.icon}</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.25rem' }}>{type.label}</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                {type.desc}
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
          borderTop: '1px solid rgba(255,255,255,0.3)'
        }}>
          <div style={{ textAlign: 'center', background: 'var(--bg-card)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#6B21A8' }}>{mitigatedCount}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Con controles</div>
          </div>
          <div style={{ textAlign: 'center', background: 'var(--bg-card)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#16A34A' }}>{improvedCount}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Mejorados</div>
          </div>
          <div style={{ textAlign: 'center', background: 'var(--bg-card)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#DC2626' }}>
              {risksWithControl.filter(r => r.residualZone === 'critical').length}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Críticos residuales</div>
          </div>
        </div>
      </div>

      {/* Filtros y Botón de Nuevo Riesgo */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '2rem',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
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

        <button
          onClick={() => setShowAddRiskModal(true)}
          style={{
            padding: '0.625rem 1.25rem',
            background: '#16A34A',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
            transition: 'all 0.3s ease'
          }}
        >
          <Plus size={18} />
          Registrar Nuevo Riesgo
        </button>
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
            <h4 style={{ fontSize: '0.9375rem', color: '#6B21A8', marginBottom: '0.75rem', fontWeight: 700 }}>Impacto del Control (1-5)</h4>
            <ul style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.8, listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>1</span><span style={{ color: 'var(--text-muted)' }}>Muy Bajo (0%)</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>2</span><span style={{ color: 'var(--text-muted)' }}>Bajo (20%)</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>3</span><span style={{ color: 'var(--text-muted)' }}>Medio (40%)</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>4</span><span style={{ color: 'var(--text-muted)' }}>Alto (60%)</span></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>5</span><span style={{ color: 'var(--text-muted)' }}>Muy Alto (80%)</span></li>
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

      {/* Modal para Registrar Nuevo Riesgo - MEJORADO VISUALMENTE */}
      {showAddRiskModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-hover) 100%)',
            borderRadius: '24px',
            padding: '0',
            maxWidth: '650px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'hidden',
            boxShadow: '0 25px 80px rgba(107, 33, 168, 0.25), 0 0 0 1px rgba(107, 33, 168, 0.1)',
            border: '2px solid rgba(107, 33, 168, 0.2)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Header con gradiente */}
            <div style={{
              background: 'linear-gradient(135deg, #6B21A8 0%, #A855F7 50%, #F97316 100%)',
              padding: '1.75rem 2rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative circles */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '10%',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)'
              }} />
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Plus size={26} color="white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 style={{
                      fontSize: '1.375rem',
                      fontWeight: 800,
                      color: 'white',
                      margin: 0,
                      letterSpacing: '-0.02em'
                    }}>
                      Registrar Nuevo Riesgo
                    </h2>
                    <p style={{
                      fontSize: '0.8125rem',
                      color: 'rgba(255,255,255,0.8)',
                      margin: '0.25rem 0 0 0'
                    }}>
                      Complete todos los campos requeridos
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddRiskModal(false)}
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.625rem',
                    borderRadius: '10px',
                    color: 'white',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.15)';
                  }}
                >
                  <X size={22} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Formulario - Scrollable content */}
            <div style={{ 
              padding: '1.75rem 2rem',
              overflow: 'auto',
              maxHeight: 'calc(90vh - 100px)'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Sección: Información Básica */}
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: 'linear-gradient(135deg, #6B21A8, #A855F7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>1</span>
                    </div>
                    <span style={{
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: '#6B21A8',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Información Básica
                    </span>
                  </div>
                  
                  {/* Nombre */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      display: 'block',
                      marginBottom: '0.375rem'
                    }}>
                      Nombre del Riesgo <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={newRisk.name}
                      onChange={(e) => setNewRisk({ ...newRisk, name: e.target.value })}
                      placeholder="Ej: Falla en servidores de producción"
                      style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        borderRadius: '12px',
                        border: '2px solid var(--border-color)',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        transition: 'all 0.2s ease',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#6B21A8';
                        e.target.style.boxShadow = '0 0 0 3px rgba(107, 33, 168, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--border-color)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Categoría - Botones visuales */}
                  <div>
                    <label style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      display: 'block',
                      marginBottom: '0.5rem'
                    }}>
                      Categoría
                    </label>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '0.5rem'
                    }}>
                      {[
                        { value: 'Seguridad', icon: '🛡️', color: '#DC2626' },
                        { value: 'Tecnología', icon: '💻', color: '#3B82F6' },
                        { value: 'Mercado', icon: '📈', color: '#F97316' },
                        { value: 'Legal', icon: '⚖️', color: '#8B5CF6' },
                        { value: 'Operacional', icon: '⚙️', color: '#6B7280' },
                        { value: 'Financiero', icon: '💰', color: '#22C55E' }
                      ].map(cat => (
                        <button
                          key={cat.value}
                          onClick={() => setNewRisk({ ...newRisk, category: cat.value })}
                          style={{
                            padding: '0.625rem',
                            borderRadius: '10px',
                            border: newRisk.category === cat.value ? `2px solid ${cat.color}` : '1px solid var(--border-color)',
                            background: newRisk.category === cat.value ? `${cat.color}15` : 'var(--bg-primary)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}
                        >
                          <span style={{ fontSize: '1.25rem' }}>{cat.icon}</span>
                          <span style={{
                            fontSize: '0.6875rem',
                            fontWeight: newRisk.category === cat.value ? 700 : 500,
                            color: newRisk.category === cat.value ? cat.color : 'var(--text-primary)'
                          }}>
                            {cat.value}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Descripción */}
                <div>
                  <label style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    display: 'block',
                    marginBottom: '0.375rem'
                  }}>
                    Descripción <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <textarea
                    value={newRisk.description}
                    onChange={(e) => setNewRisk({ ...newRisk, description: e.target.value })}
                    placeholder="Describa el riesgo detalladamente, incluyendo causas, efectos potenciales y contexto..."
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      borderRadius: '12px',
                      border: '2px solid var(--border-color)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9375rem',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      transition: 'all 0.2s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6B21A8';
                      e.target.style.boxShadow = '0 0 0 3px rgba(107, 33, 168, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'var(--border-color)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Sección: Evaluación */}
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: 'linear-gradient(135deg, #F97316, #FB923C)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>2</span>
                    </div>
                    <span style={{
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: '#F97316',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Evaluación del Riesgo
                    </span>
                  </div>

                  {/* Probabilidad e Impacto con Sliders */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '1.25rem',
                    marginBottom: '1rem'
                  }}>
                    {/* Probabilidad */}
                    <div style={{
                      background: 'var(--bg-primary)',
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem'
                      }}>
                        <label style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: 'var(--text-secondary)'
                        }}>
                          Probabilidad
                        </label>
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          background: '#3B82F6',
                          color: 'white',
                          borderRadius: '6px',
                          fontSize: '0.6875rem',
                          fontWeight: 700
                        }}>
                          {newRisk.probability}/5
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={newRisk.probability}
                        onChange={(e) => setNewRisk({ ...newRisk, probability: parseInt(e.target.value) })}
                        style={{
                          width: '100%',
                          height: '8px',
                          borderRadius: '4px',
                          background: `linear-gradient(to right, #3B82F6 0%, #60A5FA ${(newRisk.probability - 1) * 25}%, #E5E7EB ${(newRisk.probability - 1) * 25}%, #E5E7EB 100%)`,
                          outline: 'none',
                          cursor: 'pointer',
                          appearance: 'none',
                          WebkitAppearance: 'none'
                        }}
                      />
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '0.375rem',
                        fontSize: '0.625rem',
                        color: 'var(--text-muted)'
                      }}>
                        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                      </div>
                    </div>

                    {/* Impacto */}
                    <div style={{
                      background: 'var(--bg-primary)',
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem'
                      }}>
                        <label style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: 'var(--text-secondary)'
                        }}>
                          Impacto
                        </label>
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          background: '#DC2626',
                          color: 'white',
                          borderRadius: '6px',
                          fontSize: '0.6875rem',
                          fontWeight: 700
                        }}>
                          {newRisk.impact}/5
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={newRisk.impact}
                        onChange={(e) => setNewRisk({ ...newRisk, impact: parseInt(e.target.value) })}
                        style={{
                          width: '100%',
                          height: '8px',
                          borderRadius: '4px',
                          background: `linear-gradient(to right, #DC2626 0%, #EF4444 ${(newRisk.impact - 1) * 25}%, #E5E7EB ${(newRisk.impact - 1) * 25}%, #E5E7EB 100%)`,
                          outline: 'none',
                          cursor: 'pointer',
                          appearance: 'none',
                          WebkitAppearance: 'none'
                        }}
                      />
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '0.375rem',
                        fontSize: '0.625rem',
                        color: 'var(--text-muted)'
                      }}>
                        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                      </div>
                    </div>
                  </div>

                  {/* Nivel calculado - MEJORADO VISUALMENTE */}
                  <div style={{
                    background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-hover) 100%)',
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    border: `2px solid ${newRisk.probability * newRisk.impact >= 17 ? '#DC2626' : newRisk.probability * newRisk.impact >= 10 ? '#F97316' : newRisk.probability * newRisk.impact >= 5 ? '#EAB308' : '#16A34A'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: 600,
                        color: 'var(--text-muted)',
                        display: 'block',
                        marginBottom: '0.25rem'
                      }}>
                        Nivel de Riesgo Calculado
                      </span>
                      <span style={{ 
                        fontSize: '0.6875rem', 
                        color: 'var(--text-secondary)'
                      }}>
                        Prob: {newRisk.probability} × Imp: {newRisk.impact}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <span style={{
                        fontSize: '1.75rem',
                        fontWeight: 800,
                        color: newRisk.probability * newRisk.impact >= 17 ? '#DC2626' :
                              newRisk.probability * newRisk.impact >= 10 ? '#F97316' :
                              newRisk.probability * newRisk.impact >= 5 ? '#EAB308' : '#16A34A'
                      }}>
                        {newRisk.probability * newRisk.impact}
                      </span>
                      <span style={{
                        padding: '0.375rem 0.75rem',
                        background: newRisk.probability * newRisk.impact >= 17 ? '#DC2626' :
                                   newRisk.probability * newRisk.impact >= 10 ? '#F97316' :
                                   newRisk.probability * newRisk.impact >= 5 ? '#EAB308' : '#16A34A',
                        color: 'white',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}>
                        {getZoneLabel(getRiskZone(newRisk.probability * newRisk.impact))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sección: Respuesta */}
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: 'linear-gradient(135deg, #22C55E, #16A34A)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>3</span>
                    </div>
                    <span style={{
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: '#16A34A',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Plan de Respuesta
                    </span>
                  </div>

                  {/* Estrategia */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      display: 'block',
                      marginBottom: '0.375rem'
                    }}>
                      Estrategia de Respuesta
                    </label>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '0.5rem'
                    }}>
                      {[
                        { value: 'Mitigar', icon: '🛡️', color: '#22C55E' },
                        { value: 'Transferir', icon: '🔄', color: '#3B82F6' },
                        { value: 'Aceptar', icon: '✓', color: '#6B7280' },
                        { value: 'Evitar', icon: '🚫', color: '#DC2626' }
                      ].map(strat => (
                        <button
                          key={strat.value}
                          onClick={() => setNewRisk({ ...newRisk, strategy: strat.value })}
                          style={{
                            padding: '0.625rem',
                            borderRadius: '10px',
                            border: newRisk.strategy === strat.value ? `2px solid ${strat.color}` : '1px solid var(--border-color)',
                            background: newRisk.strategy === strat.value ? `${strat.color}15` : 'var(--bg-primary)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <span>{strat.icon}</span>
                          <span style={{
                            fontSize: '0.8125rem',
                            fontWeight: newRisk.strategy === strat.value ? 600 : 500,
                            color: newRisk.strategy === strat.value ? strat.color : 'var(--text-primary)'
                          }}>
                            {strat.value}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Responsable */}
                  <div>
                    <label style={{
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      display: 'block',
                      marginBottom: '0.375rem'
                    }}>
                      Responsable
                    </label>
                    <input
                      type="text"
                      value={newRisk.responsible}
                      onChange={(e) => setNewRisk({ ...newRisk, responsible: e.target.value })}
                      placeholder="Ej: Product Manager / CTO"
                      style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        borderRadius: '12px',
                        border: '2px solid var(--border-color)',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        transition: 'all 0.2s ease',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#6B21A8';
                        e.target.style.boxShadow = '0 0 0 3px rgba(107, 33, 168, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'var(--border-color)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Botones */}
                <div style={{ 
                  display: 'flex', 
                  gap: '0.75rem', 
                  marginTop: '0.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  <button
                    onClick={handleAddRisk}
                    disabled={!newRisk.name.trim() || !newRisk.description.trim()}
                    style={{
                      flex: 1,
                      padding: '0.875rem 1.25rem',
                      background: (!newRisk.name.trim() || !newRisk.description.trim()) 
                        ? 'var(--text-muted)' 
                        : 'linear-gradient(135deg, #6B21A8 0%, #A855F7 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '0.9375rem',
                      fontWeight: 700,
                      cursor: (!newRisk.name.trim() || !newRisk.description.trim()) ? 'not-allowed' : 'pointer',
                      opacity: (!newRisk.name.trim() || !newRisk.description.trim()) ? 0.5 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: (!newRisk.name.trim() || !newRisk.description.trim()) 
                        ? 'none' 
                        : '0 4px 14px rgba(107, 33, 168, 0.35)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Plus size={20} strokeWidth={2.5} />
                    Registrar Riesgo
                  </button>
                  <button
                    onClick={() => setShowAddRiskModal(false)}
                    style={{
                      padding: '0.875rem 1.25rem',
                      background: 'var(--bg-hover)',
                      color: 'var(--text-primary)',
                      border: '2px solid var(--border-color)',
                      borderRadius: '12px',
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Riesgos;
