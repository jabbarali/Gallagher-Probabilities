// Services/ProbabilityService.cs
public class ProbabilityService : IProbabilityService
{
    public double Calculate(ProbabilityRequest request)
    {
        switch (request.FunctionName)
        {
            case ProbabilityFunction.CombinedWith:
                return request.Parameter1 * request.Parameter2;
            case ProbabilityFunction.Either:
                return request.Parameter1 + request.Parameter2 - (request.Parameter1 * request.Parameter2);
            default:
                throw new ArgumentOutOfRangeException();
        }
    }
}
