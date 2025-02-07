using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AdminService.Models
{
    public class User
    {
        public int user_id { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [RegularExpression(@"^[A-Za-z]+$", ErrorMessage = "Name must contain only alphabets.")]
        public string name { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters.")]
        public string password { get; set; }

        [Required(ErrorMessage = "Mobile number is required.")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Mobile number must be exactly 10 digits.")]
        public string mobile_number { get; set; }

        [JsonIgnore]
        public List<Address> addresses { get; set; } = new List<Address>();

        public Account account { get; set; }

        public void setAddresses(List<Address> addresslist)
        {
            addresses = addresslist;
            if (addresslist != null)
            {
                foreach (var address in addresslist)
                {
                    address.user = this; // Set bidirectional reference
                }
            }
        }

        public void SetAccount(Account userAccount)
        {
            account = userAccount;
            if (userAccount != null)
            {
                userAccount.user = this; // Set bidirectional reference
            }
        }
    }
}
