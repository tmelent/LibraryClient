using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryClient.Models.Identity
{
    /// <summary>
    /// Данные, которые нужно передавать при запросе на обновление токенов
    /// </summary>
    public class RefreshTokenRequest
    {
        [JsonProperty("oldrefreshtoken")]
        public string OldRefreshToken { get; set; }
        [JsonProperty("oldaccesstoken")]
        public string OldAccessToken { get; set; }
    }
}
