using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Spot_Me.Models;
using Spot_Me.Services;

namespace Spot_Me.Controllers
{
    public class HomeController : Controller
    {
        private readonly ExerciseModel _exerciseModel;

        public HomeController(ExerciseModel exerciseModel)
        {
            _exerciseModel = exerciseModel;
        }

        public async Task<IActionResult> Index()
        {
            string exerciseType = "back";

            try
            {
                await _exerciseModel.UpdateResult(exerciseType);
            }
            catch (Exception error)
            {
                Console.Error.WriteLine("Error: " + error.Message);
            }

            return View();
        }
    }

}
