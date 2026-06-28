// Controllers/ProbabilityController.cs
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class ProbabilityController : ControllerBase
{
    private readonly IProbabilityService _service;

    public ProbabilityController(IProbabilityService service)
    {
        _service = service;
    }

    [HttpPost]
    [Route("calculate")]
    public IActionResult Calculate([FromBody] ProbabilityRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = _service.Calculate(request);
        return Ok(new { Result = result });
    }
}
