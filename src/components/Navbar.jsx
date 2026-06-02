import { Flame, BarChart3, Shield, Grid3X3, FileText, Activity, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Navbar = ({ activeSection, setActiveSection }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = [
    { id: 'dashboard', label: 'Inicio', icon: BarChart3 },
    { id: 'riesgos', label: 'Riesgos', icon: Shield },
    { id: 'matriz', label: 'Matriz', icon: Grid3X3 },
    { id: 'respuesta', label: 'Plan de Respuesta', icon: FileText },
    { id: 'monitoreo', label: 'Monitoreo', icon: Activity },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: isDarkMode ? 'rgba(17, 24, 39, 0.98)' : 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(10px)',
      borderBottom: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`,
      zIndex: 1000,
      padding: '0 2rem'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '70px'
      }}>
        {/* Logo */}
        <div 
          onClick={() => setActiveSection('dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#F97316',
            cursor: 'pointer'
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #F97316, #FB923C)',
            borderRadius: '12px',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Flame size={24} color="white" />
          </div>
          <span style={{ color: isDarkMode ? '#F9FAFB' : '#111827' }}>Promomania</span>
        </div>

        {/* Navigation Links */}
        <ul style={{
          display: 'flex',
          gap: '0.5rem',
          listStyle: 'none',
          alignItems: 'center'
        }}>
          {navItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                style={{
                  color: activeSection === item.id 
                    ? '#6B21A8' 
                    : (isDarkMode ? '#D1D5DB' : '#4B5563'),
                  background: activeSection === item.id 
                    ? 'rgba(107, 33, 168, 0.1)' 
                    : 'transparent',
                  border: 'none',
                  fontWeight: 500,
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  fontSize: '0.9375rem'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== item.id) {
                    e.target.style.color = '#6B21A8';
                    e.target.style.background = 'rgba(107, 33, 168, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id) {
                    e.target.style.color = isDarkMode ? '#D1D5DB' : '#4B5563';
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
          
          {/* Theme Toggle - Funcional */}
          <li>
            <button 
              onClick={toggleTheme}
              title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              style={{
                background: isDarkMode ? '#374151' : '#F3F4F6',
                border: 'none',
                padding: '0.5rem',
                cursor: 'pointer',
                color: isDarkMode ? '#FBBF24' : '#F97316',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
