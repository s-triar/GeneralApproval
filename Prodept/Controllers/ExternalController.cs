using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Prodept.Commons;
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
        public async Task<IActionResult> Add([FromBody] RequestListVM data)
        {
            int r = -2;
            var trans = this._projectReqservice.GetTransaction();
            try
            {
                using (trans)
                {
                    var temp = new RequestList();
                    temp.ApiName = data.ApiName;
                    temp.Nik = data.Nik;
                    temp.Id = data.Id;
                    temp.Detail = data.Detail;
                    temp.ProjectName = data.ProjectName;
                    temp.Status = data.Status;
                    temp.SubTitle = data.SubTitle;
                    temp.Title = data.Title;
                    temp.UrlAction = data.UrlAction;
                    temp.UrlProject = data.UrlProject;
                    var check = this._projectReqservice.GetSpecificId(temp);
                    if (check != null)
                    {
                        check.Category = data.Category;
                        check.Detail = data.Detail;
                        check.Status = data.Status;
                        check.Title = data.Title;
                        check.SubTitle = data.SubTitle;
                        check.UrlAction = data.UrlAction;
                        check.UrlProject = data.UrlProject;
                        check.ProjectName = data.ProjectName;
                        this._projectReqservice.Update(check);
                        r = this._projectReqservice.save();
                    }
                    else
                    {
                        this._projectReqservice.Add(temp);
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
                        this._notifService.sendNotif(data.Nik, data.DataNotif.Title, data.DataNotif.Message);
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
