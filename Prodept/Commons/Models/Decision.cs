using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Prodept.Commons.Models
{
    public class Decision
    {
        [Required]
        public string Nik { get; set; }
        [Required]
        public string ApiName { get; set; }
        [Required]
        public string Id { get; set; }

        public string Data { get; set; }
        [Required]
        public string Link { get; set; }
    }
}
