public class ProbabilityLogEntry
{
    public DateTime Timestamp { get; set; }
    public ProbabilityRequest Request { get; set; }
    public double Result { get; set; }
}