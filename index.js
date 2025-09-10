import { renderComments } from './modules/renderComments.js'
import { initAddComment } from './modules/initListeners.js'
import { updateComments } from './modules/commentsInfo.js'

fetch('https://wedev-api.sky.pro/api/v1/nina-shakhanova/comments', {
    method: 'GET',
})
    .then((response) => {
        return response.json()
    })
    .then((data) => {        
        updateComments(data.comments)
        renderComments()
    })

initAddComment(renderComments)
