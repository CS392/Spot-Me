using System;
using System.Configuration;
using System.Data.SqlTypes;
using System.Threading.Tasks;

namespace SpotMe.Services
{
    public class GoogleMapApiService
    {
        private string _apiKey;

        public GoogleMapApiService()
        {
            _apiKey = "AIzaSyCDzY8GN4vjP4cEwoc1Lc5tuQCnpVK2TW0";
        }

        public async Task<string> GetNearbyGymsAsync(string latitude, string longitude, string radius)
        {
           using (HttpClient client = new HttpClient())
            {
                string apiUrl = $"https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=gym&radius={radius}&location={latitude},{longitude }&key={_apiKey}";

                HttpResponseMessage response = await client.GetAsync(apiUrl);

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
