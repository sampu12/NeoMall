using System;

namespace AdminService.Models
{
    public class OrderLineItems
    {
        public long id { get; set; }
        public string skucode { get; set; }
        public decimal price { get; set; }
        public int quantity { get; set; }

    }

}
