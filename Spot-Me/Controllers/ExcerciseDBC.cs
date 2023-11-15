using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Spot_Me.Models;
using Spot_Me.Services;

namespace Spot_Me.Controllers
{
    [Route("api/excerciseDB")]
    [ApiController]
    public class ExcerciseDBController : ControllerBase
    {
        private readonly ExerciseApiService _exerciseService;

        public ExcerciseDBController(ExerciseApiService exerciseService)
        {
            _exerciseService = exerciseService;
        }

        [HttpGet("data")]
        public async Task<IActionResult> GetExerciseData(string type) 
        {
            try
            {

                Console.WriteLine("Exercise Type: " + type);

                var res = await _exerciseService.GetExerciseDataAsync(type);
                return Ok(res);
            }
            catch (Exception error)
            {
                Console.Error.WriteLine("Error: " + error.Message);
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
