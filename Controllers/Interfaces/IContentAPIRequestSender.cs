
using LibraryClient.Models.Content;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace LibraryClient.Controllers.Interfaces
{
    public interface IContentAPIRequestSender
    {
        /// <summary>
        /// Запрашивает книги
        /// </summary>        
        /// <returns></returns>
        public Task<IActionResult> GetAllBooks();
        /// <summary>
        /// Запрашивает все данные об одной книге
        /// </summary>
        /// <param name="id">Идентификатор книги</param>
        /// <returns></returns>
        public Task<IActionResult> GetSingleBook(int id);
    }
}
