using System.ComponentModel.DataAnnotations;

namespace AdminService.Models
{
    public class Product
    {
        [Required(ErrorMessage = "Product ID is required.")]
        public ProductId productId { get; set; } // Unique product identifier

        [Required(ErrorMessage = "Product name is required.")]
        [StringLength(100, ErrorMessage = "Product name cannot exceed 100 characters.")]
        [RegularExpression(@"^[A-Za-z\s]+$", ErrorMessage = "Product name must contain only alphabets.")]
        public string name { get; set; }  // Product name


        [Required(ErrorMessage = "Image URL is required.")]
        [StringLength(100, ErrorMessage = "Product Image URL cannot exceed 100 characters.")]
        [RegularExpression(@"(?i).*\.jpg$", ErrorMessage = "The image URL must end with .jpg.")]
        public string image { get; set; } // Image URL

        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
        public string description { get; set; }

        [Required(ErrorMessage = "Price is required.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than zero.")]
        public double price { get; set; }
    }
}
