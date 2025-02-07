using System;
using System.Collections.Generic;
using AdminService.Models;

namespace AdminService.Models
{
    public class Order
    {
        public long id { get; set; }
        public string orderNumber { get; set; }
        public List<OrderLineItems> orderLineItemsList { get; set; }

    }
}

