/**
 * DATOS DE RIESGOS - PROMOMANIA
 * 12 riesgos identificados para la plataforma de promociones
 */

export const risks = [
  {
    id: 'R01',
    name: 'Fraudes en publicaciones',
    category: 'Seguridad',
    description: 'Usuarios publican promociones falsas, engañosas o que no cumplen con las ofertas anunciadas, dañando la reputación de la plataforma.',
    probability: 4,
    impact: 3,
    frequency: 'Regular',
    level: 12,
    zone: 'high',
    strategy: 'Mitigar',
    responsible: 'Gabriel Padilla (Product Manager / Community Manager)',
    indicator: 'Porcentaje de publicaciones fraudulentas detectadas / total publicaciones',
    actions: [
      'Sistema de verificación de comercios (KYC)',
      'Moderación automática con IA + revisión humana',
      'Sistema de reputación y reportes de usuarios',
      'Algoritmo de detección de patrones fraudulentos'
    ]
  },
  {
    id: 'R02',
    name: 'Ataques cibernéticos',
    category: 'Seguridad',
    description: 'Hacking, ataques DDoS, inyección SQL, XSS u otros vectores de ataque que comprometen la seguridad de la plataforma.',
    probability: 4,
    impact: 5,
    frequency: 'Regular',
    level: 20,
    zone: 'critical',
    strategy: 'Mitigar + Transferir',
    responsible: 'Armando Pérez (CISO / Líder de Seguridad)',
    indicator: 'Número de intentos de ataque bloqueados / mes',
    actions: [
      'Implementar WAF (Web Application Firewall)',
      'Contratar servicio de pentesting semestral',
      'Implementar autenticación multi-factor',
      'Establecer protocolo de respuesta a incidentes'
    ]
  },
  {
    id: 'R03',
    name: 'Baja adopción de usuarios',
    category: 'Mercado',
    description: 'Poca participación de comerciantes para publicar promociones y/o bajo interés de clientes potenciales en usar la plataforma, incumpliendo el objetivo SMART de alcanzar 1,000 usuarios registrados durante el primer mes de funcionamiento en 5 ciudades principales de Colombia.',
    probability: 3,
    impact: 4,
    frequency: 'Continua',
    level: 12,
    zone: 'high',
    strategy: 'Mitigar',
    responsible: 'Harlem Hernández (CMO / Growth Hacker)',
    indicator: 'Tasa de conversión de visitantes a usuarios registrados',
    actions: [
      'Campaña de marketing digital segmentada por ciudad',
      'Programa de referidos con incentivos',
      'Alianzas estratégicas con cámaras de comercio locales',
      'Onboarding simplificado y tutoriales',
      'Lanzamiento progresivo en las 5 ciudades objetivo'
    ]
  },
  {
    id: 'R04',
    name: 'Competencia agresiva',
    category: 'Mercado',
    description: 'Entrada de competidores con mayor capital, mejor tecnología o estrategias de precio agresivas que capturan el mercado.',
    probability: 3,
    impact: 3,
    frequency: 'Esporádica',
    level: 9,
    zone: 'medium',
    strategy: 'Mitigar',
    responsible: 'Georgy Muñoz (CEO / Estrategia)',
    indicator: 'Cambios en market share trimestral',
    actions: [
      'Diferenciación mediante características únicas',
      'Construcción de comunidad fiel de usuarios',
      'Análisis competitivo continuo',
      'Foco en nichos específicos del mercado'
    ]
  },
  {
    id: 'R05',
    name: 'Problemas de escalabilidad',
    category: 'Técnico',
    description: 'El sistema no soporta la alta demanda de usuarios concurrentes, causando lentitud o caídas del servicio.',
    probability: 4,
    impact: 4,
    frequency: 'Continua',
    level: 16,
    zone: 'high',
    strategy: 'Mitigar',
    responsible: 'Gabriel Padilla (Arquitecto de Software)',
    indicator: 'Tiempo de respuesta del sistema (SLA < 2 segundos)',
    actions: [
      'Diseño de arquitectura cloud-native (AWS/GCP)',
      'Implementar auto-scaling y load balancing',
      'Pruebas de carga regulares',
      'Optimización de base de datos (indexación, sharding)'
    ]
  },
  {
    id: 'R06',
    name: 'Fallos en el sistema',
    category: 'Técnico',
    description: 'Bugs críticos, errores en producción o funcionalidades que no operan correctamente, afectando la experiencia del usuario.',
    probability: 4,
    impact: 4,
    frequency: 'Regular',
    level: 16,
    zone: 'high',
    strategy: 'Mitigar',
    responsible: 'Harlem Hernández (Líder de QA / DevOps)',
    indicator: 'Uptime del sistema (SLA 99.9%)',
    actions: [
      'Implementar CI/CD con pruebas automatizadas',
      'Establecer ambientes de staging y QA',
      'Monitoreo 24/7 con alertas automáticas',
      'Plan de rollback inmediato'
    ]
  },
  {
    id: 'R07',
    name: 'Incumplimiento normativo',
    category: 'Legal',
    description: 'Violación de leyes de protección de datos (LGPD/GDPR), normativas de publicidad digital o requisitos fiscales.',
    probability: 2,
    impact: 4,
    frequency: 'Esporádica',
    level: 8,
    zone: 'medium',
    strategy: 'Mitigar + Transferir',
    responsible: 'Georgy Muñoz (Oficial de Cumplimiento / Legal)',
    indicator: 'Auditorías de cumplimiento (sin hallazgos críticos)',
    actions: [
      'Consultoría legal especializada',
      'Implementación de políticas de privacidad robustas',
      'Consentimiento explícito de usuarios',
      'Auditorías de cumplimiento semestrales'
    ]
  },
  {
    id: 'R08',
    name: 'Retrasos en desarrollo',
    category: 'Proyecto',
    description: 'El equipo de desarrollo (Armando Pérez, Harlem Hernández, Georgy Muñoz, Gabriel Padilla) no cumple con los plazos establecidos dentro de los 4 meses de ejecución, afectando el lanzamiento previsto para el 30 de noviembre de 2026.',
    probability: 3,
    impact: 2,
    frequency: 'Regular',
    level: 6,
    zone: 'medium',
    strategy: 'Mitigar',
    responsible: 'Director del Proyecto (Armando Pérez)',
    indicator: '% de avance vs plan de sprints y entregables mensuales',
    actions: [
      'Metodología ágil con sprints de 2 semanas',
      'Gestión activa del backlog y daily standups',
      'Identificación temprana de bloqueos y riesgos técnicos',
      'Plan de contingencia con horas extra o recursos externos',
      'Revisión semanal del cronograma contra hitos (Planeación, Diseño, Desarrollo, Pruebas, Despliegue)'
    ]
  },
  {
    id: 'R09',
    name: 'Fuga de información sensible',
    category: 'Seguridad',
    description: 'Filtración de datos personales de usuarios, información de pagos o datos comerciales confidenciales.',
    probability: 4,
    impact: 5,
    frequency: 'Esporádica',
    level: 20,
    zone: 'critical',
    strategy: 'Mitigar + Transferir',
    responsible: 'Gabriel Padilla (Oficial de Protección de Datos / DPO)',
    indicator: 'Número de incidentes de fuga de datos / trimestre',
    actions: [
      'Encriptación de datos en tránsito y reposo (AES-256)',
      'Implementar políticas de acceso basadas en roles (RBAC)',
      'Contratar seguro cibernético',
      'Auditorías de seguridad trimestrales'
    ]
  },
  {
    id: 'R10',
    name: 'Dependencia de terceros',
    category: 'Técnico',
    description: 'Fallos en servicios externos como pasarelas de pago, proveedores de hosting, APIs de terceros o servicios cloud.',
    probability: 2,
    impact: 3,
    frequency: 'Esporádica',
    level: 6,
    zone: 'medium',
    strategy: 'Mitigar',
    responsible: 'Harlem Hernández (DevOps / Arquitecto)',
    indicator: 'Disponibilidad de servicios externos (SLA)',
    actions: [
      'Proveedores de respaldo para servicios críticos',
      'Arquitectura tolerante a fallos',
      'Monitoreo de dependencias externas',
      'SLAs contractuales estrictos'
    ]
  },
  {
    id: 'R11',
    name: 'Escasez de talento técnico',
    category: 'Recursos',
    description: 'Dificultad para contratar y retener desarrolladores calificados, especialmente en tecnologías especializadas.',
    probability: 2,
    impact: 2,
    frequency: 'Continua',
    level: 4,
    zone: 'low',
    strategy: 'Mitigar',
    responsible: 'Georgy Muñoz (RRHH / CTO)',
    indicator: 'Tasa de rotación de equipo técnico',
    actions: [
      'Programas de retención y beneficios competitivos',
      'Cultura de desarrollo y crecimiento',
      'Relaciones con universidades y bootcamps',
      'Documentación y reducción de bus factor'
    ]
  },
  {
    id: 'R12',
    name: 'Sostenibilidad financiera',
    category: 'Financiero',
    description: 'Los ingresos por publicidad/comisiones no son suficientes para cubrir los costos operativos mensuales del proyecto ($326,614,600 COP anuales en nómina y servicios), poniendo en riesgo la viabilidad del emprendimiento tras el agotamiento del presupuesto inicial de $593,408,360 COP.',
    probability: 3,
    impact: 4,
    frequency: 'Continua',
    level: 12,
    zone: 'high',
    strategy: 'Mitigar',
    responsible: 'Gabriel Padilla (Director del Proyecto / Asesor Financiero)',
    indicator: 'Burn rate mensual vs ingresos generados',
    actions: [
      'Modelo de publicidad segmentada para comercios locales',
      'Comisiones por publicaciones destacadas de promociones',
      'Monitoreo mensual del burn rate y runway financiero',
      'Plan de contingencia para reducción de costos operativos',
      'Búsqueda de inversión adicional o ronda de financiamiento'
    ]
  }
];

