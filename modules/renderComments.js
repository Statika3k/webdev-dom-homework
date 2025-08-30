import { comments } from './commentsInfo.js'
import { initCommentClick, initLike } from './initListeners.js'
import { sanitizeHtml } from './helpers.js'

const commentsList = document.querySelector('.comments')

// Функция рендеринга комментариев
export const renderComments = () => {
    const commentsHTML = comments
        .map((comment, index) => {
            const likeClass = comment.isLiked ? ' -active-like' : ''

            const escapedUserName = sanitizeHtml(comment.userName)

            const escapedCommentText = sanitizeHtml(comment.commentText)

            return `
      <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${escapedUserName}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${escapedCommentText}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button${likeClass}" data-index="${index}"></button>
            </div>
          </div>          
        </li>
      `
        })
        .join('')

    commentsList.innerHTML = commentsHTML

    // Добавляем обработчики кликов на комментарий
    initCommentClick()
    // Добавляем обработчики кликов на лайки
    initLike()
}
