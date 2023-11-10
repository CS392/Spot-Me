using Microsoft.Extensions.Options;
using MongoDB.Driver;
using SpotMe.Data;
using SpotMe.Models;

namespace SpotMe.Services
{

    public class UserServices
    {
        private readonly IMongoCollection<User> _userCollection;
        
        public UserServices(IOptions<DatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.Connection);
            var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _userCollection = mongoDb.GetCollection<User>(settings.Value.CollectionName);
        }

        //get all users
        public async Task<List<User>> GetAsync()
        {
            return await _userCollection.Find(_ => true).ToListAsync();
        }

        //get user by id
        public async Task<User> GetAsync(string id)
        {
            return await _userCollection.Find(user => user.Id == id).FirstOrDefaultAsync();
        }

        //add new user
        public async Task<User> CreateAsync(User newUser)
        {
            await _userCollection.InsertOneAsync(newUser);
            return newUser;
        }

        //udpdate user
        public async Task UpdateAsync(string id, User updatedUser)
        {
            await _userCollection.ReplaceOneAsync(user => user.Id == id, updatedUser);
        }

        // delete user
        public async Task DeleteAsync(string id)
        {
            await _userCollection.DeleteOneAsync(user => user.Id == id);
        }
        
    }

}