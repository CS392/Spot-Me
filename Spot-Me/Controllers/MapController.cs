using Microsoft.AspNetCore.Mvc;
using SpotMe.Services;
using System;
using System.Threading.Tasks;

namespace SpotMeApi.Controllers
{
    [Route("api/map")]
    [ApiController]
    public class MapsController : ControllerBase
    {
        private readonly GoogleMapApiService _googleMapApiService;

        public MapsController(GoogleMapApiService googleMapApiService)
        {
            _googleMapApiService = googleMapApiService;
        }

        [HttpGet("places/nearby")]
        public async Task<IActionResult> NearbyGyms()
        {
            double latitude = 42.35095; // Example coordinates
            double longitude = -71.10887;
            int radius = 1000;

            try
            {
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
