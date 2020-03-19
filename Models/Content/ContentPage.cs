using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryClient.Models.Content
{
    /// <summary>
    /// Массив книг
    /// </summary>
    public class ContentPage
    {
        public List<BookResponse> Books { get; set; }
    }


    
    public class BookResponse
    {
        
        public string BookTitle { get; set; }
        public string AuthorName { get; set; }
        public string Description { get; set; }
        public int PublishYear { get; set; }
    }
}
