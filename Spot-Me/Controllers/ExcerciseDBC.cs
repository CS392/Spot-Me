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

        // Constructor injection of ExerciseApiService
        public ExcerciseDBController(ExerciseApiService exerciseService)
        {
            _exerciseService = exerciseService;
        }


        // HTTP GET endpoint to get exercise data based on the provided type
        [HttpGet("data")]
        public async Task<IActionResult> GetExerciseData(string type) 
        {
            try
            {
                // Log the exercise type to the console (for debugging purposes)
                Console.WriteLine("Exercise Type: " + type);
                // Call the ExerciseApiService to get exercise data based on the type
                var res = await _exerciseService.GetExerciseDataAsync(type);
                // Return the response with an OK status
                return Ok(res);
            }
            catch (Exception error)
            {
                // Log the exception to the console (for debugging purposes)
                Console.Error.WriteLine("Error: " + error.Message);
                // Return a generic error response with a 500 Internal Server Error status
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
