# 🚀 Promomania - Gestión de Riesgos

> **Taller Final Integrador**  
> **Asignatura:** Gestión de Proyectos  
> **Unidad:** Gestión de Riesgos del Proyecto  
> **Modalidad:** Equipos de trabajo

---

## 📋 Contexto del Proyecto

**Promomania** es una aplicación web innovadora que permite a usuarios de todo tipo de almacenes (desde pequeñas tiendas hasta grandes cadenas comerciales) publicar y descubrir promociones en tiempo real. La plataforma conecta comerciantes con clientes potenciales, facilitando la difusión de ofertas, descuentos y eventos especiales.

Durante el desarrollo de este proyecto de emprendimiento se han identificado diversos riesgos y oportunidades que pueden afectar el cumplimiento de sus objetivos. Este documento presenta el **Plan Básico de Gestión de Riesgos** desarrollado antes del inicio de operaciones, tras haber conseguido financiación inicial.

---

## 🎯 Objetivo General

Aplicar el proceso de Gestión de Riesgos para identificar, analizar, evaluar y proponer respuestas a los riesgos que podrían afectar la ejecución del proyecto Promomania.

---

## 📊 Estructura del Proyecto (React)

```
RisksPromomania/
├── README.md                          # Documentación principal
├── package.json                       # Dependencias del proyecto
├── vite.config.js                     # Configuración de Vite
├── index.html                         # Punto de entrada HTML
├── src/
│   ├── main.jsx                       # Entry point de React
│   ├── App.jsx                        # Componente principal
│   ├── index.css                      # Estilos globales
│   ├── data/
│   │   └── risks.js                   # Datos de los 12 riesgos
│   ├── components/
│   │   ├── Navbar.jsx                 # Barra de navegación
│   │   ├── Badge.jsx                  # Componente de etiquetas
│   │   └── RiskCard.jsx               # Tarjeta de riesgo individual
│   └── sections/
│       ├── Dashboard.jsx              # Panel principal (FASE 2-3)
│       ├── Riesgos.jsx                # Identificación (FASE 1)
│       ├── Matriz.jsx                 # Matriz de riesgos (FASE 3)
│       ├── Respuesta.jsx              # Plan de respuesta (FASE 4)
│       └── Monitoreo.jsx              # Plan de monitoreo (FASE 5)
└── docs/
    ├── FASE1_Identificacion_Riesgos.md
    ├── FASE2_Analisis_Cualitativo.md
    ├── FASE3_Matriz_Riesgos.md
    ├── FASE4_Plan_Respuesta.md
    └── FASE5_Plan_Monitoreo.md
```

---

## 🔍 FASE 1: Identificación de Riesgos

Se han identificado **12 riesgos críticos** que podrían afectar el proyecto Promomania:

| ID | Riesgo | Categoría | Descripción |
|----|--------|-----------|-------------|
| R01 | Fraudes en publicaciones | Seguridad | Usuarios publican promociones falsas o engañosas |
| R02 | Ataques cibernéticos | Seguridad | Hacking, DDoS, robo de datos de usuarios |
| R03 | Baja adopción de usuarios | Mercado | Poca participación de comerciantes y clientes |
| R04 | Competencia agresiva | Mercado | Entrada de competidores con mayor recursos |
| R05 | Problemas de escalabilidad | Técnico | El sistema no soporta alta demanda de usuarios |
| R06 | Fallos en el sistema | Técnico | Bugs críticos que afectan la experiencia del usuario |
| R07 | Incumplimiento normativo | Legal | Violación de leyes de protección de datos o publicidad |
| R08 | Retrasos en desarrollo | Proyecto | El equipo no cumple los plazos establecidos |
| R09 | Fuga de información sensible | Seguridad | Filtración de datos personales de usuarios |
| R10 | Dependencia de terceros | Técnico | Fallos en servicios externos (pasarelas de pago, hosting) |
| R11 | Escasez de talento técnico | Recursos | Dificultad para contratar desarrolladores calificados |
| R12 | Problemas de monetización | Financiero | El modelo de negocio no genera ingresos suficientes |

---

## 📈 FASE 2: Análisis Cualitativo de Riesgos

Cada riesgo se evalúa según los siguientes criterios:

### Criterios de Evaluación

