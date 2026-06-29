import { useState } from 'react';
import Calculator from '../components/Calculator';
import CalculatorHistory from '../components/CalculatorHistory';
import { apiConfig } from '../config/api';

const functions = [
  { label: 'CombinedWith', value: 'CombinedWith' },
  { label: 'Either', value: 'Either' },
];

function ProbabilityCalculator() {
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
      const response = await fetch(apiConfig.probabilityCalculateUrl, {
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

      const logsResponse = await fetch(apiConfig.probabilityLogsUrl);
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

      <Calculator
        parameter1={parameter1}
        setParameter1={setParameter1}
        parameter2={parameter2}
        setParameter2={setParameter2}
        functionName={functionName}
        setFunctionName={setFunctionName}
        functions={functions}
        isLoading={isLoading}
        error={error}
        result={result}
        handleSubmit={handleSubmit}
      />

      <CalculatorHistory logs={logs} />
    </div>
  );
}

export default ProbabilityCalculator;
