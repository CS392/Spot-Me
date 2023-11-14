using Microsoft.AspNetCore.Mvc;
using SpotMe.Services;
using System;
using System.Threading.Tasks;

namespace SpotMe.Controllers
{
    [Route("api/geolocate")]
    [ApiController]
    public class GeolocationController : ControllerBase
    {
        private readonly GeolocationService _geolocationApiService;

        public GeolocationController(GeolocationService geolocationApiService)
        {
            _geolocationApiService = geolocationApiService;
        }

        [HttpGet]
        public async Task<IActionResult> Geolocate()
        {
            try
            {
                var response = await _geolocationApiService.GetGeolocation();
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
