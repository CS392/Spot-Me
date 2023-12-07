using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Spot_Me.Services
{
    public class ExerciseApiService
    {
        // Async method to retrieve nearby gyms using Google Maps Places API
        public async Task<string> GetExerciseDataAsync(string exerciseType)
        {
            try
            {
                // Create a new instance of HttpClient
                HttpClient client = new HttpClient();

                // Construct the HTTP request message
                HttpRequestMessage request = new HttpRequestMessage
                {
                    Method = HttpMethod.Get,
                    RequestUri = new Uri($"https://exercisedb.p.rapidapi.com/exercises/bodyPart/{exerciseType}?limit=30")
                };
                // Add required headers for the RapidAPI endpoint
                request.Headers.Add("X-RapidAPI-Key", "e0832edfd3msh942c3792793094ep17dba3jsn15cb1232b877");
                request.Headers.Add("X-RapidAPI-Host", "exercisedb.p.rapidapi.com");
                // Send the HTTP request and await the response
                HttpResponseMessage response = await client.SendAsync(request);

                // Ensure that the response indicates success
                response.EnsureSuccessStatusCode();

                // Read the response content as a string
                string responseBody = await response.Content.ReadAsStringAsync();

                // Log the API response to the console (for debugging purposes)
                Console.WriteLine("API Response: " + responseBody);

                // Return the response body
                return responseBody;
            }
            catch (Exception error)
            {
                // Log the exception to the console (for debugging purposes)
                Console.Error.WriteLine("Error: " + error.Message);
                // Return null in case of an error
                return null;
            }
        }
    }
}