| Factor | Escala | Descripción |
|--------|--------|-------------|
| **Probabilidad** | 1-5 | 1=Muy Baja, 2=Baja, 3=Media, 4=Alta, 5=Muy Alta |
| **Impacto** | 1-5 | 1=Insignificante, 2=Menor, 3=Moderado, 4=Mayor, 5=Catastrófico |
| **Frecuencia** | Continua/Regular/Esporádica | Periodicidad de ocurrencia |

### Nivel de Riesgo (Probabilidad × Impacto)

| Rango | Nivel | Color |
|-------|-------|-------|
| 1-4 | Bajo | 🟢 |
| 5-9 | Medio | 🟡 |
| 10-16 | Alto | 🟠 |
| 17-25 | Crítico | 🔴 |

---

## 🎯 FASE 3: Matriz de Riesgos

### Matriz de Probabilidad vs Impacto

| Probabilidad \ Impacto | 1-Insignificante | 2-Menor | 3-Moderado | 4-Mayor | 5-Catastrófico |
|------------------------|------------------|---------|------------|---------|----------------|
| **5-Muy Alta** | 5 (Medio) | 10 (Alto) | 15 (Alto) | 20 (Crítico) | 25 (Crítico) |
| **4-Alta** | 4 (Bajo) | 8 (Medio) | 12 (Alto) | 16 (Alto) | 20 (Crítico) |
| **3-Media** | 3 (Bajo) | 6 (Medio) | 9 (Medio) | 12 (Alto) | 15 (Alto) |
| **2-Baja** | 2 (Bajo) | 4 (Bajo) | 6 (Medio) | 8 (Medio) | 10 (Alto) |
| **1-Muy Baja** | 1 (Bajo) | 2 (Bajo) | 3 (Bajo) | 4 (Bajo) | 5 (Medio) |

### Ubicación de Riesgos en la Matriz

| ID | Riesgo | Probabilidad | Impacto | Nivel | Zona |
|----|--------|--------------|---------|-------|------|
| R02 | Ataques cibernéticos | 4 | 5 | 20 | 🔴 Crítico |
| R09 | Fuga de información sensible | 4 | 5 | 20 | 🔴 Crítico |
| R05 | Problemas de escalabilidad | 4 | 4 | 16 | 🟠 Alto |
| R06 | Fallos en el sistema | 4 | 4 | 16 | 🟠 Alto |
| R01 | Fraudes en publicaciones | 4 | 3 | 12 | 🟠 Alto |
| R03 | Baja adopción de usuarios | 3 | 4 | 12 | 🟠 Alto |
| R12 | Problemas de monetización | 3 | 4 | 12 | 🟠 Alto |
| R04 | Competencia agresiva | 3 | 3 | 9 | 🟡 Medio |
| R07 | Incumplimiento normativo | 2 | 4 | 8 | 🟡 Medio |
| R08 | Retrasos en desarrollo | 3 | 2 | 6 | 🟡 Medio |
| R10 | Dependencia de terceros | 2 | 3 | 6 | 🟡 Medio |
| R11 | Escasez de talento técnico | 2 | 2 | 4 | 🟢 Bajo |

### Análisis de Prioridades

#### 🔴 Riesgos Críticos (Requieren atención inmediata)
- **R02 - Ataques cibernéticos**: Nivel 20
- **R09 - Fuga de información sensible**: Nivel 20

#### 🟠 Riesgos Altos (Requieren plan de respuesta)
- **R05 - Problemas de escalabilidad**: Nivel 16
- **R06 - Fallos en el sistema**: Nivel 16
- **R01 - Fraudes en publicaciones**: Nivel 12
- **R03 - Baja adopción de usuarios**: Nivel 12
- **R12 - Problemas de monetización**: Nivel 12

#### 🟡 Riesgos Medios (Monitoreo regular)
- **R04 - Competencia agresiva**: Nivel 9
- **R07 - Incumplimiento normativo**: Nivel 8
- **R08 - Retrasos en desarrollo**: Nivel 6
- **R10 - Dependencia de terceros**: Nivel 6

#### 🟢 Riesgos Bajos (Monitoreo ocasional)
- **R11 - Escasez de talento técnico**: Nivel 4

---

## 🛡️ FASE 4: Plan de Respuesta a Riesgos

