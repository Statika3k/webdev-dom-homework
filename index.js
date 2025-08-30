import { renderComments } from './modules/renderComments.js'
import { sanitizeHtml, formatDate } from './modules/helpers.js'
import { comments } from './modules/commentsInfo.js'

renderComments()

const nameInput = document.querySelector('.add-form-name')
const textInput = document.querySelector('.add-form-text')
const addButton = document.querySelector('.add-form-button')

addButton.addEventListener('click', () => {
    const userName = sanitizeHtml(nameInput.value.trim())
    const commentText = sanitizeHtml(textInput.value.trim())

    if (userName === '' || commentText === '') {
        alert('Пожалуйста, заполните все поля')
        return
    }

    // Добавление нового комментария в массив
    comments.push({
        userName: userName,
        date: formatDate(),
        commentText: commentText,
        likes: 0,
        isLiked: false,
        replies: [],
    })

    // Перерисовываем комментарии
    renderComments()

    // Очищаем поля ввода после добавления
    nameInput.value = ''
    textInput.value = ''
})
