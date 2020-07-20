using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Prodept.Models;
//using Prodept.Models.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Prodept.Commons.Interfaces
{
    public interface IUserAuth
    {
        //UserAuth Login([FromBody] UserLogin req);
        IdentityResult Register([FromBody] UserRegister req);
    }
}
