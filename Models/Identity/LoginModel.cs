using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryClient.Models.Identity
{
    public class LoginModel
    {
        [Required]
        [EmailAddress]
        [JsonProperty("login")]
        public string Login { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [JsonProperty("password")]
        public string Password { get; set; }
                
    }
}
