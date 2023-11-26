using Microsoft.AspNetCore.Mvc;
using Spot_Me.Services;
using System.Threading.Tasks;

namespace Spot_Me.Controllers
{
    [Route("api/calendar")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        private readonly Calendar _calendarService;

        public CalendarController(Calendar calendarService)
        {
            _calendarService = calendarService;
        }

        [HttpGet("credentials")]
        public async Task<IActionResult> GetCalendarData()
        {
            string res = await _calendarService.GetCalendarData();

            return Ok( res);
        }

        [HttpGet("data")]
        public async Task<IActionResult> GetCredentials()
        {
            var credentials = await _calendarService.GetCredentials();

            if (credentials != null)
            {
                return Ok("Credentials obtained successfully!");
            }
            else
            {
                return BadRequest("Failed to obtain credentials.");
            }
        }


        [HttpGet("credential")]
        public async Task<IActionResult> GetCredential()
        {
            var credentials = await _calendarService.GetCredentials();

            if (credentials != null)
            {
                return Ok("Credentials obtained successfully!");
            }
            else
            {
                return BadRequest("Failed to obtain credentials.");
            }
        }
    }

}



/*using System;
using System.Threading.Tasks;
using Google.Apis.Calendar.v3;
using Microsoft.AspNetCore.Mvc;
using Spot_Me.Services;

namespace Spot_Me.Controllers
{
    [Route("api/calendar")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        private readonly Calendar _calendarS;

        public CalendarController(Calendar calendarS)
        {
            _calendarS = calendarS;
        }

        [HttpGet("data")]
        public async Task<IActionResult> GetCalendarData(string type)
        {
            try
            {

                Console.WriteLine("Exercise Type: " + type);

                var res = await _calendarS.GetCalendarData();
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
*/