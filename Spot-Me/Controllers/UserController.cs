using Microsoft.AspNetCore.Mvc;
using SpotMe.Models;
using SpotMe.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SpotMe.Controllers
{
    //API ENDPOINT FOR ALL USER RELATED OPERATIONS
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        
        private readonly UserServices _userServices;

        public UserController(UserServices userServices)
        {
            // inject the user services into the controller
            _userServices = userServices;
        }

        // ROUTE: /api/user 
        // get all users in the database
        [HttpGet]
        public async Task<List<User>> Get() => await _userServices.GetAsync();

        // ROUTE: api/user/{6549c6c2efe126880fd5a266}
        // get user by their id
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<User>> Get(string id)
        {
            User user = await _userServices.GetAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        // ROUTE: api/user
        // METHOD: POST a new user into the database
        [HttpPost]
        public async Task<ActionResult<User>> Post(User newUser)
        {
            await _userServices.CreateAsync(newUser);
            return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
        }

        // ROUTE: api/user/{6549c6c2efe126880fd5a266}
        // METHOD: PUT update a user in the database
        [HttpPut("{id:length(24)}")]
        public async Task<ActionResult> Put(string id, User updatedUser)
        {
            User user = await _userServices.GetAsync(id);
            if (user == null)
            {
                return NotFound("No user with id: " + id);
            }
            updatedUser.Id = user.Id;
            await _userServices.UpdateAsync(id, updatedUser);
            return Ok(new{message = "Updated Successfully"});
        }

        // ROUTE: api/user/{6549c6c2efe126880fd5a266}
        // METHOD: DELETE a user from the database
        [HttpDelete("{id:length(24)}")]
        public async Task<ActionResult> Delete(string id)
        {
            User user = await _userServices.GetAsync(id);
            if (user == null)
            {
                return NotFound("No user with id: " + id);
            }
            await _userServices.DeleteAsync(id);
            return Ok("Deleted Successfully");
        }

        // ROUTE: api/user/username/{username}
        // METHOD: GET a user by their username
        [HttpGet("username/{username}")]
        public async Task<ActionResult<User>> GetByUsername(string username)
        {
            User user = await _userServices.GetByUsernameAsync(username);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

    }
}
