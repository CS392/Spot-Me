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
                    RequestUri = new Uri($"https://exercisedb.p.rapidapi.com/exercises/bodyPart/{exerciseType}?limit=10")
                };
                request.Headers.Add("X-RapidAPI-Key", "f69f2da5c1msh1331231abd4a573p1d8d45jsn4af60eda3f35");
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
