using System;
using System.Configuration;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SpotMe.Services
{
    public class GeolocationService
    {
        private string _apiKey;

        // Constructor initializes the Google Maps API key
        public GeolocationService()
        {
            _apiKey = "AIzaSyCDzY8GN4vjP4cEwoc1Lc5tuQCnpVK2TW0";
        }

        // Async method to retrieve nearby gyms using Google Maps Places API
        public async Task<string> GetGeolocation()
        {
            // Using statement ensures proper disposal of HttpClient
            using (HttpClient client = new HttpClient())
            {
                // Construct the API URL with the provided parameters
                string apiUrl = $"https://www.googleapis.com/geolocation/v1/geolocate?key={_apiKey}";

                // Send an asynchronous GET request to the API
                HttpResponseMessage response = await client.PostAsync(apiUrl, null);

                // Check if the response is successful
                if (response.IsSuccessStatusCode)
                {
                    // Read the response content as a string and return it
                    return await response.Content.ReadAsStringAsync();
                }
                else
                {
                    // Handle errors
                    return $"Error fetching geolocation: {response.StatusCode}";
                }
            }
        }
    }
}
