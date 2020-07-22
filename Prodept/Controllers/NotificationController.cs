using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Prodept.Commons.Interfaces;
using Prodept.Commons.Models;

namespace Prodept.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService notif;

        public NotificationController(INotificationService notif)
        {
            this.notif = notif;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Add(UserDeviceVM ClientBrowser)
        {
            try
            {
                var ret = new CustomResponse();
                var res = this.notif.add(ClientBrowser.key, ClientBrowser.nik);
                if(res > 0)
                {
                    ret.message = "";
                    ret.ok = true;
                    ret.data = null;
                    ret.title = "Pendaftaran Browser Key Sukses";
                    return Ok(ret);
                }
                else
                {
                    ret.message = "";
                    ret.ok = false;
                    ret.data = null;
                    ret.title = "Pendaftaran Browser Key Gagal";
                    return BadRequest(ret);
                }
            }catch(Exception ex)
            {
                var res = new CustomResponse()
                {
                    errors = new List<string>() { ex.InnerException.Message },
                    message = ex.Message,
                    title = "Error",
                    ok = false
                };
                return BadRequest(res);
            }
            
            
        }
    }
}
