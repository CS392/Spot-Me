using Microsoft.AspNetCore.Mvc;
using SpotMe.Services;
using System;
using System.Threading.Tasks;
using Newtonsoft.Json; 
using SpotMe.Models;

namespace SpotMeApi.Controllers
{
    [Route("api/map")]
    [ApiController]
    public class MapsController : ControllerBase
    {
        private readonly GoogleMapApiService _googleMapApiService;

        // Constructor injection of GoogleMapApiService
        public MapsController(GoogleMapApiService googleMapApiService)
        {
            _googleMapApiService = googleMapApiService;
        }

        // HTTP GET endpoint for nearby gyms
        [HttpGet("places/nearby")]
        public async Task<IActionResult> NearbyGyms([FromQuery] string latitude, [FromQuery] string longitude, [FromQuery] string radius)
        {
            try
            {
                // Call the GoogleMapApiService to get nearby gyms
                var response = await _googleMapApiService.GetNearbyGymsAsync(latitude, longitude, radius);
                return Ok(response); // Return the response with an OK status
            }
            catch (Exception ex)
            {
                // Log the exception (consider using ILogger)
                return StatusCode(500, "Internal server error"); // Return a generic error response
            }
        }
    }
}
