using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Spot_Me.Services;

//not using
namespace Spot_Me.Models
{
    public class ExerciseModel
    {
        private readonly ExerciseApiService _exerciseApiService;

        public ExerciseModel(ExerciseApiService exerciseApiService)
        {
            _exerciseApiService = exerciseApiService;
        }

        public List<string> GetExerciseList()
        {
            return new List<string> { "back", "cardio", "chest", "lower arms", "lower legs", "neck", "shoulders" };
        }

        public async Task UpdateResult(string exerciseType)
        {
            try
            {
                string apiResponse = await _exerciseApiService.GetExerciseDataAsync(exerciseType);

                if (apiResponse != null)
                {
                    Console.WriteLine("API Response: " + apiResponse);
                    
                }
                else
                {
                    Console.WriteLine("API Request failed.");
                    
                }
            }
            catch (Exception error)
            {
                Console.Error.WriteLine("Error: " + error.Message);
                
            }
        }
    }
}
