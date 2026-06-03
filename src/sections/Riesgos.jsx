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

      {/* Modal para Registrar Nuevo Riesgo */}
      {showAddRiskModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '20px',
            padding: '2rem',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            border: '1px solid var(--border-color)'
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <Plus size={24} color="#16A34A" />
                Registrar Nuevo Riesgo
              </h2>
              <button
                onClick={() => setShowAddRiskModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  color: 'var(--text-secondary)'
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Formulario */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Nombre */}
              <div>
                <label style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  Nombre del Riesgo *
                </label>
                <input
                  type="text"
                  value={newRisk.name}
                  onChange={(e) => setNewRisk({ ...newRisk, name: e.target.value })}
                  placeholder="Ej: Falla en servidores de producción"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-hover)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              {/* Categoría */}
              <div>
                <label style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  Categoría
                </label>
                <select
                  value={newRisk.category}
                  onChange={(e) => setNewRisk({ ...newRisk, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-hover)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="Seguridad">Seguridad</option>
                  <option value="Tecnología">Tecnología</option>
                  <option value="Mercado">Mercado</option>
                  <option value="Legal">Legal</option>
                  <option value="Operacional">Operacional</option>
                  <option value="Financiero">Financiero</option>
                </select>
              </div>

              {/* Descripción */}
              <div>
                <label style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  Descripción *
                </label>
                <textarea
                  value={newRisk.description}
                  onChange={(e) => setNewRisk({ ...newRisk, description: e.target.value })}
                  placeholder="Describa el riesgo detalladamente..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-hover)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Probabilidad e Impacto */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}>
                    Probabilidad (1-5)
                  </label>
                  <select
                    value={newRisk.probability}
                    onChange={(e) => setNewRisk({ ...newRisk, probability: parseInt(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-hover)',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value={1}>1 - Muy Baja</option>
                    <option value={2}>2 - Baja</option>
                    <option value={3}>3 - Media</option>
                    <option value={4}>4 - Alta</option>
                    <option value={5}>5 - Muy Alta</option>
                  </select>
                </div>
                <div>
                  <label style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}>
                    Impacto (1-5)
                  </label>
                  <select
                    value={newRisk.impact}
                    onChange={(e) => setNewRisk({ ...newRisk, impact: parseInt(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-hover)',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem'
                    }}
                  >
                    <option value={1}>1 - Insignificante</option>
                    <option value={2}>2 - Menor</option>
                    <option value={3}>3 - Moderado</option>
                    <option value={4}>4 - Mayor</option>
                    <option value={5}>5 - Catastrófico</option>
                  </select>
                </div>
              </div>

              {/* Nivel calculado */}
              <div style={{
                background: 'var(--bg-hover)',
                padding: '1rem',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Nivel de Riesgo Calculado:
                </span>
                <span style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: newRisk.probability * newRisk.impact >= 17 ? '#DC2626' :
                        newRisk.probability * newRisk.impact >= 10 ? '#F97316' :
                        newRisk.probability * newRisk.impact >= 5 ? '#EAB308' : '#16A34A'
                }}>
                  {newRisk.probability * newRisk.impact} ({getZoneLabel(getRiskZone(newRisk.probability * newRisk.impact))})
                </span>
              </div>

              {/* Estrategia */}
              <div>
                <label style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  Estrategia de Respuesta
                </label>
                <select
                  value={newRisk.strategy}
                  onChange={(e) => setNewRisk({ ...newRisk, strategy: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-hover)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem'
                  }}
                >
                  <option value="Mitigar">Mitigar</option>
                  <option value="Transferir">Transferir</option>
                  <option value="Aceptar">Aceptar</option>
                  <option value="Evitar">Evitar</option>
                </select>
              </div>

              {/* Responsable */}
              <div>
                <label style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: '0.5rem'
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
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-hover)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              {/* Botones */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  onClick={handleAddRisk}
                  disabled={!newRisk.name.trim() || !newRisk.description.trim()}
                  style={{
                    flex: 1,
                    padding: '0.875rem 1.5rem',
                    background: '#16A34A',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    cursor: (!newRisk.name.trim() || !newRisk.description.trim()) ? 'not-allowed' : 'pointer',
                    opacity: (!newRisk.name.trim() || !newRisk.description.trim()) ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Check size={18} />
                  Registrar Riesgo
                </button>
                <button
                  onClick={() => setShowAddRiskModal(false)}
                  style={{
                    padding: '0.875rem 1.5rem',
                    background: 'var(--bg-hover)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Riesgos;
