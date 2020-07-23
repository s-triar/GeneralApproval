using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Prodept.Commons.Interfaces;
using Prodept.Commons.Models;

namespace Prodept.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InternalController : ControllerBase
    {

        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IProjectRequestService _projectReqservice;

        public InternalController(IHttpClientFactory httpClientFactory, IProjectRequestService projectReqservice)
        {
            _httpClientFactory = httpClientFactory;
            _projectReqservice = projectReqservice;
        }

        //Todo Get List Projects of user
        //Todo Get List Request of project
        //Todo Get Detail of Request


        //Todo request for additional data e.g for list, option.
        //Todo request for downloading file
        //Todo request for downloading image
        //Todo request for sending approval
        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> SendDecision(Decision Dec)
        {
            var author = HttpContext.Request.Headers.FirstOrDefault(x => x.Key == "Authorization");
            var rawtok = author.Value.FirstOrDefault(x=>x.ToLower().Contains("bearer")).Split("Bearer ");
            string token = rawtok[rawtok.Length - 1];
            var proj = _httpClientFactory.CreateClient();
            proj.SetBearerToken(token);
            var resproj = await proj.PostAsJsonAsync(Dec.Link, Dec);
            if(resproj.IsSuccessStatusCode)
            {
                //Todo hapus data
                var data = new RequestList
                {
                    ApiName = Dec.ApiName,
                    Id = Dec.Id,
                    Nik = Dec.Nik
                };
                this._projectReqservice.Remove(data);
                int i = this._projectReqservice.save();
                if (i > 0)
                {
                    var res = new CustomResponse()
                    {
                        message = "Data sudah dilakukan approval",
                        title = "Approval Sukses",
                        ok = true
                    };
                    return Ok(res);
                }
                else
                {
                    var res = new CustomResponse()
                    {
                        message = "Data di General Approval gagal dihapus",
                        title = "Approval Sukses dengan Tapi",
                        ok = true
                    };
                    return Ok(res);
                }
            }
            else
            {
                var res = new CustomResponse()
                {
                    data = JsonConvert.SerializeObject(resproj.Content),
                    message = "Gagal dilakukan approval. Error Code: " + resproj.StatusCode,
                    title = "Approval ke Project Gagal",
                    ok = false
                };
                return BadRequest(res);
            }
        }
    }
}
