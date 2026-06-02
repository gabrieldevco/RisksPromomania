import { Shield, BarChart3, Grid3X3, FileText, Activity } from 'lucide-react';

const Navbar = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'riesgos', label: 'Riesgos', icon: Shield },
    { id: 'matriz', label: 'Matriz', icon: Grid3X3 },
    { id: 'respuesta', label: 'Plan de Respuesta', icon: FileText },
    { id: 'monitoreo', label: 'Monitoreo', icon: Activity },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <Shield size={32} color="#6366f1" />
          <span>Promomania</span>
        </div>
        <ul className="nav-links">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={activeSection === item.id ? 'active' : ''}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
