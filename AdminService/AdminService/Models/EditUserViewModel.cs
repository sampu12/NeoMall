using System.ComponentModel.DataAnnotations;

namespace AdminService.Models
{
    public class EditUserViewModel
    {
        [Required]
        public int user_id { get; set; }  // Required for updating user

        [Required(ErrorMessage = "Name is required.")]
        public string name { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        public string password { get; set; }

        [Required(ErrorMessage = "Mobile number is required.")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Mobile number must be exactly 10 digits.")]
        public string mobile_number { get; set; }
    }
}