### Riesgos Críticos (Nivel 20)

#### R02 - Ataques Cibernéticos
- **Estrategia:** Mitigar + Transferir
- **Acciones:**
  - Implementar WAF (Web Application Firewall)
  - Contratar servicio de pentesting semestral
  - Implementar autenticación multi-factor
  - Establecer protocolo de respuesta a incidentes
- **Responsable:** CISO / Líder de Seguridad
- **Indicador:** Número de intentos de ataque bloqueados / mes

#### R09 - Fuga de Información Sensible
- **Estrategia:** Mitigar + Transferir
- **Acciones:**
  - Encriptación de datos en tránsito y reposo (AES-256)
  - Implementar políticas de acceso basadas en roles (RBAC)
  - Contratar seguro cibernético
  - Auditorías de seguridad trimestrales
- **Responsable:** Oficial de Protección de Datos
- **Indicador:** Número de incidentes de fuga de datos / trimestre

### Riesgos Altos (Nivel 16-12)

#### R05 - Problemas de Escalabilidad
- **Estrategia:** Mitigar
- **Acciones:**
  - Diseño de arquitectura cloud-native (AWS/GCP)
  - Implementar auto-scaling y load balancing
  - Pruebas de carga regulares
  - Optimización de base de datos (indexación, sharding)
- **Responsable:** Arquitecto de Software
- **Indicador:** Tiempo de respuesta del sistema (SLA < 2 segundos)

#### R06 - Fallos en el Sistema
- **Estrategia:** Mitigar
- **Acciones:**
  - Implementar CI/CD con pruebas automatizadas
  - Establecer ambientes de staging y QA
  - Monitoreo 24/7 con alertas automáticas
  - Plan de rollback inmediato
- **Responsable:** Líder de QA / DevOps
- **Indicador:** Uptime del sistema (SLA 99.9%)

#### R01 - Fraudes en Publicaciones
- **Estrategia:** Mitigar
- **Acciones:**
  - Sistema de verificación de comercios (KYC)
  - Moderación automática con IA + revisión humana
  - Sistema de reputación y reportes de usuarios
  - Algoritmo de detección de patrones fraudulentos
- **Responsable:** Product Manager / Community Manager
- **Indicador:** Porcentaje de publicaciones fraudulentas detectadas / total publicaciones

#### R03 - Baja Adopción de Usuarios
- **Estrategia:** Mitigar
- **Acciones:**
  - Campaña de marketing digital segmentada
  - Programa de referidos con incentivos
  - Alianzas estratégicas con cámaras de comercio
  - Onboarding simplificado y tutoriales
- **Responsable:** CMO / Growth Hacker
- **Indicador:** Tasa de conversión de visitantes a usuarios registrados

#### R12 - Problemas de Monetización
- **Estrategia:** Mitigar
- **Acciones:**
  - Modelo freemium con características premium
  - Diversificación de fuentes de ingresos (suscripciones, publicidad, comisiones)
  - Análisis de cohortes y LTV/CAC
  - Experimentación continua de precios
- **Responsable:** CEO / CFO
- **Indicador:** MRR (Monthly Recurring Revenue) y CAC Payback Period

---

## 📊 FASE 5: Plan de Monitoreo

### Tablero de Seguimiento de Riesgos

| ID | Riesgo | Indicador | Frecuencia | Responsable | Próxima Revisión |
|----|--------|-----------|------------|-------------|------------------|
| R02 | Ataques cibernéticos | Intentos de ataque bloqueados | Diaria | CISO | 2024-01-15 |
| R09 | Fuga de información | Incidentes de fuga de datos | Trimestral | DPO | 2024-03-31 |
| R05 | Escalabilidad | Tiempo de respuesta del sistema | Diaria | Arquitecto | 2024-01-15 |
| R06 | Fallos en sistema | Uptime del sistema | Continua | DevOps | Automático |
| R01 | Fraudes | % publicaciones fraudulentas | Semanal | Product Manager | 2024-01-22 |
| R03 | Adopción | Tasa de conversión | Mensual | CMO | 2024-02-01 |
| R12 | Monetización | MRR y CAC Payback | Mensual | CFO | 2024-02-01 |
| R04 | Competencia | Cambios en market share | Trimestral | CEO | 2024-03-31 |
| R07 | Normativo | Auditorías de cumplimiento | Semestral | Legal | 2024-06-30 |
| R08 | Retrasos | % avance vs plan | Semanal | PMO | 2024-01-22 |
| R10 | Dependencia terceros | Disponibilidad de servicios | Continua | DevOps | Automático |
| R11 | Talento técnico | Tasa de rotación | Mensual | RRHH | 2024-02-01 |

