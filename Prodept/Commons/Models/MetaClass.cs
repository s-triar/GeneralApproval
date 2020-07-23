using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Prodept.Commons.Models
{
    public class MetaClass
    {
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<DateTime> UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }
    }
}
