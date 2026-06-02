/**
 * PROMOMANIA - SISTEMA DE GESTIÓN DE RIESGOS
 * Lógica dinámica y datos de riesgos
 */

// ============================================
// DATOS DE RIESGOS
// ============================================
const risks = [
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

// ============================================
// UTILIDADES
// ============================================
const getRiskZone = (level) => {
    if (level >= 17) return 'critical';
    if (level >= 10) return 'high';
    if (level >= 5) return 'medium';
    return 'low';
};

const getZoneLabel = (zone) => {
    const labels = {
        critical: '🔴 Crítico',
        high: '🟠 Alto',
        medium: '🟡 Medio',
        low: '🟢 Bajo'
    };
    return labels[zone] || zone;
};

// ============================================
// RENDERIZADO DE COMPONENTES
// ============================================

// Renderizar tarjeta de riesgo
const renderRiskCard = (risk) => {
    return `
        <div class="risk-card ${risk.zone}" data-id="${risk.id}" data-zone="${risk.zone}">
            <div class="risk-header">
                <div>
                    <span class="risk-id">${risk.id}</span>
                    <h3 class="risk-title">${risk.name}</h3>
                    <span class="category-badge">${risk.category}</span>
                </div>
                <span class="badge badge-${risk.zone}">${getZoneLabel(risk.zone)}</span>
            </div>
            <p class="risk-description">${risk.description}</p>
            <div class="risk-metrics">
                <div class="risk-metric">
                    <div class="risk-metric-value">${risk.probability}</div>
                    <div class="risk-metric-label">Probabilidad</div>
                </div>
                <div class="risk-metric">
                    <div class="risk-metric-value">${risk.impact}</div>
                    <div class="risk-metric-label">Impacto</div>
                </div>
                <div class="risk-metric">
                    <div class="risk-metric-value">${risk.level}</div>
                    <div class="risk-metric-label">Nivel</div>
                </div>
            </div>
        </div>
    `;
};

// Renderizar tarjeta de respuesta
const renderResponseCard = (risk) => {
    const strategyClass = {
        'Evitar': 'strategy-evitar',
        'Mitigar': 'strategy-mitigar',
        'Mitigar + Transferir': 'strategy-mitigar',
        'Transferir': 'strategy-transferir',
        'Aceptar': 'strategy-aceptar'
    }[risk.strategy] || 'strategy-mitigar';

    return `
        <div class="response-card ${risk.zone}">
            <div class="response-header">
                <div>
                    <span class="risk-id">${risk.id}</span>
                    <h3 class="response-title">${risk.name}</h3>
                </div>
                <span class="strategy-badge ${strategyClass}">${risk.strategy}</span>
            </div>
            <div class="response-section">
                <div class="response-section-title">Acciones de Control</div>
                <ul class="response-actions">
                    ${risk.actions.map(action => `<li>${action}</li>`).join('')}
                </ul>
            </div>
            <div class="response-section">
                <div class="response-section-title">Responsable</div>
                <span class="responsible-tag">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    ${risk.responsible}
                </span>
            </div>
            <div class="response-section">
                <div class="response-section-title">Indicador de Seguimiento</div>
                <p style="color: var(--text-secondary); font-size: 0.9375rem;">${risk.indicator}</p>
            </div>
        </div>
    `;
};

// Renderizar matriz de riesgos
const renderRiskMatrix = () => {
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
    
    let html = '<div class="matrix-label"></div>';
    for (let i = 1; i <= 5; i++) {
        html += `<div class="matrix-header">${impLabels[i]}</div>`;
    }
    
    for (let p = 5; p >= 1; p--) {
        html += `<div class="matrix-label">${probLabels[p]}</div>`;
        for (let i = 1; i <= 5; i++) {
            const cellRisks = matrix[p][i];
            const level = p * i;
            const zone = getRiskZone(level);
            const riskIds = cellRisks.map(r => r.id).join(', ');
            
            html += `
                <div class="matrix-cell ${zone}">
                    <span>${level}</span>
                    ${riskIds ? `<span class="risk-ids">${riskIds}</span>` : ''}
                </div>
            `;
        }
    }
    
    return html;
};

// Renderizar tabla de monitoreo
const renderMonitoringTable = () => {
    const frequencies = {
        'R02': 'Diaria',
        'R09': 'Trimestral',
        'R05': 'Diaria',
        'R06': 'Continua',
        'R01': 'Semanal',
        'R03': 'Mensual',
        'R12': 'Mensual',
        'R04': 'Trimestral',
        'R07': 'Semestral',
        'R08': 'Semanal',
        'R10': 'Continua',
        'R11': 'Mensual'
    };
    
    const nextReviews = {
        'Diaria': '2024-01-15',
        'Continua': 'Automático',
        'Semanal': '2024-01-22',
        'Mensual': '2024-02-01',
        'Trimestral': '2024-03-31',
        'Semestral': '2024-06-30'
    };
    
    return risks.map(risk => {
        const freq = frequencies[risk.id];
        const nextReview = nextReviews[freq];
        const status = risk.zone === 'critical' ? 'danger' : risk.zone === 'high' ? 'warning' : 'active';
        
        return `
            <tr>
                <td class="risk-id-cell">${risk.id}</td>
                <td>${risk.name}</td>
                <td>${risk.indicator}</td>
                <td><span class="badge badge-${risk.zone}">${freq}</span></td>
                <td>${risk.responsible}</td>
                <td>
                    <span class="status-indicator">
                        <span class="status-dot ${status}"></span>
                        ${nextReview}
                    </span>
                </td>
            </tr>
        `;
    }).join('');
};

// ============================================
// INICIALIZACIÓN Y EVENTOS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Renderizar estadísticas
    const stats = {
        critical: risks.filter(r => r.zone === 'critical').length,
        high: risks.filter(r => r.zone === 'high').length,
        medium: risks.filter(r => r.zone === 'medium').length,
        low: risks.filter(r => r.zone === 'low').length
    };
    
    Object.keys(stats).forEach(key => {
        const el = document.getElementById(`stat-${key}`);
        if (el) el.textContent = stats[key];
    });
    
    // Renderizar gráfico de distribución
    const total = risks.length;
    const chartContainer = document.getElementById('risk-chart');
    if (chartContainer) {
        chartContainer.innerHTML = `
            <div class="bar-item">
                <span class="bar-label">Crítico</span>
                <div class="bar-track">
                    <div class="bar-fill critical" style="width: ${(stats.critical/total)*100}%">
                        <span class="bar-value">${stats.critical}</span>
                    </div>
                </div>
            </div>
            <div class="bar-item">
                <span class="bar-label">Alto</span>
                <div class="bar-track">
                    <div class="bar-fill high" style="width: ${(stats.high/total)*100}%">
                        <span class="bar-value">${stats.high}</span>
                    </div>
                </div>
            </div>
            <div class="bar-item">
                <span class="bar-label">Medio</span>
                <div class="bar-track">
                    <div class="bar-fill medium" style="width: ${(stats.medium/total)*100}%">
                        <span class="bar-value">${stats.medium}</span>
                    </div>
                </div>
            </div>
            <div class="bar-item">
                <span class="bar-label">Bajo</span>
                <div class="bar-track">
                    <div class="bar-fill low" style="width: ${(stats.low/total)*100}%">
                        <span class="bar-value">${stats.low}</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Renderizar riesgos
    const risksContainer = document.getElementById('risks-container');
    if (risksContainer) {
        risksContainer.innerHTML = risks.map(renderRiskCard).join('');
    }
    
    // Renderizar matriz
    const matrixContainer = document.getElementById('matrix-container');
    if (matrixContainer) {
        matrixContainer.innerHTML = renderRiskMatrix();
    }
    
    // Renderizar plan de respuesta
    const responseContainer = document.getElementById('response-container');
    if (responseContainer) {
        const highAndCritical = risks.filter(r => r.level >= 10);
        responseContainer.innerHTML = highAndCritical.map(renderResponseCard).join('');
    }
    
    // Renderizar tabla de monitoreo
    const monitoringTable = document.getElementById('monitoring-table');
    if (monitoringTable) {
        monitoringTable.innerHTML = renderMonitoringTable();
    }
    
    // Navegación entre secciones
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Actualizar navegación
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Mostrar sección
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
        });
    });
    
    // Filtros de riesgos
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Actualizar botones
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filtrar tarjetas
            const cards = document.querySelectorAll('.risk-card');
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.zone === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Tabs del plan de respuesta
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            tabContents.forEach(c => c.classList.remove('active'));
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
    
    // Animación de entrada para barras del gráfico
    setTimeout(() => {
        document.querySelectorAll('.bar-fill').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }, 300);
});

// ============================================
// EXPORTAR DATOS (para uso externo)
// ============================================
window.PromomaniaRisks = {
    risks,
    getRiskById: (id) => risks.find(r => r.id === id),
    getRisksByZone: (zone) => risks.filter(r => r.zone === zone),
    getRisksByCategory: (category) => risks.filter(r => r.category === category),
    stats: {
        total: risks.length,
        critical: risks.filter(r => r.zone === 'critical').length,
        high: risks.filter(r => r.zone === 'high').length,
        medium: risks.filter(r => r.zone === 'medium').length,
        low: risks.filter(r => r.zone === 'low').length
    }
};
