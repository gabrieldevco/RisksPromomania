const Badge = ({ zone, children }) => {
  const styles = {
    critical: { background: 'rgba(220, 38, 38, 0.2)', color: '#fca5a5', border: '1px solid #dc2626' },
    high: { background: 'rgba(234, 88, 12, 0.2)', color: '#fdba74', border: '1px solid #ea580c' },
    medium: { background: 'rgba(202, 138, 4, 0.2)', color: '#fde047', border: '1px solid #ca8a04' },
    low: { background: 'rgba(22, 163, 74, 0.2)', color: '#86efac', border: '1px solid #16a34a' }
  };

  const style = styles[zone] || styles.low;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: '0.375rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.025em',
      ...style
    }}>
      {children}
    </span>
  );
};

export default Badge;