// Utilidades
export const getRiskZone = (level) => {
  if (level >= 17) return 'critical';
  if (level >= 10) return 'high';
  if (level >= 5) return 'medium';
  return 'low';
};

export const getZoneLabel = (zone) => {
  const labels = {
    critical: '🔴 Crítico',
    high: '🟠 Alto',
    medium: '🟡 Medio',
    low: '🟢 Bajo'
  };
  return labels[zone] || zone;
};

export const getProbabilityLabel = (prob) => {
  const labels = { 1: 'Muy Baja', 2: 'Baja', 3: 'Media', 4: 'Alta', 5: 'Muy Alta' };
  return labels[prob] || prob;
};

export const getImpactLabel = (imp) => {
  const labels = { 1: 'Insignificante', 2: 'Menor', 3: 'Moderado', 4: 'Mayor', 5: 'Catastrófico' };
  return labels[imp] || imp;
};

export const getZoneColor = (zone) => {
  const colors = {
    critical: '#dc2626',
    high: '#ea580c',
    medium: '#ca8a04',
    low: '#16a34a'
  };
  return colors[zone] || '#6b7280';
};

// ============================================
// SISTEMA DE CONTROLES DINÁMICO (1-5)
// ============================================

// Niveles de control y sus etiquetas
export const controlLevels = {
  1: { label: 'Nunca', description: 'No se aplican controles', effectiveness: 1.0 },
  2: { label: 'Rara vez', description: 'Controles aplicados esporádicamente', effectiveness: 0.8 },
  3: { label: 'Ocasionalmente', description: 'Controles aplicados a veces', effectiveness: 0.6 },
  4: { label: 'Frecuentemente', description: 'Controles aplicados regularmente', effectiveness: 0.4 },
  5: { label: 'Siempre', description: 'Controles aplicados consistentemente', effectiveness: 0.2 }
};

