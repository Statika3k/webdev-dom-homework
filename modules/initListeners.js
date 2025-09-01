import { renderComments } from './renderComments.js'
import { comments } from './commentsInfo.js'
import { sanitizeHtml, formatDate } from './helpers.js'

export let respond = null

const nameInput = document.querySelector('.add-form-name')
const textInput = document.querySelector('.add-form-text')
const addButton = document.querySelector('.add-form-button')

// Обработчик клина на коментарий
export const initCommentClick = () => {
    const commentElements = document.querySelectorAll('.comment')
    const textInput = document.querySelector('.add-form-text')

    for (const commentElement of commentElements) {
        commentElement.addEventListener('click', (event) => {
            if (event.target.closest('.like-button')) {
                return
            }

            const index = commentElement.dataset.index
            const comment = comments[index]

            respond = index

            // Заполнение поле текста
            textInput.value = `> ${comment.userName}: ${comment.commentText}\n\n`
            textInput.focus()
        })
    }
}

// Обработчик клика на лайк
export const initLike = () => {
    const likeButtons = document.querySelectorAll('.like-button')

    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation()
            const index = likeButton.dataset.index
            const comment = comments[index]

            comment.isLiked = !comment.isLiked

            // Обновляем количество лайков
            comment.likes = comment.isLiked
                ? comment.likes + 1
                : comment.likes - 1
            renderComments()
        })
    }
}

// Обработчик добавления комментария
export const initAddComment = (renderComments) => {
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
}
