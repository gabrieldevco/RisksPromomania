import { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './sections/Dashboard';
import Riesgos from './sections/Riesgos';
import Matriz from './sections/Matriz';
import Respuesta from './sections/Respuesta';
import Monitoreo from './sections/Monitoreo';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './hooks/useTheme';

const AppContent = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { isDarkMode, themeColors } = useTheme();

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard setActiveSection={setActiveSection} isDarkMode={isDarkMode} />;
      case 'riesgos':
        return <Riesgos isDarkMode={isDarkMode} />;
      case 'matriz':
        return <Matriz isDarkMode={isDarkMode} />;
      case 'respuesta':
        return <Respuesta isDarkMode={isDarkMode} />;
      case 'monitoreo':
        return <Monitoreo isDarkMode={isDarkMode} />;
      default:
        return <Dashboard setActiveSection={setActiveSection} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: themeColors.bg, transition: 'background 0.3s ease' }}>
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main style={{
        paddingTop: '70px',
        minHeight: 'calc(100vh - 70px)'
      }}>
        <style>{`
          :root {
            --bg-color: #FFFFFF;
            --bg-card: #FFFFFF;
            --text-primary: #111827;
            --text-secondary: #6B7280;
            --text-muted: #9CA3AF;
            --border-color: #E5E7EB;
            --bg-hover: #F9FAFB;
          }
          
          html.dark {
            --bg-color: #111827;
            --bg-card: #1F2937;
            --text-primary: #F9FAFB;
            --text-secondary: #D1D5DB;
            --text-muted: #9CA3AF;
            --border-color: #374151;
            --bg-hover: #374151;
          }
          
          .section-header {
            text-align: center;
            margin-bottom: 3rem;
            padding: 3rem 0;
          }
          
          .section-header h1 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            color: var(--text-primary);
            transition: color 0.3s ease;
          }
          
          .section-header h1 span {
            color: #F97316;
          }
          
          .section-header p {
            font-size: 1.125rem;
            color: var(--text-secondary);
            max-width: 700px;
            margin: 0 auto;
            transition: color 0.3s ease;
          }
          
          .risk-card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            transition: all 0.3s ease;
          }
          
          .risk-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 40px rgba(107, 33, 168, 0.15);
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          main > div {
            animation: fadeIn 0.4s ease;
          }
          
          @media (max-width: 768px) {
            .section-header h1 {
              font-size: 1.75rem;
            }
            
            main {
              padding-left: 1rem;
              padding-right: 1rem;
            }
          }
        `}</style>
        
        {renderSection()}
      </main>

      <footer style={{
        background: 'linear-gradient(135deg, #6B21A8, #7C3AED)',
        padding: '3rem 2rem',
        marginTop: '0'
      }}>
        <div style={{ 
          textAlign: 'center',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <p style={{ color: 'white', fontSize: '1rem', fontWeight: 600 }}>
            Promomania - Gestión de Riesgos
          </p>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Sistema de gestión de riesgos para la plataforma de promociones #1 en Colombia
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', marginTop: '1rem' }}>
            © 2024 - Taller Final Integrador - Gestión de Proyectos
          </p>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
