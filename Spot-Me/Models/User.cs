using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SpotMe.Models
{

    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("userName")]
        public string UserName { get; set; } = "User Name";

        [BsonElement("password")]
        public string Password { get; set; } = "User Password";

        [BsonElement("friends")]
        public List<string> Friends { get; set; } = new List<string>();

        [BsonElement("exercise")]
        public Dictionary<string, List<string>> Exercise { get; set; } = new Dictionary<string, List<string>>();

        [BsonElement("location")]
        public Location Location { get; set; } = new Location();

    }

    public class Location 
    {
        [BsonElement("latitude")]
        public double Latitude { get; set; } = 0.0;

        [BsonElement("longitude")]
        public double Longitude { get; set; } = 0.0;
    }

}