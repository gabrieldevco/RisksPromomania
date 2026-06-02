const Badge = ({ zone, children }) => {
  const styles = {
    critical: { background: '#FEE2E2', color: '#DC2626', border: '1px solid #FECACA' },
    high: { background: '#FFEDD5', color: '#F97316', border: '1px solid #FED7AA' },
    medium: { background: '#FEF3C7', color: '#D97706', border: '1px solid #FDE68A' },
    low: { background: '#D1FAE5', color: '#16A34A', border: '1px solid #A7F3D0' }
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
