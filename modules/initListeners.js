import { comments } from './commentsInfo.js'
import { delay } from './helpers.js'
import { getComments, postComment, currentUserName } from './api.js'
import { showFormLoader, hideFormLoader } from './loader.js'

export let respond = null

// Обработчик клина на коментарий
export const initCommentClick = () => {
    const commentElements = document.querySelectorAll('.comment')
    for (const commentElement of commentElements) {
        commentElement.addEventListener('click', (event) => {
            if (event.target.closest('.like-button')) return
            const index = commentElement.dataset.index
            const comment = comments[index]
            respond = index
            const textInput = document.querySelector('.add-form-text')
            textInput.value = `> ${comment.author.name}: ${comment.text}\n\n`
            textInput.focus()
        })
    }
}

// Обработчик клика на лайк
export const initLike = () => {
    document.querySelectorAll('.like-button').forEach(likeButton => {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation()
            const index = likeButton.dataset.index
            const comment = comments[index]
            likeButton.disabled = true
            likeButton.classList.add('-loading-like')
            delay(2000).then(() => {
                comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1
                comment.isLiked = !comment.isLiked
                likeButton.disabled = false
                likeButton.classList.remove('-loading-like')
            })
        })
    })
}

// Обработчик добавления комментария
export const initAddComment = () => {
    const addButton = document.querySelector('.add-form-button')
    const textInput = document.querySelector('.add-form-text')
    
    addButton.addEventListener('click', () => {
        const commentText = textInput.value.trim()
        if (commentText.length < 3) {
            alert('Комментарий должен быть не короче 3 символов')
            return
        }
        showFormLoader()
        addButton.disabled = true
        postComment(commentText)
            .then(() => {
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
