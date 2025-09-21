import { renderComments } from './renderComments.js'
import { updateComments } from './commentsInfo.js'
import { hideLoader } from './loader.js'
import { sanitizeHtml, delay } from './helpers.js'

const host = 'https://wedev-api.sky.pro/api/v2/nina-shakhanova'

const authToken = 'https://wedev-api.sky.pro/api/user'

export let token = ''
export const updateToken = (newToken) => {
    token = newToken
}

export let currentUserName = ''
export const setCurrentUserName = (userName) => {
    currentUserName = userName
}

export const getComments = () => {
    return fetch(host + '/comments', {
        method: 'GET',
    })
        .then((response) => {
            if (response.status === 500) throw new Error('server')
            if (!response.ok) throw new Error('other')
            return response.json()
        })
        .then((data) => {
            updateComments(data.comments)
            renderComments()
            hideLoader()
        })
}

export const postComment = (commentText, retries = 0) => {
    const maxRetries = 3
    return fetch(host + '/comments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            text: sanitizeHtml(commentText),
            forceError: true,
        }),
    })
    .then((response) => {
        if (response.status === 500 && retries < maxRetries) {
            return delay(1000).then(() => postComment(commentText, retries + 1))
        }
        if (response.status === 400) throw new Error('Имя и комментарий должны быть не короче 3 символов')
        if (!response.ok) throw new Error('Произошла ошибка, попробуйте еще раз')
        return response.json()
    })
}

export const login = ({ login, password }) => {
    return fetch(`${authToken}/login`, {
        method: 'POST',
        body: JSON.stringify({ login, password }),
    })
    .then((response) => {
        if (response.status === 400) {
            throw new Error('Введен неверный логин или пароль')
        } 
        if (response.status === 201) {
            return response.json()
        } 
        throw new Error('Ошибка сервера')
    })
}

export const registration = ({ login, name, password }) => {
    return fetch(authToken, {
        method: 'POST',
        body: JSON.stringify({ login, name, password }),
    })
    .then((response) => {
        if (response.status === 400) {
            throw new Error('Пользователь с таким логином уже существует')
        }
        if (response.status === 201) {
            return response.json()
        }
        throw new Error('Ошибка сервера: ' + response.status)
    })
}
