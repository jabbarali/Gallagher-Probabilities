import { useState } from 'react';

const functions = [
  { label: 'CombinedWith', value: 'CombinedWith' },
  { label: 'Either', value: 'Either' },
];

function App() {
  const [parameter1, setParameter1] = useState('');
  const [parameter2, setParameter2] = useState('');
  const [functionName, setFunctionName] = useState(functions[0].value);
  const [result, setResult] = useState(null);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidProbability = (value) => {
    if (value === '') return false;
    const numericValue = Number(value);
    return Number.isFinite(numericValue) && numericValue >= 0 && numericValue <= 1;
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setResult(null);
    setLogs([]);

    if (!isValidProbability(parameter1) || !isValidProbability(parameter2)) {
      setError('Please enter two valid probabilities between 0 and 1.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://localhost:7249/api/v1.0/probability/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parameter1: Number(parameter1),
          parameter2: Number(parameter2),
          functionName,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setResult(data.result ?? data);

      const logsResponse = await fetch('https://localhost:7249/api/v1.0/probability/logs');
      if (!logsResponse.ok) {
        throw new Error(`Logs request failed with status ${logsResponse.status}`);
      }

      const logsData = await logsResponse.json();
      setLogs(Array.isArray(logsData) ? logsData : []);
    } catch (err) {
      setError(err.message || 'Something went wrong while contacting the API.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <h1>Probability Calculator</h1>
      <p>Enter two probabilities and choose a calculation to send to the API.</p>

      <form onSubmit={handleSubmit} className="card">
        <label>
          Probability A
          <input
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={parameter1}
            onChange={(event) => setParameter1(event.target.value)}
            placeholder="0.5"
          />
        </label>

        <label>
          Probability B
          <input
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={parameter2}
            onChange={(event) => setParameter2(event.target.value)}
            placeholder="0.5"
          />
        </label>

        <label>
          Function
          <select value={functionName} onChange={(event) => setFunctionName(event.target.value)}>
            {functions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Calculating…' : 'Calculate'}
        </button>
      </form>

      {error ? <p className="error">{error}</p> : null}

      {result !== null ? (
        <div className="result-card">
          <h2>Result</h2>
          <p>{result}</p>
        </div>
      ) : null}

      {logs.length > 0 ? (
        <div className="logs-card">
          <h2>Logs</h2>
          <ul>
            {logs.map((log, index) => (
              <li key={`${formatLog(log)}-${index}`}>{formatLog(log)}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default App;
