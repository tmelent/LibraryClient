using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace LibraryClient.Models.Identity
{
    public class TokenModel
    {
        [JsonProperty("accessToken")]
        public string AccessToken { get; set; }
        [JsonProperty("accessExpirationDate")]
        public DateTimeOffset AccessExpirationDate { get; set; }
        [JsonProperty("refreshToken")]
        public RefreshToken RefreshToken { get; set; }

        [JsonProperty("httpStatusCode")]
        public HttpStatusCode HttpStatusCode { get; set; }
    }
}
