import { controlLevels, getControlLabel, getZoneColor, getZoneLabel } from '../data/risks';
import { Shield, Sliders, TrendingDown, AlertTriangle, CheckCircle, Clock, DollarSign, Activity } from 'lucide-react';

// Medidas de control específicas por nivel y tipo de riesgo
const getControlMeasures = (riskCategory, level) => {
  const measures = {
    'Seguridad': {
      1: ['Sin medidas de seguridad implementadas'],
      2: ['Antivirus básico instalado', 'Contraseñas simples', 'Backup mensual manual'],
      3: ['Firewall básico configurado', 'Autenticación de dos factores para admins', 'Backup semanal automatizado', 'Actualizaciones de seguridad periódicas'],
      4: ['WAF (Web Application Firewall) implementado', 'Pentesting trimestral contratado', 'Monitoreo 24/7 de amenazas', 'Encriptación AES-256 en datos sensibles', 'Política de acceso basada en roles (RBAC)'],
      5: ['Centro de operaciones de seguridad (SOC)', 'Respuesta a incidentes automatizada', 'Zero Trust Architecture', 'Certificación ISO 27001', 'Seguro cibernético integral', 'Auditorías de seguridad mensuales']
    },
    'Mercado': {
      1: ['Sin estrategia de mercado definida'],
      2: ['Redes sociales básicas activas', 'Publicación de contenido esporádico'],
      3: ['Campañas de marketing digital segmentadas', 'Programa de referidos básico', 'Alianzas con 2-3 cámaras de comercio'],
      4: ['Estrategia de marketing multicanal', 'Programa de referidos con incentivos monetarios', 'Alianzas estratégicas con influencers locales', 'SEO/SEM optimizado', 'Análisis de cohortes y métricas de retención'],
      5: ['Equipo de growth hacking dedicado', 'Automatización de marketing completa', 'Presencia en 5+ ciudades con marketing localizado', 'Community manager dedicado por región', 'Presupuesto mensual de marketing >$5M COP']
    },
    'Técnico': {
      1: ['Infraestructura mínima sin redundancia'],
      2: ['Servidor compartido con backup básico', 'Monitoreo manual de disponibilidad'],
      3: ['Arquitectura cloud básica (AWS/GCP)', 'Balanceo de carga simple', 'Auto-scaling para picos de demanda'],
      4: ['Arquitectura microservicios', 'CDN implementado', 'Base de datos con réplicas', 'Pruebas de carga regulares', 'CI/CD automatizado'],
      5: ['Multi-region deployment', 'Arquitectura tolerante a fallos', 'Disaster recovery plan documentado', 'SLA 99.9% garantizado', 'Optimización continua de performance']
    },
    'Legal': {
      1: ['Sin revisión legal del proyecto'],
      2: ['Términos y condiciones básicos copiados', 'Política de privacidad genérica'],
      3: ['Consultoría legal inicial contratada', 'Registro de datos personales ante SIC', 'Políticas de privacidad personalizadas'],
      4: ['Oficial de cumplimiento designado', 'Auditorías de cumplimiento trimestrales', 'Capacitación del equipo en protección de datos', 'Contratos con comercios revisados legalmente'],
      5: ['DPO (Data Protection Officer) dedicado', 'Certificación en protección de datos', 'Auditorías externas semestrales', 'Comité de ética y cumplimiento', 'Seguro de responsabilidad civil profesional']
    },
    'Proyecto': {
      1: ['Sin plan de proyecto formal'],
      2: ['Cronograma básico en Excel', 'Reuniones de seguimiento semanales informales'],
      3: ['Metodología ágil (Scrum) implementada', 'Sprints de 2 semanas', 'Dashboard de avance visible', 'Gestión de backlog activa'],
      4: ['PMO formal establecido', 'Gestión de riesgos activa', 'Control de alcance, tiempo y costos', 'Reportes semanales al sponsor', 'Métricas de productividad del equipo'],
      5: ['Certificación PMI del director', 'Herramientas de gestión de proyectos enterprise', 'Simulaciones de escenarios críticos', 'Plan de contingencia documentado por riesgo', 'Auditorías de calidad del proceso']
    },
    'Recursos': {
      1: ['Sin plan de recursos humanos'],
      2: ['Contratación reactiva según necesidad', 'Salarios de mercado básicos'],
      3: ['Programa de onboarding estructurado', 'Revisiones de desempeño trimestrales', 'Presupuesto de capacitación definido'],
      4: ['Plan de carrera definido por rol', 'Programa de retención con beneficios', 'Cultura de empresa documentada', 'Niveles de seniority claros'],
      5: ['Equipo de reclutamiento dedicado', 'Universidad corporativa interna', 'Programa de stock options', 'Clima laboral medido mensualmente', 'Rotación programada de conocimiento']
    },
    'Financiero': {
      1: ['Sin control financiero formal'],
      2: ['Estados financieros mensuales básicos', 'Control de gastos manual'],
      3: ['Software de contabilidad implementado', 'Presupuesto mensual revisado', 'Flujo de caja proyectado trimestralmente'],
      4: ['Análisis de unit economics', 'Dashboard financiero en tiempo real', 'Asesor financiero externo contratado', 'Escenarios de riesgo financiero modelados'],
      5: ['CFO dedicado tiempo completo', 'Comité financiero mensual', 'Plan de tesorería optimizado', 'Inversionistas alternativos identificados', 'Líneas de crédito contingentes aprobadas']
    }
  };
  
  const categoryMeasures = measures[riskCategory] || measures['Proyecto'];
  return categoryMeasures[level] || ['Medidas básicas de control'];
};

