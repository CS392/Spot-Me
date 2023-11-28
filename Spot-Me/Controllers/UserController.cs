using Microsoft.AspNetCore.Mvc;
using SpotMe.Models;
using SpotMe.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SpotMe.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly UserServices _userServices;

        public UserController(UserServices userServices)
        {
            _userServices = userServices;
        }

        // GET: api/user
        [HttpGet]
        public async Task<List<User>> Get() => await _userServices.GetAsync();

        // GET api/user/6549c6c2efe126880fd5a266
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

        // POST api/user
        [HttpPost]
        public async Task<ActionResult<User>> Post(User newUser)
        {
            await _userServices.CreateAsync(newUser);
            return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
        }

        // PUT api/user/6549c6c2efe126880fd5a266
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

        // DELETE api/user/6549c6c2efe126880fd5a266
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

        // GET api/user/username/{username}
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
