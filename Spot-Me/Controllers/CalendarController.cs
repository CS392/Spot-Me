using System;
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
