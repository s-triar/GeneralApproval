using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Prodept.Commons.Models
{
    public class UserDevice
    {
        [Key]
        public Guid Id { get; set; }
        public string Nik { get; set; }
        public string DeviceKey { get; set; }
    }
}
