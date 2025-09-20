import { getComments } from './modules/api.js'
import { initLoader, showLoader, hideLoader } from './modules/loader.js'
import { renderComments } from './modules/renderComments.js'

function initApp() {
    initLoader()
    showLoader()
    
    // Показываем заглушку загрузки
    document.getElementById('app').innerHTML = 
        '<div class="container"><p>Пожалуйста подождите, загружаю комментарии...</p></div>'
    
    // Загружаем комментарии
    getComments()
        .then(() => {
            hideLoader()
        })
        .catch(error => {
            hideLoader()
            renderComments()
        })
}

initApp()