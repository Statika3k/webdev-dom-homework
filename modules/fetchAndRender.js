import { renderComments } from './renderComments.js'
import { initAddComment } from './initListeners.js'
import { updateComments } from './commentsInfo.js'
import { hideLoader } from './loader.js'

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
initAddComment(renderComments)
