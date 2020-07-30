using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> Add([FromBody] UserDeviceVM ClientBrowser)
        {
            try
            {
                var ret = new CustomResponse();
                var res = this.notif.add(ClientBrowser.Key, ClientBrowser.Nik, ClientBrowser.Browser, ClientBrowser.Device, ClientBrowser.Os);
                if(res > 0)
                {
                    ret.message = "";
                    ret.ok = true;
                    ret.data = null;
                    ret.title = "Pendaftaran Browser Key Sukses";
                    this.notif.sendNotif(ClientBrowser.Nik, "General Approval", "Terima kasih telah subscribe");
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

        [Authorize]
        [HttpGet("[action]")]
        public void Try()
        {
            var s = HttpContext.User.Claims;
            var k = s.FirstOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname");
            var nik = k.Value;
            this.notif.sendNotif(nik, "General Approval", "Coba kirim pesan\nKepadamu");
        }
    }
}
