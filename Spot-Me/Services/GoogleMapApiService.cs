    using System;
    using System.Configuration;
    using System.Data.SqlTypes;
    using System.Threading.Tasks;

    namespace SpotMe.Services
    {
        public class GoogleMapApiService
        {
            private string _apiKey;

            // Constructor initializes the Google Maps API key
            public GoogleMapApiService()
            {
                _apiKey = "AIzaSyCDzY8GN4vjP4cEwoc1Lc5tuQCnpVK2TW0";
            }

            // Async method to retrieve nearby gyms using Google Maps Places API
            public async Task<string> GetNearbyGymsAsync(string latitude, string longitude, string radius)
            {
            // Using statement ensures proper disposal of HttpClient
            using (HttpClient client = new HttpClient())
                {
                    // Construct the API URL with the provided parameters
                    string apiUrl = $"https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=gym&radius={radius}&location={latitude},{longitude }&key={_apiKey}";

                    // Send an asynchronous GET request to the API
                    HttpResponseMessage response = await client.GetAsync(apiUrl);
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
