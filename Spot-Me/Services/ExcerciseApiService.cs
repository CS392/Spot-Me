using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Spot_Me.Services
{
    public class ExerciseApiService
    {
        public async Task<string> GetExerciseDataAsync(string exerciseType)
        {
            try
            {
                HttpClient client = new HttpClient();
                HttpRequestMessage request = new HttpRequestMessage
                {
                    Method = HttpMethod.Get,
                    RequestUri = new Uri($"https://exercisedb.p.rapidapi.com/exercises/bodyPart/{exerciseType}?limit=30")
                };
                request.Headers.Add("X-RapidAPI-Key", "79db28dddemsha0eb0c5285ab1a6p174df6jsnec6cbf4f9836");
                request.Headers.Add("X-RapidAPI-Host", "exercisedb.p.rapidapi.com");

                HttpResponseMessage response = await client.SendAsync(request);

                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();
                
                Console.WriteLine("API Response: " + responseBody);

                return responseBody;
            }
            catch (Exception error)
            {
                Console.Error.WriteLine("Error: " + error.Message);
                return null;
            }
        }
    }
}
