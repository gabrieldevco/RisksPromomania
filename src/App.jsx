import { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './sections/Dashboard';
import Riesgos from './sections/Riesgos';
import Matriz from './sections/Matriz';
import Respuesta from './sections/Respuesta';
import Monitoreo from './sections/Monitoreo';

const App = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'riesgos':
        return <Riesgos />;
      case 'matriz':
        return <Matriz />;
      case 'respuesta':
        return <Respuesta />;
      case 'monitoreo':
        return <Monitoreo />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main style={{
        paddingTop: '90px',
        maxWidth: '1400px',
        margin: '0 auto',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        paddingBottom: '3rem'
      }}>
        <style>{`
          .section-header {
            text-align: center;
            margin-bottom: 3rem;
            padding: 3rem 0;
          }
          
          .section-header h1 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #6366f1, #0ea5e9);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .section-header p {
            font-size: 1.125rem;
            color: #94a3b8;
            max-width: 700px;
            margin: 0 auto;
          }
          
          .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid #475569;
            z-index: 1000;
            padding: 0 2rem;
          }
          
          .nav-container {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 70px;
          }
          
          .nav-logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1.5rem;
            font-weight: 700;
            color: #6366f1;
          }
          
          .nav-links {
            display: flex;
            gap: 0.5rem;
            list-style: none;
          }
          
          .nav-links button {
            color: #94a3b8;
            background: transparent;
            border: none;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: inherit;
            font-size: 0.9375rem;
          }
          
          .nav-links button:hover,
          .nav-links button.active {
            color: #6366f1;
            background: rgba(99, 102, 241, 0.1);
          }
          
          .risk-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
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
            
            .nav-links {
              display: none;
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
        background: '#1e293b',
        borderTop: '1px solid #475569',
        padding: '2rem',
        marginTop: '3rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
            <strong>Promomania - Gestión de Riesgos</strong> | Taller Final Integrador - Gestión de Proyectos
          </p>
          <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.5rem' }}>
            © 2024 - Plan Básico de Gestión de Riesgos
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
