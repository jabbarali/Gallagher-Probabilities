function Calculator({
  parameter1,
  setParameter1,
  parameter2,
  setParameter2,
  functionName,
  setFunctionName,
  functions,
  isLoading,
  error,
  result,
  handleSubmit,
}) {
  return (
    <>
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
    </>
  );
}

export default Calculator;
