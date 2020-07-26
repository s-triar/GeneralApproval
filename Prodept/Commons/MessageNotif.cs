using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Prodept.Commons
{
    public class MessageNotif
    {
        [Required]
        public string Title { get; set; }
        public string Message { get; set; }
    }
}
