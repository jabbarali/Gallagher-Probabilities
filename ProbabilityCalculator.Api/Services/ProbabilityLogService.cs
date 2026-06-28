using System.Text.Json;
using System.Text.Json.Serialization;

public class ProbabilityLogService : IProbabilityLogService
{
    private readonly string _logFilePath = "probability_log.txt";
    private static readonly JsonSerializerOptions _jsonOptions = new()
    {
        Converters = { new JsonStringEnumConverter() }
    };

    public void Log(ProbabilityRequest request, double result, DateTime timestamp)
    {
        var logEntry = new
        {
            Timestamp = timestamp,
            Request = request,
            Result = result
        };
        var line = JsonSerializer.Serialize(logEntry, _jsonOptions);
        File.AppendAllText(_logFilePath, line + Environment.NewLine);
    }

    public IEnumerable<ProbabilityLogEntry> ReadAll()
    {
        if (!File.Exists(_logFilePath))
            return Enumerable.Empty<ProbabilityLogEntry>();

        var lines = File.ReadAllLines(_logFilePath);
        var entries = new List<ProbabilityLogEntry>();
        foreach (var line in lines)
        {
            try
            {
                var entry = JsonSerializer.Deserialize<ProbabilityLogEntry>(line, _jsonOptions);
                if (entry != null)
                    entries.Add(entry);
            }
            catch
            {
                // Optionally log or ignore malformed lines
            }
        }
        return entries;
    }
}
