import { renderComments } from './renderComments.js'
import { comments } from './commentsInfo.js'
import { delay } from './helpers.js'
import { getComments, postComment } from './api.js'
import { showFormLoader, hideFormLoader } from './loader.js'

export let respond = null

const nameInput = document.querySelector('.add-form-name')
const textInput = document.querySelector('.add-form-text')
const addButton = document.querySelector('.add-form-button')

// Обработчик клина на коментарий
export const initCommentClick = () => {
    const commentElements = document.querySelectorAll('.comment')

    for (const commentElement of commentElements) {
        commentElement.addEventListener('click', (event) => {
            if (event.target.closest('.like-button')) {
                return
            }

            const index = commentElement.dataset.index
            const comment = comments[index]

            respond = index

            // Заполнение поле текста
            textInput.value = `> ${comment.author.name}: ${comment.text}\n\n`
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

            likeButton.disabled = true
            likeButton.classList.add('-loading-like')

            delay(2000)
                .then(() => {
                    comment.likes = comment.isLiked
                        ? comment.likes - 1
                        : comment.likes + 1
                    comment.isLiked = !comment.isLiked
                    comment.isLikeLoading = false
                    renderComments()
                })
                .finally(() => {
                    likeButton.disabled = false
                    likeButton.classList.remove('-loading-like')
                })
        })
    }
}

// Обработчик добавления комментария
export const initAddComment = () => {
    addButton.addEventListener('click', () => {
        const userName = nameInput.value.trim()
        const commentText = textInput.value.trim()

        if (userName.length < 3 || commentText.length < 3) {
            alert('Имя и комментарий должны быть не короче 3 символов')
            return
        }

        showFormLoader()

        addButton.disabled = true

        postComment(userName, commentText)
            .then(() => {
                nameInput.value = ''
                textInput.value = ''
                return getComments()
            })
            .catch((error) => {
                alert(error.message)
            })
            .finally(() => {
                hideFormLoader()
                addButton.disabled = false
            })
    })
}
