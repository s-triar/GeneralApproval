using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Prodept.Commons.Models
{
    public class RequestList
    {
        public RequestList()
        {

        }
        [Key, Column(Order = 0)]
        public string Nik { get; set; }
        [Key, Column(Order = 1)]
        public string ApiName { get; set; }
        [Key, Column(Order = 2)]
        public string Id { get; set; }
        public string ProjectName { get; set; }
        public string UrlProject { get; set; }
        public string Category { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string Status { get; set; }
        public string Detail { get; set; }
        public string UrlAction { get; set; }
    }
}
