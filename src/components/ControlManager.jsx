import { useState } from 'react';
import { Shield, Plus, X, Edit2, Check, Sliders, ChevronDown, Sparkles, TrendingDown, Activity } from 'lucide-react';
import { getZoneColor, getZoneLabel, getRiskZone } from '../data/risks';

const ControlManager = ({ risk, onControlChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Estado para nuevo control
  const [newControl, setNewControl] = useState({
    type: '',
    description: '',
    impact: 3,
    effectiveness: 3
  });

  // Tipos de control predefinidos con iconos Lucide
  const controlTypes = [
    { value: 'preventivo', label: 'Preventivo', icon: '🛡️', color: '#22C55E', desc: 'Evita que el riesgo ocurra' },
    { value: 'detectivo', label: 'Detectivo', icon: '🔍', color: '#3B82F6', desc: 'Identifica el riesgo cuando ocurre' },
    { value: 'correctivo', label: 'Correctivo', icon: '🔧', color: '#F97316', desc: 'Corrige el efecto del riesgo' },
    { value: 'transferencia', label: 'Transferencia', icon: '🔄', color: '#8B5CF6', desc: 'Traslada el riesgo a terceros' },
    { value: 'aceptacion', label: 'Aceptación', icon: '✓', color: '#6B7280', desc: 'Asume las consecuencias' }
  ];

  // Calcular impacto residual basado en controles (acumulativo, no promedio)
  const calculateControlImpact = (controls) => {
    if (!controls || controls.length === 0) {
      return { impact: risk.impact, level: risk.level, zone: risk.zone, totalReduction: 0 };
    }
    
    // Convertir efectividad (1-5) a porcentaje de reducción individual (0% - 80%)
    // Efectividad 1 = 0%, 2 = 20%, 3 = 40%, 4 = 60%, 5 = 80%
    const getReductionPercent = (eff) => (eff - 1) / 4 * 0.8;
    
    // Calcular reducción acumulativa usando fórmula de controles múltiples
    // Cada control reduce del riesgo restante (no del original)
    let remainingRisk = 1; // 100% = sin reducir
    
    controls.forEach(control => {
      const reduction = getReductionPercent(control.effectiveness);
      remainingRisk = remainingRisk * (1 - reduction);
    });
    
    // Total reducido = 1 - riesgo restante
    const totalReduction = 1 - remainingRisk;
    
    // Capar reducción máxima en 95% (siempre queda algo de riesgo residual)
    const cappedReduction = Math.min(0.95, totalReduction);
    
    // Calcular impacto residual
    const residualImpact = Math.max(1, Math.round(risk.impact * (1 - cappedReduction)));
    const residualLevel = risk.probability * residualImpact;
    const residualZone = getRiskZone(residualLevel);
    
    return { 
      impact: residualImpact, 
      level: residualLevel, 
      zone: residualZone,
      totalReduction: cappedReduction
    };
  };

  const handleAddControl = () => {
    if (!newControl.type || !newControl.description.trim()) return;
    
    const control = {
      id: Date.now(),
      ...newControl,
      appliedAt: new Date().toISOString()
    };
    
    const currentControls = risk.appliedControls || [];
    const updatedControls = [...currentControls, control];
    
    const impactData = calculateControlImpact(updatedControls);
    
    onControlChange(risk.id, {
      controlLevel: updatedControls.length + 1, // Número de controles + 1
      appliedControls: updatedControls,
      residualImpact: impactData.impact,
      residualLevel: impactData.level,
      residualZone: impactData.zone
    });
    
    setNewControl({ type: '', description: '', impact: 3, effectiveness: 3 });
    setShowAddForm(false);
  };

  const handleRemoveControl = (controlId) => {
    const currentControls = risk.appliedControls || [];
    const updatedControls = currentControls.filter(c => c.id !== controlId);
    
    const impactData = calculateControlImpact(updatedControls);
    
    if (updatedControls.length === 0) {
      // Resetear a valores originales si no hay controles
      onControlChange(risk.id, {
        controlLevel: 1,
        appliedControls: [],
        residualImpact: risk.impact,
        residualLevel: risk.level,
        residualZone: risk.zone
      });
    } else {
      onControlChange(risk.id, {
        controlLevel: updatedControls.length + 1,
        appliedControls: updatedControls,
        residualImpact: impactData.impact,
        residualLevel: impactData.level,
        residualZone: impactData.zone
      });
    }
  };

  const getControlTypeLabel = (type) => {
    const ct = controlTypes.find(c => c.value === type);
    return ct ? `${ct.icon} ${ct.label}` : type;
  };

  const getEffectivenessLabel = (level) => {
    const labels = {
      1: 'Muy Bajo (0%)',
      2: 'Bajo (20%)',
      3: 'Medio (40%)',
      4: 'Alto (60%)',
      5: 'Muy Alto (80%)'
    };
    return labels[level] || level;
  };

  const hasControls = risk.appliedControls && risk.appliedControls.length > 0;
  const residualData = calculateControlImpact(risk.appliedControls);
  const reduction = hasControls ? (residualData.totalReduction * 100).toFixed(0) : 0;

  return (
    <div style={{
      background: 'var(--bg-hover)',
      borderRadius: '16px',
      padding: '1.25rem',
      marginTop: '1.25rem',
      border: '1px solid var(--border-color)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.9375rem',
          fontWeight: 700,
          color: '#6B21A8'
        }}>
          <div style={{
            background: '#6B21A8',
            borderRadius: '8px',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Shield size={16} color="white" />
          </div>
          Controles Aplicados
        </div>
        
        {hasControls && (
          <span style={{
            padding: '0.375rem 1rem',
            background: getZoneColor(residualData.zone),
            color: 'white',
            borderRadius: '9999px',
            fontSize: '0.8125rem',
            fontWeight: 700
          }}>
            {reduction}% reducción
          </span>
        )}
      </div>

      {/* Lista de controles */}
      {hasControls && (
        <div style={{ marginBottom: '1rem' }}>
          {risk.appliedControls.map((control, index) => (
            <div
              key={control.id}
              style={{
                background: 'var(--bg-card)',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '0.75rem',
                border: '1px solid var(--border-color)',
                position: 'relative'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <span style={{
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: '#6B21A8'
                }}>
                  {getControlTypeLabel(control.type)}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    background: '#F3E8FF',
                    borderRadius: '4px',
                    color: '#6B21A8',
                    fontWeight: 600
                  }}>
                    Ef: {getEffectivenessLabel(control.effectiveness)}
                  </span>
                  <button
                    onClick={() => handleRemoveControl(control.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#DC2626'
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              <p style={{
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)',
                margin: 0,
                lineHeight: 1.5
              }}>
                {control.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Formulario para agregar control - COMPACTO */}
      {showAddForm ? (
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '16px',
          padding: '1rem',
          border: '2px solid #6B21A8',
          boxShadow: '0 4px 20px rgba(107, 33, 168, 0.15)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem'
          }}>
            <Sparkles size={18} color="#6B21A8" />
            <h4 style={{
              fontSize: '0.9375rem',
              fontWeight: 700,
              color: '#6B21A8',
              margin: 0
            }}>
              Nuevo Control
            </h4>
          </div>
          
          {/* Tipo de control - BOTONES COMPACTOS EN FILA */}
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              display: 'block',
              marginBottom: '0.5rem'
            }}>
              Tipo
            </label>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.375rem'
            }}>
              {controlTypes.map(type => (
                <button
                  key={type.value}
                  onClick={() => setNewControl({ ...newControl, type: type.value })}
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    border: newControl.type === type.value ? `2px solid ${type.color}` : '1px solid var(--border-color)',
                    background: newControl.type === type.value ? `${type.color}15` : 'var(--bg-hover)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: newControl.type === type.value ? 600 : 500,
                    color: newControl.type === type.value ? type.color : 'var(--text-primary)'
                  }}
                >
                  <span>{type.icon}</span>
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Descripción - COMPACTA */}
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              display: 'block',
              marginBottom: '0.375rem'
            }}>
              Descripción
            </label>
            <textarea
              value={newControl.description}
              onChange={(e) => setNewControl({ ...newControl, description: e.target.value })}
              placeholder="Describa cómo se aplicará el control..."
              rows={2}
              style={{
                width: '100%',
                padding: '0.625rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '0.8125rem',
                resize: 'vertical',
                fontFamily: 'inherit',
                outline: 'none'
              }}
            />
          </div>

          {/* Efectividad - COMPACTA */}
          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.375rem'
            }}>
              <label style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: 'var(--text-muted)'
              }}>
                Efectividad
              </label>
              <span style={{
                padding: '0.25rem 0.5rem',
                background: '#6B21A8',
                color: 'white',
                borderRadius: '6px',
                fontSize: '0.6875rem',
                fontWeight: 600
              }}>
                {newControl.effectiveness}/5
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={newControl.effectiveness}
              onChange={(e) => setNewControl({ ...newControl, effectiveness: parseInt(e.target.value) })}
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                background: `linear-gradient(to right, #6B21A8 0%, #A855F7 ${(newControl.effectiveness - 1) * 25}%, #E5E7EB ${(newControl.effectiveness - 1) * 25}%, #E5E7EB 100%)`,
                outline: 'none',
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none'
              }}
            />
          </div>

          {/* Botones - COMPACTOS */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleAddControl}
              disabled={!newControl.type || !newControl.description.trim()}
              style={{
                flex: 1,
                padding: '0.625rem 1rem',
                background: (!newControl.type || !newControl.description.trim()) 
                  ? 'var(--text-muted)' 
                  : '#6B21A8',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: (!newControl.type || !newControl.description.trim()) ? 'not-allowed' : 'pointer',
                opacity: (!newControl.type || !newControl.description.trim()) ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.375rem'
              }}
            >
              <Check size={16} />
              Aplicar
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              style={{
                padding: '0.625rem 1rem',
                background: 'var(--bg-hover)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            background: 'transparent',
            border: '2px dashed #6B21A8',
            borderRadius: '12px',
            color: '#6B21A8',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(107, 33, 168, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
          }}
        >
          <Plus size={18} />
          Agregar Control
        </button>
      )}

      {/* Resumen de mitigación */}
      {hasControls && (
        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: getZoneColor(residualData.zone) + '15',
          borderRadius: '10px',
          border: `1px solid ${getZoneColor(residualData.zone)}30`
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                display: 'block'
              }}>
                Impacto Residual
              </span>
              <span style={{
                fontSize: '1.125rem',
                fontWeight: 800,
                color: getZoneColor(residualData.zone)
              }}>
                {risk.impact} → {residualData.impact}
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                display: 'block'
              }}>
                Nivel de Riesgo
              </span>
              <span style={{
                fontSize: '1.125rem',
                fontWeight: 800,
                color: getZoneColor(residualData.zone)
              }}>
                {risk.level} → {residualData.level}
              </span>
            </div>
          </div>
          <div style={{
            marginTop: '0.5rem',
            fontSize: '0.75rem',
            color: getZoneColor(residualData.zone),
            fontWeight: 600
          }}>
            {getZoneLabel(residualData.zone)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlManager;
