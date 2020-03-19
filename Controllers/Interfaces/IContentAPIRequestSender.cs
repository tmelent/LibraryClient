
using LibraryClient.Models.Content;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace LibraryClient.Controllers.Interfaces
{
    public interface IContentAPIRequestSender
    {
        /// <summary>
        /// Запрашивает страницу с книгами
        /// </summary>
        /// <param name="first">Первая книга на странице</param>
        /// <param name="last">Последняя книга на странице</param>
        /// <returns></returns>
        public Task<IActionResult> GetBooksInRange(ContentRange range);
        /// <summary>
        /// Запрашивает все данные об одной книге
        /// </summary>
        /// <param name="id">Идентификатор книги</param>
        /// <returns></returns>
        public Task<IActionResult> GetSingleBook(int id);
    }
}