// Costos estimados de implementación por nivel (en millones COP)
const getControlCosts = (level) => {
  const costs = {
    1: { setup: 0, monthly: 0, description: 'Sin costo adicional' },
    2: { setup: 2, monthly: 0.5, description: '$2M setup + $500K/mes' },
    3: { setup: 8, monthly: 2, description: '$8M setup + $2M/mes' },
    4: { setup: 25, monthly: 5, description: '$25M setup + $5M/mes' },
    5: { setup: 60, monthly: 12, description: '$60M setup + $12M/mes' }
  };
  return costs[level];
};

// Tiempo de implementación por nivel
const getImplementationTime = (level) => {
  const times = {
    1: 'Inmediato',
    2: '1-2 semanas',
    3: '1-2 meses',
    4: '3-4 meses',
    5: '6+ meses'
  };
  return times[level];
};

const ControlSlider = ({ risk, onControlChange }) => {
  const currentLevel = risk.controlLevel || 1;
  const currentLabel = getControlLabel(currentLevel);
  
  // Calcular valores residuales
  const originalLevel = risk.level;
  const originalZone = risk.zone;
  const residualLevel = risk.residualLevel || originalLevel;
  const residualZone = risk.residualZone || originalZone;
  const reduction = originalLevel > 0 ? ((originalLevel - residualLevel) / originalLevel) * 100 : 0;
  
  // Calcular reducción de probabilidad e impacto
  const probReduction = Math.min(80, (currentLevel - 1) * 15); // Hasta 80% reducción
  const impactReduction = Math.min(80, (currentLevel - 1) * 20); // Hasta 80% reducción
  
  const handleChange = (e) => {
    const newLevel = parseInt(e.target.value);
    onControlChange(risk.id, newLevel);
  };

  const measures = getControlMeasures(risk.category, currentLevel);
  const costs = getControlCosts(currentLevel);
  const implTime = getImplementationTime(currentLevel);

  return (
    <div style={{
      background: 'var(--bg-hover)',
      borderRadius: '16px',
      padding: '1.5rem',
      marginTop: '1.25rem',
      border: '1px solid var(--border-color)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.25rem',
        flexWrap: 'wrap',
        gap: '0.5rem'
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
            <Sliders size={16} color="white" />
          </div>
          Sistema de Control Dinámico
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{
            padding: '0.375rem 0.75rem',
            background: currentLevel === 1 ? '#9CA3AF' : '#6B21A8',
            color: 'white',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700
          }}>
            Nivel {currentLevel}/5
          </span>
          <span style={{
            padding: '0.375rem 0.75rem',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 600,
            border: '1px solid var(--border-color)'
          }}>
            {currentLabel}
          </span>
        </div>
      </div>

      {/* Slider */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.5rem',
          fontSize: '0.6875rem',
          color: 'var(--text-muted)',
          fontWeight: 500
        }}>
          <span>Sin controles</span>
          <span>Básico</span>
          <span>Intermedio</span>
          <span>Avanzado</span>
          <span>Óptimo</span>
        </div>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={currentLevel}
          onChange={handleChange}
          style={{
            width: '100%',
            height: '12px',
            borderRadius: '6px',
            background: `linear-gradient(to right, #6B21A8 0%, #6B21A8 ${(currentLevel - 1) * 25}%, var(--border-color) ${(currentLevel - 1) * 25}%, var(--border-color) 100%)`,
            outline: 'none',
            cursor: 'pointer',
            appearance: 'none',
            WebkitAppearance: 'none'
          }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.5rem'
        }}>
          {[1, 2, 3, 4, 5].map(num => (
            <div key={num} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: num <= currentLevel ? '#6B21A8' : 'var(--border-color)',
                transition: 'all 0.3s ease'
              }} />
              <span style={{
                fontSize: '0.625rem',
                color: num === currentLevel ? '#6B21A8' : 'var(--text-muted)',
                fontWeight: num === currentLevel ? 700 : 400
              }}>
                {num}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid de métricas de reducción */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.75rem',
        marginBottom: '1.25rem'
      }}>
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '10px',
          padding: '0.75rem',
          textAlign: 'center',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            marginBottom: '0.25rem'
          }}>
            <TrendingDown size={12} />
            Reducción Prob.
          </div>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: probReduction > 0 ? '#16a34a' : 'var(--text-muted)'
          }}>
            {probReduction}%
          </div>
        </div>
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '10px',
          padding: '0.75rem',
          textAlign: 'center',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            marginBottom: '0.25rem'
          }}>
            <Activity size={12} />
            Reducción Imp.
          </div>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: impactReduction > 0 ? '#16a34a' : 'var(--text-muted)'
          }}>
            {impactReduction}%
          </div>
        </div>
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '10px',
          padding: '0.75rem',
          textAlign: 'center',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            marginBottom: '0.25rem'
          }}>
            <CheckCircle size={12} />
            Efectividad
          </div>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: '#6B21A8'
          }}>
            {((1 - controlLevels[currentLevel].effectiveness) * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Medidas de control específicas */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '12px',
        padding: '1rem',
        border: '1px solid var(--border-color)',
        marginBottom: '1rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8125rem',
          fontWeight: 700,
          color: '#6B21A8',
          marginBottom: '0.75rem'
        }}>
          <Shield size={16} />
          Medidas de Control - {risk.category}
        </div>
        <ul style={{
          margin: 0,
          paddingLeft: '1.25rem',
          fontSize: '0.8125rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.6'
        }}>
          {measures.map((measure, idx) => (
            <li key={idx} style={{ marginBottom: '0.375rem' }}>{measure}</li>
          ))}
        </ul>
      </div>

      {/* Información de implementación */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0.75rem',
        marginBottom: '1rem'
      }}>
        <div style={{
          background: 'rgba(107, 33, 168, 0.1)',
          borderRadius: '10px',
          padding: '0.75rem',
          border: '1px solid rgba(107, 33, 168, 0.2)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.75rem',
            color: '#6B21A8',
            marginBottom: '0.25rem'
          }}>
            <DollarSign size={12} />
            Costo Estimado
          </div>
          <div style={{
            fontSize: '0.875rem',
            fontWeight: 700,
            color: 'var(--text-primary)'
          }}>
            {costs.description}
          </div>
        </div>
        <div style={{
          background: 'rgba(107, 33, 168, 0.1)',
          borderRadius: '10px',
          padding: '0.75rem',
          border: '1px solid rgba(107, 33, 168, 0.2)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.75rem',
            color: '#6B21A8',
            marginBottom: '0.25rem'
          }}>
            <Clock size={12} />
            Tiempo Implementación
          </div>
          <div style={{
            fontSize: '0.875rem',
            fontWeight: 700,
            color: 'var(--text-primary)'
          }}>
            {implTime}
          </div>
        </div>
      </div>

      {/* Estado de mitigación */}
      <div style={{
        background: reduction > 0 ? 'rgba(22, 163, 74, 0.1)' : 'rgba(220, 38, 38, 0.1)',
        borderRadius: '12px',
        padding: '1rem',
        border: `1px solid ${reduction > 0 ? 'rgba(22, 163, 74, 0.2)' : 'rgba(220, 38, 38, 0.2)'}`
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.75rem',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9375rem',
            fontWeight: 700,
            color: reduction > 0 ? '#16a34a' : '#dc2626'
          }}>
            {reduction > 0 ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
            {reduction > 0 ? 'Riesgo mitigado' : 'Sin mitigación aplicada'}
          </div>
          {reduction > 0 && (
            <span style={{
              padding: '0.25rem 0.75rem',
              background: '#16a34a',
              color: 'white',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              -{reduction.toFixed(0)}%
            </span>
          )}
        </div>

        {/* Comparación Original vs Residual */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '0.75rem',
          alignItems: 'center'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '10px',
            padding: '0.75rem',
            textAlign: 'center',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{
              fontSize: '0.625rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.25rem'
            }}>Original</div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: getZoneColor(originalZone)
            }}>{originalLevel}</div>
            <div style={{
              fontSize: '0.6875rem',
              color: 'var(--text-secondary)',
              marginTop: '0.25rem'
            }}>{getZoneLabel(originalZone)}</div>
          </div>

          <TrendingDown size={24} color={reduction > 0 ? '#16a34a' : '#9ca3af'} />

          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '10px',
            padding: '0.75rem',
            textAlign: 'center',
            border: `2px solid ${getZoneColor(residualZone)}`,
            boxShadow: `0 2px 8px ${getZoneColor(residualZone)}20`
          }}>
            <div style={{
              fontSize: '0.625rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.25rem'
            }}>Con Controles</div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: getZoneColor(residualZone)
            }}>{residualLevel}</div>
            <div style={{
              fontSize: '0.6875rem',
              color: 'var(--text-secondary)',
              marginTop: '0.25rem'
            }}>{getZoneLabel(residualZone)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlSlider;
