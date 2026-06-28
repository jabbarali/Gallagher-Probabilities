// Models/ProbabilityRequest.cs
using System.ComponentModel.DataAnnotations;

public class ProbabilityRequest
{
    [Range(0, 1, ErrorMessage = "Parameter1 must be between 0 and 1.")]
    public double Parameter1 { get; set; }

    [Range(0, 1, ErrorMessage = "Parameter2 must be between 0 and 1.")]
    public double Parameter2 { get; set; }

    [Required]
    public ProbabilityFunction FunctionName { get; set; }
}

public enum ProbabilityFunction
{
    Either,
    CombinedWith
}
