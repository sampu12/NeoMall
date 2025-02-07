namespace AdminService.Models
{

    public class OrderResponse
    {
        public long UserId { get; set; }
        public string OrderNumber { get; set; }
        public List<ProductDto> ProductDtoList { get; set; }
    }

    public class ProductDto
    {
        public ProductIdDto ProductId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }

    public class ProductIdDto
    {
        public long ProductId { get; set; }
        public long CategoryId { get; set; }
    }

}
