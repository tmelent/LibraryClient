using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace LibraryClient.Models
{
    public class BookResponse
    {
        [JsonPropertyName("bookId")]
        public int BookId { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("year")]
        public int YearOfPublication { get; set; }
        [JsonPropertyName("description")]
        public string Description { get; set; }
        [JsonPropertyName("authorId")]
        public int AuthorId { get; set; }
    }
}
