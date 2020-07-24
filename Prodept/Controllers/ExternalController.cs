using System;
using System.Collections.Generic;
using System.Linq;
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
    public class ExternalController : ControllerBase
    {
        private readonly IProjectRequestService _projectReqservice;
        private readonly INotificationService _notifService;

        public ExternalController(IProjectRequestService projectReqservice, INotificationService notifService)
        {
            this._projectReqservice = projectReqservice;
            this._notifService = notifService;
        }
        
        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> Add([FromBody] RequestList data)
        {
            int r = -2;
            var trans = this._projectReqservice.GetTransaction();
            try
            {
                using (trans)
                {
                    
                    var check = this._projectReqservice.GetSpecificId(data);
                    if (check != null)
                    {
                        check.Category = data.Category;
                        check.Detail = data.Detail;
                        check.Status = data.Status;
                        check.Title = data.Title;
                        check.UrlAction = data.UrlAction;
                        check.UrlProject = data.UrlProject;
                        check.ProjectName = data.ProjectName;
                        this._projectReqservice.Update(check);
                        r = this._projectReqservice.save();
                    }
                    else
                    {
                        this._projectReqservice.Add(data);
                        r = this._projectReqservice.save();
                            
                    }
                    if (r > 0)
                    {
                        var res = new CustomResponse()
                        {
                            message = "Data sudah ditambahkan",
                            title = "Penambahan Data Sukses",
                            ok = true
                        };
                        trans.Commit();
                        this._notifService.sendNotif(data.Nik, "General Approval X" + data.ProjectName, "Pemberitahuan baru dari " + data.ProjectName + "." + "\n1 Pemberitahuan pada Kategori " + data.Category);
                        return Ok(res);
                    }
                    else
                    {
                        var res = new CustomResponse()
                        {
                            message = "Data gagal ditambahkan",
                            title = "Penambahan Data Gagal",
                            ok = false
                        };
                        trans.Commit();
                        return Ok(res);
                    }

                }
            }
            catch(Exception ex)
            {
                var res = new CustomResponse()
                {
                    errors = new List<string>() { ex.InnerException.Message },
                    message = ex.Message,
                    title = "Error",
                    ok = false
                };
                trans.Rollback();
                return BadRequest(res);
            }

        }

        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> Remove([FromBody] RequestList data)
        {
            this._projectReqservice.Remove(data);
            int i = this._projectReqservice.save();
            if (i > 0)
            {
                var res = new CustomResponse()
                {
                    message = "Data sudah dihapus",
                    title = "Penghapusan Data Sukses",
                    ok = true
                };
                return Ok(res);
            }
            var resg = new CustomResponse()
            {
                message = "Data tidak ada",
                title = "Penghapusan Data Gagal",
                ok = false
            };
            return BadRequest(resg);
        }
    }
}
