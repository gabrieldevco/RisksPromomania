import { useState } from 'react';
import { Shield, Plus, X, Edit2, Check, Sliders } from 'lucide-react';
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

  // Tipos de control predefinidos
  const controlTypes = [
    { value: 'preventivo', label: 'Preventivo', icon: '🛡️' },
    { value: 'detectivo', label: 'Detectivo', icon: '🔍' },
    { value: 'correctivo', label: 'Correctivo', icon: '🔧' },
    { value: 'transferencia', label: 'Transferencia', icon: '🔄' },
    { value: 'aceptacion', label: 'Aceptación', icon: '✓' }
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

      {/* Formulario para agregar control */}
      {showAddForm ? (
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '1rem',
          border: '2px dashed #6B21A8'
        }}>
          <h4 style={{
            fontSize: '0.875rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Plus size={16} />
            Nuevo Control
          </h4>
          
          {/* Tipo de control */}
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              display: 'block',
              marginBottom: '0.25rem'
            }}>
              Tipo de Control
            </label>
            <select
              value={newControl.type}
              onChange={(e) => setNewControl({ ...newControl, type: e.target.value })}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-hover)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem'
              }}
            >
              <option value="">Seleccionar tipo...</option>
              {controlTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Descripción */}
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              display: 'block',
              marginBottom: '0.25rem'
            }}>
              Descripción del Control
            </label>
            <textarea
              value={newControl.description}
              onChange={(e) => setNewControl({ ...newControl, description: e.target.value })}
              placeholder="Describa cómo se aplicará el control..."
              rows={3}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-hover)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Efectividad */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              display: 'block',
              marginBottom: '0.5rem'
            }}>
              Impacto del Control (1-5): {getEffectivenessLabel(newControl.effectiveness)}
            </label>
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
                background: `linear-gradient(to right, #6B21A8 0%, #6B21A8 ${(newControl.effectiveness - 1) * 25}%, #E5E7EB ${(newControl.effectiveness - 1) * 25}%, #E5E7EB 100%)`,
                outline: 'none',
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none'
              }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '0.5rem',
              fontSize: '0.6875rem',
              color: '#6B7280'
            }}>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>

          {/* Botones */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleAddControl}
              disabled={!newControl.type || !newControl.description.trim()}
              style={{
                flex: 1,
                padding: '0.625rem 1rem',
                background: '#6B21A8',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: (!newControl.type || !newControl.description.trim()) ? 'not-allowed' : 'pointer',
                opacity: (!newControl.type || !newControl.description.trim()) ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <Check size={16} />
              Aplicar Control
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              style={{
                padding: '0.625rem 1rem',
                background: 'var(--bg-hover)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                fontSize: '0.875rem',
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
            border: '2px dashed var(--border-color)',
            borderRadius: '12px',
            color: '#6B21A8',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = '#6B21A8';
            e.target.style.background = '#F3E8FF';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = 'var(--border-color)';
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
