using System;
using System.Reflection;
using System.Threading.Tasks;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Calendar.v3;
using Google.Apis.Services;

namespace Spot_Me.Services
{
    public class Calendar
    {
        const string SpotmeId = "25c30148c866aaa2319b0654ac370d586f8c2c03b0eac912ebeda41690a61bba@group.calendar.google.com";
        public async Task<UserCredential> GetCredentials()
        {
            UserCredential credential;
            var assemblyDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            // Combine the assembly directory with the relative path to credentials.json
            var credentialsPath = Path.Combine(assemblyDirectory, "Properties", "credentials.json");
            // Retrieve user credentials from file
            using (var stream = new FileStream(credentialsPath, FileMode.Open, FileAccess.Read))
            {
                credential = await GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    new[] { CalendarService.Scope.Calendar },
                    "user",
                    System.Threading.CancellationToken.None
                ) ;;
            }

            return credential;
        }

        public async Task<string> GetCalendarData()
        {
            UserCredential credential;
            var assemblyDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var credentialsPath = Path.Combine(assemblyDirectory, "Properties", "credentials.json");

            // Retrieve user credentials from file
            using (var stream = new FileStream(credentialsPath, FileMode.Open, FileAccess.Read))
            {
                credential = await GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    new[] { CalendarService.Scope.Calendar },
                    "user",
                    System.Threading.CancellationToken.None
                );
            }

            // Initialize CalendarService
            var service = new CalendarService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "Spot Me"
            });

            // Create request with additional parameters including 'timeMin' and 'timeMax'
            var request = service.Events.List(SpotmeId);
            request.TimeMin = DateTime.Now;
            request.TimeMax = DateTime.Now.AddDays(7); // Fetch events for the next 7 days
            request.Fields = "items(summary,start,end)";

            // Execute request and process response
            var eventDetails = new System.Text.StringBuilder();
            var response = await request.ExecuteAsync();
            foreach (var item in response.Items)
            {
                // Concatenate event details to the string builder
                eventDetails.AppendLine($"Activity: {item.Summary}");
                eventDetails.AppendLine($"Date: {item.Start.DateTime}");
                eventDetails.AppendLine(); // Add an empty line for separation
            }

            // Return the concatenated event details as a string
            return (eventDetails.ToString());
                
        }


    }
}






/*
 * /Users/yuzeng/williamz/Junior Class/CS357/credentials.json
using System;
using System.Threading.Tasks;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Calendar.v3;
using Google.Apis.Calendar.v3.Data;
using Google.Apis.Services;

namespace Spot_Me.Services
{
    public class Calendar
    {
        const string SpotmeId = "25c30148c866aaa2319b0654ac370d586f8c2c03b0eac912ebeda41690a61bba@group.calendar.google.com";

        public async Task<string> GetCalendarData()
        {
            UserCredential credential;

            // Retrieve user credentials from file
            using (var stream = new System.IO.FileStream("/Users/yuzeng/williamz/Junior Class/CS357/credentials.json", System.IO.FileMode.Open, System.IO.FileAccess.Read))
            {
                credential = await GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    new[] { CalendarService.Scope.Calendar },
                    "user",
                    System.Threading.CancellationToken.None
                );
            }

            // Initialize CalendarService
            var service = new CalendarService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "Spot Me"
            });

            // Create request with additional parameters including 'timeMin' and 'timeMax'
            var request = service.Events.List(SpotmeId);
            request.TimeMin = DateTime.Now;
            request.TimeMax = DateTime.Now.AddDays(7); // Fetch events for the next 7 days
            request.Fields = "items(summary,start,end)";

            // Execute request and process response
            var eventDetails = new System.Text.StringBuilder();
            var response = await request.ExecuteAsync();
            foreach (var item in response.Items)
            {
                // Concatenate event details to the string builder
                eventDetails.AppendLine($"Activity: {item.Summary}");
                eventDetails.AppendLine($"Date: {item.Start.DateTime}");
                eventDetails.AppendLine(); // Add an empty line for separation
            }

            // Return the concatenated event details as a string
            return eventDetails.ToString();
        }
    }
}
*/

