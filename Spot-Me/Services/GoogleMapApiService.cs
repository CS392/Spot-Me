using System;
using System.Configuration;
using System.Threading.Tasks;
using GoogleMapsApi;
using GoogleMapsApi.Entities.Common;
using GoogleMapsApi.Entities.PlacesNearBy.Request;
using GoogleMapsApi.Entities.PlacesNearBy.Response;

namespace SpotMe.Services
{
    public class GoogleMapApiService
    {
        private string _apiKey;

        public GoogleMapApiService()
        {
            _apiKey = "AIzaSyCDzY8GN4vjP4cEwoc1Lc5tuQCnpVK2TW0";
        }

        public async Task<PlacesNearByResponse> GetNearbyGymsAsync(double latitude, double longitude, int radius)
        {
            var request = new PlacesNearByRequest
            {
                ApiKey = _apiKey,
                Keyword = "gym",
                Radius = radius,
                Location = new Location(latitude, longitude),
            };

            try
            {
                return await GoogleMaps.PlacesNearBy.QueryAsync(request);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine("Error: " + ex.Message);
                throw;
            }
        }
    }
}
