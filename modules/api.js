import { renderComments } from './renderComments.js'
// import { initAddComment } from './initListeners.js'
import { updateComments } from './commentsInfo.js'
import { hideLoader } from './loader.js'
import { sanitizeHtml, delay } from './helpers.js'

const host = 'https://wedev-api.sky.pro/api/v2/nina-shakhanova'

const authToken = 'https://wedev-api.sky.pro/api/user'

let token = ''
export const updateToken = (newToken) => {
    token = newToken
}

export const getComments = () => {
    return fetch(host + '/comments', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
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
    return fetch(host + '/comments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
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

export const login = ({ login, password }) => {
    return fetch(`${authToken}/login`, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('Введен неверный логин или пароль')
        }
        if (response.status === 201) {
            return response.json()
        }        
    })
}

export const registration = ({ login, name, password }) => {
    return fetch(authToken, {
        method: 'POST',
        body: JSON.stringify({
            login,
            name,
            password
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('Пользователь с таким логином уже существует')
        }
        if (response.status === 201) {
            return response.json()
        }        
    })
}
