function CalculatorHistory({ logs }) {
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';

    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return String(timestamp);

    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatLog = (log) => {
    if (typeof log === 'string') return log;
    if (log == null) return '';
    if (typeof log === 'object') {
      const parts = [];
      if (log.timestamp) parts.push(formatTimestamp(log.timestamp));
      if (log.request) parts.push(`${log.request.functionName} (${log.request.parameter1}, ${log.request.parameter2})`);
      if (log.result !== undefined) parts.push(`Result: ${JSON.stringify(log.result)}`);
      return parts.join(' | ');
    }
    return String(log);
  };

  if (logs.length === 0) {
    return null;
  }

  return (
    <div className="logs-card">
      <h2>Logs</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={`${formatLog(log)}-${index}`}>{formatLog(log)}</li>
        ))}
      </ul>
    </div>
  );
}

export default CalculatorHistory;
