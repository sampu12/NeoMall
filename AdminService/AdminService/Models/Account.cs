using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AdminService.Models
{
    public class Account

    {

        [JsonIgnore]
        [ValidateNever]  // This will exclude it from model validation
        public User user { get; set; }

        [Required(ErrorMessage = "Account number is required.")]
        [Range(0, 999999999999999, ErrorMessage = "Account number must be a positive integer and not exceed 15 digits.")]
        public long accountNumber { get; set; }


        [Required(ErrorMessage = "Account type is required.")]
        public AccountType type { get; set; }

        [Required(ErrorMessage = "Registration date is required.")]
        [DataType(DataType.DateTime, ErrorMessage = "Invalid date format.")]
        public DateTime registrationDate { get; set; }

        [Required(ErrorMessage = "Last login date is required.")]
        [DataType(DataType.DateTime, ErrorMessage = "Invalid date format.")]
        public DateTime lastLogin { get; set; }

        [Required(ErrorMessage = "Account status is required.")]
        public AccountStatus status { get; set; }

        [Required(ErrorMessage = "Email verification status is required.")]
        public bool emailVerified { get; set; }

        [Required(ErrorMessage = "Phone verification status is required.")]
        public bool phoneVerified { get; set; }

    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum AccountType
    {
        RegularUser,
        Seller,
        Admin
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum AccountStatus
    {
        Active,
        Suspended,
        Deactivated
    }
}
