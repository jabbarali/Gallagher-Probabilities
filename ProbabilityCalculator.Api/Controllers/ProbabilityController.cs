using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class ProbabilityController : ControllerBase
{
    private readonly IProbabilityService _service;
    private readonly IProbabilityLogService _logService;

    public ProbabilityController(IProbabilityService service, IProbabilityLogService logService)
    {
        _service = service;
        _logService = logService;

    }

    [HttpPost]
    [Route("calculate")]
    public IActionResult Calculate([FromBody] ProbabilityRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = _service.Calculate(request);
        _logService.Log(request, result, DateTime.UtcNow);
        return Ok(new { Result = result });
    }

    [HttpGet]
    [Route("logs")]
    public IActionResult GetLogs()
    {
        var entries = _logService.ReadAll();
        return Ok(entries);
    }
}
