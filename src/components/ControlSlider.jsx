import { controlLevels, getControlLabel } from '../data/risks';
import { Shield, Sliders } from 'lucide-react';

const ControlSlider = ({ risk, onControlChange }) => {
  const currentLevel = risk.controlLevel || 1;
  const currentLabel = getControlLabel(currentLevel);

  const handleChange = (e) => {
    const newLevel = parseInt(e.target.value);
    onControlChange(risk.id, newLevel);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #F3E8FF, #EDE9FE)',
      borderRadius: '16px',
      padding: '1.25rem',
      marginTop: '1.25rem',
      border: '1px solid #DDD6FE'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.9375rem',
          fontWeight: 700,
          color: '#6B21A8'
        }}>
          <div style={{
            background: '#6B21A8',
            borderRadius: '8px',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sliders size={16} color="white" />
          </div>
          Nivel de Control
        </div>
        <span style={{
          padding: '0.375rem 1rem',
          background: currentLevel === 1 ? '#9CA3AF' : '#6B21A8',
          color: 'white',
          borderRadius: '9999px',
          fontSize: '0.8125rem',
          fontWeight: 700
        }}>
          {currentLevel} - {currentLabel}
        </span>
      </div>

      {/* Slider */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={currentLevel}
          onChange={handleChange}
          style={{
            width: '100%',
            height: '10px',
            borderRadius: '5px',
            background: `linear-gradient(to right, #6B21A8 0%, #6B21A8 ${(currentLevel - 1) * 25}%, #E5E7EB ${(currentLevel - 1) * 25}%, #E5E7EB 100%)`,
            outline: 'none',
            cursor: 'pointer',
            appearance: 'none',
            WebkitAppearance: 'none'
          }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.75rem',
          fontSize: '0.75rem',
          color: '#6B7280',
          fontWeight: 500
        }}>
          <span style={{ color: currentLevel === 1 ? '#6B21A8' : '#9CA3AF', fontWeight: currentLevel === 1 ? 700 : 500 }}>1</span>
          <span style={{ color: currentLevel === 2 ? '#6B21A8' : '#9CA3AF', fontWeight: currentLevel === 2 ? 700 : 500 }}>2</span>
          <span style={{ color: currentLevel === 3 ? '#6B21A8' : '#9CA3AF', fontWeight: currentLevel === 3 ? 700 : 500 }}>3</span>
          <span style={{ color: currentLevel === 4 ? '#6B21A8' : '#9CA3AF', fontWeight: currentLevel === 4 ? 700 : 500 }}>4</span>
          <span style={{ color: currentLevel === 5 ? '#6B21A8' : '#9CA3AF', fontWeight: currentLevel === 5 ? 700 : 500 }}>5</span>
        </div>
      </div>

      {/* Labels debajo */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.6875rem',
        color: '#6B7280',
        marginBottom: '0.75rem'
      }}>
        <span>Nunca</span>
        <span>Rara vez</span>
        <span>Ocasional</span>
        <span>Frecuente</span>
        <span>Siempre</span>
      </div>

      {/* Descripción del nivel actual */}
      <div style={{
        background: 'white',
        borderRadius: '10px',
        padding: '0.75rem 1rem',
        border: '1px solid #DDD6FE'
      }}>
        <p style={{
          fontSize: '0.8125rem',
          color: '#6B7280',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Shield size={14} color="#6B21A8" />
          {controlLevels[currentLevel].description}
        </p>
      </div>
    </div>
  );
};

export default ControlSlider;
