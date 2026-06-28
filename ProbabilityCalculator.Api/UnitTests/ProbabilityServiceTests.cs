[TestClass]
public class ProbabilityServiceTests
{
    private readonly ProbabilityService _service = new ProbabilityService();

    [TestMethod]
    [DataRow(0.5, 0.5, ProbabilityFunction.CombinedWith, 0.25)]
    [DataRow(0.5, 0.5, ProbabilityFunction.Either, 0.75)]
    [DataRow(0, 0, ProbabilityFunction.CombinedWith, 0)]
    [DataRow(1, 1, ProbabilityFunction.Either, 1)]
    public void Calculate_ReturnsExpectedResult(double p1, double p2, ProbabilityFunction func, double expected)
    {
        var request = new ProbabilityRequest
        {
            Parameter1 = p1,
            Parameter2 = p2,
            FunctionName = func
        };

        var result = _service.Calculate(request);

        Assert.AreEqual(expected, result, "Calculation result mismatch.");
    }
}
