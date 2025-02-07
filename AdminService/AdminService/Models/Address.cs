using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Newtonsoft.Json;

namespace AdminService.Models
{
    public class Address
    {
        [Required(ErrorMessage = "Address Line 1 is required.")]
        [StringLength(50, ErrorMessage = "Address Line 1 cannot exceed 50 characters.")]
        public string addressLine1 { get; set; }

        [StringLength(50, ErrorMessage = "Address Line 2 cannot exceed 50 characters.")]
        public string addressLine2 { get; set; }

        [Required(ErrorMessage = "City is required.")]
        [RegularExpression(@"^[A-Za-z\s]+$", ErrorMessage = "City must contain only alphabets.")]
        public string city { get; set; }

        [Required(ErrorMessage = "State is required.")]
        [RegularExpression(@"^[A-Za-z\s]+$", ErrorMessage = "State must contain only alphabets.")]
        public string state { get; set; }

        [Required(ErrorMessage = "Country is required.")]
        [RegularExpression(@"^[A-Za-z\s]+$", ErrorMessage = "Country must contain only alphabets.")]
        public string country { get; set; }


        [Required(ErrorMessage = "Postal Code is required.")]
        [RegularExpression(@"^\d{5,10}$", ErrorMessage = "Postal Code must be between 5 and 10 digits.")]
        public string postalCode { get; set; }

        public AddressType type { get; set; } = AddressType.Shipping;

        [JsonIgnore]
        [ValidateNever]  // This will exclude it from model validation
        public User user { get; set; }
    }

    public enum AddressType
    {
        Shipping
    }
}
