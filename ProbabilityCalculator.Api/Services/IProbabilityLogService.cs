public interface IProbabilityLogService
{
    void Log(ProbabilityRequest request, double result, DateTime timestamp);
    IEnumerable<ProbabilityLogEntry> ReadAll();
}
