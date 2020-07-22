using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Prodept.Commons.Models
{
    public class ClientBrowser
    {
        public string endpoint { get; set; }
        public Nullable<DateTime> expirationTime { get; set; }
        public ClientBrowserKey keys { get; set; }
    }

    public class ClientBrowserKey
    {
        public string p256dh { get; set; }
        public string auth { get; set; }
    }
}
