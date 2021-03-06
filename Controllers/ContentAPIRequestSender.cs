﻿using LibraryClient.Controllers.Interfaces;
using LibraryClient.Models.Content;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace LibraryClient.Controllers
{
    [Route("contentRequests")]
    [ApiController]
    public class ContentAPIRequestSender : Controller, IContentAPIRequestSender 
    {
        private static readonly HttpClient _client;
        static ContentAPIRequestSender()
        {
            _client = new HttpClient();
            _client.DefaultRequestHeaders.Accept.Clear();
            _client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            _client.DefaultRequestHeaders.Add("User-Agent", "Library");
        }

        [HttpPost("getAllBooks")]
        public async Task<IActionResult> GetAllBooks()
        {            
            var response = await _client.PostAsync("https://localhost:44336/api/book/getAllBooks", null);
            switch (response.StatusCode)
            {
                case HttpStatusCode.OK:
                    {
                        var result = JsonConvert.DeserializeObject<List<BookResponse>>(await response.Content.ReadAsStringAsync());                        
                        return Ok(result);
                    }
                case HttpStatusCode.InternalServerError:
                    return StatusCode(500);
            }
            return BadRequest();
        }

        [HttpPost("getBooksInRange")]
        public async Task<IActionResult> GetBooksInRange(Page page)
        {
            var range = new ContentRange { First = 9 * (page.PageNumber - 1) + 1, Last = 9 * page.PageNumber };
            var str = new StringContent(System.Text.Json.JsonSerializer.Serialize(range).ToString(), Encoding.UTF8, "application/json");
            var response = await _client.PostAsync("https://localhost:44336/api/book/getBooksInRange", str);
            switch (response.StatusCode)
            {
                case HttpStatusCode.OK:
                    {
                        var result = JsonConvert.DeserializeObject<List<BookResponse>>(await response.Content.ReadAsStringAsync());
                        return Ok(result);
                    }
                case HttpStatusCode.InternalServerError:
                    return StatusCode(500);
            }
            return BadRequest();
        }

        [HttpGet("getBookById/{id}")]
        public async Task<IActionResult> GetSingleBook(int id)
        {
            var response = await _client.GetAsync("https://localhost:44336/api/book/getBookById/" + id);
            switch (response.StatusCode)
            {
                case HttpStatusCode.OK:
                    {
                        var result = JsonConvert.DeserializeObject<BookResponse>(await response.Content.ReadAsStringAsync());
                        return Ok(result);
                    }
                case HttpStatusCode.InternalServerError:
                    return StatusCode(500);
            }
            return BadRequest();
        }
    }
}
