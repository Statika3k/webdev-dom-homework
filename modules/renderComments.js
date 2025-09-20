import { comments } from './commentsInfo.js'
import { initCommentClick, initLike } from './initListeners.js'
import { sanitizeHtml, formatDate } from './helpers.js'

const commentsList = document.querySelector('.comments')

const baseHtml = `
    <div class="container">
    <div id="loading" class="loading" style="display: none">
        Пожалуйста подождите, загружаю комментарии...
    </div>
    <ul class="comments"></ul>
    <div class="add-form">
        <div id="response-info" style="display: none" class="respond-to">
            <div>Ответ на комментарий:</div>
            <div id="response-author"></div>
            <div id="response-text"></div>
        </div>
        <input type="text" class="add-form-name" placeholder="Введите ваше имя" />
        <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
        <div class="add-form-row">
            <button class="add-form-button">Написать</button>
        </div>
    </div>
    <div class="add-form-loader" id="form-loader" style="display: none">
        Комментарий добавляется...
    </div>
</div>
    `

// Функция рендеринга комментариев
export const renderComments = () => {
  const commentsHTML = comments
    .map((comment, index) => {
      const likeClass = comment.isLiked ? ' -active-like' : ''
      const escapedUserName = sanitizeHtml(comment.author.name)
      const escapedCommentText = sanitizeHtml(comment.text)

      return `
      <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${escapedUserName}</div>
            <div>${formatDate(comment.date)}</div>
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
