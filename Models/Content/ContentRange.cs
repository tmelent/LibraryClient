using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryClient.Models.Content
{    
    /// <summary>
    /// Диапазон, в котором должен находиться запрашиваемый контент
    /// </summary>
    public class ContentRange
    {
        /// <summary>
        /// Первый элемент в диапазоне
        /// </summary>
        public int First { get; set; }
        /// <summary>
        /// Последний элемент в диапазоне
        /// </summary>
        public int Last { get; set; }
    }

    public class Page
    {
        public int PageNumber { get; set; }
    }
}
