import { Flame, BarChart3, Shield, Grid3X3, FileText, Activity, Sun, LogIn, UserPlus } from 'lucide-react';

const Navbar = ({ activeSection, setActiveSection }) => {
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
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #E5E7EB',
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
          <span style={{ color: '#111827' }}>Promomania</span>
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
                  color: activeSection === item.id ? '#6B21A8' : '#4B5563',
                  background: activeSection === item.id ? 'rgba(107, 33, 168, 0.1)' : 'transparent',
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
                    e.target.style.color = '#4B5563';
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
          
          {/* Theme Toggle */}
          <li>
            <button style={{
              background: 'transparent',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              color: '#6B7280'
            }}>
              <Sun size={20} />
            </button>
          </li>
          
          {/* Login Button */}
          <li>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#6B21A8',
              background: 'transparent',
              border: 'none',
              fontWeight: 500,
              padding: '0.5rem 1rem',
              cursor: 'pointer'
            }}>
              <LogIn size={18} />
              Iniciar sesión
            </button>
          </li>
          
          {/* Register Button */}
          <li>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, #F97316, #FB923C)',
              color: 'white',
              border: 'none',
              fontWeight: 600,
              padding: '0.625rem 1.25rem',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              <UserPlus size={18} />
              Registrarse
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