// Obtener etiqueta del nivel de control
export const getControlLabel = (level) => {
  return controlLevels[level]?.label || 'Nunca';
};

// Calcular impacto residual basado en el nivel de control
export const calculateResidualImpact = (originalImpact, controlLevel) => {
  const effectiveness = controlLevels[controlLevel]?.effectiveness || 1.0;
  const residualImpact = Math.max(1, Math.round(originalImpact * effectiveness));
  return residualImpact;
};

// Calcular nivel de riesgo residual
export const calculateResidualLevel = (probability, residualImpact) => {
  return probability * residualImpact;
};

// Obtener estado de mitigación comparando riesgo original vs residual
export const getMitigationStatus = (originalLevel, residualLevel) => {
  const reduction = ((originalLevel - residualLevel) / originalLevel) * 100;
  
  if (reduction >= 50) return { status: 'exitosamente', color: '#16a34a', reduction };
  if (reduction >= 25) return { status: 'parcialmente', color: '#ca8a04', reduction };
  if (reduction > 0) return { status: 'mínimamente', color: '#ea580c', reduction };
  return { status: 'sin mitigar', color: '#dc2626', reduction: 0 };
};

// Crear riesgo con valores iniciales de control
export const createRiskWithControl = (risk, controlLevel = 1) => ({
  ...risk,
  controlLevel,
  residualImpact: calculateResidualImpact(risk.impact, controlLevel),
  residualLevel: calculateResidualLevel(risk.probability, calculateResidualImpact(risk.impact, controlLevel)),
  residualZone: getRiskZone(calculateResidualLevel(risk.probability, calculateResidualImpact(risk.impact, controlLevel)))
});

// Inicializar riesgos con control = 1 (Nunca)
export const initializeRisksWithControl = () => {
  return risks.map(risk => createRiskWithControl(risk, 1));
};

// Actualizar nivel de control de un riesgo
export const updateRiskControlLevel = (risk, newControlLevel) => {
  return createRiskWithControl(risk, newControlLevel);
};

// Estadísticas
export const riskStats = {
  total: risks.length,
  critical: risks.filter(r => r.zone === 'critical').length,
  high: risks.filter(r => r.zone === 'high').length,
  medium: risks.filter(r => r.zone === 'medium').length,
  low: risks.filter(r => r.zone === 'low').length
};
