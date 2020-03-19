using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryClient.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using LibraryClient.Models.Identity;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using LibraryClient.Controllers.Interfaces;
using System.Net;

namespace LibraryClient.Controllers
{
    [Route("sendrequest")]
    [ApiController]
    public class AccountAPIRequestSender : ControllerBase, IAccountAPIRequestSender
    {

        private static readonly HttpClient _client;
        static AccountAPIRequestSender()
        {
            _client = new HttpClient();
            _client.DefaultRequestHeaders.Accept.Clear();
            _client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            _client.DefaultRequestHeaders.Add("User-Agent", "Library");
        }       
        
        [HttpPost("refreshToken")]
        public async Task<IActionResult> RefreshToken()
        {
            var accessToken = HttpContext.Request.Cookies["access_token"];
            var refreshToken = HttpContext.Request.Cookies["refresh_token"];
            var tokenRequestModel = new RefreshTokenRequest { OldAccessToken = accessToken, OldRefreshToken = refreshToken };
            var str = new StringContent(System.Text.Json.JsonSerializer.Serialize(tokenRequestModel).ToString(), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("https://localhost:44336/api/account/refreshtoken", str);
            switch (response.StatusCode)
            {
                case HttpStatusCode.OK:
                    {
                        var result = JsonConvert.DeserializeObject<TokenModel>(await response.Content.ReadAsStringAsync());
                        Response.Cookies.Delete("access_token");
                        Response.Cookies.Delete("refresh_token");
                        Response.Cookies.Append("access_token", result.AccessToken, new CookieOptions() { Expires = DateTime.UtcNow.AddHours(10) });
                        Response.Cookies.Append("refresh_token", result.RefreshToken.Token, new CookieOptions() { Expires = DateTime.UtcNow.AddHours(10) });
                        return Ok();
                    }
                case HttpStatusCode.InternalServerError:
                    return StatusCode(500);
            }
            return BadRequest();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel loginModel)
        {
            var str = new StringContent(System.Text.Json.JsonSerializer.Serialize(loginModel).ToString(), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("https://localhost:44336/api/account/login", str);
            switch (response.StatusCode)
            {
                case HttpStatusCode.OK:
                    {
                        var result = JsonConvert.DeserializeObject<TokenModel>(await response.Content.ReadAsStringAsync());

                        Response.Cookies.Append("access_token", result.AccessToken, new CookieOptions() { Expires = DateTime.UtcNow.AddHours(10) });

                        Response.Cookies.Append("refresh_token", result.RefreshToken.Token, new CookieOptions() { Expires = DateTime.UtcNow.AddHours(10) });
                        return Ok();
                    };
                case HttpStatusCode.InternalServerError:
                    return StatusCode(500);
            }
            return BadRequest();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel registerModel)
        {
            var str = new StringContent(System.Text.Json.JsonSerializer.Serialize(registerModel).ToString(), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("https://localhost:44336/api/account/register", str);
            if (response.IsSuccessStatusCode)
                return Ok();
            return BadRequest();
        }

        /// <summary>
        /// Добавляет заголовок для авторизации
        /// </summary>
        private void AddAuthorizationHeader()
        {
            _client.DefaultRequestHeaders.Remove("Authorization");
            _client.DefaultRequestHeaders.Add("Authorization", $"Bearer {HttpContext.Request.Cookies["access_token"]}");
        }

        [HttpPost("getProfileData")]
        public async Task<IActionResult> GetProfileData()
        {
            AddAuthorizationHeader();
            var response = await _client.PostAsync("https://localhost:44336/api/account/getProfileData", null);
            if (response.IsSuccessStatusCode)
                return Ok(await response.Content.ReadAsStringAsync());
            switch (response.StatusCode)
            {
                // Попытка обновить токен при неудаче
                case (HttpStatusCode.Unauthorized):
                    await RefreshToken();
                    AddAuthorizationHeader();
                    var secondTryResponse = await _client.PostAsync("https://localhost:44336/api/account/getProfileData", null);
                    if (secondTryResponse.StatusCode == HttpStatusCode.Unauthorized)
                        return Unauthorized();
                    else
                        return Ok(await secondTryResponse.Content.ReadAsStringAsync());
                case (HttpStatusCode.InternalServerError):
                    return StatusCode(500);
            }
            return BadRequest();
        }

        [HttpPost("updateProfileData")]
        public async Task<IActionResult> UpdateProfileData(UpdateProfileModel upm)
        {
            var str = new StringContent(System.Text.Json.JsonSerializer.Serialize(upm).ToString(), Encoding.UTF8, "application/json");
            AddAuthorizationHeader();
            var response = await _client.PostAsync("https://localhost:44336/api/account/updateProfileData", str);
            switch (response.StatusCode)
            {
                case HttpStatusCode.OK:
                    return Ok();
                case HttpStatusCode.InternalServerError:
                    return StatusCode(500);
            }
            return BadRequest();
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            AddAuthorizationHeader();
            var tokens = new RefreshTokenRequest { OldAccessToken = Request.Cookies["access_token"], OldRefreshToken = Request.Cookies["refresh_token"] };
            var str = new StringContent(System.Text.Json.JsonSerializer.Serialize(tokens).ToString(), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("https://localhost:44336/api/account/logout", str);
            if (response.IsSuccessStatusCode)
            {
                try
                {
                    Response.Cookies.Delete("access_token");
                    Response.Cookies.Delete("refresh_token");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message.ToString());
                }
                return Ok();
            }
            switch (response.StatusCode)
            {
                case HttpStatusCode.OK:
                    return Ok();
                case HttpStatusCode.InternalServerError:
                    return StatusCode(500);
            }
            return BadRequest();
        }
    }
}