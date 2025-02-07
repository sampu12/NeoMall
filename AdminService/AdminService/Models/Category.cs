using System.ComponentModel.DataAnnotations;

namespace AdminService.Models
{
    public class Category
    {
        [Required(ErrorMessage = "Category ID is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Category ID must be a positive integer.")]
        public int id { get; set; }

        [Required(ErrorMessage = "Category name is required.")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Category name must be between 2 and 100 characters.")]
        [RegularExpression(@"^[A-Za-z\s]+$", ErrorMessage = "Category name must contain only alphabets.")]
        public string name { get; set; }

        [Required(ErrorMessage = "Image URL is required.")]
        [StringLength(100, ErrorMessage = "Product Image URL cannot exceed 100 characters.")]
        public string image { get; set; }

        [StringLength(500, ErrorMessage = "Description must not exceed 500 characters.")]
        public string description { get; set; }
    }
}
