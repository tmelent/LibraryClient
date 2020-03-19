using LibraryClient.Models.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryClient.Controllers.Interfaces
{
    public interface IAccountAPIRequestSender
    {
        /// <summary>
        /// Запрашивает данные о текущем пользователе
        /// </summary>
        /// <returns>Данные о текущем пользователе</returns>
        public Task<IActionResult> GetProfileData();
       
        /// <summary>
        /// Обновляет истекшие токены при 401 ответе от сервера
        /// </summary>
        /// <returns>Новые токены</returns>
        public Task<IActionResult> RefreshToken();
       
        /// <summary>
        /// Вносит изменения в данные пользователя
        /// </summary>
        /// <param name="upm">Имя пользователя, новый номер телефона, новый логин</param>
        /// <returns></returns>
        
        public Task<IActionResult> UpdateProfileData(UpdateProfileModel upm);
        
        /// <summary>
        /// Вход в аккаунт
        /// </summary>
        /// <param name="loginModel">Логин, пароль</param>
        /// <returns></returns>
       
        public Task<IActionResult> Login(LoginModel loginModel);
        
        /// <summary>
        /// Выход из аккаунта
        /// </summary>
        /// <returns></returns>
        public Task<IActionResult> Logout();
        
        /// <summary>
        /// Регистрация
        /// </summary>
        /// <param name="registerModel">Данные для регистрации</param>
        /// <returns></returns>
        public Task<IActionResult> Register(RegisterModel registerModel);

    }
}
