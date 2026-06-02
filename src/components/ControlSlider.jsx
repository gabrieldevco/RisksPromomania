import { controlLevels, getControlLabel } from '../data/risks';
import { Shield } from 'lucide-react';

const ControlSlider = ({ risk, onControlChange }) => {
  const currentLevel = risk.controlLevel || 1;
  const currentLabel = getControlLabel(currentLevel);

  const handleChange = (e) => {
    const newLevel = parseInt(e.target.value);
    onControlChange(risk.id, newLevel);
  };

  return (
    <div style={{
      background: 'rgba(99, 102, 241, 0.1)',
      borderRadius: '12px',
      padding: '1rem',
      marginTop: '1rem',
      border: '1px solid rgba(99, 102, 241, 0.3)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.75rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: '#6366f1'
        }}>
          <Shield size={18} />
          Nivel de Control
        </div>
        <span style={{
          padding: '0.25rem 0.75rem',
          background: '#6366f1',
          color: 'white',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 700
        }}>
          {currentLevel} - {currentLabel}
        </span>
      </div>

      {/* Slider */}
      <div style={{ marginBottom: '0.75rem' }}>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={currentLevel}
          onChange={handleChange}
          style={{
            width: '100%',
            height: '8px',
            borderRadius: '4px',
            background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${(currentLevel - 1) * 25}%, #475569 ${(currentLevel - 1) * 25}%, #475569 100%)`,
            outline: 'none',
            cursor: 'pointer',
            appearance: 'none',
            WebkitAppearance: 'none'
          }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.5rem',
          fontSize: '0.625rem',
          color: '#94a3b8'
        }}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>

      {/* Labels debajo */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.625rem',
        color: '#64748b',
        marginTop: '0.25rem'
      }}>
        <span>Nunca</span>
        <span>Rara vez</span>
        <span>Ocasional</span>
        <span>Frecuente</span>
        <span>Siempre</span>
      </div>

      {/* Descripción del nivel actual */}
      <p style={{
        fontSize: '0.75rem',
        color: '#94a3b8',
        marginTop: '0.75rem',
        fontStyle: 'italic'
      }}>
        {controlLevels[currentLevel].description}
      </p>
    </div>
  );
};

export default ControlSlider;
