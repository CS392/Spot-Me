using System;
using System.Configuration;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SpotMe.Services
{
    public class GeolocationService
    {
        private string _apiKey;

        public GeolocationService()
        {
            _apiKey = "AIzaSyCDzY8GN4vjP4cEwoc1Lc5tuQCnpVK2TW0";
        }

        public async Task<string> GetGeolocation()
        {
            using (HttpClient client = new HttpClient())
            {
                string apiUrl = $"https://www.googleapis.com/geolocation/v1/geolocate?key={_apiKey}";

                HttpResponseMessage response = await client.PostAsync(apiUrl, null);

                if (response.IsSuccessStatusCode)
                {
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
