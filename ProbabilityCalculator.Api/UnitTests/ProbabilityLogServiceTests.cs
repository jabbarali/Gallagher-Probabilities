using System.Text.Json;
using System.Text.Json.Serialization;

[TestClass]
public class ProbabilityLogServiceTests
{
    private const string LogFilePath = "probability_log.txt";
    private static readonly JsonSerializerOptions _jsonOptions = new()
    {
        Converters = { new JsonStringEnumConverter() }
    };

    [TestInitialize]
    public void TestInitialize()
    {
        // Clean up log file before each test
        if (File.Exists(LogFilePath))
            File.Delete(LogFilePath);
    }

    [TestMethod]
    public void Log_WritesEntryToFile()
    {
        // Arrange
        var logService = new ProbabilityLogService();
        var request = new ProbabilityRequest
        {
            Parameter1 = 0.5,
            Parameter2 = 0.5,
            FunctionName = ProbabilityFunction.Either
        };
        double result = 0.75;
        DateTime timestamp = new DateTime(2024, 1, 1, 12, 0, 0, DateTimeKind.Utc);

        // Act
        logService.Log(request, result, timestamp);

        // Assert
        Assert.IsTrue(File.Exists(LogFilePath), "Log file was not created.");

        var lines = File.ReadAllLines(LogFilePath);
        Assert.AreEqual(1, lines.Length, "Log file should contain one entry.");

        var logEntry = JsonSerializer.Deserialize<LogEntry>(lines[0], _jsonOptions);
        Assert.IsNotNull(logEntry);
        Assert.AreEqual(timestamp, logEntry.Timestamp);
        Assert.AreEqual(request.Parameter1, logEntry.Request.Parameter1);
        Assert.AreEqual(request.Parameter2, logEntry.Request.Parameter2);
        Assert.AreEqual(request.FunctionName, logEntry.Request.FunctionName);
        Assert.AreEqual(result, logEntry.Result);
    }

    private class LogEntry
    {
        public DateTime Timestamp { get; set; }
        public ProbabilityRequest Request { get; set; }
        public double Result { get; set; }
    }
}
