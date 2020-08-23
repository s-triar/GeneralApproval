using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Prodept.Commons
{
    public class RequestListVM
    {
        [Required]
        public string Nik { get; set; }
        [Required]
        public string ApiName { get; set; }
        [Required]
        public string Id { get; set; }
        public string ProjectName { get; set; }
        public string UrlProject { get; set; }
        public string Category { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string Status { get; set; }
        public string Detail { get; set; }
        public string UrlAction { get; set; }
        public bool ReadOnlyOnce { get; set; }
        public MessageNotif DataNotif { get; set; }
    }
}
