// Для заменя опасных символов
export const sanitizeHtml = (value) => {
    return value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

// Получение текущей даты и времени
export function formatDate(date) {
    const now = new Date(date)
    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = String(now.getFullYear()).slice(-2)
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')

    return `${day}.${month}.${year} ${hours}:${minutes}`
}

export const delay = (interval = 300) => {
   return new Promise((resolve) => {
      setTimeout(() => {
      resolve();
      }, interval);
   });
}
