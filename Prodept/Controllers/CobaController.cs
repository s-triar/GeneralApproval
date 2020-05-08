using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Prodept.Datas;
using Prodept.Models;

namespace Prodept.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CobaController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public CobaController(AppDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost("[action]")]
        public async Task<ObjectResult> Register ([FromBody] UserRegister req)
        {
            var user = new IdentityUser
            {
                UserName = req.Nik,
                Email = req.Email
            };

            var result = await _userManager.CreateAsync(user, req.Password);
            return Ok(result);
        }
        [HttpGet("[action]")]
        public async Task<ObjectResult> test()
        {
            return Ok("AFAWFWAFAF");
        }
    }
}