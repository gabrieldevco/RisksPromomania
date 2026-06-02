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
    responsible: 'Product Manager / Community Manager',
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
    responsible: 'CISO / Líder de Seguridad',
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
    description: 'Poca participación de comerciantes para publicar promociones y/o bajo interés de clientes potenciales en usar la plataforma.',
    probability: 3,
    impact: 4,
    frequency: 'Continua',
    level: 12,
    zone: 'high',
    strategy: 'Mitigar',
    responsible: 'CMO / Growth Hacker',
    indicator: 'Tasa de conversión de visitantes a usuarios registrados',
    actions: [
      'Campaña de marketing digital segmentada',
      'Programa de referidos con incentivos',
      'Alianzas estratégicas con cámaras de comercio',
      'Onboarding simplificado y tutoriales'
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
    responsible: 'CEO / Estrategia',
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
    responsible: 'Arquitecto de Software',
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
    responsible: 'Líder de QA / DevOps',
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
    responsible: 'Oficial de Cumplimiento / Legal',
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
    description: 'El equipo de desarrollo no cumple con los plazos establecidos, afectando el lanzamiento y hitos del proyecto.',
    probability: 3,
    impact: 2,
    frequency: 'Regular',
    level: 6,
    zone: 'medium',
    strategy: 'Mitigar',
    responsible: 'Gerente de Proyecto / Scrum Master',
    indicator: '% de avance vs plan de sprints',
    actions: [
      'Metodología ágil con sprints cortos',
      'Gestión activa del backlog',
      'Identificación temprana de bloqueos',
      'Plan de contingencia con recursos adicionales'
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
    responsible: 'Oficial de Protección de Datos (DPO)',
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
    responsible: 'DevOps / Arquitecto',
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
    responsible: 'RRHH / CTO',
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
    name: 'Problemas de monetización',
    category: 'Financiero',
    description: 'El modelo de negocio no genera ingresos suficientes para sostener operaciones y crecimiento de la plataforma.',
    probability: 3,
    impact: 4,
    frequency: 'Continua',
    level: 12,
    zone: 'high',
    strategy: 'Mitigar',
    responsible: 'CEO / CFO',
    indicator: 'MRR (Monthly Recurring Revenue) y CAC Payback Period',
    actions: [
      'Modelo freemium con características premium',
      'Diversificación de fuentes de ingresos (suscripciones, publicidad, comisiones)',
      'Análisis de cohortes y LTV/CAC',
      'Experimentación continua de precios'
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

// Estadísticas
export const riskStats = {
  total: risks.length,
  critical: risks.filter(r => r.zone === 'critical').length,
  high: risks.filter(r => r.zone === 'high').length,
  medium: risks.filter(r => r.zone === 'medium').length,
  low: risks.filter(r => r.zone === 'low').length
};