### Acciones de Seguimiento por Intervalo

#### Diario (Automático)
- Monitoreo de uptime y performance
- Alertas de seguridad
- Dashboard de métricas clave

#### Semanal
- Revisión de publicaciones reportadas/moderadas
- Actualización de avance del proyecto
- Análisis de tickets de soporte críticos

#### Mensual
- Revisión de métricas de negocio (adopción, monetización)
- Evaluación de retención de talento
- Informe de nuevos riesgos identificados

#### Trimestral
- Auditoría de seguridad y cumplimiento normativo
- Análisis de competencia y posicionamiento
- Revisión y actualización del plan de riesgos

---

## 🚀 Cómo Usar la Aplicación

### Instalación y Ejecución (Desarrollo)

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en navegador:**
   Navega a `http://localhost:5173`

### Uso de la Aplicación

1. **Dashboard:** Panel principal con estadísticas y resumen de riesgos
2. **Riesgos:** Lista de los 12 riesgos identificados con filtros por nivel
3. **Matriz:** Visualización interactiva de probabilidad vs impacto
4. **Plan de Respuesta:** Estrategias y acciones para riesgos altos/críticos
5. **Monitoreo:** Tablero de seguimiento con responsables e indicadores

---

## 📦 Tecnologías Utilizadas

- **Framework:** React 18 con Hooks (useState)
- **Build Tool:** Vite 5
- **Lenguaje:** JavaScript (ES6+) / JSX
- **Estilos:** CSS-in-JS (inline styles), CSS Variables, Flexbox, Grid
- **Iconos:** Lucide React
- **Diseño:** Mobile-first, Responsive Design, Dark Theme

---

## 👥 Equipo del Proyecto

| Rol | Responsabilidad |
|-----|-----------------|
| **Gerente de Proyecto** | Coordinación general, Plan de riesgos |
| **CISO** | Gestión de riesgos de seguridad |
| **Arquitecto de Software** | Riesgos técnicos y escalabilidad |
| **CMO** | Riesgos de mercado y adopción |
| **CFO** | Riesgos financieros y monetización |
| **DPO** | Cumplimiento normativo y protección de datos |

---

## 📅 Cronograma del Plan de Riesgos

| Fase | Actividad | Fecha Inicio | Fecha Fin | Estado |
|------|-----------|--------------|-----------|--------|
| FASE 1 | Identificación de riesgos | 2024-01-01 | 2024-01-07 | ✅ Completado |
| FASE 2 | Análisis cualitativo | 2024-01-08 | 2024-01-14 | ✅ Completado |
| FASE 3 | Construcción matriz | 2024-01-15 | 2024-01-21 | ✅ Completado |
| FASE 4 | Plan de respuesta | 2024-01-22 | 2024-01-28 | ✅ Completado |
| FASE 5 | Plan de monitoreo | 2024-01-29 | 2024-02-04 | ✅ Completado |

---

## 📄 Documentación Adicional

- [FASE 1: Identificación de Riesgos](./docs/FASE1_Identificacion_Riesgos.md)
- [FASE 2: Análisis Cualitativo](./docs/FASE2_Analisis_Cualitativo.md)
- [FASE 3: Matriz de Riesgos](./docs/FASE3_Matriz_Riesgos.md)
- [FASE 4: Plan de Respuesta](./docs/FASE4_Plan_Respuesta.md)
- [FASE 5: Plan de Monitoreo](./docs/FASE5_Plan_Monitoreo.md)

---

## 📞 Contacto

Para más información sobre el proyecto Promomania y su gestión de riesgos:

- **Email:** contacto@promomania.com
- **Web:** [www.promomania.com](https://www.promomania.com)

---

**Universidad / Institución**  
**Asignatura:** Gestión de Proyectos  
**Año:** 2024

---

<p align="center">
  <strong>Promomania - Conectando comercios con oportunidades</strong>
</p>

