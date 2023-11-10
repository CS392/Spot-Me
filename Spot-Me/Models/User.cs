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

    }

}