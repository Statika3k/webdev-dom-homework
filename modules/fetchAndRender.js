import { renderComments } from './renderComments.js'
import { initAddComment } from './initListeners.js'
import { updateComments } from './commentsInfo.js'
import { hideLoader } from './loader.js'
import { sanitizeHtml, delay } from './helpers.js'

export const fetchAndRender = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/nina-shakhanova/comments', {
        method: 'GET',
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            updateComments(data.comments)
            renderComments()
            hideLoader()
        })
}

export const postComment = (userName, commentText, retries = 0) => {
    const maxRetries = 3
    return fetch('https://wedev-api.sky.pro/api/v1/nina-shakhanova/comments', {
        method: 'POST',
        body: JSON.stringify({
            name: sanitizeHtml(userName),
            text: sanitizeHtml(commentText),
            forceError: true,
        }),
    })
        .then((response) => {
            if (response.status === 500) {
                if (retries < maxRetries) {
                    return delay(1000).then(() =>
                        postComment(userName, commentText, retries + 1),
                    )
                }
                throw new Error('Сервер сломался, попробуй позже')
            }
            if (response.status === 400) {
                throw new Error(
                    'Имя и комментарий должны быть не короче 3 символов',
                )
            }
            if (!response.ok) {
                throw new Error('Произошла ошибка, попробуйте еще раз')
            }
            return response.json()
        })
        .catch((error) => {
            if (error.message === 'Failed to fetch') {
                throw new Error(
                    'Кажется, у вас сломался интернет, попробуйте позже',
                )
            }             
        })
}

initAddComment(renderComments)
