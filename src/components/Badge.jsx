const Badge = ({ zone, children }) => {
  const styles = {
    critical: { background: 'rgba(220, 38, 38, 0.15)', color: '#DC2626', border: '1px solid rgba(220, 38, 38, 0.3)' },
    high: { background: 'rgba(249, 115, 22, 0.15)', color: '#F97316', border: '1px solid rgba(249, 115, 22, 0.3)' },
    medium: { background: 'rgba(217, 119, 6, 0.15)', color: '#D97706', border: '1px solid rgba(217, 119, 6, 0.3)' },
    low: { background: 'rgba(22, 163, 74, 0.15)', color: '#16A34A', border: '1px solid rgba(22, 163, 74, 0.3)' }
  };

  const style = styles[zone] || styles.low;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: '0.5rem 1rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      ...style
    }}>
      {children}
    </span>
  );
};

export default Badge;
